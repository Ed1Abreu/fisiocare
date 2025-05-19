"use client"

interface RegisterTwoProps {
  cpf: string
  setCpf: (value: string) => void
  rg: string
  setRg: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  address: string
  setAddress: (value: string) => void
}

export default function RegisterTwo({
  cpf,
  setCpf,
  rg,
  setRg,
  phone,
  setPhone,
  address,
  setAddress,
}: RegisterTwoProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="cpf" className="block mb-2 font-semibold">
          CPF
        </label>
        <input
          id="cpf"
          type="text"
          placeholder="Digite seu CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>

      <div>
        <label htmlFor="rg" className="block mb-2 font-semibold">
          RG
        </label>
        <input
          id="rg"
          type="text"
          placeholder="Digite seu RG"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>

      <div>
        <label htmlFor="phone" className="block mb-2 font-semibold">
          Telefone
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="Digite seu telefone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block mb-2 font-semibold">
          Endereço
        </label>
        <input
          id="address"
          type="text"
          placeholder="Digite seu endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>
    </div>
  )
}
