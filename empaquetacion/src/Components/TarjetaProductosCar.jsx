import React from "react";

const TarjetaProducto = ({ Array, MetodoB, MetodoMas, MetodoMenos }) => {
    return(
        <>
            {Array.map((Producto, index) => (
            <div key={Producto.id} className="flex flex-row rounded-2xl w-full justify-between" style={{background: 'var(--green_CFD9C7)'}}>
                <div className="flex flex-row">
                    <img className="CariitoImages rounded-2xl" style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}} src={Producto.image} alt="" />
                    <div className="flex flex-col p-3 justify-around">
                        <div className="flex flex-col items-start justify-center gap-2">
                            <h2 className="text-2xl">{Producto.name}</h2>
                            <h3 className="text-lg">${Producto.precioUni} c/u</h3>
                        </div>
                        <div className="Box_Plus_Min rounded-lg p-0">
                            <button onClick={() => MetodoMenos(index)} className="rounded-lg" style={{borderTopRightRadius: '0', borderBottomRightRadius: '0'}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus-icon lucide-minus"><path d="M5 12h14"/></svg></button>
                            <div className="flex items-center justify-center">{Producto.cantidad}</div>
                            <button onClick={() => MetodoMas(index)} className="rounded-lg" style={{borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plus-icon lucide-plus"><path d="M5 12h14"/><path d="M12 5v14"/></svg></button>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-2/12 rounded-2xl cursor-pointer" onClick={() => MetodoB(index)} style={{background: 'var(--pink)', borderTopLeftRadius: '0', borderBottomLeftRadius: '0'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </div>
            </div>
            ))}
        </>
    )
}

export default TarjetaProducto;