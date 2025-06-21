import { memo } from "react";

interface PanelActionButtonProps {
    icon: React.ReactNode;
    text: string;
    onClick?: () => void;
}

export const PanelActionButton = memo(({ icon, text, onClick }: PanelActionButtonProps) => (
    <button 
        className="w-full shadow bg-white rounded p-4 hover:bg-gray-50 transition-colors text-left"
        onClick={onClick}
    >
        <div className="flex items-center justify-start gap-2 text-[13px] 2xl:text-sm text-gray-700">
            {icon}
            <span>{text}</span>
        </div>
    </button>
));