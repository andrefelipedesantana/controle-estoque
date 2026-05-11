"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { ProductForm } from "@/components/ProductForm";
import { Product } from "@/components/ProductTable";
import { api } from "@/lib/api";

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    // Busca o produto pelo ID iterando todos (rota específica getById seria o ideal, mas list resolve)
    const fetchProduct = async () => {
      try {
        const response = await api.get("/products");
        const found = response.data.find((p: Product) => p.id.toString() === id);
        
        if (found) {
          setProduct(found);
        } else {
          setError("Produto não encontrado");
        }
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push("/login");
        } else {
          setError("Erro ao carregar o produto");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto p-4 py-8 max-w-2xl">
        <h1 data-test="edit-product-title" className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Editar Produto
        </h1>
        
        {error ? (
          <div className="bg-red-50 text-red-500 p-4 rounded text-center">
            {error}
            <button 
              onClick={() => router.push("/dashboard")}
              className="block mx-auto mt-4 text-blue-600 hover:underline"
            >
              Voltar ao Início
            </button>
          </div>
        ) : (
          <ProductForm initialData={product || undefined} isEditing={true} />
        )}
      </main>
    </div>
  );
}
