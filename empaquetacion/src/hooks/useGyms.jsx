import { useState, useEffect } from "react";
import Swal from "sweetalert2"

const useGyms = () => {
    const [listaGyms, setListaGyms] = useState([])
    const [gymDetail, setGymDetail] = useState([])
    const [gymSeleccionado, setGymSeleccionado] = useState(null)
    const [todosLosGyms, setTodosLosGyms] = useState([])
    
    const [loadingGyms, setLoadingGyms] = useState(false)

    const [pagina, setPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [totalData, setTotalData] = useState(0)
    const [limitePagina, setLimitePagina] = useState(5)

    const API_URL = "http://localhost:4000/apiActiveLife"

    const getGymsPaginated = async (pagina) => {
        try {
            const res = await fetch(`${API_URL}/gyms/paginate`, {
                method: 'POST',
                headers:{
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({"pagina": pagina})
            })

            if (!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo traer los gimnasios',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return;
            }

            console.log(res.status)
            console.log(res.ok)

            const json = await res.json();
            console.log(json)

            setListaGyms(json.data);
            setTotalPaginas(json.totalPages)
            setTotalData(json.totalData)
            setLimitePagina(json.limitPage)
            return;
        } catch (error_) {
            console.log("Error: " + error_);
                Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });   
        }/* finally{
            setLoadingGyms(false)
        } */
    }

    const getAllGyms = async () => {
        try {
            setLoadingGyms(true)

            const res = await fetch(`${API_URL}/gyms`, {
                credentials: "include",
            })

            if (!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo traer los gimnasios',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return;
            }

            const json = await res.json();
            setTodosLosGyms(json);
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        } finally {
            setLoadingGyms(false)
        }
    }

    const insertGym = async (gymData) => {
        try {
            setLoadingGyms(true)

            const formData = new FormData();
            formData.append("name", gymData.name);
            formData.append("description", gymData.description);
            formData.append("address", gymData.address);
            formData.append("city", gymData.city);
            formData.append("municipio", gymData.municipio);
            gymData.images.forEach((file) => formData.append("images", file));

            const res = await fetch(`${API_URL}/gyms`, {
                method: 'POST',
                credentials: "include",
                body: formData
            })

            if (!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo guardar el gimnasio',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return false;
            }

            Swal.fire({
                position: "top-end",
                title: 'Gimnasio guardado correctamente',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false,
            });

            return true;
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
            return false;
        } finally {
            setLoadingGyms(false)
        }
    }

    const getGymById = async (id) => {
        if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) return;

        try {
            setLoadingGyms(true)

            const res = await fetch(`${API_URL}/gyms/${id}`, {
                credentials: "include",
            })

            if (!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo traer el gimnasio',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return;
            }

            const json = await res.json();
            setGymSeleccionado(json);
            return json;
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        } finally {
            setLoadingGyms(false)
        }
    }

    const updateGym = async (id, gymData) => {
        try {
            setLoadingGyms(true)

            const formData = new FormData();
            formData.append("name", gymData.name);
            formData.append("description", gymData.description);
            formData.append("address", gymData.address);
            formData.append("city", gymData.city);
            formData.append("municipio", gymData.municipio);
            gymData.images.forEach((file) => formData.append("images", file));

            const res = await fetch(`${API_URL}/gyms/${id}`, {
                method: 'PUT',
                credentials: "include",
                body: formData
            })

            if (!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo actualizar el gimnasio',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return false;
            }

            Swal.fire({
                position: "top-end",
                title: 'Gimnasio actualizado correctamente',
                icon: 'success',
                timer: 2500,
                showConfirmButton: false,
            });

            return true;
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
            return false;
        } finally {
            setLoadingGyms(false)
        }
    }

    const deleteGym = async (id) => {
        try {
            setLoadingGyms(true)

            const res = await fetch(`${API_URL}/gyms/${id}`, {
                method: 'DELETE',
                credentials: "include",
            })

            if (!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo eliminar el gimnasio',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return false;
            }

            Swal.fire({
                position: "top-end",
                title: 'Gimnasio eliminado correctamente',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
            });

            return true;
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
            return false;
        } finally {
            setLoadingGyms(false)
        }
    }

    const searchGymByName = async (campo) => {
        try {
            /* setLoadingGyms(true) */
            const res = await fetch(`${API_URL}/gyms/searchByName`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    "campo": campo  
                })
            })  

            if (!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo traer los gimnasios',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return;
            }

            const json = await res.json();
            setGymDetail(json)
            setPagina(0)
            setTotalPaginas(0)
            return;
        } catch (error) {
            console.log("Error: " + error_);
                Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });   
        }/* finally{
            setLoadingGyms(false)
        } */
    }

    useEffect(() => {
        getGymsPaginated(pagina);
    }, [pagina])

    return {
        listaGyms,
        gymDetail,
        gymSeleccionado,
        todosLosGyms,
        pagina,
        setPagina,
        totalPaginas,
        totalData,
        limitePagina,
        setListaGyms,
        getGymsPaginated, // <- Traer los productos paginados
        getAllGyms, // <- Traer todos los gimnasios sin paginar
        insertGym, // <- Crear un nuevo gimnasio
        getGymById, // <- Traer un gimnasio por id
        updateGym, // <- Actualizar un gimnasio existente
        deleteGym, // <- Eliminar un gimnasio
        searchGymByName, //<- Buscar Gimnasios por nombre

    }
}

export default useGyms;