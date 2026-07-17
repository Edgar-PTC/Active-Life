import { useNavigate } from "react-router"
import useGyms from "../../hooks/useGyms";
import FormularioGimnasio from "../../Components/FormularioGimnasio";

const AgregarGimnasio = () => {
    const navigate = useNavigate();
    const { loadingGyms, insertGym } = useGyms()

    const guardarGimnasio = async (gymData) => {
        const guardado = await insertGym(gymData)

        if (guardado) {
            navigate("/admin/gimnasios")
        }
    }

    return (
        <FormularioGimnasio
            tituloFormulario="Agregar Nuevo Gimnasio"
            textoBoton="Guardar Gimnasio"
            cargando={loadingGyms}
            onGuardar={guardarGimnasio}
        />
    )
}

export default AgregarGimnasio;
