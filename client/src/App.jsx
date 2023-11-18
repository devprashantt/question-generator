import axios from "axios";

import { Home } from "./pages";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

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
