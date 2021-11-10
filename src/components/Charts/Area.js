
import React, {useState, useEffect} from "react";
import {Bar} from "react-chartjs-2"


const Chart = (dataSet)  => {
  
  const [data,setData]  = useState(); 

  useEffect(() => {    
    const dataParsed = createDataObject(dataSet.dataSet);
    setData(dataParsed);
  }, [dataSet])
  
  function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

  function createDataObject(data){
    const barData = {
      labels: data.map((x) => dateToYMD(new Date(x.start_datetime))),
      datasets: [        
        {
            type: 'line',
            label:"Evaluacion profesional",
            backgroundColor: '#E74C3C',
            yAxisID: 'y1',            
            borderWidth: 5,
            borderColor:'#F5B7B1',
            pointBorderWidth : 10,
            pointBorderColor: '#E74C3C',
            data: data.map((x)=>x.evaluation),
            fill: false,
        },
        {
            type: 'line',
            label:"Atencion alumno",
            backgroundColor: '#20c997',
            borderWidth: 5,
            pointBorderWidth : 10,
            borderColor:'#20c8c9',
            pointBorderColor: '#20c997',            
            yAxisID: 'y1',
            data: data.map((x)=>x.attention),
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
    <div className="chart">
      {data && 
      <Bar
        data={data}
        options={{
            plugins: {
                title: {
                    display: true,
                    text: 'Sesiones Finalizadas'
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    ticks: {
                        precision:0,                    
                      }
                      
                  },
                  y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    ticks: {
                        precision:0
                      }
                  }
                }
           }    
        }    
      />}
    </div>
  );
}

export default Chart
