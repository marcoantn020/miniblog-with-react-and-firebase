import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'
// hooks 
import { useEffect, useState } from 'react'
import { useAuthentication } from './hooks/useAuthentication';
// css
import './App.css';
// components
import Footer from './components/Footer/Footer';
import NavBar from './components/Navbar/NavBar';
// context
import { AuthContextProvider } from './context/AuthContext';
// pages
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CreatePost from './pages/CreatePost/CreatePost';
import Dashboard from './pages/Dashboard/Dashboard';
import PostDetails from './components/PostDetails/PostDetails';

function App() {

  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if(loadingUser) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <AuthContextProvider value={{user}}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/" />} />
              {/* posts */}
              <Route path='/posts/create' element={user ? <CreatePost /> : <Navigate to="/login" />} />
              {/* dashboard */}
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
              
              {/* <Route path='*' element={<h1>Page Not Found!</h1>} /> */}
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
