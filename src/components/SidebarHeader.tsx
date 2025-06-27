import { useAuth } from "@contexts/AuthProvider";
import { ImSearch } from "react-icons/im";

interface SidebarHeaderProps {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
}

const SidebarHeader = ({ isMobile, isTablet, isDesktop }: SidebarHeaderProps) => {
    const { user, search, setSearch } = useAuth();
    return (
        <div className="p-4 sm:p-2 lg:px-4 pt-4">
            <div className={`flex items-center ${isTablet ? "flex-col gap-2" : "gap-2"}`}>
                <div className="min-w-[50px] w-[50px] h-[50px] rounded-full bg-[#00A300] text-2xl flex justify-center items-center text-white font-semibold">
                    {user?.name?.charAt(0)}
                </div>
                {(isDesktop || isMobile) && (
                    <div className="flex flex-col max-w-[200px] overflow-hidden">
                        <h3 className="text-sm font-semibold text-gray-800 leading-tight w-full">{user?.name}</h3>
                        <p className=" text-[11px] sm:text-xs text-gray-500 font-[400] truncate">{user?.email}</p>
                    </div>
                )}
            </div>
            {(isDesktop || isMobile) && (
                <div className="mt-4 relative w-full">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search..."
                        className="w-full pr-10 pl-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00A300] transition"
                    />
                    <ImSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-base pointer-events-none" />
                </div>
            )}
        </div>
    );
};

export default SidebarHeader;