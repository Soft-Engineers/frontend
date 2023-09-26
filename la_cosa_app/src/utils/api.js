import axios from "axios";
import {useNavigate} from "react-router-dom";

export const crearUsuario = async (values) => {
    const navigate = useNavigate();
    try {
        navigate("/mainpage");
        const response = await axios.post("http://localhost:8000/crear/usuario",
            values);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};