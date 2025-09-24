import { createFileRoute } from '@tanstack/react-router'
import LoginForm from '../components/LoginForm/LoginForm'
import Logo from '../assets/logo.png'

export const Route = createFileRoute('/')({
  component: Login,
})

function Login() {
  return (
    <div className="flex justify-center h-dvh">
      <div className='flex flex-col justify-center items-center gap-8 '>
        <div className='font-heading flex flex-col gap-2 text-center items-center'>
          <img src={Logo} alt="LogoSistema" className='w-24' />
          <h1 className='text-zinc-950 text-4xl font-semibold'>Sistema Condomínio</h1>
          <h3 className='text-zinc-600 text-xl'>Sistema de Gestão de Condomínio</h3>
        </div>
        <div className='flex flex-col gap-8'>
          <div className='text-center'>
            <h3 className='text-zinc-950 text-2xl font-semibold font-heading'>Entrar</h3>
            <p className='text-zinc-600 font-body'>Digite suas credenciais para acessar o sistema</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}