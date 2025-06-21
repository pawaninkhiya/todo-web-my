import React from "react";

interface StatusTabsProps {
  status: "pending" | "inProgress" | "completed" |string
  onChange: (status: "pending" | "inProgress" | "completed") => void;
}

const StatusTabs: React.FC<StatusTabsProps> = ({ status, onChange }) => {
  const statusList = ["pending", "inProgress", "completed"] as const;

  return (
    <div className="w-full shadow bg-white rounded p-3 flex gap-3 justify-center">
      {statusList.map((s) => (
        <button
          key={s}
          onClick={() => onChange(s)}
          className={`px-3 py-1 rounded bg-white text-xs transition-colors shadow ${
            status === s ? "font-bold text-gray-800" : "text-gray-600"
          }`}
        >
          {s === "pending" && "Pending"}
          {s === "inProgress" && "In Progress"}
          {s === "completed" && "Completed"}
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;
