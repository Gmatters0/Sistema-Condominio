import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/home')({
  component: Home,
})

function Home() {
  return <div className="p-2">Bem-vindo 'nome do usuário'</div>
}