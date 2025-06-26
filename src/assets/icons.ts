// Feather Icons (fi)
import { 
  FiTag, FiCalendar, FiClock, FiFile, FiPackage,
  FiDownload, FiArrowLeft, FiAlertTriangle,
  FiCheckCircle, FiInfo, FiUser, FiHome,
  FiChevronLeft, FiChevronRight, FiUsers,
  FiPlus, FiX, FiEdit
} from "react-icons/fi";

// Tabler Icons (tb)
import { TbMoodEmpty, TbSun, TbStar } from "react-icons/tb";

// Material Design (md)
import { 
  MdOutlineStarBorder, MdOutlineDateRange,
  MdOutlineAssignmentInd 
} from "react-icons/md";

// Remix Icons (ri)
import { RiLayoutHorizontalLine } from "react-icons/ri";

// Grommet Icons (gr)
import { GrFormAttachment } from "react-icons/gr";

// Ant Design Icons (ai)
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";

// Ionicons (io5)
import { IoCheckmarkDoneSharp, IoTicketOutline } from "react-icons/io5";

// Bootstrap Icons (bs)
import { BsMenuButtonWideFill } from "react-icons/bs";

// Spinner (cg)
import { CgSpinner } from "react-icons/cg";

export const Icons = {
  // TicketDetails Component Icons
  Tag: FiTag,
  Calendar: FiCalendar,
  Clock: FiClock,
  File: FiFile,
  Package: FiPackage,
  Download: FiDownload,
  ArrowLeft: FiArrowLeft,
  Error: FiAlertTriangle,
  Warning: FiAlertTriangle,
  Success: FiCheckCircle,
  Info: FiInfo,
  User: FiUser,
  Spinner: CgSpinner,
  Empty: TbMoodEmpty,

  // Common UI Icons
  Home: FiHome,
  Users: FiUsers,
  ChevronLeft: FiChevronLeft,
  ChevronRight: FiChevronRight,
  Plus: FiPlus,
  Star: TbStar,
  Check: IoCheckmarkDoneSharp,
  Cross: FiX,
  Date: MdOutlineDateRange,
  Attachment: GrFormAttachment,
  Delete: AiOutlineDelete,
  Assign: MdOutlineAssignmentInd,
  Done: IoCheckmarkDoneSharp,
  Edit: FiEdit,
  Ticket: IoTicketOutline,
  MenuButtonWide: BsMenuButtonWideFill,

  // Additional Useful Icons
  Today: TbSun,
  Important: MdOutlineStarBorder,
  AllTasks: RiLayoutHorizontalLine,
  UserPlus: AiOutlinePlus
};