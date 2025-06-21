import type { StylesConfig } from 'react-select';

export const customSelectStyles: StylesConfig<any, true> = {
    container: (provided) => ({
        ...provided,
        marginTop: '0.5rem',
    }),
    control: (provided, state) => ({
        ...provided,
        border: '1px solid #e5e7eb',
        borderRadius: '0.375rem',
        minHeight: '42px',
        boxShadow: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#f9fafb',
        '&:hover': {
            borderColor: '#d1d5db',
            backgroundColor: '#f3f4f6',
        },
        ...(state.isFocused && {
            borderColor: '#9ca3af',
            boxShadow: '0 0 0 1px #9ca3af',
            backgroundColor: '#fff',
        }),
    }),
    valueContainer: (provided) => ({
        ...provided,
        padding: '0.25rem 0.75rem',
    }),
    multiValue: (provided) => ({
        ...provided,
        backgroundColor: '#e5e7eb',
        borderRadius: '0.25rem',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: '#374151',
        fontSize: '12px',
        padding: '0.25rem 0.375rem',
    }),
    multiValueRemove: (provided) => ({
        ...provided,
        color: '#6b7280',
        padding: '0 0.375rem',
        borderRadius: '0 0.25rem 0.25rem 0',
        '&:hover': {
            backgroundColor: '#d1d5db',
            color: '#111827',
        },
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '0.375rem',
        boxShadow:
            '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        border: '1px solid #e5e7eb',
        marginTop: '0.375rem',
        backgroundColor: '#fff',
        zIndex: 9999,
        position: 'absolute',
    }),
    menuPortal: (provided) => ({
        ...provided,
        zIndex: 9999,
    }),
    menuList: (provided) => ({
        ...provided,
        maxHeight: '150px',
        overflowY: 'auto',
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: '12px',
        padding: '0.5rem 1rem',
        ...(state.isFocused && {
            backgroundColor: '#f3f4f6',
            color: '#111827',
        }),
        ...(state.isSelected && {
            backgroundColor: '#e5e7eb',
            color: '#111827',
        }),
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: '#e5e7eb',
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: '#6b7280',
        padding: '0.5rem',
        '&:hover': {
            color: '#4b5563',
        },
    }),
    placeholder: (provided) => ({
        ...provided,
        fontSize: '12px',
        color: '#9ca3af',
    }),
};
