import React from 'react';

const ExpenseList = ({ transactions, onDeleteTransaction }) => {
  if (!transactions || !Array.isArray(transactions)) {
    return (
      <div className="text-center py-8 text-gray-500">
        No hay datos de transacciones disponibles
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tus Transacciones</h2>
      <div className="space-y-2">
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay transacciones registradas aún
          </div>
        ) : (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className={`p-3 rounded-lg flex justify-between items-center transition-colors ${
                transaction.type === 'expense' 
                  ? 'bg-red-50 hover:bg-red-100' 
                  : 'bg-green-50 hover:bg-green-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  transaction.type === 'expense' ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
                <div>
                  <h3 className="font-medium">{transaction.category}</h3>
                  <p className="text-sm text-gray-600">{transaction.description}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`font-bold ${
                  transaction.type === 'expense' ? 'text-red-600' : 'text-green-600'
                }`}>
                  {transaction.type === 'expense' ? '-' : '+'}${transaction.amount}
                </span>
                <span className="text-xs text-gray-500">{transaction.date}</span>
                <button
                  onClick={() => onDeleteTransaction(transaction.id)}
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;

// DONE