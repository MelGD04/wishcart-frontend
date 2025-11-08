"use client";

import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import ProductCard from "@/cards/ProductCard";
import AddProductCard from "@/cards/AddProductCard";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: string;
  priority?: "High" | "Medium" | "Low";
  image?: string;
  canBuy?: boolean;
  purchased?: boolean;
  createdAt?: string;
}

export default function ProductsPage() {
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Cargar usuario y productos al entrar a la página
  useEffect(() => {
    const loadUserAndProducts = async () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      // Si no hay usuario o token, no continuar
      if (!storedUser || !token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        let parsedUser = null;

        // ✅ Verificar que el valor guardado sea JSON válido
        if (storedUser.startsWith("{")) {
          parsedUser = JSON.parse(storedUser);
        } else {
          console.warn("⚠️ Valor inválido en localStorage.user:", storedUser);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          setUser(null);
          setLoading(false);
          return;
        }

        setUser(parsedUser);

        // 🔹 Cargar productos desde el backend
        const res = await axios.get("http://localhost:5000/products", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(res.data);
      } catch (err) {
        console.error("Error cargando productos:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUserAndProducts();

    // 🧩 Escuchar cambios de autenticación en otras partes del sitio
    const handleStorageChange = () => {
      loadUserAndProducts();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 🔸 Mientras carga
  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your products...</p>
      </main>
    );

  // 🔸 Si no está autenticado
  if (!user)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <Package className="w-12 h-12 text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No estás autenticado</h2>
        <p className="text-gray-600 max-w-md">
          Debes iniciar sesión o crear una cuenta para ver y administrar tus productos.
        </p>
      </main>
    );

  // 🔸 Si está autenticado pero no tiene productos
  if (products.length === 0)
    return (
      <main className="min-h-screen pt-24 px-[2.5%] max-w-6xl mx-auto text-center">
        <h1 className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-extrabold mb-6">
          <Package className="w-6 h-6 md:w-7 md:h-7 text-blue-500 animate-bounce" />
          My Products
        </h1>

        <p className="text-gray-500 mb-6">
          Aún no tienes productos. ¡Agrega el primero para comenzar tu lista!
        </p>

        {/* Mostrar la card para agregar producto */}
        <div className="flex justify-center">
          <AddProductCard />
        </div>
      </main>
    );

  // 🔸 Si tiene productos
  return (
    <main className="min-h-screen pt-24 px-[2.5%] max-w-6xl mx-auto">
      <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold mb-8">
        <Package className="w-6 h-6 md:w-7 md:h-7 text-blue-500 animate-bounce" />
        My Products
      </h1>

      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            title={p.title}
            price={p.price}
            priority={p.priority}
          />
        ))}
        <AddProductCard />
      </section>
    </main>
  );
}
