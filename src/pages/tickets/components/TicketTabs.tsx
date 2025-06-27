export const FilterTicketTabs = ({ activeTab, onTabChange }:any) => {
    const tabs = [
        { id: 'raised', label: 'Raised', icon: '📤' },
        { id: 'received', label: 'Received', icon: '📥' },
        { id: 'tagged', label: 'Tagged', icon: '🏷️' },
    ];

    return (
        <div className="flex overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex space-x-2">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`flex items-center px-4 py-2 text-xs md:text-sm cursor-pointer rounded border transition-colors duration-200 whitespace-nowrap ${
                            activeTab === tab.id
                                ? 'border-blue-500 bg-blue-50 text-blue-600 font-medium'
                                : 'border-gray-200 bg-gray-50 text-gray-60 hover:border-gray-300'
                        }`}
                    >
                        <span className="mr-2" aria-hidden="true">{tab.icon}</span>
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

