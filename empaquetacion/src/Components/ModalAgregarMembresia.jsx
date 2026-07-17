import { useState } from "react";
import useMemberships from "../hooks/useMemberships";

const ModalAgregarMembresia = ({ gymId, gymName, onClose, onSuccess }) => {
    const { loadingMembership, insertMembership } = useMemberships()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [paymentPeriod, setPaymentPeriod] = useState("Mensual")

    const guardarMembresia = async () => {
        if (!name || !price || !paymentPeriod) return;

        const guardado = await insertMembership({
            name,
            price: Number(price),
            description,
            paymentPeriod,
            gymId
        })

        if (guardado) {
            onSuccess?.();
            onClose();
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded w-96 shadow-lg">
                <h3 className="text-xl font-bold mb-1" style={{ color: "var(--green_455942)" }}>
                    Agregar Membresía
                </h3>
                <p className="text-sm text-gray-500 mb-4">{gymName}</p>

                <input
                    type="text"
                    placeholder="Nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                />

                <div className="flex items-center border mb-3 rounded">
                    <span className="px-2">$</span>
                    <input
                        type="number"
                        placeholder="Precio"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full p-2 outline-none"
                    />
                </div>

                <textarea
                    placeholder="Descripción"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full border p-2 mb-3 rounded"
                    rows={3}
                />

                <select
                    value={paymentPeriod}
                    onChange={(e) => setPaymentPeriod(e.target.value)}
                    className="w-full border p-2 mb-4 rounded"
                >
                    <option value="Mensual">Mensual</option>
                    <option value="Trimestral">Trimestral</option>
                    <option value="Semestral">Semestral</option>
                    <option value="Anual">Anual</option>
                </select>

                <div className="flex justify-between">
                    <button
                        onClick={guardarMembresia}
                        disabled={loadingMembership}
                        className="text-white px-4 py-2 rounded transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50"
                        style={{ background: "var(--green_455942)" }}
                    >
                        {loadingMembership ? "Guardando..." : "Guardar"}
                    </button>
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded transition hover:bg-gray-500"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModalAgregarMembresia;
