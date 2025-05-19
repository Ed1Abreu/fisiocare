"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DadosPaciente {
  nome: string
  dataNascimento: string
  cpf: string
  telefone: string
  email: string
  foto: string
}

interface EditPatientInfoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (dados: DadosPaciente) => void
  dadosAtuais: DadosPaciente
}

export function EditPatientInfoModal({ isOpen, onClose, onSubmit, dadosAtuais }: EditPatientInfoModalProps) {
  const [dados, setDados] = useState<DadosPaciente>({
    nome: "",
    dataNascimento: "",
    cpf: "",
    telefone: "",
    email: "",
    foto: "",
  })

  useEffect(() => {
    if (isOpen) {
      setDados(dadosAtuais)
    }
  }, [isOpen, dadosAtuais])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDados((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onSubmit(dados)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-black">Editar Informações Pessoais</DialogTitle>
        </DialogHeader>

        <div className="flex justify-center my-4">
          <Avatar className="h-24 w-24 border-2 border-teal-200">
            <AvatarImage src={dados.foto || "/placeholder.svg"} alt={dados.nome} />
            <AvatarFallback className="bg-teal-100 text-teal-700 text-xl">
              {dados.nome
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="grid gap-4 py-2">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nome" className="text-sm font-medium text-black">
                Nome Completo
              </Label>
              <Input id="nome" name="nome" value={dados.nome} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataNascimento" className="text-sm font-medium text-black">
                Data de Nascimento
              </Label>
              <Input
                id="dataNascimento"
                name="dataNascimento"
                type="date"
                value={dados.dataNascimento}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cpf" className="text-sm font-medium text-black">
                CPF
              </Label>
              <Input id="cpf" name="cpf" value={dados.cpf} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefone" className="text-sm font-medium text-black">
                Telefone
              </Label>
              <Input id="telefone" name="telefone" value={dados.telefone} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-black">
              Email
            </Label>
            <Input id="email" name="email" type="email" value={dados.email} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foto" className="text-sm font-medium text-black">
              URL da Foto
            </Label>
            <Input
              id="foto"
              name="foto"
              value={dados.foto}
              onChange={handleChange}
              placeholder="https://exemplo.com/foto.jpg"
            />
            <p className="text-xs text-black">Insira a URL de uma imagem para seu perfil</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700 text-white">
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
