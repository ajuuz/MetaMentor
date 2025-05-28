import { BrowserRouter as Router, Routes,Route } from 'react-router-dom'
import {Toaster} from 'sonner'
import UserRoutes from './routes/UserRoutes'
import AdminRoutes from './routes/AdminRoutes'
import MentorRoutes from './routes/MentorRoutes'

const App = () => {
  return (
    <div >
      <Router>
      <Toaster position="bottom-center"  richColors toastOptions={{style: {flex:"flex",justifyContent:"center"}}}/> 
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
          <Route path='/admin*' element={<AdminRoutes />} />
          <Route path='/mentor*' element={<MentorRoutes />} />
        </Routes>
      </Router>

    </div>
  )
}

export default App
