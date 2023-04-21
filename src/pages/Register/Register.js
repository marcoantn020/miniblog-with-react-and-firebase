import { useEffect, useState } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'
import styles from './Register.module.css'

const Register = () => {
  const [displayName, setDisplayName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  const {createUser, error: authError, loading} = useAuthentication()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      displayName,
      email,
      password
    }

    if(password !== confirmPassword) {
      setError("As senhas não são iguais!")
      return
    }

    await createUser(user)

  };

  useEffect(() => {
    if(authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas historias</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Nome:</span>
          <input 
            type="text" 
            name="displayName" 
            required 
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder='Nome do usuario'/>
        </label>

        <label>
          <span>E-mail:</span>
          <input 
            type="email" 
            name="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email do usuario'/>
        </label>

        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name="password" 
            placeholder='Informe sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
        </label>

        <label>
          <span>Confirmar senha:</span>
          <input 
            type="password" 
            name="confirmPassword" 
            placeholder='confirme a sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required />
        </label>

        {!loading && <button className='btn' type="submit">Cadastrar</button>}
        {loading && <button className='btn' disabled type="submit">Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default Register