import { useState, useEffect } from "react";
import Swal from "sweetalert2"

const useGyms = () => {
    const [listaGyms, setListaGyms] = useState([])
    const [gymDetail, setGymDetail] = useState([])
    
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
        pagina,
        setPagina,
        totalPaginas,
        totalData,
        limitePagina,
        setListaGyms,
        getGymsPaginated, // <- Traer los productos paginados
        searchGymByName, //<- Buscar Gimnasios por nombre

    }
}

export default useGyms;