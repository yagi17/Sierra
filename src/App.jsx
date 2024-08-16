import Footer from "./Pages/Footer";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      {/* <Nav /> */}
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default App;
