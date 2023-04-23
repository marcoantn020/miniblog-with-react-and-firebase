import { useState, useEffect, useReducer } from 'react'
import { db } from '../firebase/config'
import { updateDoc, doc } from 'firebase/firestore'

const initialState = {
  error: null,
  loading: null
}

const updateReducer = (state, action) => {
    switch (action.type) {
      case "LOADING": return {loading: true, error: null}
      case "UPDATED_DOC": return {loading: false, error: null}
      case "ERROR": return {loading: false, error: action.payload}
      default: return state
    }
}

export const useUpdateDocument = (docCollection) => {

  const [response, dispach] = useReducer(updateReducer, initialState)

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false)
  const checkCancelBeforeDispach = (action) => {
    if(!cancelled) {
      dispach(action)
    }
  }

  const updateDocument = async (id, data) => {
    checkCancelBeforeDispach({
      type: "LOADING"
    })

    try {
      const docRef = await doc(db, docCollection, id)
      const updateDocument = await updateDoc(docRef, data)

      checkCancelBeforeDispach({
        type: "UPDATED_DOC",
        payload: updateDocument
      })

    } catch (error) {
      checkCancelBeforeDispach({
        type: "ERROR",
        payload: error.message
      })
    }

  };

  useEffect(() => {
    return () => setCancelled(true)
  },[])

  return { updateDocument, response }
};