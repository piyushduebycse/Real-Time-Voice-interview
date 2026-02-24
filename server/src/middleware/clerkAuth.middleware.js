import { ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.model.js';

export const requireAuth = ClerkExpressRequireAuth();

export const syncUser = async (req, res, next) => {
    try {
        const { userId } = req.auth;
        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            // Try to fetch full user details from Clerk API; fall back to JWT claims on failure
            let email = '';
            let name = '';
            let avatarUrl = '';

            try {
                const cUser = await clerkClient.users.getUser(userId);
                email = cUser.emailAddresses?.[0]?.emailAddress || '';
                name = `${cUser.firstName || ''} ${cUser.lastName || ''}`.trim();
                avatarUrl = cUser.imageUrl || '';
            } catch (clerkErr) {
                console.warn('Clerk API unavailable, using JWT claims as fallback:', clerkErr.message);
                const claims = req.auth.sessionClaims || {};
                email = claims.email || '';
                name = claims.name || claims.username || '';
                avatarUrl = claims.image_url || claims.picture || '';
            }

            user = await User.create({ clerkId: userId, email, name, avatarUrl });
        }

        req.dbUser = user;
        next();
    } catch (err) {
        next(err);
    }
};
