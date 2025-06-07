export const prepareChartData = (expenses) => {
  const categoryData = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.name === expense.category);
    if (existingCategory) {
      existingCategory.value += expense.amount;
    } else {
      acc.push({ name: expense.category, value: expense.amount });
    }
    return acc;
  }, []);

  const monthlyData = expenses.reduce((acc, expense) => {
    const month = expense.date.split('-')[1];
    const existingMonth = acc.find(item => item.month === month);
    if (existingMonth) {
      existingMonth.total += expense.amount;
    } else {
      acc.push({ month, name: `Mes ${month}`, total: expense.amount });
    }
    return acc;
  }, []);

  return { categoryData, monthlyData };
};

// DONE