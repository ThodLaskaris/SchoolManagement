// // src/components/PieComponent.jsx
// import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

// // Εγκατάσταση των απαραίτητων modules του Chart.js
// ChartJs.register(ArcElement, Tooltip, Legend);

// const PieComponent = ({ data }) => {
//   if (!data || data.length === 0) {
//     return <p>Δεν υπάρχουν διαθέσιμα δεδομένα για το γράφημα.</p>;
//   }

//   const chartData = {
//     labels: data.labels,
//     datasets: [
//       {
//         label: "Enrollments Stats",
//         data: data.values,
//         backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         hoverBackgroundColor: ['#FF4D75', '#4C8BF5', '#FFB94C'],
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Enrollment Statistics</h2>
//       <Pie data={chartData} />
//     </div>
//   );
// };

// export default PieComponent;  // Εξαγωγή του PieComponent

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";

ChartJs.register(ArcElement, Tooltip, Legend);

const PieComponent = () => {
    // Mock data για το γράφημα
    const mockData = {
        labels: ["Male Students", "Female Students", "Other"],
        datasets: [
            {
                label: "Enrollment Stats",
                data: [60, 30, 10],  // Χρήση mock δεδομένων για τα ποσοστά
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF4D75', '#4C8BF5', '#FFB94C'],
            },
        ],
    };

    return (
        <div className="flex  w-72 h-72">
            <h2>Enrollment Stats</h2>
            <Pie data={mockData} />
        </div>
    );
};

export default PieComponent;
