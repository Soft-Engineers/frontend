import Match from "./screens/Match"
import { Routes, Route } from "react-router-dom";
import SelectName from "./screens/SelectName";
import MainPage from "./screens/MainPage"
import Lobby from "./screens/Lobby";


const App = () => {
    return (
            <Routes>
                <Route path="/" element={<SelectName/>} />
                <Route path="/mainpage/:user_name" element={<MainPage/>} />
                <Route path="/lobby/:match_name" element={<Lobby/>} />
                <Route path="/match/:match_name" element={<Match />} />
            </Routes>
    )
}
export default App;