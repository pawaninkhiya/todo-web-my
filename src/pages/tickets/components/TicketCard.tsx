import { motion } from "framer-motion";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import type { Ticket } from "@interfaces/ticketsTypes";

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/tickets/${ticket._id}`);
    };

    return (
        <motion.div
            key={ticket._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white rounded shadow transition-all cursor-pointer overflow-hidden z-0 "
            onClick={handleClick}
        >
            <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ticket.priority === "HIGH"
                            ? "bg-red-50 text-red-700"
                            : ticket.priority === "MEDIUM"
                                ? "bg-yellow-50 text-yellow-700"
                                : "bg-green-50 text-green-700"
                        }`}>
                        {ticket.priority}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                        {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
                    </span>
                </div>

                <h3 className="font-m text-sm text-gray-600 mb-2 line-clamp-2 leading-tight">
                    {ticket.ticketNumber} - {ticket.partName || "No part specified"}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-xs">
                    {ticket.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center">
                        <img
                            src={ticket.raisedBy.profilePicture}
                            alt={ticket.raisedBy.name}
                            className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <span className="ml-2 text-xs font-medium text-gray-700">
                            {ticket.raisedBy.name.split('/')[0].trim()}
                        </span>
                    </div>

                    {ticket.files?.length > 0 && (
                        <span className="text-xs text-gray-500 flex items-center bg-gray-50 px-2 py-1 rounded-full">
                            <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            {ticket.files.length}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TicketCard;
// import { motion } from "framer-motion";
// import { format } from "date-fns";
// import { useNavigate } from "react-router-dom";
// import type { Ticket } from "@interfaces/ticketsTypes";

// interface TicketCardProps {
//     ticket: Ticket;
// }

// const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
//     const navigate = useNavigate();
    
//     const handleClick = () => {
//         navigate(`/tickets/${ticket._id}`);
//     };

//     return (
//         <motion.div
//             key={ticket._id}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             whileHover={{ scale: 1.01 }}
//             whileTap={{ scale: 0.98 }}
//             transition={{ duration: 0.2, ease: "easeOut" }}
//             className="bg-white rounded shadow transition-all cursor-pointer overflow-hidden z-0 "
//             onClick={handleClick}
//         >
//             <div className="p-4">
//                 <div className="flex justify-between items-start mb-3">
//                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ticket.priority === "HIGH"
//                             ? "bg-red-50 text-red-700"
//                             : ticket.priority === "MEDIUM"
//                                 ? "bg-yellow-50 text-yellow-700"
//                                 : "bg-green-50 text-green-700"
//                         }`}>
//                         {ticket.priority}
//                     </span>
//                     <span className="text-xs text-gray-500 font-medium">
//                         {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
//                     </span>
//                 </div>

//                 <h3 className="font-m text-sm text-gray-600 mb-2 line-clamp-2 leading-tight">
//                     {ticket.ticketNumber} - {ticket.partName || "No part specified"}
//                 </h3>

//                 <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed text-xs">
//                     {ticket.description}
//                 </p>

//                 <div className="flex items-center justify-between pt-3 border-t border-gray-100">
//                     <div className="flex items-center">
//                         <img
//                             src={ticket.raisedBy.profilePicture}
//                             alt={ticket.raisedBy.name}
//                             className="h-8 w-8 rounded-full object-cover border-2 border-white shadow-sm"
//                         />
//                         <span className="ml-2 text-xs font-medium text-gray-700">
//                             {ticket.raisedBy.name.split('/')[0].trim()}
//                         </span>
//                     </div>

//                     {ticket.files?.length > 0 && (
//                         <span className="text-xs text-gray-500 flex items-center bg-gray-50 px-2 py-1 rounded-full">
//                             <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
//                             </svg>
//                             {ticket.files.length}
//                         </span>
//                     )}
//                 </div>
//             </div>
//         </motion.div>
//     );
// };

// export default TicketCard;
