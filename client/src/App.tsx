import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Suspense,lazy } from 'react'
import {Toaster} from 'sonner'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const UserRoutes = lazy(()=>import('./routes/UserRoutes'))
const AdminRoutes = lazy(()=>import('./routes/AdminRoutes'))
const MentorRoutes = lazy(()=>import('./routes/MentorRoutes'))


const App = () => {
  return (
    <div >
      <Router>
      <Toaster position="bottom-center"  richColors toastOptions={{style: {flex:"flex",justifyContent:"center"}}}/> 
      <Suspense fallback={  <div className="min-h-screen w-full pl-[10%] flex flex-col justify-center "><Skeleton count={8} height={70} style={{ width: '90%', margin: 'auto auto', borderRadius: '10px' }}/></div>}>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin/*' element={<AdminRoutes />} />
          <Route path='/mentor/*' element={<MentorRoutes />} />
        </Routes>
      </Suspense>
      </Router>

    </div>
  )
}

export default App
