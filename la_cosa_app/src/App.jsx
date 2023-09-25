import { Routes, Route } from "react-router-dom";
import ElegirNombre from "./screens/ElegirNombre";

    const App = () => {
        return (
            <Routes>
                <Route path="/" element={<ElegirNombre/>} />
            </Routes>
        )
    }
export default App;