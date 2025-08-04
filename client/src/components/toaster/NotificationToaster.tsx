import { toast } from 'react-hot-toast';
import type { Toast } from 'react-hot-toast';

interface NotificationToastProps {
  t: Toast;
  title: string;
  body: string;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ t, title, body }) => {
  return (
    <div
      className={`max-w-sm w-full bg-white border shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5  p-4
        ${t.visible ? 'animate-enter' : 'animate-leave'}`}
    >
      <div className="flex flex-col">
        <strong className="text-gray-800 text-sm">{title}</strong>
        <span className="text-gray-600 text-sm mt-1">{body}</span>
      </div>
      <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Close
      </button>
    </div>
    </div>
  );
};
