import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react";
import Swal from 'sweetalert2'
import useRecovery from "../../hooks/useRecovery";

const SolicitarCorreo = ({setEmail, loading, EmailSolicitude}) => {
    return(
        <form autoComplete="off" onSubmit={(e) => EmailSolicitude(e)} className="flex flex-col pt-15 pb-15 pl-40 pr-40 rounded-3xl Login items-center justify-between gap-6 w-3/5">
                <div className="flex flex-col items-center justify-center">
                    <img src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="ActiveLife Logo" />
                    <h1 className="text-4xl text-white">Recuperacion de contraseña</h1>
                    <h1 className="text-xl text-white">Ingresa al correo al que quieres recuperar la contraseña</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="CorreoElectronico">Correo Electronico</label>
                        <input onChange={(e) => setEmail(e.target.value)} autoComplete="off" className="InputAcceder rounded-lg" type="text" name="CorreoElectronico" id="CorreoElectronico" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <button type="submit" className="AccederLink pt-2 pb-2 pl-10 pr-10 flex flex-row items-center justify-center text-white text-center text-s rounded-lg ">
                    {loading ? "Comprobando...": "Inciar Sesion"}
                    </button>
                </div>
            </form>
    )
}

const VerificarCorreo = ({codigo, setCodigo, loading, verificarCorreo}) => {
  const navigate = useNavigate();

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

  return (
    <form onSubmit={(e) => verificarCorreo(e)} className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 text-center shadow-xl border border-white/30 animate-fadeIn">

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
      </form>    
  );
};

const CambiarContra = ({setPassword, setConfirmPassword, loading, ChangePassword}) => {
    return(
        <form autoComplete="off" onSubmit={(e) => ChangePassword(e)} className="flex flex-col pt-15 pb-15 pl-40 pr-40 rounded-3xl Login items-center justify-between gap-6 w-3/5">
                <div className="flex flex-col items-center justify-center">
                    <img src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1776401728/Gemini_Generated_Logo_gyanzj.png" alt="ActiveLife Logo" />
                    <h1 className="text-4xl text-white">Recuperacion de contraseña</h1>
                    <h1 className="text-xl text-white">Ingresa al correo al que quieres recuperar la contraseña</h1>
                </div>
                <div className="flex flex-col justify-center items-center gap-5 w-full">
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="password">Contraseña</label>
                        <input onChange={(e) => setPassword(e.target.value)} autoComplete="off" className="InputAcceder rounded-lg" type="text" name="password" id="password" />
                    </div>
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="text-white" htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input onChange={(e) => setConfirmPassword(e.target.value)} autoComplete="off" className="InputAcceder rounded-lg" type="text" name="confirmPassword" id="confirmPassword" />
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <button type="submit" className="AccederLink pt-2 pb-2 pl-10 pr-10 flex flex-row items-center justify-center text-white text-center text-s rounded-lg ">
                    {loading ? "Comprobando...": "Inciar Sesion"}
                    </button>
                </div>
            </form>
    )
}

const RecuperacionContra = () => {
    const { email, setEmail, codigo, setCodigo, setPassword, setConfirmPassword, loading, tab, EmailSolicitudeAdmin, VerificarCodigoAdmin, ChangePasswordAdmin } = useRecovery();
    
    return(
        <main className="flex p-8 Acceder h-full items-center justify-center min-h-screen">
            { tab === "solicitarCorreo" ? (
                <SolicitarCorreo setEmail={setEmail} loading={loading} EmailSolicitude={EmailSolicitudeAdmin} />
            ): tab === "verificarCodigo" ? (
                <VerificarCorreo codigo={codigo} setCodigo={setCodigo} loading={loading} verificarCorreo={VerificarCodigoAdmin} />
            ):  tab === "cambiarContra" ? (
                <CambiarContra setPassword={setPassword} setConfirmPassword={setConfirmPassword} loading={loading} ChangePassword={ChangePasswordAdmin} />
            ): null}
        </main>
    )
}

export default RecuperacionContra;