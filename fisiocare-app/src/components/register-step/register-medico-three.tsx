"use client"

interface RegisterMedicoThreeProps {
  birthDate: string
  setBirthDate: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
}

export default function RegisterMedicoThree({
  birthDate,
  setBirthDate,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}: RegisterMedicoThreeProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="birthDate" className="block mb-2 font-semibold">
          Data de Nascimento
        </label>
        <input
          id="birthDate"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>

      <div>
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
        <p className="mt-1 text-xs text-gray-500">
          A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números
        </p>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-2 font-semibold">
          Confirmar Senha
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>
    </div>
  )
}
