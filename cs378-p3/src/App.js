import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [city, setCity] = useState({
    "Austin":{"latitude":30.26715,"longitude":-97.74306},
    "Dallas":{"latitude":32.78306,"longitude":-96.80667},
    "Houston":{"latitude":29.76328,"longitude":-95.36327}
  });


  
  
  return (
    <body>
      <table className="Menu">
        <tr className="Button-row">
          <td>
            <button>
              <b>Austin</b>
            </button>
          </td>
          <td>
            <button>
              <b>Dallas</b>
            </button>
          </td>
          <td>
            <button>
              <b>Houston</b>
            </button>
          </td>
        </tr>

        <tr className="Search-bar">
          <td>
            <form>
              <label>
                <input type="text" />
              </label>
            </form>
          </td>
          <td>
            <button>
              <b>+</b>
            </button>
          </td>
        </tr>
      </table>

      <table className="Weather-data">
        <tr className="Weather-data-header">
          <td> 
            <b>Time</b> 
          </td>
          <td>
            <b>Temperature</b>
          </td>
        </tr>
      </table>
    </body>
    
  );
}

export default App;
