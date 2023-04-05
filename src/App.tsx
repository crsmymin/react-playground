import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Counter from "./components/Counter";
import NewChart from "./components/NewChart";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <div className="card">
        <NewChart />
        {/* <Counter number={0} /> */}
      </div>
    </div>
  );
}

export default App;
