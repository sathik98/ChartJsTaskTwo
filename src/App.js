// import React, { useState, useEffect } from "react";
// import Chart from "chart.js/auto";

// export default function App() {
//   const [chartData, setChartData] = useState(null);
  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseY = await fetch("https://retoolapi.dev/o5zMs5/data");
//         const responseX = await fetch("https://retoolapi.dev/gDa8uC/data");

//         if (!responseY.ok || !responseX.ok) {
//           throw new Error("Failed to fetch data");
//         }

//         const dataY = await responseY.json();
//         const dataX = await responseX.json();

//         const xAxisLabelsData = dataX.slice(0, 50).map(item => item.Label);
//         const XAxisData = dataX.slice(0, 50).map(item => parseFloat(item.RandomNumber));

//         const yAxisData = dataY.slice(0, 50).map(item => parseFloat(item.RandomNumber));

//         const ctx = document.getElementById('myChart');
//         const myChart = new Chart(ctx, {
//           type: 'line',
//           data: {
//             labels: xAxisLabelsData,
//             datasets: [{
//               label: 'X-axis Data',
//               data: XAxisData,
//               borderColor: 'green',
//               fill: false
//             }, {
//               label: 'Y-axis Data',
//               data: yAxisData,
//               borderColor: 'red',
//               fill: false
//             }]
//           },
//           options: {
//             scales: {
//               x: {
//                 type: 'category'
//               }
//             }
//           }
//         });

//         setChartData(myChart);
        
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="App">
//       <h2>Data in Line Chart</h2>
//       <div style={{ height: "400px", width: "800px" }}>
//         <canvas id="myChart"></canvas>
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
        console.log("Fetched X-axis data:", dataX);
        console.log("Fetched Y-axis data:", dataY);

        // Assuming both X and Y data have the same number of points and are ordered accordingly
        const combinedData = dataX.map((itemX, index) => ({
          x: parseFloat(itemX.RandomNumber),
          y: parseFloat(dataY[index].RandomNumber)
        }));

        console.log("Combined data:", combinedData);

        setChartData(prevChartData => ({
          ...prevChartData,
          labels: dataX.map(item => item.Label), // Assuming labels are provided in the X-axis data
          datasets: [
            {
              ...prevChartData.datasets[0],
              data: combinedData
            }
          ]
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("Chart Data:", chartData); // Log chartData for debugging

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
