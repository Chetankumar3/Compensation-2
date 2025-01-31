import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Header from './Components/header.jsx'
import Login from './Login.jsx'
import List from './List.jsx'
import Form from './Form.jsx'

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Header LoggedIn = {false}/><Login /></>
    },
    {
      path: "/List",
      element: <><Header LoggedIn = {true}/><List /></>
    },
    {
      path: "/Form/:formID",
      element: <><Header LoggedIn = {true}/><Form /></>
    }
  ])
  return (
    <>
      <RouterProvider router = {router} />
    </>
  )
}

export default App