import React from 'react'
import TicTacToe from './Pages/Home'
import Computer from './Pages/Computer'
import ErrorPage from './Pages/ErrorPage'
import Navbar from './Components/Navbar'
import TicTacToe4x4 from './Pages/TicTacToe4x4'
import AI_TicTacToe4x4 from './Pages/AI_TicTacToe4x4'
import AI_Xtreme4x4 from './Pages/AI_Xtreme4x4'
import Xtreme4x4 from './Pages/Xtreme4x4'
import TicTacToe6x6 from"./Pages/SixBox"
import AI_TicTacToe6x6 from "./Pages/TicTacToe6x6"
import AI_Xtreme6x6 from './Pages/AI_Xtreme6x6'
import Xtreme6x6 from './Pages/Xtreme6x6'

import Home1 from './Pages/Home1'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

export const App = () => {

  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home1/>}/>
      <Route path='/home' element={<TicTacToe/>}/>
      <Route path='computer' element={<Computer/>}/>
      <Route path='four' element={<TicTacToe4x4/>}/>
      <Route path='TicTacToe4x4' element={<AI_TicTacToe4x4/>}/>
      <Route path='Xtreme4x4' element={<Xtreme4x4/>}/>
      <Route path='AI_Xtreme4x4' element={<AI_Xtreme4x4/>}/>
      <Route path='six' element={<TicTacToe6x6/>}/>
      <Route path='TicTacToe6x6' element={<AI_TicTacToe6x6/>}/>
      <Route path='AI_Xtreme6x6' element={<AI_Xtreme6x6/>}/>
      <Route path='Xtreme6x6' element={<Xtreme6x6/>}/>
      <Route path="*" element={<ErrorPage statusCode={404} />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}
