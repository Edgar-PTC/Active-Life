function BarraBusqueda() {
  return (
    <div className="flex items-center gap-3 bg-[#7a9e6e] rounded-xl px-5 py-3 w-full max-w-3xl">
        {/* Ícono lupa */}
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>

    
        {/* Input */}
        <input
            type="text"
            placeholder="Buscar"
            className="bg-transparent text-white placeholder-white/80 text-lg font-semibold outline-none w-full"
        />
    </div>
  );
}

export default BarraBusqueda;
 