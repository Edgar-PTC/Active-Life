import { useEffect, useState } from "react";

const emptyProduct = { name: "", priceRequest: "", stockRequest: "0", category: "", description: "", image: null };

const ModalProductos = ({ isOpen, onClose, product, onSave }) => {
    const [form, setForm] = useState(emptyProduct);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        setForm(product ? {
            name: product.name || "", priceRequest: product.price ?? "", stockRequest: product.stock ?? 0,
            category: product.category || "", description: product.description || "", image: null
        } : emptyProduct);
    }, [product, isOpen]);

    useEffect(() => {
        const handleEsc = (event) => event.key === "Escape" && onClose();
        if (isOpen) document.addEventListener("keydown", handleEsc);
        return () => document.removeEventListener("keydown", handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const submit = async (event) => {
        event.preventDefault();
        if (!form.name.trim() || !form.category.trim() || !form.description.trim() || Number(form.priceRequest) <= 0 || Number(form.stockRequest) < 0) return;
        setSaving(true);
        await onSave(form, product?._id);
        setSaving(false);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <form className="modal-content" onSubmit={submit} onClick={(event) => event.stopPropagation()}>
                <div className="flex flex-col py-5 px-10 w-180 h-full rounded-xl" style={{ backgroundColor: "var(--green_CFD9C7)" }}>
                    <div onClick={onClose} className="flex flex-row items-center py-4 justify-center gap-3" style={{ color: "var(--brown)", filter: "opacity(0.7)" }}>
                        <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6" /></svg>
                        <h2 className="text-xl">{product ? "Editar Producto" : "Agregar Nuevo Producto"}</h2>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2 px-10"><h2 className="text-sm pl-2" style={{ color: "var(--brown)", filter: "opacity(0.7)" }}>Fotos del producto</h2><input type="file" accept="image/*" onChange={(event) => setForm({ ...form, image: event.target.files[0] || null })} /></div>
                        <div className="flex flex-row gap-2 w-full">
                            <Field label="Nombre del Producto" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
                            <Field label="Precio" type="number" value={form.priceRequest} onChange={(value) => setForm({ ...form, priceRequest: value })} />
                        </div>
                        <div className="flex flex-row gap-2 w-full">
                            <Field label="Categorias" value={form.category} onChange={(value) => setForm({ ...form, category: value })} />
                            <Field label="Stock" type="number" value={form.stockRequest} onChange={(value) => setForm({ ...form, stockRequest: value })} />
                        </div>
                        <div className="flex flex-col gap-1"><label className="text-sm" style={{ color: "var(--brown)", filter: "opacity(0.7)" }}>Descripción</label><textarea required className="bg-white py-2 px-4 rounded-lg" style={{ color: "var(--brown)", filter: "opacity(0.7)" }} value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="Describe los detalles del producto..." /></div>
                        <button disabled={saving} className="w-full flex py-2 px-5 rounded-xl items-center justify-center text-white gap-2" style={{ backgroundColor: "var(--green_455942)" }}>{saving ? "Guardando..." : "Guardar Producto"}</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

const Field = ({ label, type = "text", value, onChange }) => <div className="flex flex-col gap-1 w-full"><label className="text-sm" style={{ color: "var(--brown)", filter: "opacity(0.7)" }}>{label}</label><input required min={type === "number" ? "0" : undefined} className="bg-white py-2 px-4 rounded-lg" style={{ color: "var(--brown)", filter: "opacity(0.7)" }} type={type} value={value} onChange={(event) => onChange(event.target.value)} /></div>;

export default ModalProductos;
