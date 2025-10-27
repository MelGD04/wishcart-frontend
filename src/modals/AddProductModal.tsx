"use client";

import { useState } from "react";

export default function AddProductModal({ onClose }: { onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ title, price, priority });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-gray-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold mb-4 text-center">Add New Product</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
            required
          />
          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
            required
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <div className="flex justify-end gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-lg border border-gray-400 hover:bg-gray-200 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
