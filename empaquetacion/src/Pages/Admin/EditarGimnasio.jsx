import { useEffect } from "react";
import { useNavigate, useParams } from "react-router"
import useGyms from "../../hooks/useGyms";
import FormularioGimnasio from "../../Components/FormularioGimnasio";

const EditarGimnasio = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { loadingGyms, gymSeleccionado, getGymById, updateGym } = useGyms()

    useEffect(() => {
        getGymById(id);
    }, [id])

    const guardarGimnasio = async (gymData) => {
        const actualizado = await updateGym(id, gymData)

        if (actualizado) {
            navigate("/admin/gimnasios")
        }
    }

    if (!gymSeleccionado) {
        return (
            <main className="flex p-8 h-full min-h-screen items-center justify-center" style={{background: 'var(--green_CFD9C7)'}}>
                <p style={{color: 'var(--brown)'}}>Cargando gimnasio...</p>
            </main>
        )
    }

    return (
        <FormularioGimnasio
            tituloFormulario="Editar Gimnasio"
            textoBoton="Guardar Cambios"
            cargando={loadingGyms}
            onGuardar={guardarGimnasio}
            valoresIniciales={{
                name: gymSeleccionado.name,
                description: gymSeleccionado.description,
                address: gymSeleccionado.address,
                city: gymSeleccionado.city,
                municipio: gymSeleccionado.municipio,
                imagenesExistentes: gymSeleccionado.images ?? []
            }}
        />
    )
}

export default EditarGimnasio;
