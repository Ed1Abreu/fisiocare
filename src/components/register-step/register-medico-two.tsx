"use client"

interface RegisterMedicoTwoProps {
  cpf: string
  setCpf: (value: string) => void
  crefito: string
  setCrefito: (value: string) => void
  especialidade: string
  setEspecialidade: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  address: string
  setAddress: (value: string) => void
}

export default function RegisterMedicoTwo({
  cpf,
  setCpf,
  crefito,
  setCrefito,
  especialidade,
  setEspecialidade,
  phone,
  setPhone,
  address,
  setAddress,
}: RegisterMedicoTwoProps) {
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
        <label htmlFor="crefito" className="block mb-2 font-semibold">
          CREFITO
        </label>
        <input
          id="crefito"
          type="text"
          placeholder="Digite seu número CREFITO"
          value={crefito}
          onChange={(e) => setCrefito(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>

      <div>
        <label htmlFor="especialidade" className="block mb-2 font-semibold">
          Especialidade
        </label>
        <select
          id="especialidade"
          value={especialidade}
          onChange={(e) => setEspecialidade(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        >
          <option value="">Selecione sua especialidade</option>
          <option value="Fisioterapia Ortopédica">Fisioterapia Ortopédica</option>
          <option value="Fisioterapia Neurológica">Fisioterapia Neurológica</option>
          <option value="Fisioterapia Respiratória">Fisioterapia Respiratória</option>
          <option value="Fisioterapia Esportiva">Fisioterapia Esportiva</option>
          <option value="Fisioterapia Pediátrica">Fisioterapia Pediátrica</option>
          <option value="Fisioterapia Geriátrica">Fisioterapia Geriátrica</option>
          <option value="Fisioterapia Pélvica">Fisioterapia Pélvica</option>
        </select>
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
          Endereço do Consultório
        </label>
        <input
          id="address"
          type="text"
          placeholder="Digite o endereço do consultório"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>
    </div>
  )
}
