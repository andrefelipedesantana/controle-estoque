"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

interface ProductFormProps {
  initialData?: {
    id: number;
    name: string;
    quantity: number;
    expirationDate: string;
  };
  isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();

  // Formatando data para o input date do HTML (YYYY-MM-DD)
  const initialDate = initialData?.expirationDate
    ? new Date(initialData.expirationDate).toISOString().split('T')[0]
    : "";

  const [name, setName] = useState(initialData?.name || "");
  const [quantity, setQuantity] = useState<number | string>(initialData?.quantity || "");
  const [expirationDate, setExpirationDate] = useState(initialDate);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        name,
        quantity: typeof quantity === "string" ? parseInt(quantity) : quantity,
        expirationDate
      };

      if (isEditing && initialData) {
        await api.put(`/products/${initialData.id}`, payload);
      } else {
        await api.post("/products", payload);
      }

      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      if (err.response?.data?.details) {
        // Mostra o primeiro erro do banco ou Zod
        setError(err.response.data.details[0].mensagem);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Ocorreu um erro ao salvar o produto.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Produto</label>
          <input
            data-test="product-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ex: Paracetamol 500mg"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quantidade</label>
          <input
            data-test="product-quantity"
            type="number"
            required
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            placeholder="Ex: 50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de Validade</label>
          <input
            data-test="product-expiration-date"
            type="date"
            required
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>

        <div className="pt-4 flex gap-3">
          <button
            data-test="cancel-product"
            type="button"
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            Cancelar
          </button>
          <button
            data-test="save-product"
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded transition-colors disabled:opacity-70 flex-1"
          >
            {loading ? "Salvando..." : "Salvar Produto"}
          </button>
        </div>
      </div>
    </form>
  );
}
