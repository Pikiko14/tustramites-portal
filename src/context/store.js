import { createContext, useReducer, useContext } from 'react'
import { call_reducers } from './reducers/callMeReducers'

const initialState = {
  call_me: false,
  chat_me: false,
  call_us: false
}

const Context = createContext()

const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++) state = reducers[i](state, action)
    return state
  }

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(combineReducers(call_reducers), initialState)

  const value = { state, dispatch }

  // eslint-disable-next-line react/react-in-jsx-scope
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export { Context, Provider }
