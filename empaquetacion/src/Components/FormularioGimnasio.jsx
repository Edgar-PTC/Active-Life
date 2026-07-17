import { useState, useEffect } from "react";
import { Link } from "react-router"

const valoresVacios = { name: "", description: "", address: "", city: "", municipio: "", imagenesExistentes: [] };

const FormularioGimnasio = ({ valoresIniciales = valoresVacios, onGuardar, cargando, tituloFormulario, textoBoton }) => {
    const [name, setName] = useState(valoresIniciales.name)
    const [address, setAddress] = useState(valoresIniciales.address)
    const [city, setCity] = useState(valoresIniciales.city)
    const [municipio, setMunicipio] = useState(valoresIniciales.municipio)
    const [description, setDescription] = useState(valoresIniciales.description)
    const [nuevasFotos, setNuevasFotos] = useState([])

    // Cuando llegan los datos del gimnasio a editar (carga asíncrona), se rellenan los inputs
    useEffect(() => {
        setName(valoresIniciales.name ?? "")
        setAddress(valoresIniciales.address ?? "")
        setCity(valoresIniciales.city ?? "")
        setMunicipio(valoresIniciales.municipio ?? "")
        setDescription(valoresIniciales.description ?? "")
    }, [valoresIniciales.name, valoresIniciales.address, valoresIniciales.city, valoresIniciales.municipio, valoresIniciales.description])

    const manejarSeleccionFotos = (e) => {
        setNuevasFotos(Array.from(e.target.files))
    }

    const manejarGuardar = () => {
        if (!name) return;
        onGuardar({ name, description, address, city, municipio, images: nuevasFotos })
    }

    const imagenesExistentes = valoresIniciales.imagenesExistentes ?? []

    return(
        <main className="flex p-8 h-full min-h-screen"  style={{background: 'var(--green_CFD9C7)'}}>
            <div className="flex flex-col gap-6 w-full">
                <div className="flex flex-row justify-start items-center gap-4" style={{color: 'var(--brown)', filter: "opacity(0.7)"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-folder-plus-icon lucide-folder-plus"><path d="M12 10v6"/><path d="M9 13h6"/><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/></svg>
                    <h2 className="text-2xl">{tituloFormulario}</h2>
                </div>
                <div className="flex flex-row w-full gap-3" style={{display: 'grid', gridTemplateColumns: '2fr 3fr'}}>
                    <div className="flex flex-col h-full gap-4 wfull">
                        <div className="flex flex-col h-full wfull">
                            <label htmlFor="Photo" className="InputPhotoGym flex flex-col flex-1 rounded-xl items-center justify-center gap-2 h-full min-h-70 w-full">
                                <div className="flex items-center justify-center rounded-full p-4" style={{backgroundColor: "var(--green_CFD9C7)"}}>
                                    <svg style={{color: "var(--green_7F9E7A)"}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg>
                                </div>
                                <h2 className="text-xl" style={{color: 'var(--green_455942)'}}>Subir fotos (sin límite)</h2>
                                <p className="text-xs w-90 text-center" style={{color: "var(--gray)", filter: "opacity(0.7)"}}>Arrastra tus fotos aquí o haz clic para seleccionarlas. Formatos soportados: JPG, PNG.</p>
                                {imagenesExistentes.length > 0 && (
                                    <p className="text-xs" style={{color: "var(--gray)"}}>{imagenesExistentes.length} foto(s) ya guardada(s)</p>
                                )}
                                {nuevasFotos.length > 0 && (
                                    <p className="text-xs font-medium" style={{color: "var(--green_7F9E7A)"}}>{nuevasFotos.length} foto(s) nueva(s) seleccionada(s)</p>
                                )}
                            </label>
                            <input type="file" name="Photo" id="Photo" multiple accept="image/png, image/jpeg" style={{display: 'none'}} onChange={manejarSeleccionFotos} />
                        </div>
                        {imagenesExistentes.length > 0 && (
                            <div className="flex flex-row flex-wrap gap-2">
                                {imagenesExistentes.map((img) => (
                                    <img key={img.public_id ?? img.image} src={img.image} className="w-16 h-16 rounded-lg object-cover" />
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-5">
                        <div className="flex p-6 flex-col gap-6 rounded-xl" style={{backgroundColor: "rgba(127, 158, 122, 0.5)"}}>
                            <div className="flex flex-col w-full gap-1 items-start">
                                <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="NameGym">Nombre del Gimnasio</label>
                                <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="NameGym" id="NameGym" placeholder="Ej: Fitness Fusion Elite" value={name} onChange={(e) => setName(e.target.value)}/>
                            </div>
                            <div className="flex flex-col w-full gap-1 items-start">
                                <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="AdressGym">Dirección Completa</label>
                                <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="AdressGym" id="AdressGym" placeholder="Calle, número, colonia..." value={address} onChange={(e) => setAddress(e.target.value)}/>
                            </div>
                            <div className="flex flex-row gap-3">
                                <div className="flex flex-col w-full gap-1 items-start">
                                    <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="CiudadGym">Cuidad</label>
                                    <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="CiudadGym" id="CiudadGym" placeholder="Ej: San Salvador" value={city} onChange={(e) => setCity(e.target.value)}/>
                                </div>
                                <div className="flex flex-col w-full gap-1 items-start">
                                    <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="MunicipioGym">Municipio</label>
                                    <input className="w-full h-10 bg-white p-3 rounded-xl" type="text" name="MunicipioGym" id="MunicipioGym" placeholder="Ej: San Marcos" value={municipio} onChange={(e) => setMunicipio(e.target.value)}/>
                                </div>
                            </div>
                            <hr className="text-white" />
                            <div className="flex flex-col w-full gap-1 items-start">
                                <label className="text-md pl-3" style={{color: 'var(--gray)'}} htmlFor="DescriptionGym">Descripción</label>
                                <textarea className="w-full h-32 bg-white p-3 rounded-xl resize-none" name="DescriptionGym" id="DescriptionGym" placeholder="Cuéntale a tus clientes sobre las instalaciones, horarios y servicios de este gimnasio..." value={description} onChange={(e) => setDescription(e.target.value)}/>
                            </div>
                        </div>
                        <div className="flex flex-row justify-end items-center gap-6">
                            <Link className="text-md flex items-center justify-center" style={{color: "var(--gray)"}} to="/admin/gimnasios">Cancelar</Link>
                            <button
                                type="button"
                                onClick={manejarGuardar}
                                disabled={cargando || !name}
                                className="rounded-xl flex items-center gap-2 justify-center py-2 px-12 text-white disabled:opacity-50"
                                style={{backgroundColor: "var(--green_455942)"}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save-icon lucide-save"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>
                                {cargando ? "Guardando..." : textoBoton}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default FormularioGimnasio;
