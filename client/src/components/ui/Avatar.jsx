export const Avatar = ({ src, alt, fallback }) => {
    return (
        <div className="h-10 w-10 overflow-hidden rounded-full bg-neutral-200 ring-2 ring-white">
            {src ? (
                <img src={src} alt={alt || 'Avatar'} className="h-full w-full object-cover" />
            ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-medium text-neutral-700 uppercase">
                    {fallback || alt?.charAt(0) || '?'}
                </div>
            )}
        </div>
    );
};
