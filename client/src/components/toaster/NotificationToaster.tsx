import { toast } from "react-hot-toast";
import type { Toast } from "react-hot-toast";
import './toaster.css'
interface NotificationToastProps {
  t: Toast;
  title: string;
  body: string;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  t,
  title,
  body,
}) => {
  return (
    <div
      className={`relative max-w-[90%] w-[90%] bg-black text-white border shadow-xl rounded-lg pointer-events-auto flex flex-col ring-1 ring-white ring-opacity-50 p-6 min-h-[100px]
        ${t.visible ? "animate-enter" : "animate-leave"} mx-auto mt-4 overflow-hidden`}
      style={{
        boxShadow: "0 0 30px rgba(255, 255, 255, 0.8)",
      }}
    >
      {/* Shining effect */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="animate-shine absolute top-0 left-0 w-[50%] h-full bg-white opacity-20 transform -skew-x-12"></div>
      </div>

      {/* Close button */}
      <button
        onClick={() => toast.dismiss(t.id)}
        className="absolute top-2 right-2 text-white text-xl font-bold hover:text-indigo-400"
      >
        ✕
      </button>

      {/* Content */}
      <div className="flex flex-col flex-1 z-10">
        <strong className="text-white text-lg">{title}</strong>
        <span className="text-gray-300 text-sm mt-2">{body}</span>
      </div>
    </div>
  );
};
