"use client";

import Link from "next/link";
import { Trash2, Edit } from "lucide-react";

export type Product = {
  id: number;
  name: string;
  quantity: number;
  expirationDate: string;
  status: "valid" | "expiring" | "expired";
};

interface ProductTableProps {
  products: Product[];
  onDelete: (id: number) => void;
}

export function ProductTable({ products, onDelete }: ProductTableProps) {
  // Configuração das cores baseadas no status
  const statusConfig = {
    valid: { label: "No prazo", color: "bg-green-100 text-green-800 border-green-200" },
    expiring: { label: "Vence em 30 d", color: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    expired: { label: "Vencido", color: "bg-red-100 text-red-800 border-red-200" },
  };

  if (products.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Nenhum produto cadastrado no momento.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validade</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 text-sm">
          {products.map((product) => {
            const config = statusConfig[product.status];
            // Formatando a data UTC para exibição local simplificada
            const dateStr = new Date(product.expirationDate).toLocaleDateString("pt-BR");
            
            return (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{product.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{dateStr}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full border ${config.color}`}>
                    {config.label}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-3">
                    <Link 
                      href={`/products/edit/${product.id}`} 
                      className="text-blue-600 hover:text-blue-900" 
                      title="Editar"
                      data-test="edit-product"
                    >
                      <Edit size={18} />
                    </Link>
                    <button 
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-900"
                      title="Excluir"
                      data-test="delete-product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
