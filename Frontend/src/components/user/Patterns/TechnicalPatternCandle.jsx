import React, { useEffect, useState } from "react";
import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import * as d3 from "d3";

const ChartExample = ({ ChartData , timeFrame }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => { 
    const formattedData = ChartData.filter(item => item.date2 !== null)
      .map(({ volume, ...rest }) => ({
        ...rest,
        date: new Date(rest.date2),
      }))
      .filter(item => {
        const dayOfWeek = item.date.getDay();  
        return dayOfWeek !== 0 && dayOfWeek !== 6;  
      });
  
      const filterDataBetween9_15And15_30 = (data) => {
        const today = new Date();
        const todayDateString = today.toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
        return data.filter(item => {
            const [date, time] = item.date2.split(' ');
             
            if (date !== todayDateString) {
                return false;
            }
             
            const [hours, minutes] = time.split(':').map(Number);
     
            if ((hours === 9 && minutes >= 15) || (hours > 9 && hours < 15) || (hours === 15 && minutes <= 30)) {
                return true;
            }
            
            return false;
        });
    };
    
  
    const newData = filterDataBetween9_15And15_30(formattedData);
    console.log(newData)
    const chartOptions = {
      data: newData,
      footnote: {
        text: `${timeFrame.slice(0,-1)} Minute Intervals`,
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
              console.log(params)
              const date = new Date(params.value);
              const dayOfWeek = date.getDay();  
          
              if (dayOfWeek === 0 || dayOfWeek === 6) {
                return ''; // Return an empty string to skip Saturday and Sunday
              }
          
              return date.toLocaleString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
              });
            },
          },
          
          tick: {
            count: d3.timeMinute.every(5),
          },
          crosshair: {
            enabled: true,
          },
          zoom: {
            enabled: true,
            mode: "x",
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
        mode: "x",
      },
    };
    
    setOptions(chartOptions);
  }, [ChartData]);

  return <div style={{ height: '500px' }}>{options && <AgChartsReact options={options} />}</div>;
};

export default ChartExample;
