import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUIContext } from "@contexts/UIProvider";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SidebarHeader from "./SidebarHeader";
import SidebarTabs from "./SidebarTabs";
import SidebarLists from "./SidebarLists";
import { Icons } from "@assets/icons";
import { useAuth } from "@contexts/AuthProvider";

const Sidebar = () => {
    const { user } = useAuth();
    const { isSidebarOpen, toggleSidebar } = useUIContext();
    const [screenSize, setScreenSize] = useState<"mobile" | "tablet" | "desktop">("desktop");
    const location = useLocation();
    const navigate = useNavigate();
    const [showAddInput, setShowAddInput] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) setScreenSize("mobile");
            else if (width < 1024) setScreenSize("tablet");
            else setScreenSize("desktop");
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = screenSize === "mobile";
    const isTablet = screenSize === "tablet";
    const isDesktop = screenSize === "desktop";

    return (
        <>
            <div
                className={`bg-[#F6F6F6] h-screen flex flex-col z-50 transition-transform overflow-hidden duration-300 ease-in-out
            ${isMobile ? "fixed top-0 left-0 w-[280px]" : isTablet ? "w-20 items-center" : "w-[280px]"}
            ${isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : ""}`}>
                <SidebarHeader
                    isMobile={isMobile}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                />

                <SidebarTabs
                    isMobile={isMobile}
                    isTablet={isTablet}
                    isDesktop={isDesktop}
                    location={location}
                    navigate={navigate}
                />

                <div className="border border-gray-200"></div>

                <div className="flex-1 overflow-y-auto">
                    <SidebarLists
                        isMobile={isMobile}
                        isTablet={isTablet}
                        isDesktop={isDesktop}
                        location={location}
                        navigate={navigate}
                        showAddInput={showAddInput}
                        setShowAddInput={setShowAddInput}
                    />
                </div>
                {
                    // user?.role === "admin" &&
                    <div className="">
                        <div className="border-t border-gray-300 px-2 bg-white h-24">
                            <div className="flex gap-2 items-center my-auto pt-3">
                                <button
                                    onClick={() => setShowAddInput(true)}
                                    className="flex-1 cursor-pointer px-4 flex items-center py-2.5 text-xs rounded hover:bg-gray-200 transition-colors">
                                    <span className="mr-3 text-purple-500">
                                        <Icons.Plus />
                                    </span>
                                    <span>Add List</span>
                                </button>
                                <button
                                    onClick={() => navigate("/tickets")}
                                    className="flex-1 cursor-pointer px-4 flex items-center py-2.5 text-xs rounded hover:bg-gray-200 transition-colors">
                                    <span className="mr-3 text-purple-500"><Icons.Ticket /></span>
                                    <span>Ticket</span>
                                </button>
                            </div>
                        </div>
                    </div>
                }

                {isMobile && (
                    <button
                        onClick={toggleSidebar}
                        className="absolute top-4 right-[-40px] p-2 rounded-md bg-white shadow-md z-50">
                        {isSidebarOpen ? (
                            <FiChevronLeft size={24} />
                        ) : (
                            <FiChevronRight size={24} />
                        )}
                    </button>
                )}
            </div>

            {isMobile && isSidebarOpen && (
                <div
                    onClick={toggleSidebar}
                    className="fixed inset-0 bg-black/70 bg-opacity-30 z-40"
                />
            )}
        </>
    );
};

export default Sidebar;
