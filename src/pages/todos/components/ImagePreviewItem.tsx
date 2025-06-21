// import { Icons } from "@assets/icons";
import { memo } from "react";

interface ImagePreviewItemProps {
    image: string;
    onRemove?: () => void;
}

export const ImagePreviewItem = memo(({ image }: ImagePreviewItemProps) => {
    const fileName = image.split('/').pop() || 'file';
    const fileExtension = fileName.split('.').pop() || '';
    const baseName = fileName.replace(/\.[^/.]+$/, "");

    return (
        <div className="flex items-center justify-between w-full p-1.5 hover:bg-gray-50 rounded transition-colors group border border-gray-200">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 rounded border border-gray-200 overflow-hidden">
                        <img
                            src={image}
                            alt={fileName}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = "";
                                target.className = "w-full h-full bg-gray-100 flex items-center justify-center";
                                target.innerHTML = `
                                    <div class="text-center p-1">
                                        <Icons.File size={16} className="text-gray-400 mx-auto" />
                                        <span class="text-xs text-gray-400 block mt-1">${fileExtension}</span>
                                    </div>
                                `;
                            }}
                        />
                    </div>
                    {/* {onRemove && (
                        <button
                            onClick={onRemove}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-0.5 shadow-sm border border-gray-200 hover:bg-red-50"
                            aria-label={`Remove ${fileName}`}
                        >
                            <Icons.Cross size={12} className="text-gray-500 hover:text-red-500" />
                        </button>
                    )} */}
                </div>

                <div className="min-w-0">
                    <div className="flex items-baseline gap-1.5">
                        <p className="text-[12px] font-medium text-gray-800 truncate max-w-[120px]">
                            {baseName}
                        </p>
                        {fileExtension && (
                            <span className="text-[10px] text-gray-400">
                                .{fileExtension}
                            </span>
                        )}
                    </div>
                    <p className="text-[10px] text-gray-500 mt-0.5">Image</p>
                </div>
            </div>

            <button
                className="text-xs text-blue-500 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50"
                onClick={() => window.open(image, '_blank')}
                aria-label={`View ${fileName}`}
            >
                View
            </button>
        </div>
    );
});