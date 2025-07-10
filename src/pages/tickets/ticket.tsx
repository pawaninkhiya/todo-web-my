import { useAuth } from "@contexts/AuthProvider";
import { useGetAllTicketsQuery } from "@services/apis/tickets/hooks";
import TicketCard from "./components/TicketCard";
import { useState } from "react";
import type { GetAllTicketsParams } from "@interfaces/ticketsTypes";
import { useDebounceValue } from "@hooks/useDebounceValue";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@assets/icons";
import "react-datepicker/dist/react-datepicker.css";
import { AllFilters } from "./components/AllFilters";
import { Pagination } from "@components/Pagination";


const Ticket = () => {
    const { user } = useAuth();
    const [filters, setFilters] = useState<GetAllTicketsParams>({
        page: 1,
        limit: 10,
    });
    const [showFilters, setShowFilters] = useState(false);

    const debouncedName = useDebounceValue(filters.name ?? "", 500);

    const { data, isPending } = useGetAllTicketsQuery(user?._id ?? "", {
        ...filters,
        name: debouncedName,
    });


    const handleShowAllClick = () => {
        // if (showFilters) {
        //     setFilters(prev => ({ ...prev, page: 1 }));
        // }
        setShowFilters(!showFilters);
    };

    const clearAllFilters = () => {
        setFilters({ page: 1, limit: filters.limit });
    };

    const handlePageChange = (newPage: number) => {
        setFilters(prev => ({ ...prev, page: newPage }));
    };

    const handleLimitChange = (newLimit: number) => {
        setFilters(prev => ({ ...prev, limit: newLimit, page: 1 }));
    };

    const totalPages = data?.count?.allCount ? Math.ceil(data.count.allCount / (filters.limit || 10)) : 0;

    return (
        <div className="w-full h-full overflow-y-auto p-4 md:p-6 scrollbar-hide bg-gradient-to-r from-cyan-50 to-cyan-100">
            <div className="flex flex-row justify-between items-start sm:items-center gap-3 mb-4">
                <div className="flex gap-2 w-full sm:w-auto">
                    {showFilters && (
                        <button
                            onClick={clearAllFilters}
                            className="px-3 py-1.5 bg-white rounded-lg cursor-pointer text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  border border-gray-200"
                        >
                            Clear Filters
                        </button>
                    )}
                    <button
                        onClick={handleShowAllClick}
                        className="px-3 py-1.5 bg-white rounded-lg cursor-pointer text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  border border-gray-200 flex items-center gap-2"
                    >
                        {showFilters ? "Hide Filters" : "Show Filters"}
                        {showFilters ? (
                            <Icons.ChevronUp className="w-3 h-3" />
                        ) : (
                            <Icons.ChevronDown className="w-3 h-3" />
                        )}
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <label htmlFor="itemsPerPage" className="text-xs sm:text-sm text-gray-700 md:block hidden">
                        Items per page:
                    </label>
                    <select
                        id="itemsPerPage"
                        value={filters.limit || 10}
                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                        className="py-1.5 rounded-lg border border-gray-300 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white appearance-none px-6 cursor-pointer"
                    >
                        {[5, 10, 20, 50].map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className=" mb-4"
                    >
                        <AllFilters
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {isPending ? (
                <div className="flex justify-center items-center h-[300px] sm:h-[400px]">
                    <Icons.Spinner className="animate-spin text-3xl text-cyan-600" />
                </div>
            ) : data?.result.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[300px] sm:h-[400px] text-center">
                    <Icons.Empty className="text-4xl md:text-5xl mb-4 opacity-60 text-gray-400" />
                    <h3 className="text-sm md:text-lg font-medium mb-2 text-gray-700">No tickets found</h3>
                    <p className="text-xs md:text-sm opacity-75 text-gray-600">
                        Try adjusting your search or filters
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 2xl:grid-cols-3 ">
                        {data?.result.map((ticket) => (
                            <TicketCard key={ticket._id} ticket={ticket} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <div className="mt-6 px-2">
                            <Pagination
                                currentPage={filters.page || 1}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Ticket;
