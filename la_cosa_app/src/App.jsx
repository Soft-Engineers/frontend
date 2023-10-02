import Partida_iniciada from "./screens/Partida_iniciada"
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
      <Route path="/Partida_iniciada" element={<Partida_iniciada />} />
  </Routes>
    )
}
export default App;
