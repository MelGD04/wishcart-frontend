
import ProductCard from "../components/ProductCard"

export const metadata = {
	title: "Products",
}

export default function ProductsPage() {
	return (
		<main className="min-h-screen p-6 bg-zinc-900">
			<h1 className="text-2xl font-bold text-zinc-100 mb-6">Productos</h1>

			<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<ProductCard />
				<ProductCard title="Sneaker Classic" price="$199" sizes={[36, 37, 38, 39, 40]} />
				<ProductCard title="Runner Pro" price="$349" sizes={[38, 39, 40, 41, 42]} />
			</section>
		</main>
	)
}

