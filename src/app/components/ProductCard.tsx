"use client";

import { useState, useRef } from "react";
import { ShoppingCart, Check, Trash } from "lucide-react";

type Props = {
  title?: string;
  price?: string | number;
  priority?: "High" | "Medium" | "Low";
  canBuy?: boolean;
};

export default function ProductCard({
  title = "New Brand",
  price = "$299",
  priority = "Medium",
  canBuy = false,
}: Props) {
  const [image, setImage] = useState<string | null>(null);
  const [bought, setBought] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => fileInputRef.current?.click();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleImageRemove = () => setImage(null);

  return (
    <div className="relative flex flex-col gap-4 p-4 w-56 bg-zinc-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300">
      
      {/* Imagen */}
      <div
        className="relative z-10 w-full h-32 bg-blue-500 rounded-md overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={handleImageClick}
      >
        {image ? (
          <>
            <img src={image} alt={title} className="w-full h-full object-cover rounded-md" />
            {/* Botón eliminar imagen */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // evita que abra el selector de archivo
                handleImageRemove();
              }}
              className="absolute top-1 right-1 bg-gray-500 rounded-full p-1 hover:bg-red-400 transition"
              title="Remove Image"
            >
              <Trash className="w-4 h-4 text-white" />
            </button>
          </>
        ) : (
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 fill-zinc-200 animate-pulse">
            <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
          </svg>
        )}
        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
      </div>

      {/* Título */}
      <div className="w-full text-base font-semibold text-zinc-200 capitalize truncate">
        {title}
      </div>

      {/* Prioridad y Buy Now */}
      <div className="flex justify-between items-center gap-2 mt-1">
        <span
          className={`w-28 text-center px-2 py-1 rounded-full font-medium text-xs border-2 bg-transparent ${
            priority === "High"
              ? "border-green-500 text-green-500"
              : priority === "Medium"
              ? "border-yellow-400 text-yellow-400"
              : "border-red-500 text-red-500"
          }`}
        >
          {priority}
        </span>

        <span
          className={`w-28 text-center px-2 py-1 rounded-full font-medium text-xs border-2 bg-transparent ${
            canBuy
              ? "border-green-600 text-green-600"
              : "border-gray-500 text-gray-500 text-[11px]"
          }`}
        >
          {canBuy ? "Buy Now" : "Not Available"}
        </span>
      </div>

      {/* Botón de acción (Marcar comprado) */}
      <div className="flex items-center gap-3 mt-2">
        <div className="text-xl font-bold text-zinc-200">{price}</div>
        <button
          onClick={() => setBought(!bought)}
          className={`flex items-center justify-center gap-2 px-3 py-2 w-full text-xs font-medium rounded-md shadow-lg transition-transform duration-300 ${
            bought
              ? "bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-400 text-white"
              : "bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-700 text-white hover:scale-105"
          }`}
          aria-label="Mark as bought"
        >
          {bought ? <Check className="w-4 h-4" /> : <ShoppingCart className="w-4 h-4" />}
          {bought ? "Bought" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}
