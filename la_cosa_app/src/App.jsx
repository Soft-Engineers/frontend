import { Routes, Route } from "react-router-dom";
import ElegirNombre from "./screens/ElegirNombre";
import Main from "./screens/Main"

    const App = () => {
        return (
            <Routes>
                <Route path="/" element={<ElegirNombre/>} />
                <Route path="/mainpage" element={<Main/>} />
            </Routes>
        )
    }
export default App;