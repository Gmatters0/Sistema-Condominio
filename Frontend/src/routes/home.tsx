import { createFileRoute } from '@tanstack/react-router'
import SidebarComponent from '../components/SidebarMenu/SidebarComponent'

export const Route = createFileRoute('/home')({
  component: Home,
})

function Home() {
  return <div className="">
    <SidebarComponent />
  </div>
}