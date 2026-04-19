import { useState, useEffect } from "react";
import TextCarousel from "../../Components/textCarrusel";

const Array = [
    {"head": "Sobre Nosotros", "text": "Nosotros ofrecemos soluciones integrales orientadas al bienestar físico y al desarrollo de un estilo de vida saludable. Brindamos servicios de reabastecimiento de equipo deportivo y productos de suplementación para fitness y fisicoculturismo, garantizando calidad, disponibilidad y asesoría adecuada según las necesidades de cada cliente."},
    {"head": "Mision", "text": "Nuestra misión es ofrecer a nuestros clientes una solución integral para el bienestar físico , ofreciendo abastecimiento confiable de equipo deportivo y suplementos, junto a planes y membresías que impulsan a las personas a seguir un estilo de vida más saludable, facilitando su progreso de manera accesible, constante y sostenible."},
    {"head": "Vision", "text": "Ser una empresa referente en el sector de salud y fitness, reconocida por transformar vidas a través de un modelo integral que combine productos de calidad, asesoría estratégica y acceso a servicios deportivos, contribuyendo al desarrollo de una comunidad más activa y comprometida con su bienestar."}
]

const Us = () => {
    return(
        <>
            <div className="BannerHome Us">
                <TextCarousel textosArray={Array}/>
            </div>
        </>
    )
}

export default Us;