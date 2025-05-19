// client/src/App.js
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "./componant/home";
import "./App.css";
import Community from "./componant/community";
import Login from "./componant/login";
import Profile from "./componant/profile";
import KakaoRedirectPage from "./componant/routes/kakaoRedirectPage";
import NaverRedirectPage from "./componant/routes/naverRedirectPage";
import GoogleRedirectPage from "./componant/routes/googleRedirectPage";
import CreateList from "./componant/createList";
import DayDetails from "./componant/create/list/DayDetails";
import AIManagement from "./componant/aiManagement";


function App() {

  return (
    <BrowserRouter>
      {/* <div> */}
        <Routes>
          <Route path="/" element={<Login href = "login"/>}/>
          <Route path="/login" element={<Login href = "login"/>}/>
          <Route path="/signup" element={<Login href = "signup"/>}/>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/community" element={<Community/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/auth/kakao/callback" element={<KakaoRedirectPage/>}/>
          <Route path="/auth/naver/callback" element={<NaverRedirectPage/>}/>
          <Route path="/auth/google/callback" element={<GoogleRedirectPage/>}/>
          <Route path="/createList" element={<CreateList/>}/>
          <Route path="/day/:day" element={<DayDetails/>}/>
          <Route path="/AIManagement" element={<AIManagement/>}/>
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
