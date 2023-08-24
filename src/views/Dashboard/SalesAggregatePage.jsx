import React, { useEffect, useState } from 'react';
import { Box, Heading } from '@chakra-ui/react';
import SalesAggregateGraph from './SalesAggregateGraph';

const SalesAggregatePage = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend API
    const startDate = '2023-08-02';
    const endDate = '2023-08-06';
    const apiUrl = `http://localhost:8000/report/sales?startDate=${startDate}&endDate=${endDate}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setSalesData(data.data);
      })
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  return (
    <Box p={4}>
      <Heading as="h1" size="lg" mb={4}>
        Sales Aggregate Per Day
      </Heading>
      {salesData.length > 0 ? (
        <SalesAggregateGraph data={salesData} />
      ) : (
        <Box>No data available</Box>
      )}
    </Box>
  );
};

export default SalesAggregatePage;
