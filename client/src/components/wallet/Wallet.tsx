import type { WalletAndTransactionRes } from "@/types/response/wallet";

const Wallet = ({ balance, totalPages, transactions }: WalletAndTransactionRes) => {

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg">
      
      {/* Balance */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-semibold">Wallet</h1>
        <div className="text-2xl font-semibold text-green-600">
          Balance: ${balance.toFixed(2)}
        </div>
      </div>

     

      {/* Transaction History */}
      <h2 className="text-2xl font-semibold mb-6">Transaction History</h2>

      {transactions.length === 0 ? (
        <div className="text-gray-500 text-center py-10">
          No transactions found.
        </div>
      ) : (
        <div className="space-y-6">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className="flex flex-col p-4 border rounded-lg shadow-sm hover:bg-gray-50"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium text-lg">Description :{tx.description}</p>
                <div
                  className={`font-semibold text-xl ${
                    tx.type === "credit" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {tx.type === "credit" ? "+" : "-"}${tx.amount.toFixed(2)}
                </div>
              </div>

              <div className="flex flex-wrap justify-between text-sm text-gray-500 gap-2">
                <p>Review ID: <span className="italic">{tx.reviewId}</span></p>
                <p>Domain: <span className="italic">{tx.domainName}</span></p>
                <p>Level: <span className="italic">{tx.levelName}</span></p>
                <p>Date: <span className="italic">{formatDate(tx.createdAt)}</span></p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination Info */}
      <div className="mt-6 text-center text-gray-600">
        Total Pages: {totalPages}
      </div>
    </div>
  );
};

export default Wallet;
