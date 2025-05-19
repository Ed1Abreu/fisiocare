"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import RegisterOne from "@/components/register-step/register-one"
import RegisterTwo from "@/components/register-step/register-two"
import RegisterThree from "@/components/register-step/register-three"

export default function Register() {
  const [step, setStep] = useState(0)

  // Estados para os campos do formulário
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [cpf, setCpf] = useState("")
  const [rg, setRg] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [birthDate, setBirthDate] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const router = useRouter()

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0))

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError("")
    setSuccess("")

    if (password !== confirmPassword) {
      setError("As senhas não coincidem!")
      return
    }

    // Monta o payload com os campos obrigatórios
    const payload = {
      username,
      password,
      name,
      cpf,
      rg,
      phone,
      email,
      address,
      birth_date: birthDate,
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (response.ok) {
        setSuccess("Usuário registrado com sucesso! Redirecionando para o login...")
        setTimeout(() => {
          router.push("/login")
        }, 2000)
      } else {
        const errorData = await response.json()
        console.error("Erro no registro:", errorData)
        setError(errorData.message || "Erro ao registrar usuário. Verifique os dados e tente novamente.")
      }
    } catch (err) {
      console.error(err)
      setError("Erro no servidor. Tente novamente mais tarde.")
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-center justify-center w-full p-8 bg-white md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="mb-2 text-3xl font-bold text-teal-600">Bem-vindo(a) à FisioCare</h1>
          <p className="mb-6 text-lg text-gray-600">Crie sua conta para continuar</p>

          {error && <p className="mb-4 text-red-500">{error}</p>}
          {success && <p className="mb-4 text-green-500">{success}</p>}

          <form
            onSubmit={
              step === 2
                ? handleSubmit
                : (e) => {
                    e.preventDefault()
                    nextStep()
                  }
            }
          >
            {step === 0 && (
              <RegisterOne
                username={username}
                setUsername={setUsername}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
              />
            )}
            {step === 1 && (
              <RegisterTwo
                cpf={cpf}
                setCpf={setCpf}
                rg={rg}
                setRg={setRg}
                phone={phone}
                setPhone={setPhone}
                address={address}
                setAddress={setAddress}
              />
            )}
            {step === 2 && (
              <RegisterThree
                birthDate={birthDate}
                setBirthDate={setBirthDate}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
              />
            )}

            <div className="flex items-center justify-between mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-4 py-2 text-teal-500 transition border border-teal-500 rounded hover:bg-teal-500 hover:text-white"
                >
                  Voltar
                </button>
              )}
              {step < 2 ? (
                <button
                  type="submit"
                  className="px-4 py-2 text-teal-500 transition border border-teal-500 rounded hover:bg-teal-500 hover:text-white"
                >
                  Avançar
                </button>
              ) : (
                <button type="submit" className="px-4 py-2 text-white transition bg-teal-600 rounded hover:bg-teal-700">
                  Finalizar
                </button>
              )}
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-teal-700 transition duration-300 hover:underline">
              Já possuo conta
            </Link>
          </div>

          <div className="mt-4 text-center">
            <Link href="/register_medico" className="text-sm text-teal-600 hover:underline">
              Cadastro para Médicos
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden w-full md:block md:w-1/2 bg-cover bg-center bg-[url('/fisioterapia-cadastro.png')]"></div>
    </div>
  )
}
