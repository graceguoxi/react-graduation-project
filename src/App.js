import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Products from './components/Products'
import SearchAppBar from './components/SearchAppBar'

function App() {
  const [searchKeyWord, setSearchKeyWord] = useState('')

  const auth = localStorage.getItem('react-project-token')
  let user = {}
  if(auth) {
    user = JSON.parse(
      localStorage.getItem('react-project-user')
    )
  }

  const logout = () => {
    localStorage.removeItem('react-project-token')
    localStorage.removeItem('react-project-user')
    window.location.reload()
  }

  return (
    <Router>
      <SearchAppBar />
      <Routes>
        {
          auth? (<Route path='/' element={<Products />} />) : (<Route path='/login' element={<Login />} />)
        }
        { !auth && <Route path='/' element={<Navigate to='/login' />} />}
        <Route path='*' elemrnt={<Navigate to='/' />} />
        <Route path='login' element={auth? <Navigate to='/' /> : <Login />} />
      </Routes>
    </Router>
  )
}

export default App;
