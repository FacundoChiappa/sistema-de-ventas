import React, { useState } from 'react';
import { expenseCategories, incomeCategories } from '../mock/categories';

const TransactionForm = ({ onAddTransaction }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(expenseCategories[0]);
  const [description, setDescription] = useState('');
  const [type, setType] = useState('expense');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0],
      type
    };
    onAddTransaction(newTransaction);
    setAmount('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow">
      <div className="flex space-x-2 mb-4">
        <button
          type="button"
          onClick={() => setType('expense')}
          className={`flex-1 py-2 rounded-md ${type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
        >
          Gasto
        </button>
        <button
          type="button"
          onClick={() => setType('income')}
          className={`flex-1 py-2 rounded-md ${type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Ingreso
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Cantidad
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Categoría
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {(type === 'expense' ? expenseCategories : incomeCategories).map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className={`w-full ${type === 'expense' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'} text-white py-2 px-4 rounded-md transition-colors`}
      >
        {type === 'expense' ? 'Agregar Gasto' : 'Agregar Ingreso'}
      </button>
    </form>
  );
};

export default TransactionForm;