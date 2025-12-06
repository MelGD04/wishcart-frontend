"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ProductCard from "@/components/products/ProductCard";
import AddProductCard from "@/components/products/AddProductCard";
import api from "@/lib/axios";
import { LogIn, Plus } from "lucide-react";

type Product = {
  id: number;
  title: string;
  price: string | number;
  priority: "High" | "Medium" | "Low";
  canBuy: boolean;
};

export default function ProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // handler to add a new product from AddProductModal
  const addProduct = async (p: { title: string; price: string; priority: string }) => {
    try {
      if (!user?.token) {
        // fallback to local update if not authenticated
        const newProduct: Product = {
          id: Date.now(),
          title: p.title,
          price: p.price,
          priority: p.priority as Product["priority"],
          canBuy: true,
        };
        setProducts((prev) => [...prev, newProduct]);
        return;
      }

      // backend expects fields: name (string) and price (number)
      const body = {
        name: p.title,
        price: Number(p.price) || 0,
        priority: p.priority,
      };

      const res = await api.post("/products", body, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      // backend returns the saved product
      setProducts((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Failed to create product", err);
    }
  };

  useEffect(() => {
    let mounted = true;

    const fetchProducts = async () => {
      try {
        if (!user) {
          if (mounted) setProducts([]);
          return;
        }

        // fetch from backend using JWT token
        const res = await api.get("/products", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (mounted) setProducts(res.data || []);
      } catch (err) {
        console.error("Failed to fetch products", err);
        if (mounted) setProducts([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      mounted = false;
    };
  }, [user]);

  if (loading)
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-center text-sm text-zinc-500">Loading products…</p>
      </div>
    );

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-xl w-full">
          <div className="flex items-center justify-center mb-6">
            <LogIn className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-bounce" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 mb-2">Not signed in</h2>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 mb-6">Please sign in to add or manage products.</p>

          <div className="flex justify-center">
            <button
              onClick={() => {
                // open login modal
              }}
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[95%] max-w-5xl mx-auto px-6 pt-23 pb-8">
      <header className="mb-6 flex flex-col items-center text-center gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold">My Products</h1>
          <Plus className="w-5 h-5 text-blue-600 animate-bounce" />
          {products.length > 0 && (
            <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200">
              {products.length}
            </span>
          )}
        </div>

        <p className="text-lg text-zinc-500">Add the products you want</p>
      </header>
      {products.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-full max-w-sm">
            <AddProductCard onAdd={addProduct} />
          </div>
        </div>
      ) : (
        // center the grid when there are few items so they appear centered below the navbar
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${
            products.length <= 2 ? "justify-center" : ""
          }`}
        >
          {products.map((p) => (
            <ProductCard
              key={p.id}
              {...p}
              price={typeof p.price === "string" ? Number(p.price) : p.price}
            />
          ))}
          {/* AddProductCard always at the end */}
          <AddProductCard onAdd={addProduct} />
        </div>
      )}
    </div>
  );
}
