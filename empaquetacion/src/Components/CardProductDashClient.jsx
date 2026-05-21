import { Link, useLocation } from "react-router";

const CardProductDashClient = ({ Producto }) => {
    const location = useLocation();

    const mostrarBoton = location.pathname.startsWith("/client/tienda");

    return (
        <div className="flex flex-col p-4 rounded-xl shadow-sm hover:shadow-md transition" style={{ backgroundColor: "var(--green_7F9E7A)" }}>
            <img
                className="rounded-xl"
                style={{ borderBottomLeftRadius: '0px', borderBottomRightRadius: "0px" }}
                src={Producto.image}
                alt="Foto del producto"
            />

            <div className="p-5 text-white flex flex-row justify-between items-center gap-3">
                <div className="flex flex-col">
                    <h2 className="text-lg">{Producto.name}</h2>
                    <p className="text-m">${Producto.precioUni}</p>
                </div>
                <span className="flex flex-row">
                    {mostrarBoton && (
                        <Link
                            to={`/client/productoDetalle/${Producto.id}`}
                            className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 hover:scale-105 transition transform"
                        >
                            Ver detalles
                        </Link>
                    )}
                </span>
            </div>
        </div>
    );
};

export default CardProductDashClient;