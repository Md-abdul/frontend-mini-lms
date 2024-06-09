import "./App.css";
import Sidebar from "./Components/Sidebar";
import { AllRoutes } from "./Routes/AllRoutes";

function App() {
  return (
    <div className="App">
      <Sidebar>
        <AllRoutes />
      </Sidebar>
    </div>
  );
}

export default App;
