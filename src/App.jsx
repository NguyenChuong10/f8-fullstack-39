import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Redux from './pages/redux/index'
import Deposit from './pages/deposit/index'
import './App.css'
import TodoApp from './pages/TodoApp'
import Navigator from './components/ui/Navigator/Navigator'
function App() {


  return (
    <Router basename={import.meta.env.PROD ? "/f8-fullstack-38" : "/"}>
      <Navigator />
      <Routes>
        <Route path="/deposit" element={<Deposit />}></Route>
        <Route path="/redux" element={<Redux />}></Route>
        <Route path="/todoapp" element={<TodoApp />}></Route>
      </Routes>
    </Router>
  )
}

export default App
