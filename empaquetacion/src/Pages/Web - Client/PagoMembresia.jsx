import { useState, useEffect } from "react";
import { Link } from "react-router"

const Array = [
    {"id": "MBR001", "name": "Membresia Patino", "gimnasioNombre": "Fitness Fusion", "precioUni": 8.99, "PeriodoPago": "Mensualmente"},

]

const PagoMembresia = () => {
    const[ArrayList, setArrayList] = useState(Array)
    const[subtotal, setSubtotal] = useState(0.00);
    const[total, setTotal] = useState(0.00);

    const calcularTotales = () => {
        const nuevoSubtotal = ArrayList.reduce((acumulador, producto) => {
            return acumulador + (producto.precioUni * producto.cantidad);
        }, 0);

        setSubtotal(nuevoSubtotal);
        setTotal(nuevoSubtotal);
    }

    useEffect(() => {
        calcularTotales();
    }, [ArrayList]);

    return(
        <main className="flex flex-col p-8 w-full min-h-screen" style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-row gap-4 p-6 rounded-3xl min-h-full" style={{display: 'grid', gridTemplateColumns: '4fr 2fr', background: 'var(--green_7F9E7A)'}}>
                <div className="flex flex-col pl-6 pr-6 pt-2 pb-2 justify-between gap-10">
                    <div>
                        <h1 className="text-white text-3xl">FINALIZAR COMPRA</h1>
                        <h2 className="text-white text-m">Ingrese sus datos para finalizar la compra</h2>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-row gap-10 justify-start pl-3">
                                <div className="text-white flex flex-col items-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="2.5rem" height="2.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round" class="lucide lucide-credit-card-icon lucide-credit-card"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
                                    Tarjeta de Credito
                                </div>
                                <div className="text-white flex flex-col items-center gap-0 cursor-pointer">
                                    <svg className="p-0 m-0" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="2.5rem" height="2.5rem" fill="white" version="1.1" id="Layer_1" viewBox="0 0 2387.3 948" xml:space="preserve">
                                        <g>
                                            <path class="st0" d="M1129.1,463.2V741h-88.2V54.8h233.8c56.4-1.2,110.9,20.2,151.4,59.4c41,36.9,64.1,89.7,63.2,144.8   c1.2,55.5-21.9,108.7-63.2,145.7c-40.9,39-91.4,58.5-151.4,58.4L1129.1,463.2L1129.1,463.2z M1129.1,139.3v239.6h147.8   c32.8,1,64.4-11.9,87.2-35.5c46.3-45,47.4-119.1,2.3-165.4c-0.8-0.8-1.5-1.6-2.3-2.3c-22.5-24.1-54.3-37.3-87.2-36.4L1129.1,139.3   L1129.1,139.3z M1692.5,256.2c65.2,0,116.6,17.4,154.3,52.2c37.7,34.8,56.5,82.6,56.5,143.2V741H1819v-65.2h-3.8   c-36.5,53.7-85.1,80.5-145.7,80.5c-51.7,0-95-15.3-129.8-46c-33.8-28.5-53-70.7-52.2-115c0-48.6,18.4-87.2,55.1-115.9   c36.7-28.7,85.7-43.1,147.1-43.1c52.3,0,95.5,9.6,129.3,28.7v-20.2c0.2-30.2-13.2-58.8-36.4-78c-23.3-21-53.7-32.5-85.1-32.1   c-49.2,0-88.2,20.8-116.9,62.3l-77.6-48.9C1545.6,286.8,1608.8,256.2,1692.5,256.2L1692.5,256.2z M1578.4,597.3   c-0.1,22.8,10.8,44.2,29.2,57.5c19.5,15.3,43.7,23.5,68.5,23c37.2-0.1,72.9-14.9,99.2-41.2c29.2-27.5,43.8-59.7,43.8-96.8   c-27.5-21.9-65.8-32.9-115-32.9c-35.8,0-65.7,8.6-89.6,25.9C1590.4,550.4,1578.4,571.7,1578.4,597.3L1578.4,597.3z M2387.3,271.5   L2093,948h-91l109.2-236.7l-193.6-439.8h95.8l139.9,337.3h1.9l136.1-337.3L2387.3,271.5z"/>
                                        </g>
                                        <path class="st1" d="M772.8,403.2c0-26.9-2.2-53.7-6.8-80.2H394.2v151.8h212.9c-8.8,49-37.2,92.3-78.7,119.8v98.6h127.1  C729.9,624.7,772.8,523.2,772.8,403.2L772.8,403.2z"/>
                                        <path class="st2" d="M394.2,788.5c106.4,0,196-34.9,261.3-95.2l-127.1-98.6c-35.4,24-80.9,37.7-134.2,37.7  c-102.8,0-190.1-69.3-221.3-162.7H42v101.6C108.9,704.5,245.2,788.5,394.2,788.5z"/>
                                        <path class="st3" d="M172.9,469.7c-16.5-48.9-16.5-102,0-150.9V217.2H42c-56,111.4-56,242.7,0,354.1L172.9,469.7z"/>
                                        <path class="st4" d="M394.2,156.1c56.2-0.9,110.5,20.3,151.2,59.1L658,102.7C586.6,35.7,492.1-1.1,394.2,0  C245.2,0,108.9,84.1,42,217.2l130.9,101.6C204.1,225.4,291.4,156.1,394.2,156.1z"/>
                                    </svg>
                                    GooglePay
                                </div>
                            </div>
                            <hr style={{border: '2px solid #455942'}} />
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-col w-full gap-2">
                                <label className="pl-3 text-white text-xl" htmlFor="CardTitular">Nombre del titular</label>
                                <input className="rounded-xl p-4" style={{backgroundColor: "var(--white)"}} type="text" placeholder="Nombre como aparece en la tarjeta" id="CardTitular" name="CardTitular" />
                            </div>
                            <div className="flex flex-col w-full gap-2">
                                <label className="pl-3 text-white text-xl" htmlFor="CardNumber">Numero de tarjeta</label>
                                <input className="rounded-xl p-4" style={{backgroundColor: "var(--white)"}} type="Number" placeholder="0000 0000 0000 0000" id="CardNumber" name="CardNumber" />
                            </div>
                            <div className="flex flex-row gap-5">
                                <div className="flex flex-col w-full gap-2">
                                    <label className="pl-3 text-white text-xl" htmlFor="CardDate">Fecha de expiracion</label>
                                    <input className="rounded-xl p-4" style={{backgroundColor: "var(--white)"}} type="month" id="CardDate" name="CardDate" />
                                </div>
                                <div className="flex flex-col w-full gap-2">
                                    <label className="pl-3 text-white text-xl" htmlFor="CardCVV">CVV</label>
                                    <input className="rounded-xl p-4" style={{backgroundColor: "var(--white)"}} type="Number" placeholder="000" id="CardCVV" name="CardCVV" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rounded-xl pl-6 pr-6 pt-3 pb-3 flex flex-col justify-between" style={{background: 'var(--green_CFD9C7)'}}>
                    <h2 className="text-xl text-center">Resumen de la compra</h2>
                    <div className="p-0 flex flex-col rounded-xl">
                       <div className="p-0 flex flex-col rounded-xl gap-3">
                        {ArrayList.map((item) => (
                            <div
                            key={item.id}
                            className="flex flex-row items-center justify-between rounded-xl p-6"
                            style={{ background: "var(--green_7F9E7A)" }}
                            >
                                {/* Info de la membresía */}
                                <div className="flex flex-col gap-1">
                                    <p className="text-white font-regular text-sm leading-tight">{item.name}</p>
                                    <p className="text-white/75 text-xs">{item.gimnasioNombre}</p>
                                </div>
                        
                            {/* Precio */}
                            <div className="flex felx-col gap-1">
                                <p className="text-white font-regular text-lg">${item.precioUni.toFixed(2)}</p>
                                <span
                                    className="text-xs font-regular px-2 py-1 rounded-full w-fit"
                                    style={{ background: "var(--green_81A65D)", color: "#fff" }}
                                    >
                                    {item.PeriodoPago}
                                </span>
                            </div>
                           
                            </div>
                        ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <hr style={{border: '1.5px solid var(--green_81A65D)'}} />
                        <div className="flex flex-row justify-between text-m">
                            <p>Subtotal</p>
                            <p>${subtotal}</p>
                        </div>
                        <div className="flex flex-row justify-between text-m">
                            <p>Descuento</p>
                            <p>0.00%</p>
                        </div>
                        <div className="flex flex-row justify-between text-xl">
                            <p>Total</p>
                            <p>${total}</p>
                        </div>
                    </div>
                    <Link to="/client/GimnasioDetalle" className="flex items-center gap-4 justify-center text-white p-2 rounded-lg cursor-pointer" style={{background: "var(--green_81A65D)"}}>
                    Finalizar Pago
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default PagoMembresia;