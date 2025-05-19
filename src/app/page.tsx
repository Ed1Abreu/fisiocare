"use client"

import Link from "next/link"
import {
  Clock,
  Stethoscope,
  MapPin,
  Calendar,
  Facebook,
  Instagram,
  Twitter,
  MessageSquare,
  ChevronRight,
  Phone,
  Mail,
  User,
  Users,
  Activity,
} from "lucide-react"
import SpecialtySlider from "@/components/speciality-slider"
import TestimonialSlider from "@/components/testimonial-slider"

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-gray-800 bg-white">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <span className="text-2xl font-bold">
                Fisio<span className="text-teal-600">Care</span>
              </span>
            </div>
            <nav className="hidden md:block">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    href="#home"
                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all after:duration-300"
                  >
                    Início
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all after:duration-300"
                  >
                    Serviços
                  </Link>
                </li>
                <li>
                  <Link
                    href="#specialty"
                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all after:duration-300"
                  >
                    Especialidades
                  </Link>
                </li>
                <li>
                  <Link
                    href="#therapists"
                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all after:duration-300"
                  >
                    Profissionais
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="text-gray-700 hover:text-teal-600 font-medium transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-teal-600 after:transition-all after:duration-300"
                  >
                    Contato
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <Link
                href="/controle"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-600/30"
              >
                Seção Doutor
              </Link>
            </div>
            <button className="md:hidden text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-[85vh] flex items-center bg-teal-600">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-800 to-teal-600 opacity-90"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">Saúde</h1>
            <p className="text-xl text-white/90 mb-8">
              Oferecemos serviços de fisioterapia com uma equipe de profissionais dedicados a cuidar da sua saúde e
              bem-estar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-all duration-300 shadow-lg hover:shadow-amber-500/30 text-center"
              >
                Agende sua Consulta
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/30 font-medium rounded-lg hover:bg-white/20 transition-all duration-300 text-center"
              >
                Conheça Nossos Serviços
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Info Cards */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-teal-600 text-white rounded-xl shadow-xl shadow-teal-600/10 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-teal-600/20">
              <div className="flex justify-center items-center w-16 h-16 bg-white/10 rounded-full mb-6 mx-auto">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Horários</h3>
              <div className="space-y-2">
                <p className="text-center text-white/90">Segunda - Sexta: 08:00 - 20:00</p>
                <p className="text-center text-white/90">Sabado: 08:00 - 12:00</p>
                <p className="text-center text-white/90">Endereços: Informações adicionais</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-xl shadow-gray-200/80 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex justify-center items-center w-16 h-16 bg-teal-50 text-teal-600 rounded-full mb-6 mx-auto">
                <Calendar size={28} />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Agendamentos</h3>
              <p className="text-center text-gray-600 mb-6">Agende sua consulta online</p>
              <div className="flex justify-center">
                <button className="px-5 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 shadow hover:shadow-teal-600/30">
                  Agendar
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-xl shadow-gray-200/80 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex justify-center items-center w-16 h-16 bg-teal-50 text-teal-600 rounded-full mb-6 mx-auto">
                <Stethoscope size={28} />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Profissionais</h3>
              <p className="text-center text-gray-600 mb-6">Encontre um especialista</p>
              <div className="flex justify-center">
                <button className="px-5 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 shadow hover:shadow-teal-600/30">
                  Doutores
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow-xl shadow-gray-200/80 p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="flex justify-center items-center w-16 h-16 bg-teal-50 text-teal-600 rounded-full mb-6 mx-auto">
                <MapPin size={28} />
              </div>
              <h3 className="text-xl font-bold text-center text-gray-800 mb-4">Localização</h3>
              <p className="text-center text-gray-600 mb-6">Encontre a clínica mais próxima</p>
              <div className="flex justify-center">
                <button className="px-5 py-2.5 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 shadow hover:shadow-teal-600/30">
                  Mapa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-600 font-semibold rounded-full text-sm mb-4">
                SOBRE NÓS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                FisioCare é um time de experiência profissional
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Oferecemos serviços de fisioterapia com uma equipe de profissionais dedicados a cuidar da sua saúde e
                bem-estar. Nossa missão é proporcionar tratamentos personalizados e eficazes para melhorar sua qualidade
                de vida através de técnicas modernas e abordagens comprovadas.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  <span className="text-gray-700">Profissionais Certificados</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  <span className="text-gray-700">Equipamentos Modernos</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-teal-600 rounded-full mr-2"></div>
                  <span className="text-gray-700">Tratamentos Personalizados</span>
                </div>
              </div>
              <Link
                href="#therapists"
                className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-teal-600 text-teal-600 font-medium rounded-lg hover:bg-teal-600 hover:text-white transition-all duration-300"
              >
                Conheça Nossa Equipe
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="bg-teal-100 rounded-xl p-8 shadow-xl">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="p-4 bg-teal-600 text-white rounded-full">
                      <Users size={40} />
                    </div>
                    <h3 className="text-xl font-bold text-teal-800 text-center">Equipe Especializada</h3>
                    <p className="text-teal-700 text-center">
                      Nossa equipe é formada por profissionais altamente qualificados e dedicados ao seu bem-estar
                    </p>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-teal-600 rounded-lg hidden md:block"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-amber-500 rounded-lg hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section id="specialty" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-teal-50 text-teal-600 font-semibold rounded-full text-sm mb-4">
              ESPECIALIDADES
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Nossas Especialidades</h2>
            <p className="text-gray-600 text-lg">
              Oferecemos uma variedade de serviços especializados para atender às suas necessidades específicas de saúde
              e bem-estar.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <SpecialtySlider />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-teal-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block px-3 py-1 bg-white/10 text-white font-semibold rounded-full text-sm mb-4">
              DEPOIMENTOS
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">O Que Nossos Pacientes Dizem</h2>
            <p className="text-white/80 text-lg">
              Conheça as histórias de sucesso e experiências de nossos pacientes com os tratamentos da FisioCare.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <TestimonialSlider />
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-3 py-1 bg-teal-50 text-teal-600 font-semibold rounded-full text-sm mb-4">
                AGENDAMENTO
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Agende Sua Consulta Agora!</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Rápido, fácil e direto ao ponto. Cuide do seu bem-estar hoje mesmo.
              </p>

              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Nome Completo"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Telefone"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Selecione o Serviço</option>
                    <option>Musculação</option>
                    <option>Fisioterapia Pélvica</option>
                    <option>Hidroterapia</option>
                    <option>Consulta Diária</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                  <div>
                    <input
                      type="time"
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-teal-600/30 transform hover:-translate-y-1"
                >
                  Confirmar Agendamento
                </button>
              </form>
            </div>
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500 rounded-lg hidden md:block"></div>
              <div className="bg-white rounded-xl p-8 shadow-xl relative z-10">
                <div className="flex flex-col items-center justify-center space-y-6">
                  <div className="p-4 bg-amber-100 text-amber-600 rounded-full">
                    <Calendar size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 text-center">Agendamento Simplificado</h3>
                  <p className="text-gray-600 text-center">
                    Marque sua consulta de forma rápida e fácil. Nossa equipe está pronta para atendê-lo com o melhor
                    cuidado.
                  </p>
                  <div className="grid grid-cols-1 gap-4 w-full">
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Activity className="h-5 w-5 text-teal-600 mr-3" />
                      <span className="text-gray-700">Avaliação personalizada</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <User className="h-5 w-5 text-teal-600 mr-3" />
                      <span className="text-gray-700">Profissionais especializados</span>
                    </div>
                    <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Clock className="h-5 w-5 text-teal-600 mr-3" />
                      <span className="text-gray-700">Horários flexíveis</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-teal-600 rounded-lg hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">1500+</div>
              <p className="text-gray-600">Pacientes Atendidos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">15</div>
              <p className="text-gray-600">Especialistas</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">10+</div>
              <p className="text-gray-600">Anos de Experiência</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600 mb-2">98%</div>
              <p className="text-gray-600">Satisfação</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-6">
                Fisio<span className="text-amber-500">Care</span>
              </h2>
              <p className="text-gray-400 mb-6">
                Cuidando da sua saúde com excelência e dedicação para proporcionar bem-estar e qualidade de vida.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-teal-600 transition-colors duration-300"
                >
                  <MessageSquare size={18} />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-amber-500 after:bottom-0 after:left-0 pb-2">
                Links Rápidos
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Início
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Sobre Nós
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Especialidades
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Equipe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-amber-500 after:bottom-0 after:left-0 pb-2">
                Especialidades
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Musculação
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Fisioterapia Pélvica
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Hidroterapia
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center"
                  >
                    <ChevronRight className="mr-2 h-3 w-3 text-amber-500" /> Consulta Diária
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:w-12 after:h-1 after:bg-amber-500 after:bottom-0 after:left-0 pb-2">
                Contato
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Mail className="mt-1 mr-3 h-4 w-4 text-amber-500" />
                  <span className="text-gray-400">contato@fisiocare.com</span>
                </li>
                <li className="flex items-start">
                  <Phone className="mt-1 mr-3 h-4 w-4 text-amber-500" />
                  <span className="text-gray-400">(11) 1234-5678</span>
                </li>
                <li className="flex items-start">
                  <MapPin className="mt-1 mr-3 h-4 w-4 text-amber-500" />
                  <span className="text-gray-400">Rua Saúde, 123, São Paulo - SP</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">&copy; {new Date().getFullYear()} FisioCare. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        section {
          animation: fadeIn 0.8s ease-in-out;
        }
        .container {
          width: 100%;
          margin-right: auto;
          margin-left: auto;
          padding-right: 1rem;
          padding-left: 1rem;
        }
        @media (min-width: 640px) {
          .container {
            max-width: 640px;
          }
        }
        @media (min-width: 768px) {
          .container {
            max-width: 768px;
          }
        }
        @media (min-width: 1024px) {
          .container {
            max-width: 1024px;
          }
        }
        @media (min-width: 1280px) {
          .container {
            max-width: 1280px;
          }
        }
        @media (min-width: 1536px) {
          .container {
            max-width: 1536px;
          }
        }
      `}</style>
    </div>
  )
}
