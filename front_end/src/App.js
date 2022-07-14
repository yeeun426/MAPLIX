import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Search from './pages/SearchMain'
import Course from "./pages/Course";
import Recommend from "./pages/SearchPage"; //추천 코스 만들면 경로 변경
import Community from "./pages/Community";
import Mypage from "./pages/LikeList";
import SearchPage from "./pages/SearchPage";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Search/>}></Route>
          <Route path='/course' element={<Course/>}></Route>
          <Route path='/recommend' element={<Recommend/>}></Route>
          <Route path='/community' element={<Community/>}></Route>
          <Route path='/mypage' element={<Mypage/>}></Route>

          <Route path='/Search' element={<SearchPage/>}></Route>
      </Routes>
    
    </div>
  );
}

export default App;
