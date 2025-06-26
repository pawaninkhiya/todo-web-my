import { useAuth } from "@contexts/AuthProvider";
import { useGetAllCustomersQuery, useGetAllTicketsQuery } from "@services/apis/tickets/hooks";
import TicketCard from "./components/TicketCard";
import { useState } from "react";
import { FilterTicketTabs } from "./components/TicketTabs";
import CustomSelect from "@components/CustomSelect";
import { customSelectStyles } from "@utils/customSelectStyles";
import type { GetAllTicketsParams } from "@interfaces/ticketsTypes";
import { useDebounceValue } from "@hooks/useDebounceValue";
import { motion, AnimatePresence } from "framer-motion";
import { Icons } from "@assets/icons";

const Ticket = () => {
    const { user } = useAuth();
    const [filters, setFilters] = useState<GetAllTicketsParams>({});
    const [showFilters, setShowFilters] = useState(true);

    const debouncedName = useDebounceValue(filters.name ?? "", 500);

    const { data, isPending } = useGetAllTicketsQuery(user?._id ?? "", {
        ...filters,
        name: debouncedName,
    });

    const { data: Customers } = useGetAllCustomersQuery();

    type OptionType = {
        label: string;
        value: string | number;
    };

    const status: OptionType[] = [
        { value: "", label: "All Status" },
        { value: "OPEN", label: "Open" },
        { value: "CLOSE", label: "Closed" },
    ];

    const ticketTypes: OptionType[] = [
        { value: "", label: "All Ticket Types" },
        { value: "NORMAL", label: "Normal" },
        { value: "QUALITY", label: "Quality" },
    ];

    const assignedTo: OptionType[] = [
        { value: "", label: "All Assignees" },
        ...(Customers?.customers ?? [])?.map((customer: any) => ({
            value: customer.value,
            label: customer.name,
        })),
    ];

    const handleShowAllClick = () => {
        if (showFilters) {
            setFilters({
                assignedBy: "",
                assignedTo: "",
                name: "",
                status: ""
            })
        }
        else {
            setFilters({
                assignedBy: "",
                assignedTo: "",
                name: "",
                status: "",
                tab: "tagged"
            })
        }
        setShowFilters(!showFilters);
    };

    return (
        <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide bg-gradient-to-r from-cyan-100 to-cyan-300">
            <div className="flex justify-between items-center mb-4 flex-wrap">
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <FilterTicketTabs
                                activeTab={filters.tab}
                                onTabChange={(tabId: string) =>
                                    setFilters((prev) => ({ ...prev, tab: tabId }))
                                }
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
                <button
                    onClick={handleShowAllClick}
                    className="px-4 py-2 bg-white rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                    {showFilters ? "Show All" : "Show Filters"}
                </button>
            </div>

            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <input
                                    type="text"
                                    placeholder="Search tickets..."
                                    value={filters.name ?? ""}
                                    onChange={(e) =>
                                        setFilters((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className="w-full h-[42px] rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-none"
                                />

                                <CustomSelect
                                    menuPortalTarget={document.body}
                                    options={status}
                                    value={status.find((option) => option.value === filters.status) || null}
                                    onChange={(selected) =>
                                        setFilters((prev) => ({ ...prev, status: selected?.value || "" }))
                                    }
                                    placeholder="Select Status"
                                    styles={customSelectStyles}
                                />

                                <CustomSelect
                                    menuPortalTarget={document.body}
                                    options={ticketTypes}
                                    value={ticketTypes.find((option) => option.value === filters.ticketType) || null}
                                    onChange={(selected) =>
                                        setFilters((prev) => ({ ...prev, ticketType: selected?.value || "" }))
                                    }
                                    placeholder="Select Ticket Type"
                                    styles={customSelectStyles}
                                />

                                <CustomSelect
                                    menuPortalTarget={document.body}
                                    options={assignedTo}
                                    value={assignedTo.find((option) => option.value === filters.assignedTo) || null}
                                    onChange={(selected) =>
                                        setFilters((prev) => ({ ...prev, assignedTo: selected?.value || "" }))
                                    }
                                    placeholder="Select Assigned To"
                                    styles={customSelectStyles}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>


            {isPending ? (
                <div className="flex justify-center items-center h-[400px]">
                    <Icons.Spinner className="animate-spin text-3xl" />
                </div>
            ) : data?.result.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <Icons.Empty className="text-5xl mb-4 opacity-60" />
                    <h3 className="text-xl font-medium mb-2">No tickets found</h3>
                    <p className="text-sm opacity-75">
                        Try adjusting your filters
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                    {data?.result.map((ticket) => (
                        <TicketCard key={ticket._id} ticket={ticket} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Ticket;