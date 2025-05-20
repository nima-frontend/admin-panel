'use client'
import { ModeToggle } from "@/components/shared/modeToggle"
import { useState,useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter

 } from "@/components/ui/card"
import { ThemeSelector } from "@/components/layout/theme-selector"

export default function LoginPage() {

  const router = useRouter();
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [checked,setChecked] = useState<boolean>(false)
  const [error,setError] = useState<string | null>(null)

  useEffect(()=>{
    if(checked){
      setEmail('example@gmail.com')
      setPassword('123456')
    }else{
      setEmail('')
      setPassword('')
    }
  },[checked])

  const handleSubmit = (e: React.FormEvent) =>{
    e.preventDefault()
    setError(null)
    if(email === 'example@gmail.com' && password === '123456'){
      document.cookie = 'admin_auth=true; path=/'
      router.push('/dashboard')
    }else{
      setError('invalid credentials, only the admin user is allowed')
    }
  }

  return (
    <div className="w-full relative">
      <div className="w-18 h-18 absolute left-[calc(50%-264px)] top-1/2 translate-y-1/2">
          <img src="/point.png" alt="pointer" className="w-full h-full" />
      </div>
      <div className="flex items-center gap-3 absolute top-4 right-4 z-10">
         <ThemeSelector />
         <ModeToggle /> 
      </div>
    <div className="flex items-center justify-center min-h-screen bg-muted">
    
    <Card className="w-[90%] max-w-sm shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Admin Login</CardTitle>
        <CardDescription>Enter your Email below to Login as Admin</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={checked}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={checked}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="demo"
              checked={checked}
              onCheckedChange={(val) => setChecked(val === true)}
            />
            <Label htmlFor="demo">Use demo credentials</Label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </CardContent>

        <CardFooter className="mt-4">
          <Button type="submit" className="w-full">
            Sign in as Admin
          </Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  </div>
  )
}
