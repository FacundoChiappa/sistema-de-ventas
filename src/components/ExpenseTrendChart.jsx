import React from 'react';

const ExpenseTrendChart = ({ transactions }) => {
  if (!transactions || !Array.isArray(transactions)) {
    return <div className="p-4 text-red-500">Error: No hay datos de transacciones</div>;
  }

  // Procesamos datos mensuales para gastos e ingresos
  const monthlyData = transactions.reduce((acc, transaction) => {
    const month = transaction.date.split('-')[1];
    const monthName = `Mes ${month}`;
    
    let existingMonth = acc.find(item => item.month === month);
    if (!existingMonth) {
      existingMonth = { month, name: monthName, expenses: 0, incomes: 0 };
      acc.push(existingMonth);
    }
    
    if (transaction.type === 'expense') {
      existingMonth.expenses += transaction.amount;
    } else {
      existingMonth.incomes += transaction.amount;
    }
    
    return acc;
  }, []);

  const maxValue = Math.max(
    ...monthlyData.map(item => Math.max(item.expenses, item.incomes)),
    0
  );

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      <h3 className="text-lg font-semibold mb-4">Tendencia Mensual</h3>
      <div className="h-64">
        <div className="flex items-end h-full space-x-2">
          {monthlyData.map((item, index) => {
            const expenseHeight = maxValue > 0 ? (item.expenses / maxValue) * 100 : 0;
            const incomeHeight = maxValue > 0 ? (item.incomes / maxValue) * 100 : 0;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="flex items-end w-full h-full space-x-1">
                  <div 
                    className="w-1/2 bg-red-400 rounded-t hover:bg-red-500 transition-colors"
                    style={{ height: `${expenseHeight}%` }}
                    title={`Gastos: $${item.expenses.toFixed(2)}`}
                  />
                  <div 
                    className="w-1/2 bg-green-400 rounded-t hover:bg-green-500 transition-colors"
                    style={{ height: `${incomeHeight}%` }}
                    title={`Ingresos: $${item.incomes.toFixed(2)}`}
                  />
                </div>
                <span className="text-xs mt-1 text-gray-600">{item.name}</span>
              </div>
            );
          })}
        </div>
        <div className="flex justify-center mt-4 space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
            <span className="text-xs">Gastos</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span className="text-xs">Ingresos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTrendChart;