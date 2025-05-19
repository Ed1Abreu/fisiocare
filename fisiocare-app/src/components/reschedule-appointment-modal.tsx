"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface Consulta {
  data: string
  hora: string
  modalidade: string
  medico: string
  index?: number
}

interface RescheduleAppointmentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (dados: Consulta & { index: number }) => void
  consulta: (Consulta & { index: number }) | null
}

export function RescheduleAppointmentModal({ isOpen, onClose, onSubmit, consulta }: RescheduleAppointmentModalProps) {
  const [dados, setDados] = useState<Consulta & { index: number }>({
    data: "",
    hora: "",
    modalidade: "",
    medico: "",
    index: -1,
  })
  const [date, setDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    if (isOpen && consulta) {
      setDados(consulta)
      setDate(new Date(consulta.data))
    }
  }, [isOpen, consulta])

  const handleChange = (field: keyof Consulta, value: string) => {
    setDados((prev) => ({ ...prev, [field]: value }))
  }

  const handleDateChange = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      setDados((prev) => ({ ...prev, data: format(newDate, "yyyy-MM-dd") }))
    }
  }

  const handleSubmit = () => {
    if (dados.index !== undefined) {
      onSubmit(dados)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-black">Reagendar Consulta</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">Data da Consulta</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-300">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "P", { locale: ptBR }) : "Selecione uma data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">Hora</Label>
            <Select value={dados.hora} onValueChange={(value) => handleChange("hora", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um horário" />
              </SelectTrigger>
              <SelectContent>
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
            <Label className="text-sm font-medium text-black">Modalidade</Label>
            <Select value={dados.modalidade} onValueChange={(value) => handleChange("modalidade", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma modalidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Musculação">Musculação</SelectItem>
                <SelectItem value="Hidroginástica">Hidroginástica</SelectItem>
                <SelectItem value="Fisioterapia Pélvica">Fisioterapia Pélvica</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-black">Médico</Label>
            <Select value={dados.medico} onValueChange={(value) => handleChange("medico", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um médico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lionel Messi">Lionel Messi</SelectItem>
                <SelectItem value="Cristiano Ronaldo">Cristiano Ronaldo</SelectItem>
                <SelectItem value="Neymar Junior">Neymar Junior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700 text-white">
            Confirmar Reagendamento
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
