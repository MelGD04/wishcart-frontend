import { Package } from "lucide-react";
import ProductCard from "@/cards/ProductCard"; 

export default function ProductsPage() {
  return (
    <main className="min-h-screen pt-24 px-[2.5%] max-w-6xl mx-auto">
      {/* Título */}
      <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-extrabold mb-8">
        <Package className="w-6 h-6 md:w-7 md:h-7 text-blue-500 animate-bounce" />
        My Products
      </h1>

    <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  		<ProductCard />
  		<ProductCard title="TLOU Bracelet" price="$??" priority="Low" />
  		<ProductCard title="Earrings" price="$??" />
  		<ProductCard title="Smartwatch" price="$??" priority="High" />
		<ProductCard title="algo mas" price="$??"/>
	</section>

    </main>
  );
}
