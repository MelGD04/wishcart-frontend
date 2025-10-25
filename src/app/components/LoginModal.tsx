// app/components/LoginModal.tsx
"use client";

interface Props {
  onClose: () => void;
}

export default function LoginModal({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar sesión</h2>

        <form className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Correo"
            className="border rounded-md p-2"
          />
          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-md p-2"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
