
import { Package } from "lucide-react"
import ProductCard from "../components/ProductCard"

export const metadata = {
	title: "Products",
}

export default function ProductsPage() {
	return (
		<main className="min-h-screen pt-24 px-[2.5%] max-w-5xl mx-auto bg-blue-100 dark:bg-gray-900
      text-gray-900 dark:text-gray-100">
			<h1 className="flex items-center gap-3 text-2xl font-extrabold text-zinc-100 mb-6">
  			<Package className="w-6 h-6 text-blue-400 animate-bounce" />
  			My Products
			</h1>

			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<ProductCard />
				<ProductCard title="Sneaker Classic" price="$199" />
				<ProductCard title="Runner Pro" price="$349"  />
			</section>
		</main>
	)
}

