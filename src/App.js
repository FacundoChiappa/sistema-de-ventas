import { useEffect, useState } from 'react';
import ExpenseChart from './components/ExpenseChart';
import TransactionForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseTrendChart from './components/ExpenseTrendChart';
import { transactions as initialTransactions } from './mock/expenses';

const App = () => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });

  const [activeTab, setActiveTab] = useState('list');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Sistema de Gestion de Gastos
          </h1>
          <p className="text-gray-600">Control total de tus finanzas</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-1">
            <TransactionForm onAddTransaction={handleAddTransaction} />
          </div>
          <div className="md:col-span-2">
            <ExpenseSummary transactions={transactions} />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('list')}
            >
              Lista
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'charts' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
              onClick={() => setActiveTab('charts')}
            >
              Gráficos
            </button>
          </div>

          <div className="p-4">
            {activeTab === 'list' ? (
              <ExpenseList 
                transactions={transactions} 
                onDeleteTransaction={handleDeleteTransaction} 
              />
            ) : (
              <div className="space-y-6">
                <ExpenseChart transactions={transactions} />
                <ExpenseTrendChart transactions={transactions} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// DONE