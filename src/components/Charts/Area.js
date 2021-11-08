
import React, {useState, useEffect} from "react";
import {Bar} from "react-chartjs-2"

const dataConst = [
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-01T03:03:12.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-01T03:05:17.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-01T03:06:35.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-01T03:14:55.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-01T04:00:00.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-01T04:00:01.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-01T05:00:00.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T01:51:56.000Z"
  },
  {
      "evaluation": 3,
      "attention": 3,
      "duration": 1,
      "start_datetime": "2021-11-03T01:52:58.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 1,
      "start_datetime": "2021-11-03T02:07:33.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 11,
      "start_datetime": "2021-11-03T02:19:49.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T02:52:06.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T03:59:14.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T04:04:09.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T04:06:00.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T04:08:07.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T04:09:11.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T04:17:44.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T04:30:00.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-03T05:00:00.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-06T22:30:00.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T01:36:28.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T01:37:41.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T01:49:35.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T01:50:49.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T01:52:44.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:03:00.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:07:53.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:15:05.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:20:03.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:22:41.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:27:04.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:32:27.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:43:17.000Z"
  },
  {
      "evaluation": 0,
      "attention": 0,
      "duration": 0,
      "start_datetime": "2021-11-07T02:45:29.000Z"
  }
];

const Chart = ()  => {
  
  const [data,setData]  = useState(); 

  useEffect(() => {
    const dataParsed = createDataObject(dataConst);
    setData(dataParsed);
  }, [])
  
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
          label:"Tiempo de sesion",
          backgroundColor: data.map((val, i) =>
            "rgba(135, 206, 235, 1)"            
          ),
          hoverBackgroundColor: "rgba(255,99,132,0.4)",
          data: data.map((x)=>x.duration)
        }
      ]
    };
    debugger;
    return barData;
  }

  return (
    <div className="chart">
      {data && 
      <Bar
        data={data}
        options={{ maintainAspectRatio: false, scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            grid: {
              display: false
            }
          }
        }}}    
      />}
    </div>
  );
}

export default Chart
