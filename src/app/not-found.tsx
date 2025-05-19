import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md">
        <h1 className="text-6xl font-bold text-teal-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">A página que você está procurando não existe ou foi movida.</p>
        <Link href="/" className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
          Voltar para a página inicial
        </Link>
      </div>
    </div>
  )
}
