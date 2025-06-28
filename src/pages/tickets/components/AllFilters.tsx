import type { Dispatch, SetStateAction } from "react";
import type { GetAllTicketsParams } from "@interfaces/ticketsTypes";
import CustomSelect from "@components/CustomSelect";
import { customSelectStyles } from "@utils/customSelectStyles";

interface AllFiltersProps {
    filters: GetAllTicketsParams;
    setFilters: Dispatch<SetStateAction<GetAllTicketsParams>>;
    customers: any[];
    tab: string;
}

export const AllFilters = ({ filters, setFilters, customers, tab }: AllFiltersProps) => {
    const statusOptions = [
        { value: "", label: "All Statuses" },
        { value: "OPEN", label: "Open" },
        { value: "CLOSE", label: "Closed" },
    ];

    const ticketTypeOptions = [
        { value: "", label: "All Ticket Types" },
        { value: "NORMAL", label: "Normal" },
        { value: "QUALITY", label: "Quality" },
    ];

    const priorityOptions = [
        { value: "", label: "All Priorities" },
        { value: "HIGH", label: "High" },
        { value: "MEDIUM", label: "Medium" },
        { value: "LOW", label: "Low" },
    ];

    const assigneeOptions = [
        { value: "", label: "All Assignees" },
        ...customers?.map((customer) => ({
            value: customer._id,
            label: customer.name,
        })),
    ];

    const requesterOptions = [
        { value: "", label: "All Requesters" },
        ...customers?.map((customer) => ({
            value: customer._id,
            label: customer.name,
        })),
    ];

    return (
        <div className="bg-white rounded shadow p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Search Filter */}
                <input
                    type="text"
                    placeholder="Description or ticket number..."
                    value={filters.name ?? ""}
                    onChange={(e) => setFilters((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full h-[42px] rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-none"
                />

                {/* Status Filter */}
                <CustomSelect
                    options={statusOptions}
                    value={statusOptions.find((option) => option.value === (filters.status ?? "")) ?? null}
                    onChange={(selected) =>
                        setFilters((prev) => ({
                            ...prev,
                            status: selected?.value as string ?? "",
                        }))
                    }
                    placeholder="Select Status"
                    styles={customSelectStyles}
                />

                {/* Ticket Type Filter */}
                <CustomSelect
                    options={ticketTypeOptions}
                    value={ticketTypeOptions.find((option) => option.value === (filters.ticketType ?? "")) ?? null}
                    onChange={(selected) =>
                        setFilters((prev) => ({
                            ...prev,
                            ticketType: selected?.value as string ?? "",
                        }))
                    }
                    placeholder="Select Ticket Type"
                    styles={customSelectStyles}
                />

                {/* Priority Filter */}
                <CustomSelect
                    options={priorityOptions}
                    value={priorityOptions.find((option) => option.value === (filters.priority ?? "")) ?? null}
                    onChange={(selected) =>
                        setFilters((prev) => ({
                            ...prev,
                            priority: selected?.value as string ?? "",
                        }))
                    }
                    placeholder="Select Priority"
                    styles={customSelectStyles}
                />

                {/* Assignee Filter - Only show for "received" tab */}
                {tab === "received" && (
                    <CustomSelect
                        options={assigneeOptions}
                        value={assigneeOptions.find((option) => option.value === (filters.assignedTo ?? "")) ?? null}
                        onChange={(selected) =>
                            setFilters((prev) => ({
                                ...prev,
                                assignedTo: selected?.value as string ?? "",
                            }))
                        }
                        placeholder="Select Assignee"
                        styles={customSelectStyles}
                    />
                )}

                {/* Requester Filter - Only show for "raised" tab */}
                {tab === "raised" && (
                    <CustomSelect
                        options={requesterOptions}
                        value={requesterOptions.find((option) => option.value === (filters.raisedBy ?? "")) ?? null}
                        onChange={(selected) =>
                            setFilters((prev) => ({
                                ...prev,
                                raisedBy: selected?.value as string ?? "",
                            }))
                        }
                        placeholder="Select Requester"
                        styles={customSelectStyles}
                    />
                )}

                {/* Date Range Filters - Placed in a 2-column grid container */}

                    {/* <DatePicker
                        selected={filters.startDate}
                        onChange={(date: any) => setFilters((prev) => ({ ...prev, startDate: date }))}
                        selectsStart
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        placeholderText="Start date"
                        className="w-full h-[42px] rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-none"
                        wrapperClassName="w-full"
                    />
                    <DatePicker
                        selected={filters.endDate}
                        onChange={(date: any) => setFilters((prev) => ({ ...prev, endDate: date }))}
                        selectsEnd
                        startDate={filters.startDate}
                        endDate={filters.endDate}
                        minDate={filters.startDate}
                        placeholderText="End date"
                        className="w-full h-[42px] rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-none"
                        wrapperClassName="w-full"
                    /> */}
            </div>
        </div>
    );
};