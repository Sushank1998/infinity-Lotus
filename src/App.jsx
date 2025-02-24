import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./layout/Layout"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import ProductListing from "./pages/ProductListing"
import { PopupProvider } from "./pages/PopupContext"



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
        },
        {
          path:"ProductListing",
          element: <ProductListing/>
        },
      ]
    }
  ])


  return (
    <>
    <PopupProvider>
      
     <RouterProvider router={router}/>
    </PopupProvider>
    </>
  )
}

export default App
