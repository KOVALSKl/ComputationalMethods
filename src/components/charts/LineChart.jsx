import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

export default function LineChart({ chartData }) {
    return (
        <div>
            <Line
                data={chartData}
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
        </div>
    );
}