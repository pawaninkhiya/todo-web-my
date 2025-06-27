import { useParams } from "react-router-dom";
import { useGetTicketByIdQuery } from "@services/apis/tickets/hooks";
import { format } from "date-fns";
import {
    FiUser, FiFile, FiCalendar, FiAlertTriangle,
    FiCheckCircle, FiInfo, FiClock, FiTag,
    FiPackage, FiDownload, FiArrowLeft
} from "react-icons/fi";
import { type IconType } from "react-icons";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { Icons } from "@assets/icons";

const PriorityIcon = ({ priority }: { priority: string }) => {
    const iconMap: Record<string, { icon: IconType, color: string }> = {
        HIGH: { icon: FiAlertTriangle, color: "text-red-600" },
        MEDIUM: { icon: FiInfo, color: "text-yellow-600" },
        LOW: { icon: FiCheckCircle, color: "text-green-600" }
    };

    const { icon: Icon, color } = iconMap[priority] || { icon: FiInfo, color: "text-gray-600" };
    return <Icon className={`inline mr-1 ${color}`} size={16} />;
};

const TicketDetails = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useGetTicketByIdQuery(id || "");
    const ticket = data?.result;

    if (isLoading) return (
        <div className="flex justify-center items-center h-[400px]">
            <CgSpinner className="animate-spin text-3xl" />
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <Icons.Empty className="text-4xl md:text-4xl mb-4 opacity-60" />
            <h3 className="md:text-lg font-medium mb-2">Error loading ticket</h3>
            <p className="text-xs md:text-sm opacity-7">
                Please try again later
            </p>
        </div>
    );

    if (!ticket) return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <Icons.Empty className="text-5xl mb-4 opacity-60" />
            <h3 className="md:text-lg font-medium mb-2">Ticket not found</h3>
            <p className="text-xs md:text-sm opacity-75">
                The requested ticket doesn't exist
            </p>
        </div>
    );

    return (
        <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide bg-gradient-to-r from-teal-100 to-teal-300">
            <div className="mx-auto">
                {/* Back button */}
                <Link
                    to="/tickets"
                    className="flex text-base items-center text-gray-700 mb-6 transition-colors"
                >
                    <FiArrowLeft className="mr-2" />
                    Back to Tickets
                </Link>

                {/* Main card */}
                <div className="bg-white rounded  overflow-hidden">
                    {/* Header section */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                                <h1 className="text-sm font-medium text-gray-800 flex items-center">
                                    <FiTag className="mr-2 text-blue-600" />
                                    {ticket.ticketNumber}
                                </h1>
                                <h2 className="text-sm font-medium text-gray-700 mt-1">
                                    {ticket.partName || "No part specified"}
                                </h2>
                                <div className="flex items-center text-sm text-gray-500 mt-2">
                                    <FiCalendar className="mr-1.5" size={14} />
                                    {format(new Date(ticket.createdAt), "MMMM dd, yyyy - hh:mm a")}
                                </div>
                            </div>

                            <div className="flex md:flex-col gap-2">
                                <div className={`inline-flex items-center px-3 py-1.5 text-center rounded-full text-xs font-medium
                                ${ticket.priority === "HIGH" ? "bg-red-100 text-red-800" :
                                        ticket.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" :
                                            "bg-green-100 text-green-800"}`}>
                                    <PriorityIcon priority={ticket.priority} />
                                    {ticket.priority} PRIORITY
                                </div>

                                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <FiClock className="mr-1.5" size={14} />
                                    Status: <span className="capitalize ml-1">{ticket.status.toLowerCase()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="p-4 md:p-6 space-y-6">
                        <section>
                            <h2 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                                <FiFile className="mr-2 text-blue-600" />
                                Description
                            </h2>
                            <div className="bg-gray-50 p-4 rounded border border-gray-200 text-sm">
                                <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
                            </div>
                        </section>

                        {/* People Involved */}
                        <section className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                                    <FiUser className="mr-2" />
                                    Raised By
                                </h3>
                                <div className="flex items-center gap-3 text-sm">
                                    <div>
                                        <p className="font-medium text-gray-800">{ticket.raisedBy.name}</p>
                                        <p className="text-sm text-gray-500">
                                            {ticket.department && `Dept: ${ticket.department} | `}
                                            Role: {ticket.raisedByJobProfile?.jobProfileName || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded border border-gray-200">
                                <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center">
                                    <FiUser className="mr-2" />
                                    Assigned To
                                </h3>
                                <div className="flex items-center gap-3 text-sm">
                                    <div>
                                        <p className="font-medium text-gray-800">{ticket.assignedTo.name}</p>
                                        <p className="text-sm text-gray-500">
                                            Role: {ticket.assignedToJobProfile?.jobProfileName || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Part Details */}
                        {ticket.partCode && (
                            <section className="bg-gray-50 p-4 rounded border border-gray-200">
                                <h3 className=" font-medium text-gray-800 mb-3 flex items-center">
                                    <FiPackage className="mr-2 text-blue-600 text-sm" />
                                    Part Details
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 text-sm">
                                    <div>
                                        <p className="text-sm text-gray-500">Code</p>
                                        <p className="font-medium">{ticket.partCode || "N/A"}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Name</p>
                                        <p className="font-medium">{ticket.partName || "N/A"}</p>
                                    </div>
                                    {ticket.quantity && (
                                        <div>
                                            <p className="text-sm text-gray-500">Quantity</p>
                                            <p className="font-medium">{ticket.quantity}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Attachments */}
                        {ticket.files?.length > 0 && (
                            <section>
                                <h3 className="text-sm font-medium text-gray-800 mb-3 flex items-center">
                                    <FiDownload className="mr-2 text-blue-600" />
                                    Attachments
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {ticket.files.map((file: string, index: number) => (
                                        <div key={index} className="border border-gray-200 rounded overflow-hidden  transition-shadow">
                                            <div className="h-40 bg-gray-100 flex items-center justify-center">
                                                <img
                                                    src={file}
                                                    alt={`Attachment ${index + 1}`}
                                                    className="object-contain max-h-full max-w-full"
                                                />
                                            </div>
                                            <div className="p-3 border-t border-gray-100 flex justify-between items-center">
                                                <span className="text-sm text-gray-600 truncate">
                                                    Attachment_{index + 1}.{file.split('.').pop()}
                                                </span>
                                                <a
                                                    href={file}
                                                    download
                                                    className="text-blue-600 hover:text-blue-800"
                                                    title="Download"
                                                >
                                                    <FiDownload size={16} />
                                                </a>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketDetails;