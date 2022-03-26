import { useRef, useState } from "react"
import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

export default function CustomChart({ labels, datasets}) {

    const line = (
        <Line
            itemType="line"
            data={{
                labels: labels,
                datasets: datasets
            }
            }
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: false,
                    }
                }
            }}
        />
    );
    return line;
}