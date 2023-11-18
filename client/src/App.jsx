import axios from "axios";

import { Home } from "./pages";

axios.defaults.baseURL = "http://localhost:3000";

const App = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Home />
    </div>
  );
};

export default App;
