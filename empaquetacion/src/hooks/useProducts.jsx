import { useState, useEffect } from "react";
import Swal from 'sweetalert2'

const useProducts = () => {
    const [ productosArray, setProductosArray ] = useState([]);
    const [ productoDetail, setProductoDetail ] = useState({});
    
    const getProducts = async() => {
        try {
            const res = await fetch("http://localhost:4000/apiActiveLife/products")
            if(!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo traer los productos',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return;
            }
            
            const json = await res.json();
            setProductosArray(json);
        } catch (error_) {
            console.log("Error: " + error_);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });   
        }
    }

    const searchByName = async(nombre) => {
        try {
            const res = await fetch("http://localhost:4000/apiActiveLife/products/getByName", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": nombre
                }),
                credentials: "include",
            })
            if(!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo traer los productos',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return;
            }
            
            const json = await res.json();
            setProductosArray(json);
        } catch (error_) {
            console.log("Error: " + error_);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });   
        }
    }

    const getProductDetail = async(id) => {
        try {
            const res = await fetch(`http://localhost:4000/apiActiveLife/products/${id}`)
            if(!res.ok || !res){
                Swal.fire({
                    position: "top-end",
                    title: 'No se pudo traer los productos',
                    icon: 'error',
                    timer: 2500,
                    showConfirmButton: false,
                });
                return;
            }
            
            console.log(res)
            const json = await res.json();
            console.log(json)
            setProductoDetail(json);
        } catch (error_) {
            console.log("Error: " + error_);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });   
        }
    }

    return{
        productosArray,
        productoDetail,
        getProducts,
        searchByName,
        getProductDetail
    }
}

export default useProducts;