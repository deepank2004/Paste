import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import Navbar from './components/Navbar'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path:"/",
      element:
      <div>
        <Navbar/>
        <HomePage/>
      </div>
    },

    {
      path:"/pastes",
      element:
      <div>
        <Navbar/>
        <Paste/>
      </div>
    },

    {
      path:"/pastes/:id",
      element:
      <div>
        <Navbar/>
        <ViewPaste/>
      </div>
    }
  ]
)

function App() {
  

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
