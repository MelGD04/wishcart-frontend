"use client";

import { useState } from "react";

export default function AddProductModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd?: (
    p: { title: string; price: string; priority: string; imageUrl?: string }
  ) => Promise<void> | void;
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return setImagePreview(null);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const payload: { title: string; price: string; priority: string; imageUrl?: string } = {
      title,
      price,
      priority,
    };
    if (imagePreview) payload.imageUrl = imagePreview;
    try {
      if (onAdd) await onAdd(payload as any);
      onClose();
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const anyErr = err as any;
      const serverMessage = anyErr?.message || anyErr?.response?.data?.message || anyErr?.response?.data || String(err);
      setError(serverMessage || 'Failed to create product');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow disabled:opacity-60"
            >
              {loading ? 'Adding...' : 'Add'}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
