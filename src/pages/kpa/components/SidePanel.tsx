import { Icons } from "@assets/icons";
import DeleteAlertModal from "@components/DeleteAlertModal";
import { useDeleteKRAMutation, useGetAllKRAQuery } from "@services/apis/KPA/hooks";
import { useState, useCallback } from "react";
import toast from "react-hot-toast";

interface SidePanelProps {
    onKraSelect: (id: string) => void;
    handleSidePanelToggle: () => void;
    isSidePanelOpen: boolean;
}

const SidePanel = ({ onKraSelect, handleSidePanelToggle, isSidePanelOpen }: SidePanelProps) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedKraId, setSelectedKraId] = useState<string | null>(null);
    const [date, setDate] = useState<Date>(new Date());
    
    const { data, isPending, isError, refetch } = useGetAllKRAQuery({
        date: date instanceof Date && !isNaN(date.getTime())
            ? date.toISOString().split("T")[0]
            : undefined,
    });

    const { mutateAsync: deleteKra } = useDeleteKRAMutation();

    const handleDeleteClick = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setSelectedKraId(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = useCallback(async () => {
        if (!selectedKraId) return;
        
        try {
            await deleteKra(selectedKraId);
            await refetch();
            setShowDeleteModal(false);
            toast.success("KRA deleted successfully");
        } catch (error) {
            toast.error("Failed to delete KRA");
        }
    }, [selectedKraId, deleteKra, refetch]);

    return (
        <>
            <DeleteAlertModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                title="Delete KRA"
                description="Are you sure you want to delete this KRA? This action cannot be undone."
            />
            <div className={`w-full max-w-full xl:max-w-[370px] bg-white shadow-lg border-l border-gray-200 flex flex-col fixed top-0 right-0 h-full xl:static xl:h-auto z-50 xl:shadow-none transition-transform duration-300 ease-in-out scrollbar-hide  ${isSidePanelOpen ? 'translate-x-0' : 'translate-x-full'} xl:translate-x-0`}>
                {/* Header */}
                <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">KPA List</h2>
                    <button
                        className="xl:hidden text-gray-500 hover:text-gray-700"
                        onClick={handleSidePanelToggle}
                    >
                        <Icons.Cross />
                    </button>
                </div>

                {/* Date Filter */}
                <div className="p-4 border-b border-gray-200 sticky">
                    <input
                        type="date"
                        value={date instanceof Date && !isNaN(date.getTime())
                            ? date.toISOString().split("T")[0]
                            : ''}
                        onChange={(e) => {
                            const newDate = new Date(e.target.value);
                            if (!isNaN(newDate.getTime())) {
                                setDate(newDate);
                            }
                        }}
                        className="w-full py-2 text-xs rounded border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-none"
                    />
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {/* Content */}
                    <div className="p-4">
                        {isPending ? (
                            <div className="space-y-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="animate-pulse">
                                        <div className=" bg-gray-200 rounded w-full mb-3 h-30"></div>
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
                                        className="p-4 bg-gray-50 rounded border border-gray-200 cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-colors group relative"
                                        onClick={() => onKraSelect(kpa._id)}
                                    >
                                        <button
                                            className="absolute top-2 right-2 p-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                                            onClick={(e) => handleDeleteClick(e, kpa._id)}
                                        >
                                            <Icons.Delete className="w-4 h-4" />
                                        </button>
                                        <h3 className="font-medium text-gray-800 text-sm mb-2 line-clamp-2 max-w-[90%]">
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
                                    No KRAs available. Create one to get started.
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
        </>
    );
};

export default SidePanel;