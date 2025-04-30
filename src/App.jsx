import React from 'react'
import TicTacToe from './Pages/Home'
import Computer from './Pages/Computer'
import {Error} from './Pages/Error'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export const App = () => {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<TicTacToe/>}/>
      <Route path='computer' element={<Computer/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
