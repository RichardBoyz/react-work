import { getTestData } from "./apis/api";
import "./App.css";

function App() {
  async function getTest() {
    let res = await getTestData();
    console.log(res);
  }
  return (
    <div className="App" onClick={getTest}>
      test
    </div>
  );
}

export default App;
