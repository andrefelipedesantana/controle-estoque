"use client";

import { Navbar } from "@/components/Navbar";
import { ProductForm } from "@/components/ProductForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewProduct() {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto p-4 py-8 max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">
          Cadastrar Novo Produto
        </h1>
        
        <ProductForm />
      </main>
    </div>
  );
}
