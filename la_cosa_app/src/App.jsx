import { Routes, Route } from "react-router-dom";
import SelectName from "./screens/SelectName";
import Main from "./screens/Main"

    const App = () => {
        return (
            <Routes>
                <Route path="/" element={<SelectName/>} />
                <Route path="/mainpage" element={<Main/>} />
            </Routes>
        )
    }
export default App;