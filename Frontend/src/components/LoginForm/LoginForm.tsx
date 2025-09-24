import React from 'react'
import { useState } from 'react'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-96'>
        <div className='flex flex-col gap-2'>
          <label className='font-body font-semibold'>E-mail</label>
          <input
            className='border border-zinc-300 rounded-lg py-1 px-2'
            type='email'
            placeholder='Digite seu e-mail'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className='font-body font-semibold'>Senha</label>
          <input
            className='border border-zinc-300 rounded-lg py-1 px-2'
            type='password'
            placeholder='Digite sua senha'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex gap-2'>
            <input className='border border-zinc-300 rounded-lg py-1 px-2' type='checkbox' />
            Lembre de mim
          </div>
        </div>
        <button type='submit' className='bg-blue-900 text-zinc-50 p-2 rounded-lg cursor-pointer'>Entrar</button>
      </form>
      <p className='text-center mt-8 text-blue-900 cursor-pointer'>Esqueci minha senha</p>
    </div>
  )
}

export default LoginForm