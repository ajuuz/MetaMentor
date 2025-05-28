import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Login = () => {
  return (
    <div className='flex items-center justify-center h-screen'>

        <div className='p-8 rounded-lg flex flex-col gap-10 w-96'>
          <h1 className='text-3xl font-semibold text-center text-[#E63946]'>Login</h1>
          <form action="" className='flex flex-col gap-9'>
            <div className='flex flex-col gap-2'>
            <Label htmlFor="email">Email</Label>
            <Input className='w-full'/>
            </div>
            <div className='flex flex-col gap-2'>
            <Label htmlFor="password">Password</Label>
            <Input type="password"  className='w-full'/>
            </div>
          </form>
          <button className='bg-[#E63946] text-white py-2 rounded-lg hover:bg-[#dc2f3c] transition-colors'>Login</button>
          <p className='text-center text-sm'>Don't have an account? <a href="/signup" className='text-[#E63946] hover:underline'>Sign Up</a></p>
        </div>
    </div>
  )
}

export default Login
