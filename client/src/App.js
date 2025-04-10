// client/src/App.js
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./componant/home";
import "./App.css";
import Community from "./componant/community";
import Login from "./componant/login";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/community" element={<Community/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
