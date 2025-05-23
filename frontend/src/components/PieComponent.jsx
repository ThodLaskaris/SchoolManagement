import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJs.register(ArcElement, Tooltip, Legend);

const PieComponent = () => {
    const [chartData, setChartData] = useState(null);
    useEffect(() => {
        axios
            .get("http://localhost:3000/api/students/gender-stats")
            .then((response) => {
                const data = response.data;
    
                // Δημιουργία του chartData από τα δεδομένα του API
                setChartData({
                    labels: ["Male", "Female", "Other"],
                    datasets: [
                        {
                            label: "Gender Stats",
                            data: [data.Male, data.Female, data.Other],
                            backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
                            hoverBackgroundColor: ["#4C8BF5", "#FF4D75", "#FFB94C"],
                        },
                    ],
                });
            })
            .catch((err) => console.error("Error loading gender stats:", err));
    }, []);
    
    return (
        <div className="w-72 h-72 mx-auto">
            <h2 className="text-xl font-semibold mb-4">Gender Stats</h2>
            {chartData ? (
                <Pie data={chartData} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
export default PieComponent;