import React from 'react';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#6366F1', '#EC4899', '#8B5CF6'];

const ExpenseChart = ({ transactions }) => {
  const expenses = transactions.filter(t => t.type === 'expense');
  const incomes = transactions.filter(t => t.type === 'income');

  const processData = (items) => {
    const rawData = items.reduce((acc, item) => {
      const existingCategory = acc.find(i => i.name === item.category);
      if (existingCategory) {
        existingCategory.value += item.amount;
      } else {
        acc.push({ name: item.category, value: item.amount });
      }
      return acc;
    }, []);

    const total = rawData.reduce((sum, item) => sum + item.value, 0);
    const threshold = total * 0.05;
    
    const mainCategories = rawData.filter(item => item.value >= threshold);
    const otherCategories = rawData.filter(item => item.value < threshold);
    
    return otherCategories.length > 0
      ? [...mainCategories, {
          name: 'Otros',
          value: otherCategories.reduce((sum, item) => sum + item.value, 0),
          subCategories: otherCategories
        }]
      : mainCategories;
  };

  const expenseData = processData(expenses);
  const incomeData = processData(incomes);

  const renderPieChart = (data, title) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    return (
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-48 h-48 relative mb-4 md:mb-0">
            <svg width="100%" height="100%" viewBox="0 0 100 100">
              {data.map((item, index) => {
                const percentage = (item.value / total) * 100;
                const endAngle = startAngle + (percentage * 3.6);
                
                const pathData = [
                  `M 50 50`,
                  `L ${50 + Math.cos((startAngle - 90) * Math.PI / 180) * 50} ${50 + Math.sin((startAngle - 90) * Math.PI / 180) * 50}`,
                  `A 50 50 0 ${percentage > 50 ? 1 : 0} 1 ${50 + Math.cos((endAngle - 90) * Math.PI / 180) * 50} ${50 + Math.sin((endAngle - 90) * Math.PI / 180) * 50}`,
                  'Z'
                ].join(' ');
                
                startAngle = endAngle;
                
                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={COLORS[index % COLORS.length]}
                    stroke="#fff"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>
          </div>
          <div className="ml-0 md:ml-6">
            {data.map((item, index) => (
              <div key={index} className="mb-2">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">
                    {item.name}: ${item.value} ({(item.value / total * 100).toFixed(1)}%)
                  </span>
                </div>
                {item.name === 'Otros' && item.subCategories && (
                  <div className="ml-4 mt-1">
                    {item.subCategories.map((subItem, subIndex) => (
                      <div key={subIndex} className="flex items-center text-xs text-gray-600">
                        <div className="w-2 h-2 rounded-full mr-1 bg-gray-400"/>
                        {subItem.name}: ${subItem.value}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow mb-6">
      {renderPieChart(expenseData, 'Distribución de Gastos')}
      {renderPieChart(incomeData, 'Distribución de Ingresos')}
    </div>
  );
};

export default ExpenseChart;