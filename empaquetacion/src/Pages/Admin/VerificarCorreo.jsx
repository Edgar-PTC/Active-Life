import { useState } from "react";

const VerificarCorreo = () => {
  const [codigo, setCodigo] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const nuevoCodigo = [...codigo];
    nuevoCodigo[index] = value;
    setCodigo(nuevoCodigo);

    // mover automáticamente al siguiente input
    if (value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const verificar = () => {
    const code = codigo.join("");
    console.log("Código ingresado:", code);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Card */}
      <div className="relative bg-white/20 backdrop-blur-lg rounded-2xl p-8 w-[400px] text-center shadow-xl border border-white/30 animate-fadeIn">

        {/* LOGO */}
        <div className="flex justify-center items-center gap-2 mb-4">
          <span className="text-2xl">💪</span>
          <h1 className="text-xl font-bold text-white tracking-wide">
            ACTIVELIFE
          </h1>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-white mb-2">
          VERIFICACIÓN
        </h2>

        {/* Texto */}
        <p className="text-sm text-gray-200 mb-6">
          Solamente necesitamos verificar el correo electrónico que ingresaste.
          <br />
          Revisa la bandeja de entrada de <b>20******@***.com</b>,
          <br />
          por favor ingresa el código que aparece.
        </p>

        {/* Inputs código */}
        <div className="flex justify-center gap-3 mb-6">
          {codigo.map((num, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(e.target.value, index)}
              className="w-12 h-12 text-center text-xl rounded-lg bg-white/30 text-white outline-none border border-white/30 focus:ring-2 focus:ring-green-400"
            />
          ))}
        </div>

        {/* Botón */}
        <button
          onClick={verificar}
          className="w-full bg-[#7F9E7A] text-white py-2 rounded-lg font-semibold transition-all duration-300 hover:bg-[#6e8c69] hover:scale-105 active:scale-95"
        >
          Verificar
        </button>

        {/* Regresar */}
        <p className="text-gray-300 text-sm mt-3 cursor-pointer hover:underline">
          Regresar
        </p>

        {/* Reenviar */}
        <p className="text-gray-300 text-xs mt-2">
          ¿No te cayó el correo?{" "}
          <span className="text-green-400 cursor-pointer hover:underline">
            Reenviar
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerificarCorreo;