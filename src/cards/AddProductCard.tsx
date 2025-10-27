"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import AddProductModal from "@/modals/AddProductModal";

export default function AddProductCard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {/* ✅ Card para agregar nuevo producto */}
      <div
        onClick={() => setShowModal(true)}
        className="
          flex flex-col items-center justify-center gap-3
          p-4 rounded-xl border-2 border-dashed cursor-pointer
          hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-zinc-800
          transition-all duration-300
        "
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--card-border)",
          backdropFilter: "blur(10px)",
        }}
      >
        <PlusCircle className="w-10 h-10 text-blue-500" />
        <span className="text-sm font-medium">
          Add New Product
        </span>
      </div>

      {/* Modal */}
      {showModal && <AddProductModal onClose={() => setShowModal(false)} />}
    </>
  );
}
