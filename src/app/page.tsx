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
        px-[2.5%]
        pt-22
        overflow-hidden
        transition-colors duration-500
      "
    >
      {/* Contenedor principal */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-5xl mx-auto gap-10">
        
        {/* Texto principal */}
        <div
          className="
            flex-1
            flex flex-col justify-center items-center md:items-start
            text-center md:text-left
            space-y-6 px-4 md:px-0
            min-h-[calc(100vh-4rem)] md:min-h-0
          "
        >
          {/* Título */}
          <h1
            className="
              text-3xl sm:text-4xl md:text-5xl
              font-extrabold leading-snug tracking-tight
              flex flex-wrap items-center justify-center md:justify-start gap-2
            "
          >
            Organize your wishes,
            <span
              className="
                text-blue-700 dark:text-blue-400
                inline-flex items-baseline gap-1
              "
              style={{ color: "var(--color-text-main)" }}
            >
              make them come true
              <Gift
                className="
                  inline-block align-baseline
                  w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9
                  text-blue-700 dark:text-blue-400 animate-bounce
                "
                style={{ color: "var(--color-text-main)" }}
              />
            </span>
          </h1>

          {/* Descripción */}
          <p
            className="
              text-base sm:text-lg md:text-xl
              leading-relaxed
              text-gray-700 dark:text-gray-300
              text-center md:text-left
              max-w-md md:max-w-lg mx-auto md:mx-0
            "
          >
            With <strong>Wishcart</strong>, you can save your favorite products,
            manage your budget, and prioritize your purchases — all in one place.
          </p>

          {/* Botón */}
          <div className="flex justify-center md:justify-start">
            <button
              onClick={() => router.push("/products")}
              className="
                px-5 py-2 sm:px-6 sm:py-3
                bg-blue-600 hover:bg-blue-700
                text-white font-semibold
                rounded-full shadow-lg
                transition-transform transform hover:scale-105
                text-base sm:text-lg
              "
            >
              Go to my products
            </button>
          </div>
        </div>

        {/* Ilustración del teléfono (oculta en móvil) */}
        <div className="hidden md:flex flex-1 justify-center md:justify-end mt-10 md:mt-0">
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
