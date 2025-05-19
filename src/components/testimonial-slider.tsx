"use client"

import { useState, useEffect } from "react"
import { Quote, User } from "lucide-react"

type Testimonial = {
  id: number
  name: string
  role: string
  text: string
}

export default function TestimonialSlider() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Maria Silva",
      role: "Paciente de Fisioterapia",
      text: "A FisioCare transformou minha recuperação. Em apenas 2 meses, consegui voltar às minhas atividades normais sem dor.",
    },
    {
      id: 2,
      name: "João Oliveira",
      role: "Atleta Profissional",
      text: "Os profissionais da FisioCare são excepcionais. Graças ao tratamento personalizado, voltei a competir em tempo recorde.",
    },
    {
      id: 3,
      name: "Ana Costa",
      role: "Paciente de Hidroginástica",
      text: "As aulas de hidroginástica melhoraram significativamente minha mobilidade e qualidade de vida. Recomendo a todos!",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (!isClient) {
    return null
  }

  return (
    <div>
      <div className="bg-white rounded-xl p-8 shadow-xl relative">
        <div className="absolute top-6 right-8 text-teal-100">
          <Quote size={60} className="opacity-20" />
        </div>
        <p className="text-gray-700 text-lg mb-6 relative z-10">{testimonials[currentIndex].text}</p>
        <div className="flex items-center">
          <div className="bg-teal-100 p-3 rounded-full mr-4">
            <User className="h-6 w-6 text-teal-600" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h4>
            <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
          </div>
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            } transition-all duration-300`}
            aria-label={`Ir para depoimento ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
