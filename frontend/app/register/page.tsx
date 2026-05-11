"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", { name, email, password });

      // Lojando logo depois de cadastrar para facilitar
      const response = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      router.push("/dashboard");
    } catch (err: any) {
      if (err.response?.data?.details) {
        setError(err.response.data.details[0].mensagem);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Erro ao cadastrar. Verifique os dados.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-blue-600">PharmaEstoque</h1>
          <p className="text-gray-500 text-sm mt-2">Crie sua conta</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div >
            <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
            <input
              data-test="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
            <input
              data-test="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="seu@email.com"
            />
          </div>

          <div >
            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
            <input
              data-test="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded p-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="No mínimo 6 caracteres"
              min={6}
            />
          </div>

          <button data-test="register-btn"
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition-colors disabled:opacity-70 mt-2"
          >
            {loading ? "Cadastrando..." : "Cadastrar e Entrar"}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Já tem uma conta?{" "}
          <Link data-test="login-link" href="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
