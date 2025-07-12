
export const EditPanelSkeleton = () => {
    return (
        <div className="w-full max-w-full xl:max-w-[450px] bg-[#F6F6F6] border-l border-gray-200 flex flex-col justify-between fixed top-0 right-0 h-full xl:static xl:h-auto z-50 animate-pulse scrollbar-hide">
            <div className="flex flex-col gap-4 p-4 overflow-y-auto scrollbar-hide">
                {/* Header with close button */}
                <div className="flex justify-end">
                    <div className="h-4 w-4 rounded-full bg-gray-300"></div>
                </div>

                {/* Status tabs skeleton */}
                <div className="flex gap-2">
                    {['Pending', 'In Progress', 'Completed'].map((status) => (
                        <div
                            key={status}
                            className="flex-1 h-10 rounded-lg bg-gray-200"
                        ></div>
                    ))}
                </div>

                {/* Main card skeleton */}
                <div className="w-full shadow bg-white rounded-lg p-4 space-y-4">
                    {/* Title row */}
                    <div className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-full border-2 border-gray-300 bg-gray-100"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-5 w-full rounded bg-gray-200"></div>
                            <div className="h-5 w-3/4 rounded bg-gray-200"></div>
                        </div>
                        <div className="h-6 w-6 rounded-full bg-gray-200"></div>
                    </div>

                    {/* Steps section */}
                    <div className="space-y-3">
                        {/* <div className="h-4 w-1/2 rounded bg-gray-200"></div> */}
                        <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-sm bg-gray-200"></div>
                                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                                </div>
                            ))}
                        </div>
                        <div className="h-9 w-full rounded-md bg-gray-200 mt-2"></div>
                    </div>
                </div>

                {/* Details sections */}
                <div className="space-y-4">
                    {['Description', 'Due Date', 'Priority'].map((section) => (
                        <div key={section} className="w-full shadow bg-white rounded-lg p-4 space-y-2">
                            {/* <div className="h-4 w-1/3 rounded bg-gray-200"></div> */}
                            <div className="h-10 w-full rounded bg-gray-200"></div>
                        </div>
                    ))}
                </div>

                {/* File upload section */}
                <div className="w-full shadow bg-white rounded-lg p-4 space-y-2">
                    <div className="h-4 w-1/3 rounded bg-gray-200"></div>
                    <div className="h-20 w-full rounded-md bg-gray-200"></div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t-2 border-gray-200 p-4 scrollbar-hide">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <div className="h-3 w-32 rounded bg-gray-200"></div>
                        <div className="h-3 w-40 rounded bg-gray-200"></div>
                    </div>
                    <div className="h-5 w-5 rounded-full bg-gray-200"></div>
                </div>
            </div>
        </div>
    );
};