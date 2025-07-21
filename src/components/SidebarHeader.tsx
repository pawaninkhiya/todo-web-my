import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@contexts/AuthProvider";
import { BiSearch, BiUser } from "react-icons/bi";
interface SidebarHeaderProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const SidebarHeader = ({ isMobile, isTablet, isDesktop }: SidebarHeaderProps) => {


    const { user, searchParams, setSearchParams } = useAuth();
    const [open, setOpen] = useState(false);

    const searchTypes = [
        { label: "Search", value: "name", icon: <BiSearch /> },
        { label: "Name", value: "assignedToName", icon: <BiUser /> },
    ];

    const activeType = searchTypes.find((type) => type.value === searchParams.type);

    const getPlaceholder = () =>
        searchParams.type === "name" ? "Search by name..." : "Search by assignee...";

    return (
        <div className="p-4 sm:p-2 lg:px-4 pt-4">
            <div className={`flex items-center ${isTablet ? "flex-col gap-2" : "gap-2"}`}>
                <div className="min-w-[50px] w-[50px] h-[50px] rounded-full bg-[#00A300] text-2xl flex justify-center items-center text-white font-semibold">
                    {user?.name?.charAt(0)}
                </div>
                {(isDesktop || isMobile) && (
                    <div className="flex flex-col max-w-[200px] overflow-hidden">
                        <h3 className="text-sm font-semibold text-gray-800 leading-tight w-full">{user?.name}</h3>
                        <p className="text-[11px] sm:text-xs text-gray-500 font-[400] truncate">{user?.email}</p>
                    </div>
                )}
            </div>
            {(isDesktop || isMobile) && (
                <div className="mt-4 relative w-full">
                    <div className="relative flex items-center rounded-md bg-white border border-gray-300 focus-within:ring-2 focus-within:ring-[#00A300] transition">
                        <div className="relative z-10">
                            <button
                                onClick={() => setOpen((prev) => !prev)}
                                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 border-r border-gray-300 hover:bg-gray-50"
                            >
                                {activeType?.icon}
                                {/* <HiChevronDown className="text-xs" /> */}
                            </button>

                            {/* Dropdown Items */}
                            <AnimatePresence>
                                {open && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 mt-1 w-44 bg-white border border-gray-200 rounded-md shadow-md"
                                    >
                                        {searchTypes.map(({ label, value, icon }) => (
                                            <button
                                                key={label}
                                                onClick={() => {
                                                    setSearchParams((prev) => ({
                                                        ...prev,
                                                        type: value,
                                                        search: "",
                                                    }));
                                                    setOpen(false);
                                                }}
                                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                {icon}
                                                {label}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            value={searchParams.search}
                            onChange={(e) =>
                                setSearchParams((prev) => ({
                                    ...prev,
                                    search: e.target.value,
                                }))
                            }
                            // disabled={isDisabled}
                            placeholder={getPlaceholder()}
                            className="w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white rounded-r-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default SidebarHeader;
