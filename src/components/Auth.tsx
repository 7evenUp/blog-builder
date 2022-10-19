import { useState } from 'react'
import { supabase } from '../supabase/supabaseClient'

const Auth = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleLogin = async (email: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOtp({email})
      if (error) throw error
      console.log('Check your email for the login link')
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-5xl">Supabase + Next.js</h1>
        <p className="text-slate-500">
          Sign in via magic link with your email below
        </p>
        <div>
          <input
            className="p-2 rounded-lg"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault()
              handleLogin(email)
            }}
            className="border rounded bg-slate-50 p-2"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth