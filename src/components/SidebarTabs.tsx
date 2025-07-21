import { Icons } from "@assets/icons";
import { useAuth } from "@contexts/AuthProvider";
import useSocketRefresh from "@hooks/useSocketRefresh";
import { useGetTodoCountsQuery } from "@services/apis/todos/hooks";

interface SidebarTabsProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    location: any;
    navigate: any;
    toggleSidebar: () => void;
}

const SidebarTabs = ({ isMobile, isDesktop, navigate, toggleSidebar }: SidebarTabsProps) => {
    const { socket, user } = useAuth();
    const { data: counts, refetch: refetchTodosCounts } = useGetTodoCountsQuery();

    useSocketRefresh({
        socket,
        refetch: refetchTodosCounts,
        eventName: "refresh_todos",
        shouldRefetch: (data) => {
            return data?.excludedUserId !== user?._id;
        }
    });

    const tabs = [
        {
            name: "Today's work",
            icon: <Icons.Today className="text-gray-500" size={20} />,
            filter: "today",
            count: counts?.todayCount || 0,
        },
        {
            name: "Important",
            icon: <Icons.Important className="text-yellow-500" size={20} />,
            filter: "isImportant",
            count: counts?.isImportantCount || 0,
        },
        {
            name: "All pending Task",
            icon: <Icons.AllTasks className="text-blue-500" size={20} />,
            filter: "pending",
            count: counts?.pendingCount || 0,
        },
        {
            name: "Assigned to me",
            icon: <Icons.User className="text-green-500" size={20} />,
            filter: "assignToMe",
            count: counts?.assignToMeCount || 0,
        },
        {
            name: "In-process",
            icon: <Icons.Home className="text-blue-900" size={20} />,
            filter: "inProgress",
            count: counts?.progressCount || 0,
        },
        {
            name: "Completed",
            icon: <Icons.Done className="text-emerald-800" size={20} />,
            filter: "completed",
            count: counts?.completeCount || 0,
        },
        {
            name: "KRA",
            icon: <Icons.NotebookText className="text-purple-500" size={20} />,
            action: () => {
                navigate('/kra/create');
                toggleSidebar();
            },
            count: 0, // No count for KPA creation
        }

    ];

    // const getActivePath = () => {
    //     const match = tabs.find((tab) => location.pathname.includes(tab.filter));
    //     return match?.name || "";
    // };

    // const activeTab = getActivePath();

    return (
        <div className=" px-1 pb-2 pt-2">
            {isDesktop || isMobile ? (
                <ul className="space-y-1 relative">
                    {tabs.map((tab) => (
                        <li key={tab.name}>
                            <button
                                onClick={() => {
                                    if (tab.action) {
                                        tab.action();
                                    } else {
                                        navigate(`/`, {
                                            state: { filter: tab.filter },
                                        });
                                        toggleSidebar();
                                    }
                                }}
                                className={`w-full cursor-pointer  px-4 flex items-center justify-between  p-2.5 text-sm rounded hover:bg-gray-200 transition-colors 
                                `}
                            // ${activeTab === tab.name ? "bg-gray-200 text-gray-600 font-medium" : "text-gray-700 font-[400]"}`}
                            >
                                <div className="flex items-center">
                                    <span className="mr-3">{tab.icon}</span>
                                    {tab.name}
                                </div>
                                {tab.count > 0 && (
                                    <div className="text-[12px] bg-gray-200 rounded-full p-[1px] w-6 text-center">
                                        {tab.count}
                                    </div>
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <ul className="space-y-3 pt-4">
                    {tabs.map((tab) => (
                        <li
                            key={tab.name}
                            className="relative group flex justify-center">
                            <button
                                onClick={() =>
                                    navigate(`/`, {
                                        state: { filter: tab.filter },
                                    })
                                }
                                className={`px-3 py-2.5 rounded-md hover:bg-gray-200 transition-colors`}
                            // ${activeTab === tab.name ? "bg-gray-200 text-blue-600" : "text-gray-700"}`}
                            >
                                {tab.icon}
                            </button>
                            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-[9999]">
                                {tab.name}
                                <div className="absolute right-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-4 border-b-4 border-r-4 border-solid border-t-transparent border-b-transparent border-r-gray-800"></div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SidebarTabs;
