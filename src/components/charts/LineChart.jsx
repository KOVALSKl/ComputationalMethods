import Chart from 'chart.js/auto';
import { Line } from "react-chartjs-2";

export default function LineChart(props) {
    console.log(props);
    return (
        <div>
            <Line
                data={props.chartData}
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