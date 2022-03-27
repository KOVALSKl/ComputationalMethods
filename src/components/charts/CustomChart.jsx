import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export default function CustomChart({ labels, series}) {

    const options = {
        chart: {
            type: 'line'
        },
        xAxis: {
            categories: labels
        },
        title: {
            text: "Local Data Smoothing"
        },
        series: series,
    }

    return (
        <HighchartsReact
        highcharts={Highcharts}
        options={options}
    />
    );
}