"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface EditPatientModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (nome: string, sintomas: string) => void
  initialData: {
    nome: string
    sintomas: string
  }
}

export function EditPatientModal({ isOpen, onClose, onSubmit, initialData }: EditPatientModalProps) {
  const [nome, setNome] = useState("")
  const [sintomas, setSintomas] = useState("")
  const [erroNome, setErroNome] = useState("")
  const [erroSintomas, setErroSintomas] = useState("")

  const LIMITE_CARACTERES = 50
  const MIN_CARACTERES = 3

  useEffect(() => {
    if (isOpen) {
      setNome(initialData.nome)
      setSintomas(initialData.sintomas)
      setErroNome("")
      setErroSintomas("")
    }
  }, [isOpen, initialData])

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

  const handleSubmit = () => {
    if (validarNome(nome) && validarSintomas(sintomas)) {
      onSubmit(nome, sintomas)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Paciente</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-nome" className="text-sm font-medium">
              Nome do Paciente
            </Label>
            <Input
              id="edit-nome"
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
            <Label htmlFor="edit-sintomas" className="text-sm font-medium">
              Sintomas
            </Label>
            <Textarea
              id="edit-sintomas"
              value={sintomas}
              onChange={(e) => {
                setSintomas(e.target.value)
                validarSintomas(e.target.value)
              }}
              className={`min-h-[100px] ${erroSintomas ? "border-red-300 focus-visible:ring-red-300" : ""}`}
            />
            {erroSintomas && <p className="text-sm text-red-500 mt-1">{erroSintomas}</p>}
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
