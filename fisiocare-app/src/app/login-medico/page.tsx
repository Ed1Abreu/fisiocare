"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginMedico() {
  const [loginMethod, setLoginMethod] = useState<"user" | "email">("user")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  // Se já houver um token, redireciona para a área do médico automaticamente.
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("medicoAccessToken")) {
      router.push("/controle")
    }
  }, [router])

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setLoginMethod((prev) => (prev === "user" ? "email" : "user"))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")

    // Define o valor de login de acordo com o método selecionado.
    const loginValue = loginMethod === "user" ? username : email

    try {
      const response = await fetch("http://127.0.0.1:8000/api/medico/token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: loginValue, password }),
      })

      if (response.ok) {
        const data = await response.json()
        // Armazena os tokens no localStorage
        localStorage.setItem("medicoAccessToken", data.access)
        localStorage.setItem("medicoRefreshToken", data.refresh)
        // Redireciona para a área do médico após login bem-sucedido
        router.push("/controle")
      } else {
        setError("Credenciais inválidas, verifique seu login e senha.")
      }
    } catch (err) {
      console.error(err)
      setError("Ocorreu um erro, tente novamente mais tarde.")
    }
  }

  return (
    <div className="flex h-screen font-sans">
      {/* Área do formulário */}
      <div className="flex flex-col items-center justify-center w-full p-8 bg-white md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-3xl font-bold text-teal-600">Área do Médico</h1>
          <p className="mb-6 text-lg text-gray-600">Faça login para acessar o painel de controle</p>

          {error && <p className="mb-4 text-red-500">{error}</p>}

          <form onSubmit={handleSubmit}>
            {loginMethod === "user" && (
              <div className="mb-4">
                <label htmlFor="user" className="block mb-2 font-semibold">
                  Usuário
                </label>
                <input
                  id="user"
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
            )}

            {loginMethod === "email" && (
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2 font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                  required
                />
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 font-semibold">
                Senha
              </label>
              <input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
              <Link
                href="#"
                className="inline-block mt-2 text-xs text-teal-700 transition duration-300 hover:underline hover:opacity-80"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="button"
              onClick={handleToggle}
              className="w-full px-4 py-2 mb-4 font-semibold text-teal-600 transition duration-500 bg-transparent border border-teal-600 rounded cursor-pointer hover:text-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            >
              {loginMethod === "user" ? "Entrar com Email" : "Entrar com Usuário"}
            </button>

            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white transition-colors bg-teal-500 rounded cursor-pointer hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
            >
              Entrar
            </button>
          </form>

          <p className="mt-8 text-base text-center text-teal-700 transition duration-300 cursor-pointer hover:underline hover:opacity-80">
            Não tem uma conta?{" "}
            <Link href="/register_medico" className="font-medium">
              Cadastre-se
            </Link>
          </p>

          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm text-teal-600 hover:underline">
              Área do Paciente
            </Link>
          </div>
        </div>
      </div>

      {/* Imagem de fundo para telas maiores */}
      <div className="hidden w-full md:block md:w-1/2 bg-cover bg-center bg-[url('/placeholder-zsajf.png')]"></div>
    </div>
  )
}
