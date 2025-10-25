"use client";
import { Gift } from "lucide-react";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div
      className="
      flex flex-col md:flex-row items-center justify-between
      min-h-screen
      bg-blue-100 dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      px-[2.5%]
      pt-22
      overflow-hidden
      transition-colors duration-500
      "
    >
      {/* Contenedor del contenido principal */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto gap-10">
        
        {/* Texto principal */}
        <div className="flex-1 text-left md:pr-12 space-y-8">
          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-extrabold leading-snug tracking-tight flex flex-wrap items-center gap-2">
          Organize your wishes,
          <span className="text-blue-400 inline-flex items-center gap-2">
            make them come true
            <Gift className="w-8 h-8 text-blue-400 animate-bounce" />
          </span>
        </h1>


        {/* Descripción */}
        <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
          With <strong>Wishcart</strong>, you can save your favorite products, manage your budget,
          and prioritize your purchases — all in one place.
        </p>

    {/* Botón */}
    <button
      onClick={() => router.push("/products")}
      className="
        px-5 py-2
        bg-blue-600 hover:bg-blue-700
        text-white font-semibold
        rounded-full shadow-lg
        transition-transform transform hover:scale-105
        text-lg
      "
    >
      Go to my products
    </button>
  </div>


        {/* Ilustración / teléfono a la derecha */}
        <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
          <div
            className="
              relative flex justify-center items-start
              h-[300px] w-[160px]
              border-4 border-black rounded-2xl bg-gray-100
            "
          >
            <span className="absolute top-0 w-20 h-2 bg-black rounded-b-xl"></span>
            <span className="absolute -right-2 top-14 border-4 border-black h-7 rounded-md"></span>
            <span className="absolute -right-2 bottom-36 border-4 border-black h-10 rounded-md"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
