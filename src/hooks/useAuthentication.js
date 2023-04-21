import {db} from '../firebase/config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut
} from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)

  // cleanup
  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)

  const auth = getAuth()

  function checkIfIsCancelled() {
    if(cancelled) {
      return
    }
  }

  // create user
  const createUser = async (data) => {
    checkIfIsCancelled()

    setLoading(true)
    setError(null)
    try {
      const {user} = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )

      await updateProfile(user, {displayName: data.displayName})
      setLoading(false)
      return user

    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage = ''
      if(error.message.includes("Password")) {
        systemErrorMessage = "Senha deve ter no minimo 6 caracteres!"
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail ja cadastrado!"
      } else {
        systemErrorMessage = "Error internal, tente mais tarde."
      }

      setError(systemErrorMessage)
    }

    setLoading(false)
  }
  // logout
  const logout = () => {
    checkIfIsCancelled()
    signOut(auth)
  }

  // login
  const login = async (data) => {
    checkIfIsCancelled()
    setLoading(true)
    setError("")
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      setLoading(false)
    } catch (error) {
      console.log(error.message);
      console.log(typeof error.message);

      let systemErrorMessage = ''
      if(error.message.includes("user-not-found")) {
        systemErrorMessage = "Usuario não econtrado!"
      } else if (error.message.includes("wrong-password")) {
        systemErrorMessage = "E-mail ou senha incorretos!"
      } else {
        systemErrorMessage = "Error internal, tente mais tarde."
      }
      setLoading(false)
      setError(systemErrorMessage)
    }

  }

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
    logout,
    login
  }
};