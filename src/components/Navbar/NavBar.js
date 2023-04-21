import styles from './Navbar.module.css'
import { NavLink } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useAuthentication } from '../../hooks/useAuthentication'

const NavBar = () => {

  const {user} = useAuthValue()
  const {logout} = useAuthentication()

  return (
    <nav className={styles.navbar}>
      <NavLink to="/" className={styles.brand}>
        Mini <span>Blog</span>
      </NavLink>
      <ul className={styles.links_list}>
        <li> 
          <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>
            Home
          </NavLink>
        </li>

        {!user && (
          <>
            <li> 
              <NavLink to="/login" className={({isActive}) => (isActive ? styles.active : '')}>
                Entrar
              </NavLink>
            </li>

            <li> 
              <NavLink to="/register" className={({isActive}) => (isActive ? styles.active : '')}>
                Cadastre-se
              </NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li> 
              <NavLink to="/dashboard" className={({isActive}) => (isActive ? styles.active : '')}>
                Dashboard
              </NavLink>
            </li>

            <li> 
              <NavLink to="/posts/create" className={({isActive}) => (isActive ? styles.active : '')}>
                Novo Post
              </NavLink>
            </li>
          </>
        )}

        <li> 
          <NavLink to="/about" className={({isActive}) => (isActive ? styles.active : '')}>
            About
          </NavLink>
        </li>
        {user && (
          <button onClick={logout}>Sair</button>
        )}
      </ul>
    </nav>
  )
}

export default NavBar