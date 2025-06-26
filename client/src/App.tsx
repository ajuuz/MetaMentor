import './App.css'
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import { Suspense,lazy } from 'react'
import {Toaster} from 'sonner'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import SuspenseFallback from './components/common/SuspenseFallback'

const UserRoutes = lazy(()=>import('./routes/UserRoutes'))
const AdminRoutes = lazy(()=>import('./routes/AdminRoutes'))
const MentorRoutes = lazy(()=>import('./routes/MentorRoutes'))


const App = () => {
  return (
    <div >
      <Router>
      <Toaster position="bottom-center"  richColors toastOptions={{style: {flex:"flex",justifyContent:"center"}}}/> 
      <Suspense fallback={<SuspenseFallback/>}>
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
