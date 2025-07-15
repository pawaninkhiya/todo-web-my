import { Icons } from "@assets/icons";
import { useGetAllQuery } from "@services/apis/KPA/hook";

interface SidePanelProps {
    onKraSelect: (id: string) => void;
    handleSidePanelToggle: () => void;
    isSidePanelOpen: boolean;
}

const SidePanel = ({ onKraSelect, handleSidePanelToggle, isSidePanelOpen }: SidePanelProps) => {
    const { data, isPending, isError } = useGetAllQuery();

    return (
        <div className={`w-full max-w-full xl:max-w-[370px] bg-white shadow-lg border-l border-gray-200 flex flex-col fixed top-0 right-0 h-full xl:static xl:h-auto z-50 xl:shadow-none transition-transform duration-300 ease-in-out scrollbar-hide  ${isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'} xl:translate-x-0`}>
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">KPA List</h2>
                <button
                    className="xl:hidden text-gray-500 hover:text-gray-700"
                    onClick={handleSidePanelToggle}
                >
                    <Icons.Cross/>
                </button>
            </div>

            {/* Date Filter */}
            <div className="p-4 border-b border-gray-200 sticky">
                <input
                    type="date"
                    className="w-full py-2 text-xs rounded border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-none"
                />
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-hide">


                {/* Content */}
                <div className="p-4">
                    {isPending ? (
                        <div className="space-y-4">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                </div>
                            ))}
                        </div>
                    ) : isError ? (
                        <div className="p-4 bg-red-50 rounded-lg text-center">
                            <p className="text-red-600 text-sm">
                                Failed to load data. Please try again later.
                            </p>
                        </div>
                    ) : data?.data?.length ? (
                        <div className="space-y-3">
                            {data.data.map((kpa: any) => (
                                <div
                                    key={kpa._id}
                                    className="p-4 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors"
                                    onClick={() => onKraSelect(kpa._id)}
                                >
                                    <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2">
                                        {kpa.title}
                                    </h3>

                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span>Created: {new Date(kpa.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <div className="text-xs text-gray-500 mb-1">
                                        <span className="font-medium">Assigned to:</span> {kpa.assignTo.name} ({kpa.assignTo.role})
                                    </div>

                                    <div className="text-xs text-gray-500">
                                        <span className="font-medium">Created by:</span> {kpa.createdBy.name} ({kpa.createdBy.role})
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-6 text-center">
                            <p className="text-gray-400 text-sm">
                                No KPAs available. Create one to get started.
                            </p>
                        </div>
                    )}
                </div>
            </div>
            <div className="p-4 border-t border-gray-200 bg-white">
                <p className="text-xs text-gray-500 text-center">
                    Showing {data?.data?.length || 0} items
                </p>
            </div>
        </div>
    );
};

export default SidePanel;