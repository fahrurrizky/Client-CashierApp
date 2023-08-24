import React from 'react';
import { Box } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';
import dayjs from 'dayjs';

const SalesAggregateGraph = ({ data }) => {
  const chartData = {
    labels: data.map(item => dayjs(item.transactionDate).format('YYYY-MM-DD')), // Format date labels as 'YYYY-MM-DD'
    datasets: [
      {
        label: 'Total Sales',
        data: data.map(item => item.totalSales),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM DD', // Format for displaying date labels (e.g., Aug 02)
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: value => `$${value}`,
        },
      },
    },
  };

  return (
    <Box w="100%" maxW="600px" mx="auto" mt={6}>
      <Bar data={chartData} options={chartOptions} />
    </Box>
  );
};

export default SalesAggregateGraph;