import { useCreateTeamMutation, useDeleteTeamMutation, useGetAllTeamsQuery, useUpdateTeamMutation } from "@services/apis/teams/hooks";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import { Icons } from "@assets/icons";
import DeleteAlertModal from "./DeleteAlertModal";
import { useAuth } from "@contexts/AuthProvider";

interface SidebarListsProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    location: any;
    navigate: any;
    showAddInput: boolean;
    setShowAddInput: (value: boolean) => void;
    toggleSidebar: () => void;
}

const SidebarLists = ({ isMobile, isDesktop, navigate, showAddInput, setShowAddInput,toggleSidebar }: SidebarListsProps) => {
    const { user } = useAuth();
    const { data } = useGetAllTeamsQuery();
    const { mutate: createTeam } = useCreateTeamMutation();
    const { mutate: updateTeam } = useUpdateTeamMutation();
    const { mutate: deleteTeam } = useDeleteTeamMutation();
    const [teamName, setTeamName] = useState("");
    const [editingTeamId, setEditingTeamId] = useState<string | null>(null);
    const [hoveredTeamId, setHoveredTeamId] = useState<string | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [teamToDelete, setTeamToDelete] = useState<string | null>(null);

    const handleAddTeam = () => {
        if (teamName.trim()) {
            if (editingTeamId) {
                updateTeam(
                    { id: editingTeamId, formData: { name: teamName } },
                    {
                        onSuccess: () => {
                            setTeamName("");
                            setEditingTeamId(null);
                            setShowAddInput(false);
                        }
                    }
                );
            } else {
                createTeam(
                    { name: teamName },
                    {
                        onSuccess: (newTeam) => {
                            setTeamName("");
                            setShowAddInput(false);
                            if (newTeam.data._id) {
                                navigate(`/`, {
                                    state: {
                                        teamId: newTeam.data._id,
                                        teamName: newTeam.data.name
                                    }
                                });
                            }
                        }
                    }
                );
            }
        }
    };

    const handleDeleteClick = (teamId: string) => {
        setTeamToDelete(teamId);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (teamToDelete) {
            deleteTeam(teamToDelete);
            setDeleteModalOpen(false);
            setTeamToDelete(null);
            navigate(`/`, {
                state: {
                    filter: "today"
                }
            });
        }
    };

    const handleTeamClick = (team: any) => {
        navigate(`/`, {
            state: {
                teamId: team._id,
                teamName: team.name
            }
        });
        toggleSidebar();
    };

    const handleEditTeam = (team: any) => {
        setTeamName(team.name);
        setEditingTeamId(team._id);
        setShowAddInput(true);
    };

    return (
        <>
            <DeleteAlertModal
                isOpen={deleteModalOpen}
                onClose={() => setDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Team"
                description="Are you sure you want to delete this team? All associated data will be permanently removed."
            />

            <div className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto scrollbar-hide px-1 pt-2 pb-5">
                    {(isDesktop || isMobile) ? (
                        <ul className="space-y-1">
                            {data?.result?.map((item, index) => (
                                <li
                                    key={item._id}
                                    onMouseEnter={() => setHoveredTeamId(item._id)}
                                    onMouseLeave={() => setHoveredTeamId(null)}
                                    className="relative"
                                >
                                    {editingTeamId === item._id && showAddInput ? (
                                        <div className="px-2 py-2 relative">
                                            <input
                                                type="text"
                                                value={teamName}
                                                onChange={(e) => setTeamName(e.target.value)}
                                                placeholder="Edit team name"
                                                className="w-full px-3 pr-16 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                                                autoFocus
                                                onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
                                            />
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                                                <button
                                                    onClick={handleAddTeam}
                                                    className="text-green-500 hover:text-green-600 transition-colors"
                                                    title="Save"
                                                >
                                                    <Icons.Check size={16} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setShowAddInput(false);
                                                        setTeamName("");
                                                        setEditingTeamId(null);
                                                    }}
                                                    className="text-red-500 hover:text-red-600 transition-colors"
                                                    title="Cancel"
                                                >
                                                    <Icons.Cancel size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center group">
                                            <button
                                                onClick={() => handleTeamClick(item)}
                                                className={`w-full cursor-pointer px-4 flex items-center py-2.5 text-sm rounded hover:bg-gray-200 transition-colors ${hoveredTeamId === item._id ? 'bg-gray-200' : ''
                                                    }`}
                                            >
                                                <span className="mr-3 text-purple-500">{index + 1}</span>
                                                <div className="flex gap-2 items-center flex-1 justify-between">
                                                    <span className="truncate max-w-[85%]">{item.name}</span>
                                                    <div className="flex items-center gap-2">
                                                        <Icons.Users fontSize={14} className="text-gray-600" />
                                                        {hoveredTeamId === item._id && user?.role === "admin" && (
                                                            <>
                                                                {

                                                                }
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleEditTeam(item);
                                                                    }}
                                                                    className="text-gray-500 hover:text-blue-500 transition-colors p-1"
                                                                    title="Edit"
                                                                >
                                                                    <Icons.Edit size={14} />
                                                                </button>
                                                                <button
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        handleDeleteClick(item._id);
                                                                    }}
                                                                    className="text-gray-500 hover:text-red-500 transition-colors p-1"
                                                                    title="Delete"
                                                                >
                                                                    <Icons.Delete size={16} />
                                                                </button>

                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        </div>
                                    )}
                                </li>
                            ))}

                            {showAddInput && !editingTeamId && (
                                <li className="px-2 py-2 relative">
                                    <input
                                        type="text"
                                        value={teamName}
                                        onChange={(e) => setTeamName(e.target.value)}
                                        placeholder="Enter team name"
                                        className="w-full px-3 pr-16 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-purple-500"
                                        autoFocus
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
                                    />
                                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex gap-2">
                                        <button
                                            onClick={handleAddTeam}
                                            className="text-green-500 hover:text-green-600 transition-colors"
                                            title="Add"
                                        >
                                            <Icons.Check size={16} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowAddInput(false);
                                                setTeamName("");
                                            }}
                                            className="text-red-500 hover:text-red-600 transition-colors"
                                            title="Cancel"
                                        >
                                            <Icons.Cancel size={16} />
                                        </button>
                                    </div>
                                </li>
                            )}
                        </ul>
                    ) : (
                        <ul className="space-y-3 pt-4 overflow-y-auto scrollbar-hide">
                            {data?.result?.map((item) => (
                                <li key={item._id} className="relative group flex justify-center">
                                    <button
                                        onClick={() => {
                                            navigate(`/todo`, {
                                                state: {
                                                    teamId: item._id,
                                                    teamName: item.name
                                                }
                                            });
                                        }}
                                        className={`px-3 py-2.5 rounded-md hover:bg-gray-200 transition-colors`}
                                    >
                                        <HiOutlineMenu size={20} />
                                    </button>
                                    <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999]">
                                        {item.name}
                                        <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-solid border-t-transparent border-b-transparent border-r-gray-800"></div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
};

export default SidebarLists;