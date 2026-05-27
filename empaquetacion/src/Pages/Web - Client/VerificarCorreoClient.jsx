import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router"

const VerificarCorreo = () => {
  const navigate = useNavigate();
  const [codigo, setCodigo] = useState(["", "", "", "", "", ""]);
  const [ loading, setLoading ] = useState(false)

  const handleChange = (value, index) => {
    const nuevoCodigo = [...codigo];
    nuevoCodigo[index] = value;
    setCodigo(nuevoCodigo);

    // mover automáticamente al siguiente input
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (codigo[index] === '' && index > 0) {
        document.getElementById(`code-${index - 1}`).focus();
        const nuevoCodigo = [...codigo];
        nuevoCodigo[index - 1] = '';
        setCodigo(nuevoCodigo);
      }
    };
  }

  const verificar = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const codeString = codigo.join('');
      if(codeString.length != 6){
        Swal.fire({
          position: "top-end",
          title: 'Por favor digita el codigo completo',
          icon: 'error',
          timer: 2500
        });
        return;
      }

      const response = await fetch("http://localhost:4000/apiActiveLife/registerClients/verifyCode", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "verificationCodeRequest": codeString
        }),
        credentials: "include",
      });

      if(response.ok){
        console.log("Verificado");
        Swal.fire({
          position: "top-end",
          title: 'Verificacion Correcta. ¡Bienvenido!',
          icon: 'success',
          timer: 2500,
          willClose: () => {
              navigate("inicioSesion");   
        }
      });
      }else{
        const json = await response.json();
        if(json.message == "Invalid code"){
          Swal.fire({
            position: "top-end",
            title: 'Codigo incorrecto. ¡Vuelve a intentarlo!',
            icon: 'error',
            timer: 1500
          });
        }else{
          Swal.fire({
            position: "top-end",
            title: 'Error interno Verificando el correo. ¡Vuelve a intentarlo!',
            icon: 'error',
            timer: 2500
          });
        }
        return;
      }
    } catch (error_) {
      console.log("Error: " + error_);
      Swal.fire({
        position: "top-end",
        title: 'Error interno del servidor',
        icon: 'error',
        timer: 2500
      });
    }finally{
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b')",
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <form onSubmit={verificar} className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/30 animate-fadeIn">

        <div className="flex flex-col items-center justify-center pb-3">
          <img className="w-70" src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="ActiveLife Logo" />
          <h1 className="text-3xl text-white">VERIFIFCACION</h1>
        </div>

        <p className="text-sm text-gray-200 mb-6">
          Solamente necesitamos verificar el correo electrónico que ingresaste.
          <br />
          Revisa la bandeja de entrada de tu correo, por favor ingresa el código que aparece.
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {codigo.map((num, index) => (
            <input
              key={index}
              autoComplete="off"
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-12 h-12 text-center text-xl rounded-lg bg-white/30 text-white outline-none border border-white/30 focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#7F9E7A] text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-[#6e8c69] hover:scale-105 active:scale-95"
        >
          {loading ? "Verificando..." : "Verificar"}
        </button>

        <Link to="/register" className="text-gray-300 text-sm mt-3 cursor-pointer hover:underline">
          Regresar
        </Link>
      </form>
    </div>
    
  );
};

export default VerificarCorreo;