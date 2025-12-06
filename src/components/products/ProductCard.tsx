"use client";

import { useState, useRef } from "react";
import { ShoppingCart, Check, Trash } from "lucide-react";

type Props = {
  name?: string;
  title?: string;
  price?: string | number;
  priority?: "High" | "Medium" | "Low";
  canBuy?: boolean;
};

export default function ProductCard({
  name,
  title,
  price,
  priority,
  canBuy,
}: Props) {
  const displayTitle = name ?? title ?? "";
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
    <div
      className="
        relative flex flex-col gap-3
        p-3 sm:p-4
        w-full
        rounded-xl shadow-lg hover:shadow-2xl
        transition-all duration-300 hover:scale-[1.02]
      "
      style={{
    backgroundColor: "var(--card-bg)",
    border: "1px solid var(--card-border)",
    boxShadow: `0 8px 20px var(--card-shadow)`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
  }}
    >
      {/* Imagen */}
      <div
        className="relative z-10 w-full h-24 sm:h-28 md:h-32 bg-blue-500 rounded-md overflow-hidden cursor-pointer flex items-center justify-center"
        onClick={handleImageClick}
      >
        {image ? (
          <>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-md"
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleImageRemove();
              }}
              className="absolute top-1 right-1 bg-gray-600/80 hover:bg-red-500 rounded-full p-1 transition"
              title="Remove Image"
            >
              <Trash className="w-4 h-4 text-white" />
            </button>
          </>
        ) : (
          <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 sm:w-10 sm:h-10 fill-zinc-200 animate-pulse"
          >
            <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
          </svg>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>

      {/* Título */}
      {displayTitle ? (
        <div className="w-full text-sm sm:text-base font-semibold capitalize truncate text-center sm:text-left">
          {displayTitle}
        </div>
      ) : null}

      {/* Prioridad y Buy Now (solo si vienen) */}
      {(priority || typeof canBuy !== "undefined") && (
        <div className="flex justify-between items-center gap-2 mt-1">
          {priority ? (
            <span
              className={`flex-1 text-center px-2 py-1 rounded-full font-medium text-[10px] sm:text-xs border-2 bg-transparent
                ${
                  priority === "High"
                    ? "border-green-500 text-green-500"
                    : priority === "Medium"
                    ? "border-yellow-400 text-yellow-400"
                    : "border-red-500 text-red-500"
                }
              `}
            >
              {priority}
            </span>
          ) : null}

          {typeof canBuy !== "undefined" ? (
            <span
              className={`flex-1 text-center px-2 py-1 rounded-full font-medium text-[10px] sm:text-xs border-2 bg-transparent
                ${
                  canBuy
                    ? "border-green-600 text-green-600"
                    : "border-gray-500 text-gray-500"
                }
              `}
            >
              {canBuy ? "Buy Now" : "Not Available"}
            </span>
          ) : null}
        </div>
      )}

      {/* Precio y botón */}
      <div className="flex items-center gap-2 mt-2">
        {typeof price !== "undefined" && (
          <div className="text-sm sm:text-base font-bold whitespace-nowrap">
            {typeof price === "number"
              ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)
              : // try to parse numeric strings, otherwise render raw
                Number(price) && !Number.isNaN(Number(price))
              ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(price))
              : price}
          </div>
        )}
        <button
          onClick={() => setBought(!bought)}
          className={`flex items-center justify-center gap-2 px-2 sm:px-3 py-2 w-full text-[10px] sm:text-xs font-medium rounded-md shadow-lg transition-transform duration-300 ${
            bought
              ? "bg-gradient-to-tr from-blue-700 via-blue-500 to-blue-400 text-white"
              : "bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-700 text-white hover:scale-105"
          }`}
        >
          {bought ? (
            <Check className="w-4 h-4" />
          ) : (
            <ShoppingCart className="w-4 h-4" />
          )}
          {bought ? "Bought" : "Add"}
        </button>
      </div>
    </div>
  );
}
