// src/App.js
import { Route, Routes } from 'react-router-dom';
import UpdateInfo from "./pages/UpdateInfo";
import Stamp from "./pages/Stamp";
import Favorite from "./pages/Favorite";
import MyCourse from "./pages/MyCourse";
import RequestInfo from "./pages/RequestInfo"

import Scrap from './pages/Scrap';

function App() {
    return (
        <Routes>
            <Route path="/updateinfo" element={<UpdateInfo />} />
            <Route path="/stamp" element={<Stamp />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="/requestinfo" element={<RequestInfo />} />
            <Route path="/updateinfo" element={<UpdateInfo />} />
            <Route path="/updateinfo" element={<UpdateInfo />} />
        </Routes>
    );
}

export default App;
