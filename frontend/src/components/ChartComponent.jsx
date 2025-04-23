import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Εισάγουμε τα απαραίτητα modules του Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ data }) => {
  // Προετοιμάζουμε τα δεδομένα για το γράφημα
  const chartData = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ], // Μήνες του χρόνου
    datasets: [
      {
        label: 'Enrollments',
        data: data, // Τα δεδομένα που ήρθαν από το backend
        fill: false,
        borderColor: 'rgb(37, 99, 235)', // Χρώμα γραμμήςrgb(75, 192, 192)'
        tension: 0.3
      }
    ]
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Monthly Enrollments</h2>
      <Line data={chartData} />
    </div>
  );
};

export default ChartComponent;
