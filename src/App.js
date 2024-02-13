// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";

// export default function App() {
//   const [chartData, setChartData] = useState({
//     labels: [],
//     datasets: [
//       {
//         label: "X-axis Data",
//         data: [],
//         fill: false,
//         borderColor: "green"
//       },
//       {
//         label: "Y-axis Data",
//         data: [],
//         fill: false,
//         borderColor: "red"
//       }
//     ]
//   });

//   const [xAxisLabels, setXAxisLabels] = useState([]);
//   const [yAxisLabels, setYAxisLabels] = useState([]);


//   console.log(xAxisLabels, yAxisLabels)


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseY = await fetch("https://retoolapi.dev/o5zMs5/data");

//         if (!responseY.ok) {
//           throw new Error("Failed to fetch Y-axis data");
//         }

//         const dataY = await responseY.json();
//         console.log("Fetched Y-axis data:", dataY);

//         const responseX = await fetch("https://retoolapi.dev/gDa8uC/data");

//         if (!responseX.ok) {
//           throw new Error("Failed to fetch X-axis data");
//         }

//         const dataX = await responseX.json();
//         console.log("Fetched X-axis data:", dataX);

//         const xAxisLabelsData = dataX.slice(0, 50).map(item => item.Label);
//         const XAxisData = dataX.slice(0, 50).map(item => parseFloat(item.RandomNumber));

//         const yAxisLabelsData = dataY.slice(0, 50).map(item => item.Label);
//         const yAxisData = dataY.slice(0, 50).map(item => parseFloat(item.RandomNumber));

//         setChartData(prevChartData => ({
//           ...prevChartData,
//           labels: xAxisLabelsData,
//           datasets: [
//             {
//               ...prevChartData.datasets[0],
//               data: XAxisData
//             },
//             {
//               ...prevChartData.datasets[1],
//               label: "Y-axis Data",
//               data: yAxisData
//             }
//           ]
//         }));

//         setXAxisLabels(xAxisLabelsData);
//         setYAxisLabels(yAxisLabelsData);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <h2>Datas in Line Chart</h2>
//       <div style={{ height: "400px", width: "800px" }}>
//         <Line data={chartData} />
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export default function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "(X, Y) Data",
        data: [],
        fill: false,
        borderColor: "green"
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseX = await fetch("https://retoolapi.dev/gDa8uC/data");
        const responseY = await fetch("https://retoolapi.dev/o5zMs5/data");
  
        if (!responseX.ok || !responseY.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const dataX = await responseX.json();
        const dataY = await responseY.json();
        
        // console.log("Fetched X-axis data:", dataX);
        // console.log("Fetched Y-axis data:", dataY);
  
        // Assuming both X and Y data have the same number of points and are ordered accordingly
        const combinedData = dataX.map((itemX, index) => ({
          x: parseFloat(itemX.RandomNumber),
          y: parseFloat(dataY[index].RandomNumber)
        }));
  
        // console.log("Combined data:", combinedData);
  

        const combinedDataLimited = combinedData.slice(0, 50);

        setChartData(prevChartData => ({
          ...prevChartData,
          labels: combinedDataLimited.map(point => point.x), // Assuming labels are provided from x-axis data
          datasets: [
            {
              label: "(X, Y) Data",
              data: combinedDataLimited.map(point => ({x: point.x, y: point.y})),
              fill: false,
              borderColor: "green"
            }
          ]
        }));
        
        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  // console.log("Chart Data:", chartData); // Log chartData for debugging

  return (
    <div className="App">
      <h2>Data in Line Chart (X, Y)</h2>
      <div style={{ height: "400px", width: "800px" }}>
        <Line
          data={chartData}
          options={{
            scales: {
              x: {
                type: 'linear',
                position: 'bottom'
              },
              y: {
                type: 'linear',
                position: 'left',
                title: {
                  display: true,
                  text: 'Y-axis Label'
                }
              }
            }
          }}
        />
      </div>
    </div>
  );
}
