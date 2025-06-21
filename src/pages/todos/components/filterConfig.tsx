import sky from "@assets/sky.jpg";
import { Icons } from "@assets/icons";

export type FilterConfig = {
    key: string;
    heading: string;
    className: string;
    textColor: string;
    style?: React.CSSProperties;
    overlay?: boolean;
    icon?: React.ReactNode;
};

export const FILTER_CONFIG: FilterConfig[] = [
    {
        key: "today",
        heading: "Today's Work",
        className: "bg-cover bg-center",
        style: { backgroundImage: `url(${sky})` },
        overlay: true,
        textColor: "text-white",
        icon: <Icons.Today size={35} />,
    },
    {
        key: "isImportant",
        heading: "Important Tasks",
        className: "bg-gradient-to-r from-red-100 to-red-300",
        textColor: "text-red-800",
        icon: <Icons.Important size={35} />,
    },
    {
        key: "inProgress",
        heading: "In Progress",
        className: "bg-gradient-to-r from-yellow-100 to-yellow-300",
        textColor: "text-yellow-800",
        icon: <Icons.AllTasks size={35} />,
    },
    {
        key: "pending",
        heading: "Pending Tasks",
        className: "bg-gradient-to-r from-blue-100 to-blue-300",
        textColor: "text-blue-800",
        icon: <Icons.User size={35} />,
    },
    {
        key: "assignToMe",
        heading: "Assigned to Me",
        className: "bg-gradient-to-r from-purple-100 to-purple-300",
        textColor: "text-purple-800",
        icon: <Icons.Assign size={35} />,
    },
    {
        key: "completed",
        heading: "Completed",
        className: "bg-gradient-to-r from-emerald-100 to-emerald-300",
        textColor: "text-emerald-800",
        icon: <Icons.Assign size={35} />,
    },

    {
        key: "teamId",
        heading: "Team Tasks",
        className: "bg-gradient-to-r from-green-100 to-green-300",
        textColor: "text-green-800",
        icon: <Icons.Users size={35} />,
    },
];


export const defaultConfig: FilterConfig = {
    key: "default",
    heading: "Tasks",
    className: "bg-gray-100",
    textColor: "text-black",
    style: undefined,
    overlay: false,
};

// Todo type extended
export interface TodoItem {
    id: string;
    title: string;
    teamId: string;
    team: string;
    isTeamCompleted: boolean;
    assignee: {
        initials: string;
        color: string;
    };
    isStarred: boolean;
    isCompleted: boolean;
}

