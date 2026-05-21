import { useParams } from "react-router-dom";
import { Array } from "./Tienda";
import { Link } from "react-router-dom";

const datos = Array;

const ProductoDetalle = () => {
  const { id } = useParams();

  const producto = datos.find(p => p.id === id);

  if (!producto) {
    return <h1>Producto no encontrado</h1>;
  }

  return (
    <div className="min-h-screen bg-[#CFD9C7] px-8 py-6">
      <div className="bg-[#8FB080] rounded-2xl p-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="flex flex-col gap-4">
            <img
              src={producto.image}
              alt={producto.name}
              className="object-contain rounded-xl"
            />
          </div>

          <div className="flex flex-col gap-4">
            {/* Nombre del producto */}
            <h1 className="text-white font-Regular text-3xl text-center">{producto.name}</h1>

            {/* Precio unitario */}
            <h1 className="text-white leading-relaxed text-3xl text-center">${producto.precioUni}</h1>

            {/* Descripcion */}
            <div className="rounded-xl px-5 py-4 flex-1 bg-[#455942]">
              <p className="text-white leading-relaxed text-center">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error quas corporis tempora eius est, dignissimos enim ducimus mollitia facilis fugit eveniet dolorem animi culpa excepturi obcaecati magni expedita? Cum, inventore.</p>
            </div>
          </div>
        </div>
        {/* Botón "Añadir al carrito" */}
        <div className="flex flex-row justify-center items-center gap-3 bg[#7A9E6E] rounded-xl px-5 py-3 w-full max-w-[1535px]">
          {/* Botón inscribirse */}
          <Link to="/client/carritoCliente" className="bg-[#455942] rounded-xl px-4 py-1 hover:bg-green-600 hover:scale-105 transition transform">
            <button className="btn flex flex-1 gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><title xmlns="">shopping-cart-outline-sharp</title><path fill="currentColor" d="M5.588 21.413Q5 20.825 5 20t.588-1.412T7 18t1.413.588T9 20t-.587 1.413T7 22t-1.412-.587m10 0Q15 20.825 15 20t.588-1.412T17 18t1.413.588T19 20t-.587 1.413T17 22t-1.412-.587M6.15 6l2.4 5h7l2.75-5zM5.2 4h16.5l-4.975 9H8.1L7 15h12v2H3.625L6.6 11.6L3 4H1V2h3.25zm3.35 7h7z" /></svg>
              <span className="h-50px text-center flex justify-center items-center" style={{ fontSize: "25px" }}>Agregar al carrito</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalle;