// UserSearchFilters.tsx
import { Icons } from '@assets/icons';
import CustomSelect, { type OptionType } from '@components/CustomSelect';
import { customSelectStyles } from '@utils/customSelectStyles';

interface UserSearchFiltersProps {
    searchQuery: string;
    onSearchChange: (value: string) => void;
    jobProfileOptions: OptionType[];
    selectedJobProfiles: string[];
    onJobProfileChange: (options: OptionType[] | null) => void;
    isPending: boolean;
}

export const UserSearchFilters = ({searchQuery,onSearchChange,jobProfileOptions,selectedJobProfiles,onJobProfileChange,isPending,
}: UserSearchFiltersProps) => {
    const handleSelectChange = (newValue: unknown) => {
        if (Array.isArray(newValue)) {
            onJobProfileChange(newValue as OptionType[]);
        } else if (newValue === null) {
            onJobProfileChange(null);
        } else {
            onJobProfileChange([newValue as OptionType]);
        }
    };

    return (
        <div className="flex  flex-col md:flex-row md:items-center  md:gap-2 mb-4">
            <div className="relative  flex-1">
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

            <div className=" flex-1">
                <CustomSelect
                    placeholder="Filter by Job Profile"
                    options={jobProfileOptions}
                    value={jobProfileOptions.filter((opt) => 
                        selectedJobProfiles.includes(opt.value as string)
                    )}
                    onChange={handleSelectChange}
                    isLoading={isPending}
                    styles={customSelectStyles}
                    isClearable
                    isMulti={true}
                    closeMenuOnSelect={false}
                />
            </div>
        </div>
    );
};