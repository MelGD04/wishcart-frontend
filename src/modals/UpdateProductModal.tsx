"use client";

import { useState } from "react";
import useProductActions from "@/hooks/useProductActions";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  id: number;
  initialName: string;
  initialPrice?: string | number;
  initialPriority?: "High" | "Medium" | "Low";
  initialImageUrl?: string | null;
  onClose: () => void;
  onUpdated: (product: any) => void;
};

export default function UpdateProductModal({
  id,
  initialName,
  initialPrice,
  initialPriority = "Medium",
  onClose,
  onUpdated
}: Props) {
  const [name, setName] = useState(initialName);
  const [price, setPrice] = useState(String(initialPrice ?? ""));
  const [priority, setPriority] = useState(initialPriority);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { updateProduct } = useProductActions();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    if (!user?.token) throw new Error("Not authenticated");

    const updatedProduct = await updateProduct(
      id,
      { name, price, priority },
      user.token
    );

    onUpdated(updatedProduct); // producto real
    onClose();
  } catch (err: any) {
    setError(err?.message || "Failed to update product");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-[90%] max-w-md shadow-2xl border border-gray-200 dark:border-zinc-700">
        <h2 className="text-xl font-bold mb-4 text-center">
          Update Product
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            onChange={(e) =>
              setPriority(e.target.value as "High" | "Medium" | "Low")
            }
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-zinc-700 bg-transparent text-sm"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
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
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  );
}
