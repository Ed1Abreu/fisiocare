"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  CalendarIcon,
  Trash2,
  Edit,
  User,
  Phone,
  Mail,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  BarChart3,
  CalendarDays,
  CalendarPlus,
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { EditPatientModal } from "@/components/edit-patient-modal"
import { EditTherapistModal } from "@/components/edit-therapist-modal"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Paciente {
  nome: string
  consulta: string
  sintomas: string
}

interface DadosFisioterapeuta {
  nome: string
  cargo: string
  crefito: string
  telefone: string
  email: string
  foto: string
}

export default function Controle() {
  const [date, setDate] = useState<Date>(new Date())
  const [pacientes, setPacientes] = useState<Paciente[]>([
    {
      nome: "Maria Oliveira",
      consulta: "20/05/2025",
      sintomas:
        "Dor lombar crônica com irradiação para perna direita. Paciente relata piora ao sentar por longos períodos.",
    },
    {
      nome: "João Santos",
      consulta: "21/05/2025",
      sintomas: "Recuperação pós-cirúrgica de ligamento cruzado anterior. Apresenta dificuldade de flexão completa.",
    },
    {
      nome: "Ana Costa",
      consulta: "22/05/2025",
      sintomas: "Tendinite no ombro direito. Limitação de movimento ao elevar o braço acima da cabeça.",
    },
  ])
  const [nome, setNome] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [showCalendar, setShowCalendar] = useState(false)
  const [erroNome, setErroNome] = useState("")
  const [erroSintomas, setErroSintomas] = useState("")
  const [editingPatientModal, setEditingPatientModal] = useState(false)
  const [editingTherapistModal, setEditingTherapistModal] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [dadosFisioterapeuta, setDadosFisioterapeuta] = useState<DadosFisioterapeuta>({
    nome: "Dr. João Silva",
    cargo: "Fisioterapeuta Ocupacional",
    crefito: "1/12345",
    telefone: "(11) 99999-9999",
    email: "dr.joao@fisioterapia.com",
    foto: "", // Removida a referência à imagem
  })

  const LIMITE_CARACTERES = 50
  const MIN_CARACTERES = 3

  const validarNome = (nomeInput: string) => {
    if (nomeInput.trim() === "") {
      setErroNome("Por favor, insira o nome do paciente")
      return false
    }
    if (nomeInput.trim().length < MIN_CARACTERES) {
      setErroNome(`O nome deve ter no mínimo ${MIN_CARACTERES} caracteres`)
      return false
    }
    if (nomeInput.length > LIMITE_CARACTERES) {
      setErroNome(`O nome não pode ter mais que ${LIMITE_CARACTERES} caracteres`)
      return false
    }
    setErroNome("")
    return true
  }

  const validarSintomas = (sintomasInput: string) => {
    if (sintomasInput.trim() === "") {
      setErroSintomas("Por favor, descreva os sintomas do paciente")
      return false
    }
    setErroSintomas("")
    return true
  }

  const adicionarPaciente = () => {
    if (!date) {
      return
    }
    if (nome.trim().length < MIN_CARACTERES) {
      setErroNome(`O nome deve ter no mínimo ${MIN_CARACTERES} caracteres`)
      return
    }
    if (!validarNome(nome) || !validarSintomas(sintomas)) {
      return
    }
    setPacientes([
      ...pacientes,
      {
        nome,
        consulta: format(date, "P", { locale: ptBR }),
        sintomas,
      },
    ])
    setNome("")
    setSintomas("")
    setShowCalendar(false)
  }

  const removerPaciente = (index: number) => {
    const novosPacientes = pacientes.filter((_, i) => i !== index)
    setPacientes(novosPacientes)
  }

  const editarPaciente = (index: number) => {
    setEditingIndex(index)
    setEditingPatientModal(true)
  }

  const handleUpdatePaciente = (novoNome: string, novosSintomas: string) => {
    if (editingIndex !== null && validarNome(novoNome) && validarSintomas(novosSintomas)) {
      const novosPacientes = [...pacientes]
      novosPacientes[editingIndex] = {
        ...novosPacientes[editingIndex],
        nome: novoNome,
        sintomas: novosSintomas,
      }
      setPacientes(novosPacientes)
    }
  }

  const handleUpdateFisioterapeuta = (novosDados: DadosFisioterapeuta) => {
    setDadosFisioterapeuta(novosDados)
  }

  // Função para verificar se a consulta é hoje
  const isToday = (dataConsulta: string) => {
    const today = format(new Date(), "P", { locale: ptBR })
    return dataConsulta === today
  }

  // Próxima consulta
  const proximaConsulta = pacientes.length > 0 ? pacientes[0] : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Header com boas-vindas */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-800 bg-clip-text text-transparent">
            Painel de Controle FisioCare
          </h1>
          <p className="text-gray-600 mt-2">Gerencie seus pacientes e consultas em um só lugar</p>
        </div>

        {/* Resumo e Próxima Consulta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Card de Resumo */}
          <Card className="md:col-span-2 border-none shadow-lg bg-gradient-to-br from-teal-500 to-teal-700 text-white overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">Resumo</CardTitle>
              <CardDescription className="text-teal-100">Visão geral do sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <Users className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold">{pacientes.length}</span>
                  <span className="text-xs text-teal-100">Pacientes Cadastrados</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <CalendarDays className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold">{pacientes.filter((p) => isToday(p.consulta)).length}</span>
                  <span className="text-xs text-teal-100">Consultas Hoje</span>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 flex flex-col items-center justify-center">
                  <div className="bg-white/20 p-2 rounded-full mb-2">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-bold">85%</span>
                  <span className="text-xs text-teal-100">Taxa de Recuperação</span>
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
                      <CalendarDays className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-black">{proximaConsulta.consulta}</p>
                      <p className="text-sm text-gray-500">Próximo atendimento</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-amber-100 p-2 rounded-full mr-3">
                      <User className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-black">{proximaConsulta.nome}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{proximaConsulta.sintomas}</p>
                    </div>
                  </div>
                  {isToday(proximaConsulta.consulta) && (
                    <Badge className="bg-green-500 hover:bg-green-600 text-white mt-2">Hoje</Badge>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center">
                  <AlertCircle className="h-10 w-10 text-amber-500 mb-2" />
                  <p className="text-gray-600">Nenhuma consulta agendada</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Informações do Fisioterapeuta */}
          <div className="lg:col-span-3">
            <Card className="border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="pb-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
                <CardTitle>Perfil Profissional</CardTitle>
                <CardDescription className="text-teal-100">Informações do fisioterapeuta</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4 pt-6">
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-white shadow-xl">
                    <AvatarFallback className="bg-teal-100 text-teal-700 text-2xl">
                      {dadosFisioterapeuta.nome
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2">
                    <Button
                      size="icon"
                      className="rounded-full h-8 w-8 bg-teal-600 hover:bg-teal-700 text-white shadow-lg"
                      onClick={() => setEditingTherapistModal(true)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="font-bold text-xl text-black">{dadosFisioterapeuta.nome}</h3>
                  <Badge variant="outline" className="mt-1 bg-teal-50 text-teal-700 border-teal-200">
                    {dadosFisioterapeuta.cargo}
                  </Badge>
                </div>

                <div className="w-full space-y-4 pt-4">
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Award className="mr-3 h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">CREFITO</p>
                      <p className="font-medium text-black">{dadosFisioterapeuta.crefito}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Phone className="mr-3 h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Telefone</p>
                      <p className="font-medium text-black">{dadosFisioterapeuta.telefone}</p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <Mail className="mr-3 h-5 w-5 text-teal-600" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium truncate max-w-[200px] text-black" title={dadosFisioterapeuta.email}>
                        {dadosFisioterapeuta.email}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Estatísticas */}
            <Card className="mt-6 border-none shadow-lg bg-white overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-teal-700 text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Total de Pacientes</span>
                      <Badge className="bg-teal-100 text-teal-800 hover:bg-teal-200">{pacientes.length}</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-teal-600 h-2.5 rounded-full"
                        style={{ width: `${Math.min(pacientes.length * 10, 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Consultas Hoje</span>
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                        {pacientes.filter((p) => isToday(p.consulta)).length}
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-amber-500 h-2.5 rounded-full"
                        style={{
                          width: `${Math.min(pacientes.filter((p) => isToday(p.consulta)).length * 33, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-600">Taxa de Ocupação</span>
                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">75%</Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Tabs defaultValue="pacientes" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-white shadow-md">
                <TabsTrigger
                  value="pacientes"
                  className="text-base data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  <User className="mr-2 h-5 w-5" /> Gerenciar Pacientes
                </TabsTrigger>
                <TabsTrigger
                  value="adicionar"
                  className="text-base data-[state=active]:bg-teal-600 data-[state=active]:text-white"
                >
                  <CalendarPlus className="mr-2 h-5 w-5" /> Adicionar Paciente
                </TabsTrigger>
              </TabsList>

              {/* Tab de Lista de Pacientes */}
              <TabsContent value="pacientes">
                <Card className="border-none shadow-lg bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-2xl text-teal-700">Lista de Pacientes</CardTitle>
                    <CardDescription className="text-black">
                      Gerencie os pacientes cadastrados no sistema
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {pacientes.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="bg-gray-100 p-4 rounded-full mb-4">
                          <Users className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-700 mb-2">Nenhum paciente cadastrado</h3>
                        <p className="text-gray-500 max-w-md">
                          Você não tem pacientes cadastrados no momento. Clique em "Adicionar Paciente" para cadastrar
                          seu primeiro paciente.
                        </p>
                        <Button
                          className="mt-6 bg-teal-600 hover:bg-teal-700 text-white"
                          onClick={() => {
                            const element = document.querySelector('[data-value="adicionar"]') as HTMLElement
                            if (element) element.click()
                          }}
                        >
                          Adicionar Paciente
                        </Button>
                      </div>
                    ) : (
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                          {pacientes.map((paciente, index) => (
                            <div
                              key={index}
                              className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100"
                            >
                              <div className="h-2 bg-gradient-to-r from-teal-500 to-teal-600"></div>
                              <div className="p-5 bg-white">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-start space-x-4">
                                    <div className="p-3 rounded-lg bg-teal-50 text-teal-600">
                                      <User className="h-5 w-5" />
                                    </div>
                                    <div>
                                      <div className="flex items-center space-x-2">
                                        <h3 className="font-semibold text-lg text-gray-900">{paciente.nome}</h3>
                                        {isToday(paciente.consulta) && (
                                          <Badge className="bg-green-500 hover:bg-green-600 text-white">Hoje</Badge>
                                        )}
                                      </div>
                                      <p className="text-gray-600 mt-1 flex items-center">
                                        <CalendarDays className="h-4 w-4 mr-1 text-gray-400" />
                                        {paciente.consulta}
                                      </p>
                                      <p className="text-gray-700 mt-2 text-sm">{paciente.sintomas}</p>
                                    </div>
                                  </div>

                                  <div className="flex space-x-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => editarPaciente(index)}
                                      className="h-8 w-8 text-gray-500 hover:text-teal-600 hover:bg-teal-50"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removerPaciente(index)}
                                      className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Tab de Adicionar Paciente */}
              <TabsContent value="adicionar">
                <Card className="border-none shadow-lg bg-white">
                  <CardHeader>
                    <CardTitle className="text-2xl text-teal-700">Adicionar Novo Paciente</CardTitle>
                    <CardDescription className="text-black">
                      Preencha os dados para cadastrar um novo paciente
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <label htmlFor="nome" className="text-sm font-medium text-black">
                            Nome do Paciente
                          </label>
                          <Input
                            id="nome"
                            placeholder="Nome completo do paciente"
                            value={nome}
                            onChange={(e) => {
                              const novoNome = e.target.value
                              if (novoNome.length <= LIMITE_CARACTERES) {
                                setNome(novoNome)
                              }
                              validarNome(novoNome)
                            }}
                            maxLength={LIMITE_CARACTERES}
                            className={erroNome ? "border-red-300 focus-visible:ring-red-300" : ""}
                          />
                          {nome.length > 0 && (
                            <p className={`text-xs ${nome.length < MIN_CARACTERES ? "text-red-500" : "text-gray-500"}`}>
                              {nome.length}/{LIMITE_CARACTERES} caracteres (mínimo: {MIN_CARACTERES})
                            </p>
                          )}
                          {erroNome && <p className="text-sm text-red-500 mt-1">{erroNome}</p>}
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="sintomas" className="text-sm font-medium text-black">
                            Sintomas
                          </label>
                          <Textarea
                            id="sintomas"
                            placeholder="Descreva os sintomas do paciente"
                            value={sintomas}
                            onChange={(e) => {
                              setSintomas(e.target.value)
                              validarSintomas(e.target.value)
                            }}
                            className={`min-h-[120px] ${erroSintomas ? "border-red-300 focus-visible:ring-red-300" : ""}`}
                          />
                          {erroSintomas && <p className="text-sm text-red-500 mt-1">{erroSintomas}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium text-black">Data da Consulta</label>
                          <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal border-gray-300 hover:bg-gray-50"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "P", { locale: ptBR }) : "Selecione uma data"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(date) => {
                                  if (date) {
                                    setDate(date)
                                    setShowCalendar(false)
                                  }
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                      </div>

                      <div className="flex flex-col justify-center items-center bg-gray-50 rounded-xl p-6">
                        <div className="w-full max-w-xs">
                          <div className="text-center mb-6">
                            <div className="inline-flex p-4 bg-teal-100 rounded-full mb-4">
                              <CalendarPlus className="h-8 w-8 text-teal-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-800">Cadastre um paciente</h3>
                            <p className="text-gray-600 mt-2">
                              Adicione informações do paciente para gerenciar seus tratamentos e consultas
                            </p>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center">
                              <div className="bg-teal-100 p-2 rounded-full mr-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                              </div>
                              <p className="text-sm text-gray-600">Acompanhamento personalizado</p>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-teal-100 p-2 rounded-full mr-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                              </div>
                              <p className="text-sm text-gray-600">Histórico de tratamentos</p>
                            </div>
                            <div className="flex items-center">
                              <div className="bg-teal-100 p-2 rounded-full mr-3">
                                <CheckCircle2 className="h-5 w-5 text-teal-600" />
                              </div>
                              <p className="text-sm text-gray-600">Gestão de consultas</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={adicionarPaciente}
                      className="w-full bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white py-6 text-lg"
                    >
                      Adicionar Paciente
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Modais */}
      <EditPatientModal
        isOpen={editingPatientModal}
        onClose={() => setEditingPatientModal(false)}
        onSubmit={handleUpdatePaciente}
        initialData={editingIndex !== null ? pacientes[editingIndex] : { nome: "", sintomas: "" }}
      />

      <EditTherapistModal
        isOpen={editingTherapistModal}
        onClose={() => setEditingTherapistModal(false)}
        onSubmit={handleUpdateFisioterapeuta}
        dadosAtuais={dadosFisioterapeuta}
      />
    </div>
  )
}
