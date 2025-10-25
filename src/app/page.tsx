"use client";
import { useRouter } from "next/navigation";

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div
      className="
        flex flex-col md:flex-row items-center justify-between
        min-h-screen
        bg-blue-200 dark:bg-blue-900
        text-gray-900 dark:text-gray-100
        px-8 md:px-20
        overflow-hidden
      "
    >
      {/* Texto a la izquierda */}
      <div className="flex-1 space-y-6 md:space-y-8 text-left md:pr-12">
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Organiza tus deseos, <br />
          <span className="text-blue-700 dark:text-blue-400">hazlos realidad 🎁</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-lg">
          Con <strong>Wishcart</strong> puedes guardar los productos que más deseas,
          controlar tu presupuesto y priorizar tus compras con estilo.
        </p>

        <button
          onClick={() => router.push("/products")}
          className="
            px-6 py-3
            bg-blue-600 hover:bg-blue-700
            text-white font-semibold
            rounded-xl shadow-lg
            transition-transform transform hover:scale-105
          "
        >
          Ir a mis productos
        </button>
      </div>

      {/* Ilustración / teléfono a la derecha */}
      <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0">
        <div
          className="
            relative flex justify-center items-start
            h-[300px] w-[160px]
            border-4 border-black rounded-2xl bg-gray-50
            shadow-[5px_5px_2.5px_6px_rgb(209,218,218)]
          "
        >
          {/* Parte superior (notch) */}
          <span className="absolute top-0 w-20 h-2 bg-black rounded-b-xl"></span>

          {/* Botones laterales */}
          <span className="absolute -right-2 top-14 border-4 border-black h-7 rounded-md"></span>
          <span className="absolute -right-2 bottom-36 border-4 border-black h-10 rounded-md"></span>
        </div>
      </div>
    </div>
  );
}
