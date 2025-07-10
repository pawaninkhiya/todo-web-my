import type { Dispatch, SetStateAction } from "react";
import type { GetAllTicketsParams } from "@interfaces/ticketsTypes";
import CustomSelect from "@components/CustomSelect";
import { customSelectStyles } from "@utils/customSelectStyles";

interface AllFiltersProps {
    filters: GetAllTicketsParams;
    setFilters: Dispatch<SetStateAction<GetAllTicketsParams>>;
}

export const AllFilters = ({ filters, setFilters }: AllFiltersProps) => {
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
    return (
        <div className="bg-white rounded shadow p-4 mb-4 md:mb-6">
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
            </div>
        </div>
    );
};
