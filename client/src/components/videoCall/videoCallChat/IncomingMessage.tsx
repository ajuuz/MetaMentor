
type Props={
    userName:string,
    message:string
    createdAt:string
}
const IncomingMessage = ({userName,message,createdAt}:Props) => {
  return (
    <div className="flex items-start gap-2">
      <div className="bg-gray-200 text-gray-900 px-3 py-2 rounded-2xl rounded-bl-none max-w-xs">
        <div className="text-sm font-semibold">{userName}</div>
        <p className="text-sm">{message}</p>
        <span className="text-xs text-gray-500 float-right">
          {createdAt}
        </span>
      </div>
    </div>
  );
};

export default IncomingMessage;
