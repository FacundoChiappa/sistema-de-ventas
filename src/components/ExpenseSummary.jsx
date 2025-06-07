import React from 'react';

const ExpenseSummary = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalIncomes = incomes.reduce((sum, income) => sum + income.amount, 0);
  const balance = totalIncomes - totalExpenses;

  return (
    <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Resumen Financiero</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Ingresos</p>
          <p className="text-2xl font-bold text-green-600">${totalIncomes.toFixed(2)}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Gastos</p>
          <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Balance</p>
          <p className={`text-2xl font-bold ${
            balance >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            ${balance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;