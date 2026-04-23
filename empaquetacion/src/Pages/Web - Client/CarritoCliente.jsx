import { useState, useEffect } from "react";
import { Link } from "react-router"
import TarjetaProducto from "../../Components/TarjetaProductosCar"

const Array = [
    {"id": "PR001", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_mockup_bottle_tbpebz.png", "name": "Botella de Agua 250ml", "precioUni": 25.00, "cantidad": 1},
    {"id": "PR002", "image": "https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776624573/Gemini_Generated_Mockup_camisetas_ax9yig.png", "name": "Camiseta Deportiva", "precioUni": 15.00, "cantidad": 2}
]

const CarritoCliente = () => {

    const[ArrayList, setArrayList] = useState(Array)
    const[subtotal, setSubtotal] = useState(0.00);
    const[total, setTotal] = useState(0.00);

    const EliminarProducto=(index)=>{
        let nuevaLista = ArrayList.filter((tarea, indice)=> indice !== index)
        setArrayList(nuevaLista);
    }
    
    //La funcion que determinara el subtotal y el total de los productos
    const calcularTotales = () => {
        const nuevoSubtotal = ArrayList.reduce((acumulador, producto) => {
            return acumulador + (producto.precioUni * producto.cantidad);
        }, 0);

        setSubtotal(nuevoSubtotal);
        setTotal(nuevoSubtotal);
    }

    const SumarProducto = (index) => {
        const NuevaLista = [...ArrayList];
        NuevaLista[index].cantidad += 1;
        setArrayList(NuevaLista);
    }

    const RestarProducto = (index) => {
        const NuevaLista = [...ArrayList];
        
        if(NuevaLista[index].cantidad > 1) {
            NuevaLista[index].cantidad -= 1;
            setArrayList(NuevaLista);
        }
    }

    //Ejecuta la funcion cada vez que hay cambios en el Array   
    useEffect(() => {
        calcularTotales();
    }, [ArrayList]);

    return(
        <main className="flex flex-col p-8 w-full min-h-screen gap-4" style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-row pad-3 justify-between w-full">
                <h1 className="text-4xl" style={{color: "var(--green_455942)"}}>Mi Carrito</h1>
                <div className="flex flex-row text-white p-3 rounded-xl gap-4 items-center" style={{background: 'var(--green_7F9E7A)', maxHeight: "50px"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-shopping-cart-icon lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    {ArrayList.length} productos pendientes
                </div>
            </div>
            <div className="flex flex-row gap-4 min-h-full" style={{display: 'grid', gridTemplateColumns: '4fr 2fr'}}>
                <div className="CarritoProductos gap-4 flex flex-col p-9 w-full rounded-xl" style={{background: 'var(--green_7F9E7A)'}}>
                    <TarjetaProducto Array={ArrayList} MetodoB={EliminarProducto} MetodoMas={SumarProducto} MetodoMenos={RestarProducto}/>
                </div>
                <div className="h-100 flex flex-col p-6 w-full rounded-xl justify-between" style={{background: 'var(--white)'}}>
                    <div className="flex flex-col h-10 justify-center gap-4">
                        <h2 className="text-center text-lg">Resumen de tu pedido</h2>
                        <hr />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-row justify-between text-lg">
                            <p>Subtotal</p>
                            <p><b>${subtotal}</b></p>
                        </div>
                        <div className="flex flex-row justify-between text-lg">
                            <p>Descuento</p>
                            <p><b>0.00%</b></p>
                        </div>
                        <div className="flex flex-row justify-between text-2xl">
                            <p>Total</p>
                            <p><b>${total}</b></p>
                        </div>
                    </div>
                    <Link to="/client/PagocarritoCliente" className="flex items-center gap-4 justify-center text-white p-2 rounded-lg cursor-pointer" style={{background: "var(--green_81A65D)"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                        <p>Pagar</p>
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default CarritoCliente;