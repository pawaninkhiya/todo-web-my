// UserSearchFilters.tsx
import { Icons } from '@assets/icons';
import CustomSelect, { type OptionType } from '@components/CustomSelect';
import { customSelectStyles } from '@utils/customSelectStyles';

interface UserSearchFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    jobProfileOptions: OptionType[];
    selectedJobProfile: string | null;
    onJobProfileChange: (option: OptionType | null) => void;
    isPending: boolean;
}

export const UserSearchFilters = ({
    searchQuery,
    onSearchChange,
    jobProfileOptions,
    selectedJobProfile,
    onJobProfileChange,
    isPending,
}: UserSearchFiltersProps) => (
    <div className="flex  md:flex-row flex-col md:items-center md:gap-2">
        <div className="relative mb-2 md:mb-4 flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Icons.Search size={16} className="text-gray-400" />
            </div>
            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full h-[42px] rounded-md border border-gray-300 bg-[#F9FAFB] px-3 text-[12px] text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 pl-10"
            />
        </div>

        <div className="mb-4 flex-1">
            <CustomSelect
                placeholder="Filter by Job Profile"
                options={jobProfileOptions}
                value={jobProfileOptions.find((opt) => opt.value === selectedJobProfile) || null}
                onChange={onJobProfileChange}
                isLoading={isPending}
                styles={customSelectStyles}
                isClearable
            />
        </div>
    </div>
);