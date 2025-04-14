// client/src/App.js
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./componant/home";
import "./App.css";
import Community from "./componant/community";
import Login from "./componant/login";
import Profile from "./componant/profile";

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Login href = "login"/>}></Route>
          <Route path="/login" element={<Login href = "login"/>}></Route>
          <Route path="/signup" element={<Login href = "signup"/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/community" element={<Community/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
