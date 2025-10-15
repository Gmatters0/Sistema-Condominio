"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Definimos um tipo para as opções que o Combobox vai receber.
// Cada opção precisa de um 'value' (ID único) e um 'label' (texto a ser exibido).
export type ComboboxOption = {
  value: string
  label: string
}

// Definimos as propriedades que o nosso componente vai aceitar.
interface ComboboxProps {
  options: ComboboxOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  emptyMessage?: string
  triggerPlaceholder?: string
}

export function Combobox({
  options,
  value,
  onChange,
  placeholder = "Procurar...",
  emptyMessage = "Nenhum item encontrado.",
  triggerPlaceholder = "Selecione um item..."
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  // Encontra o label do item selecionado para exibir no botão.
  const selectedLabel = options.find((option) => option.value === value)?.label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-8"
        >
          {/* Exibe o label do item selecionado ou o placeholder do gatilho */}
          {selectedLabel || triggerPlaceholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {/* Mapeia as opções recebidas via props para criar os itens da lista */}
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label} // O valor aqui é usado para a busca interna do Command
                  onSelect={() => {
                    // Quando um item é selecionado, chamamos a função 'onChange' do pai.
                    // Se o valor já for o selecionado, desmarcamos (útil para formulários).
                    onChange(value === option.value ? "" : option.value)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      // O ícone de 'check' só aparece se o valor do item for o selecionado.
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
