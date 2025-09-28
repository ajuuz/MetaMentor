type Props = {
  userName: string;
  message: string;
  createdAt: string;
};
const OutgoingMessage = ({ userName, message, createdAt }: Props) => {
  return (
    <div className="flex items-start gap-2 justify-end">
      <div className="bg-blue-600 text-white px-3 py-2 rounded-2xl rounded-br-none max-w-xs">
        <div className="text-sm font-semibold">{userName}</div>
        <p className="text-sm">{message}</p>
        <span className="text-xs text-blue-200 float-right">
          {createdAt}
        </span>
      </div>
    </div>
  );
};

export default OutgoingMessage;
