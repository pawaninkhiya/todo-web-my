import { useParams } from "react-router-dom";
import { useGetTicketByIdQuery } from "@services/apis/tickets/hooks";
import { format } from "date-fns";
import { Icons } from "@assets/icons";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const TicketDetails = () => {
    const { id } = useParams();
    const { data, isLoading, error } = useGetTicketByIdQuery(id || "");
    const ticket = data?.result;

    if (isLoading) return (
        <div className="flex justify-center items-center h-[400px]">
            <Icons.Spinner className="animate-spin text-3xl" />
        </div>
    );

    if (error) return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <Icons.Error className="text-5xl mb-4 opacity-60" />
            <h3 className="text-xl font-medium mb-2">Error loading ticket</h3>
            <p className="text-sm opacity-75">
                Please try again later
            </p>
        </div>
    );

    if (!ticket) return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
            <Icons.Empty className="text-5xl mb-4 opacity-60" />
            <h3 className="text-xl font-medium mb-2">Ticket not found</h3>
            <p className="text-sm opacity-75">
                The requested ticket doesn't exist
            </p>
        </div>
    );

    const PriorityIcon = ({ priority }: { priority: string }) => {
        const iconMap: Record<string, { icon: keyof typeof Icons, color: string }> = {
            HIGH: { icon: "Error", color: "text-red-600" },
            MEDIUM: { icon: "Warning", color: "text-yellow-600" },
            LOW: { icon: "Success", color: "text-green-600" }
        };

        const { icon, color } = iconMap[priority] || { icon: "Info", color: "text-gray-600" };
        const IconComponent = Icons[icon];
        return <IconComponent className={`inline mr-1 ${color}`} size={16} />;
    };

    return (
        <div className="w-full h-full overflow-y-auto p-4 sm:p-6 lg:p-8 scrollbar-hide bg-gradient-to-r from-cyan-100 to-cyan-300">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className=" mx-auto"
            >
                {/* Back button */}
                <Link
                    to="/tickets"
                    className="flex items-center text-gray-700 mb-6 hover:text-gray-900 transition-colors"
                >
                    <Icons.ArrowLeft className="mr-2" />
                    <span className="text-sm font-medium">Back to Tickets</span>
                </Link>

                {/* Main card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Header section */}
                    <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 border-b border-gray-200">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                                <div className="flex items-center mb-2">
                                    <Icons.Tag className="mr-2 text-cyan-600" />
                                    <h1 className="text-xl font-semibold text-gray-800">
                                        {ticket.ticketNumber}
                                    </h1>
                                </div>
                                <h2 className="text-md font-medium text-gray-700">
                                    {ticket.partName || "No part specified"}
                                </h2>
                                <div className="flex items-center text-sm text-gray-500 mt-2">
                                    <Icons.Calendar className="mr-1.5" size={14} />
                                    {format(new Date(ticket.createdAt), "MMMM dd, yyyy - hh:mm a")}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                    ${ticket.priority === "HIGH" ? "bg-red-100 text-red-800" :
                                        ticket.priority === "MEDIUM" ? "bg-yellow-100 text-yellow-800" :
                                            "bg-green-100 text-green-800"}`}>
                                    <PriorityIcon priority={ticket.priority} />
                                    {ticket.priority} PRIORITY
                                </div>

                                <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                                    ${ticket.status === "OPEN" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"}`}>
                                    <Icons.Clock className="mr-1.5" size={14} />
                                    Status: <span className="capitalize ml-1">{ticket.status.toLowerCase()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content section */}
                    <div className="p-6 space-y-6">
                        <section>
                            <h2 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                <Icons.File className="mr-2 text-cyan-600" />
                                Description
                            </h2>
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-sm">
                                <p className="text-gray-700 whitespace-pre-line">{ticket.description}</p>
                            </div>
                        </section>

                        {/* People Involved */}
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                    <Icons.User className="mr-2" />
                                    Raised By
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-800">
                                            <Icons.User size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm">{ticket.raisedBy.name}</p>
                                        <p className="text-xs text-gray-500">
                                            {ticket.department && `Dept: ${ticket.department} | `}
                                            Role: {ticket.raisedByJobProfile?.jobProfileName || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                    <Icons.User className="mr-2" />
                                    Assigned To
                                </h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-800">
                                            <Icons.User size={18} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800 text-sm">{ticket.assignedTo.name}</p>
                                        <p className="text-xs text-gray-500">
                                            Role: {ticket.assignedToJobProfile?.jobProfileName || "N/A"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Part Details */}
                        {(ticket.partCode || ticket.partName) && (
                            <section className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                    <Icons.Package className="mr-2 text-cyan-600" />
                                    Part Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {ticket.partCode && (
                                        <div>
                                            <p className="text-xs text-gray-500">Part Code</p>
                                            <p className="text-sm font-medium text-gray-800 text-sm">{ticket.partCode}</p>
                                        </div>
                                    )}
                                    {ticket.partName && (
                                        <div>
                                            <p className="text-xs text-gray-500">Part Name</p>
                                            <p className="text-sm font-medium text-gray-800">{ticket.partName}</p>
                                        </div>
                                    )}
                                    {ticket.quantity && (
                                        <div>
                                            <p className="text-xs text-gray-500">Quantity</p>
                                            <p className="text-sm font-medium text-gray-800">{ticket.quantity}</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Attachments */}
                        {ticket.files?.length > 0 && (
                            <section>
                                <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                                    <Icons.Download className="mr-2 text-cyan-600" />
                                    Attachments
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {ticket.files.map((file: string, index: number) => (
                                        <motion.div 
                                            key={index}
                                            whileHover={{ y: -2 }}
                                            className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow"
                                        >
                                            <div className="h-40 bg-gray-100 flex items-center justify-center p-2">
                                                {file.match(/\.(jpeg|jpg|gif|png)$/) ? (
                                                    <img
                                                        src={file}
                                                        alt={`Attachment ${index + 1}`}
                                                        className="object-contain max-h-full max-w-full"
                                                    />
                                                ) : (
                                                    <div className="text-center p-4">
                                                        <Icons.File className="mx-auto text-3xl text-gray-400 mb-2" />
                                                        <span className="text-xs text-gray-500">Document File</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3 border-t border-gray-100 flex justify-between items-center">
                                                <span className="text-xs text-gray-600 truncate">
                                                    Attachment_{index + 1}
                                                </span>
                                                <a
                                                    href={file}
                                                    download
                                                    className="text-cyan-600 hover:text-cyan-800 transition-colors"
                                                    title="Download"
                                                >
                                                    <Icons.Download size={16} />
                                                </a>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TicketDetails;