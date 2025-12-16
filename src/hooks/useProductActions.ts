import api from "@/lib/axios";

export type UpdateProductPayload = {
  name?: string;
  price?: number | string;
  priority?: "High" | "Medium" | "Low";
  imageUrl?: string | null;
};

export default function useProductActions() {
  const deleteProduct = async (id: number, token: string) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return true;
    } catch (err) {
      console.error("Error deleting product:", err);
      return false;
    }
  };

  const updateProduct = async (
  id: number,
  data: UpdateProductPayload,
  token: string
) => {
  try {
    const res = await api.patch(`/products/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data; //producto actualizado
  } catch (err) {
    console.error("Error updating product:", err);
    throw err;
  }
};


  return { deleteProduct, updateProduct };
}

