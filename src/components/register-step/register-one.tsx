"use client"

interface RegisterOneProps {
  username: string
  setUsername: (value: string) => void
  name: string
  setName: (value: string) => void
  email: string
  setEmail: (value: string) => void
}

export default function RegisterOne({ username, setUsername, name, setName, email, setEmail }: RegisterOneProps) {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="username" className="block mb-2 font-semibold">
          Nome de Usuário
        </label>
        <input
          id="username"
          type="text"
          placeholder="Digite seu nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>

      <div>
        <label htmlFor="name" className="block mb-2 font-semibold">
          Nome Completo
        </label>
        <input
          id="name"
          type="text"
          placeholder="Digite seu nome completo"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />
      </div>

      <div>
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
    </div>
  )
}
