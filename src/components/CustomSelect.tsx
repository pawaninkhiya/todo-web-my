import Select, { type GroupBase, type Props as SelectProps } from "react-select";

export type OptionType = {
    label: string;
    value: string | number;
};

interface CustomSelectProps extends Partial<SelectProps<OptionType, boolean, GroupBase<OptionType>>> {
    isMulti?: boolean;
    options: OptionType[];
    value: OptionType | OptionType[] | null;
    onChange: (value: any) => void;
    placeholder?: string;
    isLoading?: boolean;
    noOptionsMessage?: () => string;
    className?: string;
    classNamePrefix?: string;
    styles?: any;
}

const CustomSelect = ({
    isMulti = false,
    options,
    value,
    onChange,
    placeholder = "Select...",
    isLoading = false,
    noOptionsMessage = () => "No options found",
    className = "react-select-container",
    classNamePrefix = "react-select",
    styles,
    ...rest
}: CustomSelectProps) => {
    return (
        <Select
            isMulti={isMulti}
            options={options}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            isLoading={isLoading}
            noOptionsMessage={noOptionsMessage}
            className={className}
            classNamePrefix={classNamePrefix}
            styles={styles}
            {...rest}
        />
    );
};

export default CustomSelect;
