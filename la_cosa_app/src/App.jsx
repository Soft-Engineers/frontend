import { Routes, Route } from "react-router-dom";
import SelectName from "./screens/SelectName";
import MainPage from "./screens/MainPage"
import Lobby from "./screens/Lobby";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<SelectName/>} />
            <Route path="/mainpage" element={<MainPage/>} />
            <Route path="/lobby" element={<Lobby/>} />
        </Routes>
    )
}
export default App;
