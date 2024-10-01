import React, { useEffect, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import * as d3 from "d3";

const ChartExample = ({ ChartData }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    const adjustTime = (date) => {
      const dateObj = new Date(date);
      return new Date(dateObj.getTime());
    };

    console.log("ChartData", ChartData);

    const processedData = ChartData.map((item) => ({
      ...item,
      date: adjustTime(item.date),
    }));

    const chartOptions = {
      data: processedData,
      footnote: {
        text: "1 Minute Intervals",
      },
      series: [
        {
          type: "candlestick",
          xKey: "date",
          xName: "Time",
          lowKey: "low",
          highKey: "high",
          openKey: "open",
          closeKey: "close",
          item: {
            width: 5,
            gap: 10,
            up: {
              fill: "#006400",
              stroke: "#003300",
            },
            down: {
              fill: "#FF0000",
              stroke: "#8B0000",
            },
          },
          tooltip: {
            renderer: ({ datum, xKey, openKey, highKey, lowKey, closeKey }) => {
              const date = new Date(datum[xKey]).toLocaleString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
              });
              return {
                title: `<b>${date}</b>`,
                content: `<b>O</b>: ${datum[openKey].toLocaleString()}<br/><b>H</b>: ${datum[highKey].toLocaleString()}<br/><b>L</b>: ${datum[lowKey].toLocaleString()}<br/><b>C</b>: ${datum[closeKey].toLocaleString()}`,
              };
            },
          },
        },
      ],
      axes: [
        {
          type: "time",
          position: "bottom",
          label: {
            format: (params) => {
              const date = new Date(params.value).toLocaleString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
              });
              return date;
            },
          },
          tick: {
            count: d3.timeMinute.every(5),
          },
          // Enable zooming for the x-axis
          crosshair: {
            enabled: true,
          },
          zoom: {
            enabled: true,
          },
        },
        {
          type: "number",
          position: "right",
          label: {
            formatter: ({ value }) => Number(value).toLocaleString(),
          },
          crosshair: {
            label: {
              format: ",f",
            },
          },
          zoom: {
            enabled: true,
          },
        },
      ],
      zoom: {
        enabled: true,
        rescaleAxes: true,
        mode: "x", // You can change to 'x', 'y', or 'xy'
      },
    };

    setOptions(chartOptions);
  }, [ChartData]);

  return <div style={{height:'500px'}}>{options && <AgChartsReact options={options} />}</div>;
};


export default ChartExample;
