// client/src/App.jsx
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      {/* Outlet is a placeholder where the matched route component will be rendered */}
      <Outlet />
    </>
  );
}

export default App;
