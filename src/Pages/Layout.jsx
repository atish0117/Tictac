import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Components/Navbar'

export const Layout = () => {
  return (
    <>   
    <Navbar/>
    <Outlet/>
    </>

  )
}
