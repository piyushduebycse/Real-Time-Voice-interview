import { UserProfile } from '@clerk/clerk-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-3xl font-display font-bold text-neutral-900 mb-8">Your Profile</h1>

            <div className="flex flex-col lg:flex-row gap-8 items-start">

                <div className="w-full lg:w-2/3 shadow-card rounded-2xl overflow-hidden bg-white border border-neutral-100 max-[500px]:p-0">
                    <UserProfile
                        appearance={{
                            elements: {
                                rootBox: "w-full shadow-none",
                                card: "shadow-none rounded-none w-full border-0",
                                navbar: "hidden border-r border-neutral-200 bg-neutral-50/50 relative z-0",
                                pageScrollBox: "p-4 sm:p-6",
                                headerTitle: "font-display font-semibold text-xl text-neutral-900",
                                headerSubtitle: "text-neutral-500",
                                profileSectionTitle: "font-display font-semibold text-neutral-900 border-b-2 border-primary/20 pb-2 inline-block",
                                formButtonPrimary: "bg-primary hover:bg-primary/90 transition-colors shadow-sm text-white rounded-xl",
                                formFieldInput: "rounded-xl border-neutral-200 focus:ring-primary focus:border-primary shadow-sm",
                            }
                        }}
                    />
                </div>

                <div className="w-full lg:w-1/3 space-y-6">
                    <Card size="sm" className="bg-white">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <span className="text-primary">📊</span> App Statistics
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-0">
                            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                                <span className="text-neutral-500 text-sm font-medium">Total Sessions</span>
                                <span className="font-bold text-neutral-900 px-3 py-1 bg-neutral-100 rounded-lg">12</span>
                            </div>
                            <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                                <span className="text-neutral-500 text-sm font-medium">Questions Answered</span>
                                <span className="font-bold text-neutral-900 px-3 py-1 bg-neutral-100 rounded-lg">48</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-neutral-500 text-sm font-medium">Most Practiced</span>
                                <span className="font-bold text-primary bg-primary/10 px-3 py-1 rounded-lg">Technical</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card size="sm" className="bg-primary/5 border border-primary/20 relative overflow-hidden">
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
                        <CardHeader className="relative z-10">
                            <CardTitle className="text-lg">Data & Privacy</CardTitle>
                        </CardHeader>
                        <CardContent className="relative z-10 pt-0">
                            <CardDescription className="mb-6 leading-relaxed">
                                Download a complete archive of your interview transcripts, feedback, and scores in JSON format.
                            </CardDescription>
                            <Button variant="outline" className="w-full bg-white shadow-sm border-neutral-200 text-neutral-700 hover:text-primary hover:border-primary/50 relative z-10 font-medium">
                                <span className="mr-2">📥</span> Export my data
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}
