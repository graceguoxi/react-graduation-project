import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Products from './components/Products'
import SearchAppBar from './components/SearchAppBar'

function App() {
  const [searchKeyWord, setSearchKeyWord] = useState('')

  const auth = localStorage.getItem('react-project-token')
  let user = auth ? JSON.parse(localStorage.getItem('react-project-user')) : {}

  const logout = () => {
    localStorage.removeItem('react-project-token')
    localStorage.removeItem('react-project-user')
    window.location.reload()
  }

  return (
    <Router>
      <SearchAppBar
        keyWord={searchKeyWord}
        onSearch={setSearchKeyWord}
        logout={logout}
        user={user}
      />
      <Routes>
        <Route path='/' element={ auth ? <Products keyWord={searchKeyWord} /> : <Navigate to='/login' /> } />
        <Route path='/login' element={ auth ? <Navigate to='/' /> : <Login /> } />
        <Route path='*' elemrnt={<Navigate to='/' />} />
      </Routes>
    </Router>
  )
}

export default App;
