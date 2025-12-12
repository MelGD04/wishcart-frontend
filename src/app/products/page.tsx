"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import ProductCard from "@/components/products/ProductCard";
import AddProductCard from "@/components/products/AddProductCard";
import api from "@/lib/axios";
import { LogIn, Plus } from "lucide-react";
import useBudget from "@/hooks/useBudget";
import useProductActions from "@/hooks/useProductActions";

type Product = {
  id: number;
  name: string;
  price: number | string;
  imageUrl?: string;
  priority: "High" | "Medium" | "Low";
  canBuy?: boolean;
};

export default function ProductsPage() {
  const { user } = useAuth();
  const { balance, loading: budgetLoading, refresh: refreshBalance } = useBudget();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const { deleteProduct } = useProductActions();

const handleDelete = async (id: number) => {
  if (!user?.token) return;

  const ok = await deleteProduct(id, user.token);
  if (ok) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }
};


  // handler to add a new product from AddProductModal
  const addProduct = async (p: { name: string; price: string; priority: string; imageUrl?: string }) => {
    try {
      if (!user?.token) {
        const newProduct: Product = {
          id: Date.now(),
          name: p.name,
          price: Number(p.price) || 0,
          imageUrl: p.imageUrl,
          priority: p.priority as Product["priority"],
          canBuy: true,
        };
        setProducts((prev) => [...prev, newProduct]);
        return;
      }

      const body = {
        name: p.name,
        price: Number(p.price) || 0,
        priority: p.priority,
        imageUrl: p.imageUrl,
      };

      const res = await api.post("/products", body, {
        headers: { Authorization: `Bearer ${user.token}` },
      });

      setProducts((prev) => [...prev, res.data]);
      // optionally refresh budget if adding product should affect anything
      refreshBalance();
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

        const res = await api.get("/products", {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (mounted) {
          // make sure price is numeric
          const mapped = (res.data || []).map((p: any) => ({
            ...p,
            price: typeof p.price === "number" ? p.price : Number(p.price || 0),
          }));
          setProducts(mapped);
        }
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

  if (loading || budgetLoading)
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

  // compute canBuy for each product using the single balance fetch
  const productsWithCanBuy = products.map((p) => {
    const numericPrice = typeof p.price === "number" ? p.price : Number(p.price || 0);
    const available = typeof balance === "number" ? balance : 0;
    return { ...p, canBuy: available >= numericPrice };
  });

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

      {productsWithCanBuy.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-full max-w-sm">
            <AddProductCard onAdd={addProduct} />
          </div>
        </div>
      ) : (
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ${productsWithCanBuy.length <= 2 ? "justify-center" : ""}`}>
          {productsWithCanBuy.map((p) => (
            <ProductCard
              key={p.id}
              id={p.id}
              name={p.name}
              price={p.price}
              imageUrl={p.imageUrl}
              priority={p.priority}
              canBuy={p.canBuy}
              onDelete={handleDelete}
            />
          ))}

          <AddProductCard onAdd={addProduct} />
        </div>
      )}
    </div>
  );
}
