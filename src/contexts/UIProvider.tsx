import { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UIContextType = {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
    navigateTo: (path: string, tabName: string) => void;
};

const UIContext = createContext<UIContextType>({} as UIContextType);

export const UIProvider = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const navigateTo = (path: string) => {
        navigate(path);
    };

    return (
        <UIContext.Provider
            value={{ isSidebarOpen, toggleSidebar, navigateTo }}
        >
            {children}
        </UIContext.Provider>
    );
};

export const useUIContext = () => useContext(UIContext);
