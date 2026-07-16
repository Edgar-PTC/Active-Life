import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import TableProdu from "../../Components/TableProdAd";
import ModalProductos from "../../Components/ModalProductoAdm";
import ModalProveedores from "../../Components/ModalProveedorAdm";

const API = "http://localhost:4000/apiActiveLife/products";

const errorToast = (title) => Swal.fire({ position: "top-end", title, icon: "error", timer: 2500, showConfirmButton: false });
const successToast = (title) => Swal.fire({ position: "top-end", title, icon: "success", timer: 2000, showConfirmButton: false });

const ProductosAdmin = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isProvModalOpen, setIsProvModalOpen] = useState(false);
  const [isProdModalOpen, setIsProdModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const loadProducts = async () => {
    try {
      const response = await fetch(API, { credentials: "include" });
      if (!response.ok) throw new Error();
      setProducts(await response.json());
    } catch {
      errorToast("No se pudieron cargar los productos");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const filteredProducts = useMemo(
    () => products.filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  const openCreate = () => {
    setSelectedProduct(null);
    setIsProdModalOpen(true);
  };

  const openEdit = (product) => {
    setSelectedProduct(product);
    setIsProdModalOpen(true);
  };

  const closeProduct = () => {
    setIsProdModalOpen(false);
    setSelectedProduct(null);
  };

  const saveProduct = async (form, id) => {
    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value !== null && value !== "") data.append(key, value);
    });

    try {
      const response = await fetch(id ? `${API}/${id}` : API, { method: id ? "PUT" : "POST", body: data, credentials: "include" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      await loadProducts();
      closeProduct();
      successToast(id ? "Producto actualizado" : "Producto creado");
    } catch (error) {
      errorToast(error.message || "No se pudo guardar el producto");
    }
  };

  const deleteProduct = async (product) => {
    const confirmation = await Swal.fire({
      title: "¿Eliminar producto?",
      text: product.name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (!confirmation.isConfirmed) return;

    try {
      const response = await fetch(`${API}/${product._id}`, { method: "DELETE", credentials: "include" });
      if (!response.ok) throw new Error();
      await loadProducts();
      successToast("Producto eliminado");
    } catch {
      errorToast("No se pudo eliminar el producto");
    }
  };

  return (
    <main className="flex p-8 h-full min-h-screen" style={{ background: "var(--green_CFD9C7)" }}>
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full flex flex-row justify-between items-center">
          <div className="flex flex-row justify-start gap-3 items-center" style={{ color: "var(--brown)", filter: "opacity(0.7)" }}>
            <h2 className="text-2xl">Gestión de Productos</h2>
          </div>
          <div className="flex flex-row gap-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="bg-white py-2 px-4 rounded-xl"
              placeholder="Buscar productos"
            />
            <button
              type="button"
              onClick={openCreate}
              className="flex cursor-pointer items-center gap-4 text-white rounded-xl justify-center pb-2 pt-2 pr-4 pl-4"
              style={{ backgroundColor: "var(--green_7F9E7A)" }}
            >
              Nuevo Producto
            </button>
            <button
              type="button"
              onClick={() => setIsProvModalOpen(true)}
              className="flex cursor-pointer items-center gap-4 text-white rounded-xl justify-center pb-2 pt-2 pr-4 pl-4"
              style={{ backgroundColor: "var(--green_7F9E7A)" }}
            >
              Nuevo Proveedor
            </button>
          </div>
        </div>

        <ModalProductos isOpen={isProdModalOpen} onClose={closeProduct} product={selectedProduct} onSave={saveProduct} />
        <ModalProveedores isOpen={isProvModalOpen} onClose={() => setIsProvModalOpen(false)} />

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="flex flex-row w-full" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr" }}>
                {["Imagen", "Nombre del Producto", "Categoria", "Precio", "Stock", "Acciones"].map((title) => (
                  <th key={title} className="py-4 text-center text-xs font-medium tracking-widest uppercase text-gray-500">
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <TableProdu key={product._id} Produ={product} onEdit={openEdit} onDelete={deleteProduct} />
              ))}
              <tr>
                <td colSpan="6" className="flex flex-row w-full justify-between px-6 py-4 items-center">
                  <p className="text-sm" style={{ color: "var(--brown)" }}>
                    Mostrando {filteredProducts.length} de {products.length} productos
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default ProductosAdmin;
