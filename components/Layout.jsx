import React, { Children } from 'react'
import {Header} from './index'

const Layout = ({ children}) => {
  return (
    <>
       <Header/>
       {children} 
       {/* whenever we call our layout component it will display the header and other component beneath it */}
    </>
  )
}

export default Layout