import React from 'react'
import TicTacToe from './Pages/Home'
import Computer from './Pages/Computer'
import {Error} from './Pages/Error'
import TicTacToe6x6 from"./Pages/SixBox"
import AI_TicTacToe6x6 from "./Pages/TicTacToe6x6"
import AI_TicTacToe4x4 from './Pages/AI_TicTacToe4x4'
import Navbar from './Components/Navbar'
import TicTacToe4x4 from './Pages/TicTacToe4x4'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
export const App = () => {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<TicTacToe/>}/>
      <Route path='computer' element={<Computer/>}/>
      <Route path='six' element={<TicTacToe6x6/>}/>
      <Route path='four' element={<TicTacToe4x4/>}/>
      <Route path='/TicTacToe6x6' element={<AI_TicTacToe6x6/>}/>
      <Route path='TicTacToe4x4' element={<AI_TicTacToe4x4/>}/>
      <Route path='*' element={<Error/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
