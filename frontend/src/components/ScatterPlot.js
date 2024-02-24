import React from 'react';
import { Scatter} from 'react-chartjs-2';
import { Chart, registerables, CategoryScale ,PointElement} from 'chart.js';

Chart.register(...registerables, CategoryScale,PointElement); // Register CategoryScale


const ScatterPlot = ({ xData, yData,xLabel ,yLabel,coeff,intercept,problemName}) => {
    const regressionData = xData.map((xValue) => coeff * xValue + intercept);
    const data = {
        labels: xData, // X
        datasets: [
          {
            label: 'Actual',
            data: yData, //y 
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            pointStyle: 'circle',
            pointRadius: 5,
          },
          {
            label: 'Predicted',
            data: regressionData, // Predicted y
            type: 'line',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointRadius: 0, // Hide line points
          },
        ],
      };
      
      
      const options = {
          scales: {
            x: {
              title: {
                display: true,
                text: xLabel, 
              },
            },
            y: {
              title: {
                display: true,
                text: yLabel, 
              },
            },
          },
        };
      
      
  return (
    <div>
    <h1 > Scatter plot for : {problemName}</h1>
    <Scatter data={data} options={options} /> 
    </div>
  );
};

export default ScatterPlot;