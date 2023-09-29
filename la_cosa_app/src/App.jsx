import { Routes, Route } from "react-router-dom"
import Lobby from "./screens/Lobby"
import Partida_iniciada from "./screens/Partida_iniciada"



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      <Route path="/Partida_iniciada" element={<Partida_iniciada />} />
    </Routes>
  )
}

export default App
