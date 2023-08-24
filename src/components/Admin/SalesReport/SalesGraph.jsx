import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const SalesGraph = () => {
  const [salesData, setSalesData] = useState([]);

  const transactions = useSelector((state) => state.cashier.transactions);

  // Function to calculate daily sales data from transactions
  const calculateDailySales = () => {
    // Assuming transactions have a "date" property with the date of the transaction
    // and a "totalPrice" property with the total price of the transaction
    const dailySales = transactions.reduce((acc, transaction) => {
      const date = transaction.date; // Change this to the actual property name

      if (acc[date]) {
        acc[date] += transaction.totalPrice; // Change this to the actual property name
      } else {
        acc[date] = transaction.totalPrice; // Change this to the actual property name
      }

      return acc;
    }, {});

    return dailySales;
  };

  useEffect(() => {
    const dailySalesData = calculateDailySales();
    setSalesData(dailySalesData);
  }, [transactions]);

  // Render the graph using the salesData state
  return (
    <div>
      {/* Implement your graph here */}
      {/* You can use libraries like Chart.js or D3.js to create the graph */}
    </div>
  );
};

export default SalesGraph;
