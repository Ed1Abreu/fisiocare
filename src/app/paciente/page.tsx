"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  CalendarIcon,
  Trash2,
  Edit,
  Phone,
  Mail,
  CreditCard,
  Clock,
  Activity,
  User,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { EditPatientInfoModal } from "@/components/edit-patient-info-modal"
import { RescheduleAppointmentModal } from "@/components/reschedule-appointment-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"

interface DadosPaciente {
  nome: string
  dataNascimento: string
  cpf: string
  telefone: string
  email: string
  foto: string
}

interface Consulta {
  data: string
  hora: string
  modalidade: string
  medico: string
}

export default function DashboardPaciente() {
  // Estado: Informações do Paciente
  const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente>({
    nome: "Maria da Silva",
    dataNascimento: "1990-01-01",
    cpf: "123.456.789-00",
    telefone: "(11) 99999-9999",
    email: "maria.silva@exemplo.com",
    foto: "https://cdn-icons-png.flaticon.com/512/2919/2919600.png",
  })
  const [modalPacienteOpen, setModalPacienteOpen] = useState(false)

  // Estado: Agendamentos (Consultas)
  const [dataConsulta, setDataConsulta] = useState<Date | undefined>(undefined)
  const [hora, setHora] = useState("")
  const [modalidade, setModalidade] = useState("")
  const [medico, setMedico] = useState("")
  const [consultas, setConsultas] = useState<Consulta[]>([
    {
      data: "2025-05-25",
      hora: "09:00",
      modalidade: "Fisioterapia Pélvica",
      medico: "Cristiano Ronaldo",
    },
    {
      data: "2025-06-10",
      hora: "14:00",
      modalidade: "Musculação",
      medico: "Lionel Messi",
    },
  ])

  // Estado: Modal de Reagendar
  const [modalReagendarOpen, setModalReagendarOpen] = useState(false)
  const [consultaEditando, setConsultaEditando] = useState<(Consulta & { index: number }) | null>(null)

  // Função: Agendar nova consulta
  const handleAdicionarConsulta = () => {
    // Validação simples
    if (!dataConsulta) return
    if (!hora) return
    if (!modalidade.trim()) return
    if (!medico.trim()) return

    // Cria objeto da consulta
    const novaConsulta: Consulta = {
      data: format(dataConsulta, "yyyy-MM-dd"),
      hora: hora,
      modalidade: modalidade,
      medico: medico,
    }
    setConsultas([...consultas, novaConsulta])

    // Limpa campos
    setDataConsulta(undefined)
    setHora("")
    setModalidade("")
    setMedico("")
  }

  // Função: Remover uma consulta
  const handleRemoverConsulta = (index: number) => {
    const novasConsultas = consultas.filter((_, i) => i !== index)
    setConsultas(novasConsultas)
  }

  // Função: Abrir modal de reagendar
  const handleReagendar = (index: number) => {
    // Pega os dados da consulta que será editada
    const consulta = consultas[index]
    setConsultaEditando({ ...consulta, index })
    setModalReagendarOpen(true)
  }

  // Função: Atualizar uma consulta já existente
  const handleUpdateConsulta = (dadosAtualizados: Consulta & { index: number }) => {
    const { index } = dadosAtualizados
    if (index == null) return // segurança

    const novasConsultas = [...consultas]
    novasConsultas[index] = {
      data: dadosAtualizados.data,
      hora: dadosAtualizados.hora,
      modalidade: dadosAtualizados.modalidade,
      medico: dadosAtualizados.medico,
    }
    setConsultas(novasConsultas)
  }

  // Função: Atualizar dados do Paciente
  const handleUpdatePaciente = (novosDados: DadosPaciente) => {
    setDadosPaciente(novosDados)
  }

  // Função para obter a cor baseada na modalidade
  const getModalidadeColor = (modalidade: string) => {
    switch (modalidade) {
      case "Musculação":
        return "bg-gradient-to-r from-blue-500 to-blue-600"
      case "Hidroginástica":
        return "bg-gradient-to-r from-cyan-500 to-cyan-600"
      case "Fisioterapia Pélvica":
        return "bg-gradient-to-r from-purple-500 to-purple-600"
      default:
        return "bg-gradient-to-r from-teal-500 to-teal-600"
    }
  }

  // Função para obter o ícone baseado na modalidade
  const getModalidadeIcon = (modalidade: string) => {
    switch (modalidade) {
      case "Musculação":
        return <Activity className="h-5 w-5" />
      case "Hidroginástica":
        return <Activity className="h-5 w-5" />
      case "Fisioterapia Pélvica":
        return <Activity className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  // Função para verificar se a consulta é hoje
  const isToday = (data: string) => {
    const today = new Date()
    const consultaDate = new Date(data)
    return (
      today.getDate() === consultaDate.getDate() &&
      today.getMonth() === consultaDate.getMonth() &&
      today.getFullYear() === consultaDate.getFullYear()
    )
  }

  // Função para verificar se a consulta já passou
  const isPast = (data: string) => {
    const today = new Date()
    const consultaDate = new Date(data)
    return consultaDate < today
  }

  // Próxima consulta
  const proximaConsulta = consultas
    .filter((consulta) => !isPast(consulta.data))
    .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black">
      <div className="container mx-auto py-8 px-4">
        {/* Header com boas-vindas */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Bem-vinda, {dadosPaciente.nome.split(" ")[0]}!
          </h1>
          <p className="text-gray-600 mt-2">Gerencie suas consultas e informações pessoais</p>
        </div>

        {/* Resumo e Próxima Consulta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card de Resumo */}
          <Card className="md:col-span-2 border-none shadow-lg bg-gradient-to-br from-teal-500 to-teal-700 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Resumo</CardTitle>
              <CardDescription className="text-teal-100">Visão geral da sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <CalendarIcon className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold">{consultas.length}</span>
                  <span className="text-xs text-teal-100">Consultas Agendadas</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold">12</span>
                  <span className="text-xs text-teal-100">Consultas Realizadas</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <Activity className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold">3</span>
                  <span className="text-xs text-teal-100">Modalidades</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próxima Consulta */}
          <Card className="border-none shadow-lg bg-white overflow-hidden">
            <CardHeader className="pb-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white">
              <CardTitle className="text-lg flex items-center">
                <Clock className="mr-2 h-5 w-5" /> Próxima Consulta
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {proximaConsulta ? (
                <div className="space-y-3">
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <CalendarIcon className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-black">
                        {format(new Date(proximaConsulta.data), "dd 'de' MMMM", { locale: ptBR })}
                      </p>
                      <p className="text-sm text-gray-500">{proximaConsulta.hora}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <Activity className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-black">{proximaConsulta.modalidade}</p>
                      <p className="text-sm text-gray-500">com Dr. {proximaConsulta.medico}</p>
                    </div>
                  </div>
                  {isToday(proximaConsulta.data) && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white mt-2">Hoje</Badge>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <AlertCircle className="h-10 w-10 text-amber-500 mb-2" />
                  <p className="text-gray-600">Você não tem consultas agendadas</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card: Informações do Paciente */}
          <div className="lg:col-span-3">
            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <CardTitle>Meu Perfil</CardTitle>
                <CardDescription className="text-teal-100">Informações pessoais</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4 pt-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                    <AvatarImage src={dadosPaciente.foto || "/placeholder.svg"} alt={dadosPaciente.nome} />
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-2xl">
                      {dadosPaciente.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <Button
                      size="icon"
                      className="rounded-full h-8 w-8 bg-teal-600 hover:bg-teal-700 text-white shadow-lg"
                      onClick={() => setModalPacienteOpen(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-xl text-black">{dadosPaciente.nome}</h3>
                  <Badge variant="outline" className="mt-1 bg-teal-50 text-teal-700 border-teal-200">
                    Paciente
                  </Badge>
                </div>

                <div className="w-full space-y-4 pt-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <CalendarIcon className="mr-3 h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Data de Nascimento</p>
                      <p className="font-medium text-black">
                        {format(new Date(dadosPaciente.dataNascimento), "dd/MM/yyyy")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <CreditCard className="mr-3 h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">CPF</p>
                      <p className="font-medium text-black">{dadosPaciente.cpf}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Phone className="mr-3 h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Telefone</p>
                      <p className="font-medium text-black">{dadosPaciente.telefone}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="mr-3 h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium truncate max-w-[200px] text-black" title={dadosPaciente.email}>
                        {dadosPaciente.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Tabs defaultValue="consultas" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white shadow-md">
                <TabsTrigger
                  value="consultas"
                  className="text-base data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  <CalendarIcon className="mr-2 h-5 w-5" /> Minhas Consultas
                </TabsTrigger>
                <TabsTrigger
                  value="agendar"
                  className="text-base data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  <Clock className="mr-2 h-5 w-5" /> Agendar Consulta
                </TabsTrigger>
              </TabsList>

              {/* Tab: Minhas Consultas */}
              <TabsContent value="consultas">
                <Card className="border-none shadow-lg bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-teal-700">Minhas Consultas</CardTitle>
                    <CardDescription className="text-black">Gerencie suas consultas agendadas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[500px] pr-4">
                      {consultas.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <div className="bg-gray-100 p-4 rounded-full mb-4">
                            <CalendarIcon className="h-10 w-10 text-gray-400" />
                          </div>
                          <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhuma consulta agendada</h3>
                          <p className="text-gray-500 max-w-md">
                            Você não tem consultas agendadas no momento. Clique em "Agendar Consulta" para marcar sua
                            primeira consulta.
                          </p>
                          <Button
                            className="mt-6 bg-teal-600 hover:bg-teal-700 text-white"
                            onClick={() => {
                              const element = document.querySelector('[data-value="agendar"]') as HTMLElement
                              if (element) element.click()
                            }}
                          >
                            Agendar Consulta
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {consultas
                            .sort((a, b) => new Date(a.data).getTime() - new Date(b.data).getTime())
                            .map((consulta, index) => (
                              <div
                                key={index}
                                className={`
                                  rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all 
                                  ${isPast(consulta.data) ? "opacity-60" : ""}
                                `}
                              >
                                <div className={`h-2 ${getModalidadeColor(consulta.modalidade)}`}></div>
                                <div className="p-5 bg-white">
                                  <div className="flex justify-between items-start">
                                    <div className="flex items-start space-x-4">
                                      <div
                                        className={`
                                        p-3 rounded-lg ${getModalidadeColor(consulta.modalidade)} text-white
                                      `}
                                      >
                                        {getModalidadeIcon(consulta.modalidade)}
                                      </div>
                                      <div>
                                        <div className="flex items-center space-x-2">
                                          <h3 className="font-semibold text-lg">{consulta.modalidade}</h3>
                                          {isToday(consulta.data) && (
                                            <Badge className="bg-green-500 hover:bg-green-600 text-white">Hoje</Badge>
                                          )}
                                          {isPast(consulta.data) && (
                                            <Badge variant="outline" className="border-gray-300 text-gray-500">
                                              Passada
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="text-gray-600 mt-1">
                                          {format(new Date(consulta.data), "EEEE, dd 'de' MMMM", { locale: ptBR })} às{" "}
                                          {consulta.hora}
                                        </p>
                                        <div className="flex items-center mt-2">
                                          <User className="h-4 w-4 text-gray-500 mr-1" />
                                          <span className="text-sm text-gray-600">Dr. {consulta.medico}</span>
                                        </div>
                                      </div>
                                    </div>

                                    {!isPast(consulta.data) && (
                                      <div className="flex space-x-2">
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleReagendar(index)}
                                          className="h-8 w-8 text-gray-500 hover:text-teal-600 hover:bg-teal-50"
                                        >
                                          <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          onClick={() => handleRemoverConsulta(index)}
                                          className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                          <Trash2 className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab: Agendar Consulta */}
              <TabsContent value="agendar">
                <Card className="border-none shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl text-teal-700">Agendar Nova Consulta</CardTitle>
                    <CardDescription className="text-black">
                      Preencha os dados para agendar sua próxima consulta
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-black">Data da Consulta</label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {dataConsulta ? format(dataConsulta, "P", { locale: ptBR }) : "Selecione uma data"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={dataConsulta}
                                onSelect={(date) => setDataConsulta(date)}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-black">Hora</label>
                          <Select value={hora} onValueChange={setHora}>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Selecione um horário" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">Selecione</SelectItem>
                              {Array.from({ length: 10 }, (_, i) => {
                                const hour = 8 + i
                                const hourStr = hour < 10 ? `0${hour}:00` : `${hour}:00`
                                return (
                                  <SelectItem key={hour} value={hourStr}>
                                    {hourStr}
                                  </SelectItem>
                                )
                              })}
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-black">Modalidade</label>
                          <Select value={modalidade} onValueChange={setModalidade}>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Selecione uma modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Selecione</SelectItem>
                              <SelectItem value="Musculação">Musculação</SelectItem>
                              <SelectItem value="Hidroginástica">Hidroginástica</SelectItem>
                              <SelectItem value="Fisioterapia Pélvica">Fisioterapia Pélvica</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-black">Médico</label>
                          <Select value={medico} onValueChange={setMedico}>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Selecione um médico" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Selecione</SelectItem>
                              <SelectItem value="Lionel Messi">Lionel Messi</SelectItem>
                              <SelectItem value="Cristiano Ronaldo">Cristiano Ronaldo</SelectItem>
                              <SelectItem value="Neymar Junior">Neymar Junior</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center bg-gray-50 rounded-xl p-6">
                        <div className="w-full max-w-xs">
                          <div className="text-center mb-6">
                            <div className="inline-flex p-4 bg-teal-100 rounded-full mb-4">
                              <CalendarIcon className="h-8 w-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Agende sua consulta</h3>
                            <p className="text-gray-600 mt-2">
                              Escolha a data, hora e modalidade para sua próxima sessão de fisioterapia
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="bg-teal-100 p-2 rounded-full mr-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                              </div>
                              <p className="text-sm text-gray-600">Profissionais especializados</p>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-teal-100 p-2 rounded-full mr-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                              </div>
                              <p className="text-sm text-gray-600">Equipamentos modernos</p>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-teal-100 p-2 rounded-full mr-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                              </div>
                              <p className="text-sm text-gray-600">Atendimento personalizado</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={handleAdicionarConsulta}
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg"
                    >
                      Marcar Consulta
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modais */}
      <EditPatientInfoModal
        isOpen={modalPacienteOpen}
        onClose={() => setModalPacienteOpen(false)}
        onSubmit={handleUpdatePaciente}
        dadosAtuais={dadosPaciente}
      />

      <RescheduleAppointmentModal
        isOpen={modalReagendarOpen}
        onClose={() => setModalReagendarOpen(false)}
        consulta={consultaEditando}
        onSubmit={handleUpdateConsulta}
      />
    </div>
  )
}
