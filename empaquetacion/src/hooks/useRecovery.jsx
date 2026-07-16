import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router";

const useRecovery = () => {
    const [ email, setEmail ] = useState("");
    const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
    const [ password, setPassword ] = useState("");
    const [ confirmPassword, setConfirmPassword ] = useState("");
    const [loading, setLoading] = useState(false);
    const [tab, setTab] = useState("solicitarCorreo");
    const navigate = useNavigate();

    const EmailSolicitudeClient = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await fetch("http://localhost:4000/apiActiveLife/recoveryPasswordClient/requestCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email })
            });

            if(!res.ok){
                const json = await res.json();
                if(json.message === "user not found"){
                    Swal.fire({
                        position: "top-end",
                        title: 'El correo enviado no existe o no fue encontrado',
                        icon: 'warning',
                        timer: 2500
                    });
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2500
                    });
                }
            }

            setTab("verificarCodigo");
        } catch (error) {
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }finally{
            setLoading(false);
        }
    }

    const VerificarCodigoClient = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const codeString = codigo.join('');

            if(codeString.length != 6){
            Swal.fire({
                position: "top-end",
                title: 'Por favor digita el codigo completo',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false,
            });
            return;
            }

            const res = await fetch("http://localhost:4000/apiActiveLife/recoveryPasswordClient/verifyCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ code: codeString })
            });

            if(!res.ok){
                const json = await res.json();
                if(json.message === "Invalid code"){
                    Swal.fire({
                        position: "top-end",
                        title: 'El codigo enviado no coincide o no fue enviado',
                        icon: 'warning',
                        timer: 2500
                    });
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2500
                    });
                }
            }

            setTab("cambiarContra");
        } catch (error) {
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }finally{
            setLoading(false);
        }
    }

    const ChangePasswordClient = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const res = await fetch("http://localhost:4000/apiActiveLife/recoveryPasswordClient/newPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    newPassword: password,
                    comfirmedPassword: confirmPassword
                })
            });

            if(!res.ok){
                const json = await res.json();
                if(json.message === "Passwords doesn't match"){
                    Swal.fire({
                        position: "top-end",
                        title: 'Las contraseñas enviadas son diferentes',
                        icon: 'warning',
                        timer: 2500
                    });
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2500
                    });
                }
            }

            Swal.fire({
                position: "top-end",
                title: 'Contraseña modificada exitosamente',
                icon: 'success',
                timer: 2500,
                willClose: () => {
                    navigate("/inicioSesion");
                }
            });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }finally{
            setLoading(false);
        }
    }

    const EmailSolicitudeAdmin = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await fetch("http://localhost:4000/apiActiveLife/recoveryPasswordAdmin/requestCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email })
            });

            if(!res.ok){
                const json = await res.json();
                if(json.message === "user not found"){
                    Swal.fire({
                        position: "top-end",
                        title: 'El correo enviado no existe o no fue encontrado',
                        icon: 'warning',
                        timer: 2500
                    });
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2500
                    });
                }
            }

            setTab("verificarCodigo");
        } catch (error) {
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }finally{
            setLoading(false);
        }
    }

    const VerificarCodigoAdmin = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const codeString = codigo.join('');

            if(codeString.length != 6){
            Swal.fire({
                position: "top-end",
                title: 'Por favor digita el codigo completo',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false,
            });
            return;
            }

            const res = await fetch("http://localhost:4000/apiActiveLife/recoveryPasswordAdmin/verifyCode", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ code: codeString })
            });

            if(!res.ok){
                const json = await res.json();
                if(json.message === "Invalid code"){
                    Swal.fire({
                        position: "top-end",
                        title: 'El codigo enviado no coincide o no fue enviado',
                        icon: 'warning',
                        timer: 2500
                    });
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2500
                    });
                }
            }

            setTab("cambiarContra");
        } catch (error) {
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }finally{
            setLoading(false);
        }
    }

    const ChangePasswordAdmin = async(e) => {
        e.preventDefault();
        try {
            setLoading(true);
            
            const res = await fetch("http://localhost:4000/apiActiveLife/recoveryPasswordAdmin/newPassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    newPassword: password,
                    comfirmedPassword: confirmPassword
                })
            });

            if(!res.ok){
                const json = await res.json();
                if(json.message === "Passwords doesn't match"){
                    Swal.fire({
                        position: "top-end",
                        title: 'Las contraseñas enviadas son diferentes',
                        icon: 'warning',
                        timer: 2500
                    });
                }else{
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2500
                    });
                }
            }

            Swal.fire({
                position: "top-end",
                title: 'Contraseña modificada exitosamente',
                icon: 'success',
                timer: 2500,
                willClose: () => {
                    navigate("/admin/inicioSesion");
                }
            });
        } catch (error) {
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        }finally{
            setLoading(false);
        }
    }

    return{
        email,
        setEmail,
        codigo,
        setCodigo,
        loading,
        tab,
        setPassword,
        setConfirmPassword,
        EmailSolicitudeClient,
        VerificarCodigoClient,
        ChangePasswordClient,
        EmailSolicitudeAdmin,
        VerificarCodigoAdmin,
        ChangePasswordAdmin
    }
}

export default useRecovery;