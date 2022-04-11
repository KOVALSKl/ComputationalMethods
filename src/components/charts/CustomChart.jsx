import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";
import cl from "./CustomChart.module.css";
import Fade from "@material-ui/core/Fade";

export default function CustomChart({
  labels,
  series,
  popup,
  setLabels,
  setSeries,
  setData,
  setFunc,
}) {
  const [file, setFile] = useState();
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);

  const options = {
    chart: {
      type: "line",
    },
    xAxis: {
      categories: labels,
    },
    title: {
      text: "Local Data Smoothing",
    },
    series: series,
  };

  function readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  useEffect(() => {
    if (x.length !== 0) {
      console.log(x);
      console.log(y);
      setLabels(x);
      setX(x);
      setSeries({
        name: file.name,
        data: y,
      });
      setFunc(file.name);
      setData(y);
    }
  }, [x, y]);

  useEffect(() => {
    readFile(file)
      .then((result) => {
        return result
          .replace(/(\r\n|\s)/gm, "\t")
          .replace(/(,)/gm, ".")
          .split("\t");
      })
      .then((result) => {
        setX(
          result
            .filter((item, index) => index % 2 === 0)
            .map((item) => Number(item))
        );
        setY(
          result
            .filter((item, index) => index % 2 !== 0)
            .map((item) => Number(item))
        );
      });
  }, [file]);

  return (
    <div className={cl.chartContainer}>
      <input
        type="file"
        accept=".txt"
        className={cl.chartUploder}
        onChange={(e) => {
          if (e.target.files[0].type === "text/plain") {
            setFile(e.target.files[0]);
            // } else {
            //   popup.current.enqueueSnackbar("You can upload only text files", {
            //     variant: "error",
            //     TransitionComponent: Fade,
            //   });
            // }
          }
        }}
      />
      <div className={cl.chart}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </div>
  );
}
