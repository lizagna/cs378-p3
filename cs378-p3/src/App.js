import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <body>
      <div className="App">
        <table className="Menu">
          <tr className="Button-row">
            <td>
              <button>Austin</button>
            </td>
            <td>
              <button>Dallas</button>
            </td>
            <td>
            <button>Houston</button>
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
              <button>+</button>
            </td>
          </tr>
        </table>
      </div>
    </body>
    
  );
}

export default App;
