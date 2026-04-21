import React from "react";

const CardProductDashClient = ({ Producto }) => {
    return(
        <div className="flex flex-col p-0 rounded-xl" style={{backgroundColor: "var(--green_7F9E7A)"}}>
            <img className="rounded-xl" style={{borderBottomLeftRadius: '0px', borderBottomRightRadius: "0px"}} src={Producto.image} alt="Foto del producto" />
            <div className="p-4 text-white">
                <h2 className="text-lg">{Producto.name}</h2>
                <p className="text-m">${Producto.precioUni}</p>
            </div>
        </div>
    )
}

export default CardProductDashClient;