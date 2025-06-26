// src/components/PageLoader.tsx
const PageLoader = ({ message = "Loading..." }: { message?: string }) => {
    return (
        <div className="p-4 flex justify-center items-center h-full w-full bg-black/20  backdrop-blur-sm">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-400 to-purple-500 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-white">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                </div>
                <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
            </div>
        </div>
    );
};

export default PageLoader;
