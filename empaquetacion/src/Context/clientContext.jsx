import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2'

const AuthContext = createContext();

// Evita hidratar el contexto con valores corruptos (ej. el string literal "undefined")
const esIdValido = (id) => typeof id === "string" && /^[0-9a-fA-F]{24}$/.test(id);

export const AuthProvider = ({ children }) => {
    const [ Nombre, setNombre ] = useState(() => {
        return localStorage.getItem("authNombre") || ""
    });
    const [ Id, setId ] = useState(() => {
        const idGuardado = localStorage.getItem("authId");
        return esIdValido(idGuardado) ? idGuardado : ""
    });
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ isloggedIn, setIsLoggedIn ] = useState(() => {
        return localStorage.getItem("authIsLoggedIn") || false
    })
    const navigate = useNavigate();

    const LogInCliente = async(event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if(!email || !password){
                Swal.fire({
                    position: "top-end",
                    title: 'Completa ambos campos para verificar tu identidad',
                    icon: 'error',
                    timer: 2500
                });
                return;
            }

            const response = await fetch("http://localhost:4000/apiActiveLife/logInClients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                }),
                credentials: "include",
            });

            if(!response.ok){
                const json = await response.json();
                if(json.message == "Email not found"){
                    Swal.fire({
                        position: "top-end",
                        title: 'No existe ningun usuario con este correo',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                }
                if(json.message == "Cuenta bloqueada"){
                    let time = parseFloat(json.time / 60 /1000);
                    time = time.toFixed(0)
                    Swal.fire({
                        position: "top-end",
                        title: `Cuenta bloqueada. Espera ${time} minutos`,
                        icon: 'error',
                        timer: json.time,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }
                if(json.message == "Contraseña incorrecta"){
                    Swal.fire({
                        position: "top-end",
                        title: 'Contraseña incorrecta. Intentalo de nuevo',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                }
                return;
            }

            const json = await response.json();
            if (json.Id) {
                localStorage.setItem("authId", json.Id);
                setId(json.Id);
            }
            localStorage.setItem("authNombre", json.Nombre);
            localStorage.setItem("authIsLoggedIn", true);

            Swal.fire({
                position: "top-end",
                title: 'Inicio de sesion exitoso. ¡Bienvenido!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                willClose: () => {
                    navigate("/client/dashboard");
                }
            });
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        } finally {
            setLoading(false);
        }
    }

    const LogInAdmin = async(event) => {
        event.preventDefault();
        try {
            setLoading(true);
            if(!email || !password){
                Swal.fire({
                    position: "top-end",
                    title: 'Completa ambos campos para verificar tu identidad',
                    icon: 'error',
                    timer: 2500
                });
                return;
            }

            const response = await fetch("http://localhost:4000/apiActiveLife/loginAdmin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "email": email,
                    "password": password
                }),
                credentials: "include",
            });

            if(!response.ok){
                const json = await response.json();
                if(json.message == "Email no encontrado"){
                    Swal.fire({
                        position: "top-end",
                        title: 'No existe ningun usuario con este correo',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                }
                if(json.message == "Cuenta bloqueada"){
                    let time = parseFloat(json.time / 60 /1000);
                    time = time.toFixed(0)
                    Swal.fire({
                        position: "top-end",
                        title: `Cuenta bloqueada. Espera ${time} minutos`,
                        icon: 'error',
                        timer: json.time,
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                }
                if(json.message == "Contraseña incorrecta"){
                    Swal.fire({
                        position: "top-end",
                        title: 'Contraseña incorrecta. Intentalo de nuevo',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                }
                if(json.message == "Verifica tu correo primero"){
                    Swal.fire({
                        position: "top-end",
                        title: 'Verifica tu correo antes de iniciar sesion',
                        icon: 'error',
                        timer: 2500,
                        showConfirmButton: false,
                    });
                }
                return;
            }

            const json = await response.json();
            if (json.Id) {
                localStorage.setItem("authId", json.Id);
                setId(json.Id);
            }
            localStorage.setItem("authNombre", json.Nombre);
            localStorage.setItem("authIsLoggedIn", true);

            Swal.fire({
                position: "top-end",
                title: 'Inicio de sesion exitoso. ¡Bienvenido!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false,
                willClose: () => {
                    navigate("/admin/dashboard");
                }
            });
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        } finally {
            setLoading(false);
        }
    }

    const verify = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:4000/apiActiveLife/auth/client", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })

            console.log(res);

            if(!res.ok){
                const response = await fetch("http://localhost:4000/apiActiveLife/auth/admin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                });

                console.log(response)

                if(!response.ok){
                    Swal.fire({
                        position: "top-end",
                        title: 'Error interno del servidor',
                        icon: 'error',
                        timer: 2500
                    });
                    navigate("admin/inicioSesion");
                    return;
                }

                const json = await response.json();
                if (json.Id) {
                    localStorage.setItem("authId", json.Id);
                    setId(json.Id);
                }
                localStorage.setItem("authNombre", json.Nombre);
                localStorage.setItem("authIsLoggedIn", true);
                setNombre(json.Nombre);
                setIsLoggedIn(true);
                return;
            }

            const json = await res.json();
            if (json.Id) {
                localStorage.setItem("authId", json.Id);
                setId(json.Id);
            }
            localStorage.setItem("authNombre", json.Nombre);
            localStorage.setItem("authIsLoggedIn", true);
            setNombre(json.Nombre);
            setIsLoggedIn(true);
        } catch (error) {
            console.log("Error: " + error);
            Swal.fire({
                position: "top-end",
                title: 'Error interno del servidor',
                icon: 'error',
                timer: 2500
            });
        } finally {
            setLoading(false);
        }
    }

    const logOut = async () => {
        try {
            setLoading(true);
            await fetch("http://localhost:4000/apiActiveLife/logOutClients", {
                method: "POST",
                credentials: "include",
            });
            localStorage.removeItem("authId");
            localStorage.removeItem("authNombre");
            localStorage.removeItem("authIsLoggedIn");
            navigate("/inicioSesion");
        } catch (error) {
            console.log("Error: " + error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        verify();
    }, []);

    return (
        <AuthContext.Provider value={{
            Nombre,
            Id,
            isloggedIn,
            email,
            setEmail,
            password,
            setPassword,
            loading,
            LogInCliente,
            LogInAdmin,
            verify,
            logOut,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);