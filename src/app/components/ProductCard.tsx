"use client"
import { useState } from "react"

type Props = {
  title?: string
  price?: string | number
  sizes?: Array<string | number>
}

export default function ProductCard({
  title = "New brand name",
  price = "$299",
  sizes = [37, 38, 39, 40, 41],
}: Props) {
  const [selected, setSelected] = useState<string | number | null>(null)

  return (
    <div className="relative flex flex-col gap-3 p-4 w-56 bg-zinc-800 rounded-xl">
      {/* Imagen */}
      <div className="relative z-10 w-full h-32 bg-purple-900 rounded-md overflow-hidden cursor-pointer">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-1/2 left-1/2 w-12 -translate-x-1/2 -translate-y-1/2 fill-zinc-200"
        >
          <path d="M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
        </svg>
      </div>

      {/* Título */}
      <div className="w-full text-base font-semibold text-zinc-200 capitalize truncate">
        <span>{title}</span>
      </div>

      {/* Tallas */}
      <div className="text-xs text-zinc-200">
        <span>Size</span>
        <ul className="flex items-center gap-1 mt-1">
          {sizes.map((s) => {
            const active = selected === s
            return (
              <li key={String(s)}>
                <button
                  onClick={() => setSelected(s)}
                  className={`px-2 py-2 bg-zinc-900 text-zinc-200 text-xs border-2 rounded transition-all duration-300 hover:border-zinc-200 focus:outline-none ${
                    active
                      ? "border-purple-500 bg-purple-600/60 shadow-inner shadow-purple-950"
                      : "border-zinc-900"
                  }`}
                  aria-pressed={active}
                >
                  {s}
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Acción */}
      <div className="flex items-center gap-4">
        <div className="text-2xl font-bold text-zinc-200">
          <span>{price}</span>
        </div>
        <button
          className="flex justify-center items-center gap-1 px-2 py-2 w-full text-xs font-medium text-zinc-200 bg-gradient-to-t from-purple-700 to-zinc-200 border-2 border-purple-500/50 rounded-md shadow-inner shadow-zinc-200 transition"
          aria-label="Add to cart"
        >
          <svg
            className="w-4"
            stroke="currentColor"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              strokeLinejoin="round"
              strokeLinecap="round"
            ></path>
          </svg>
          <span>Add to cart</span>
        </button>
      </div>
    </div>
  )
}
