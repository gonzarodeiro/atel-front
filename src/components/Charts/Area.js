import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import convertDateTime from '../../utils/commons/convertDateTime';

const Chart = (dataSet) => {
  const [data, setData] = useState();

  useEffect(() => {
    const dataParsed = createDataObject(dataSet.dataSet);
    setData(dataParsed);
  }, [dataSet]);

  function createDataObject(data) {
    const barData = {
      labels: data.map((x) => convertDateTime(new Date(x.start_datetime))),
      datasets: [
        {
          type: 'line',
          label: 'Evaluacion profesional',
          backgroundColor: '#E74C3C',
          yAxisID: 'y1',
          borderWidth: 5,
          borderColor: '#F5B7B1',
          pointBorderWidth: 10,
          pointBorderColor: '#E74C3C',
          data: data.map((x) => x.evaluation),
          fill: false
        },
        {
          type: 'line',
          label: 'Atencion alumno',
          backgroundColor: '#20c997',
          borderWidth: 5,
          pointBorderWidth: 10,
          borderColor: '#20c8c9',
          pointBorderColor: '#20c997',
          yAxisID: 'y1',
          data: data.map((x) => x.attention),
          fill: false
        },
        {
          type: 'line',
          label:"Retroalimentacion alumno",
          backgroundColor: '#3b3355',
          borderWidth: 5,
          pointBorderWidth : 10,
          borderColor:'#5d5d81',
          pointBorderColor: '#3b3355',            
          yAxisID: 'y1',
          data: data.map((x)=>x.session_evaluation),
          fill: false,
      },
        {
            type: 'bar',
            label:"Tiempo de sesion",
            backgroundColor: 'rgb(54, 162, 235)',
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            borderWidth: 1,
            yAxisID: 'y',
            data: data.map((x)=>x.duration),
            fill: false,
        },
      ]
    };
    return barData;
  }

  return (
    <div className='chart'>
      {data && (
        <Bar
          data={data}
          options={{
            plugins: {
              title: {
                display: true,
                text: 'Sesiones Finalizadas',
                padding: {
                  top: 25,
                  bottom: 15
                },
                font: {
                  size: 15
                }
              }
            },
            scales: {
              y: {
                type: 'linear',
                display: true,
                position: 'left',
                ticks: {
                  precision: 0
                }
              },
              y1: {
                type: 'linear',
                display: true,
                position: 'right',
                ticks: {
                  precision: 0
                }
              }
            }
          }}
        />
      )}
    </div>
  );
};

export default Chart;
