"use client"

import { useState, useEffect } from "react"
import { ChevronRight, ChevronLeft, Activity } from "lucide-react"

type Specialty = {
  id: number
  title: string
  description: string
}

export default function SpecialtySlider() {
  const specialties: Specialty[] = [
    {
      id: 1,
      title: "Musculação",
      description: "Treinamento de força para otimizar a saúde muscular e a resistência corporal.",
    },
    {
      id: 2,
      title: "Hidroginástica",
      description: "Exercícios aquáticos para melhorar a mobilidade e o condicionamento físico de forma segura.",
    },
    {
      id: 3,
      title: "Fisioterapia Pélvica",
      description: "Tratamentos especializados para a saúde do assoalho pélvico e melhora na qualidade de vida.",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % specialties.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [specialties.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? specialties.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % specialties.length
    setCurrentIndex(newIndex)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="relative">
      <div className="bg-white rounded-xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="h-64 md:h-auto bg-teal-100 flex items-center justify-center">
            <div className="p-6 bg-teal-600 rounded-full text-white">
              <Activity size={48} />
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{specialties[currentIndex].title}</h3>
            <p className="text-gray-600 mb-6">{specialties[currentIndex].description}</p>
            <a
              href="#contact"
              className="inline-flex items-center text-teal-600 font-medium hover:text-teal-700 transition-colors duration-300"
            >
              Saiba Mais
              <ChevronRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-600 p-2 rounded-full shadow-md z-10"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-teal-600 p-2 rounded-full shadow-md z-10"
        aria-label="Próximo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {specialties.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-teal-600" : "bg-gray-300"
            } transition-all duration-300`}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
