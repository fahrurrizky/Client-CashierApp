import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const SalesReportForm = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Function to handle form submission and fetch sales report data
  const handleSubmit = (e) => {
    e.preventDefault();
    // Fetch sales report data using startDate and endDate
    // You can dispatch an action to fetch data from the backend API here
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit">Generate Report</button>
      </form>
    </div>
  );
};

export default SalesReportForm;
