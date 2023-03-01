// import { useEffect, useState } from "react";
// import axios from "axios";
// import './App.css';

// function App() {
//   const [cities, setCities] = useState({
//     "Austin":{"latitude":30.26715,"longitude":-97.74306},
//     "Dallas":{"latitude":32.78306,"longitude":-96.80667},
//     "Houston":{"latitude":29.76328,"longitude":-95.36327}
//   });
 
  
//   const addLocation = () => {
//     fetch("https://geocoding-api.open-meteo.com/v1/search?name=")
//   }
  
//   return (
//     <body>
//       <table className="Menu">
//         <tr className="Button-row">
//           <td>
//             <button>
//               <b>Austin</b>
//             </button>
//           </td>
//           <td>
//             <button>
//               <b>Dallas</b>
//             </button>
//           </td>
//           <td>
//             <button>
//               <b>Houston</b>
//             </button>
//           </td>
//         </tr>

//         <tr className="Search-bar">
//           <td>
//             <form>
//               <label>
//                 <input type="text" />
//               </label>
//             </form>
//           </td>
//           <td>
//             <button>
//               <b>+</b>
//             </button>
//           </td>
//         </tr>
//       </table>

//       <table className="Weather-data">
//         <tr className="Weather-data-header">
//           <td> 
//             <b>Time</b> 
//           </td>
//           <td>
//             <b>Temperature</b>
//           </td>
//         </tr>
//       </table>
//     </body>
    
//   );
// }

// export default App;


import { useEffect, useState } from "react";

function App() {
  const [location, setLocation] = useState({
    "Austin": {"latitude":30.26715, "longitude":-97.74306},
    "Dallas": {"latitude":32.78306, "longitude":-96.80667},
    "Houston": {"latitude":29.76328, "longitude":-95.36327}
  });
  const [searchText, setSearchText] = useState("");
  const [temperatures, setTemperatures] = useState([]);
  const [times, setTimes] = useState([]);
  const [city, setCity] = useState("Houston");

  useEffect(() => {
    fetchWeather('Houston')
  },[]);

  const addLocation = () => {
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${searchText}`)
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.results) {
            const match = json.results[0];
            setLocation({
              ...location, // retains original state using spread operator
              [match.name]: {
                latitude: match.latitude,
                longitude: match.longitude,
              },
            });
            setSearchText(""); // clears the search bar
          } else {
            alert(`Could not find weather for ${searchText}`);
          }
        },
        (error) => {}
      );
  };

  const fetchWeather = (city) => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${location[city].latitude}&longitude=${location[city].longitude}&current_weather=true&hourly=temperature_2m&temperature_unit=fahrenheit`
    )
      .then((res) => res.json())
      .then(
        (json) => {
          if (json.hourly) {
            setTemperatures(json.hourly.temperature_2m);
            setTimes(json.hourly.time);
          }
          setCity(city);
        },
        (error) => {}
      );
  };

  let buttons = [];
  for (let loc in location) {
    buttons.push(
      <button
        style={{
          marginRight: "8px",
          paddingLeft: "8px",
          paddingRight: "8px",
          paddingTop: "5px",
          paddingBottom: "5px",
          fontSize: "18px",
          marginTop: "5px",
          borderRadius: "5px",
          backgroundColor: city === loc ? "pink" : "",
        }}
        onClick={() => {
          fetchWeather(loc);
        }}
      >
        <b>{loc}</b>
      </button>
    );
  }

  function convertTime(dt) {
    // let amOrPm = hour >= 12 ? 'PM' : 'AM';
    // hour = (hour % 12) || 12;
    var options = {
      hour: 'numeric',
      hour12: true
    };
    var timeString = dt.toLocaleString('en-US', options);
    return timeString;
  }

  let rows = [];
  const dt = new Date();
  let hour = dt.getHours();
  // Adds the Time and Temperature headers
  rows.push(
    <div
      style={{
        display: "flex",
        width: "200px",
        marginTop: "30px",
        marginBottom: "0px",
      }}
    >
      <div 
        style={{ 
          flex: "1", 
          textAlign: "left", 
          fontSize: "18px" 
        }}
      >
        <b>Time</b>
      </div>

      <div 
        style={{ 
          flex: "1", 
          textAlign: "left", 
          fontSize: "18px" 
        }}
      >
        <b>Temperature</b>
      </div>
    </div>
  );

  /**
   * Populates the table with the time and its corresponding temperature
   */
  for (let i = hour; i < hour + 10; i++) {
    if (temperatures[i]) {
      let tempTime = new Date(times[i].toString());
      let tempHour = convertTime(tempTime);
      rows.push(
        <div
          style={{
            display: "flex",
            width: "200px",
            backgroundColor: "white",
            paddingTop: "5px",
          }}
        >
          <div 
            style={{ 
              fontSize: "18px", 
              flex: "1", 
              textAlign: "left" 
            }}
          >
            {tempHour}
          </div>
          <div 
            style={{ 
              fontSize: "18px", 
              flex: "1", 
              textAlign: "left" 
            }}
          >
            {temperatures[i] + " °F"}
          </div>
        </div>
      );
    }
  }
  return (
    <div style={{ textAlign: "center", margin: "30px" }}>
      <div style={{ textAlign: "left" }}>{buttons}</div>
      <div style={{ marginTop: "15px", display: "flex" }}>
        <input
          type="text"
          style={{
            marginRight: "10px",
            fontSize: "18px",
            width: "200px",
          }}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          style={{
            marginRight: "10px",
            fontSize: "18px",
            width: "30px",
            height: "30px",
            borderRadius: "5px",
          }}
          onClick={addLocation}
        >
          <b>+</b>
        </button>
      </div>

      {rows}
    </div>
  );
}

export default App;