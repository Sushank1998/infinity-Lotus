import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"product/:id",
          element: <ProductDetail/>
        }
      ]
    }
  ])


  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

export default App
