import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import NotFound from './Components/NotFound/NotFound'
import AuthContext from './Context/AuthContext';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import ProtectedRoute from './Components/protectedRoute/protectedRoute'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContext, { CartContextProvider } from './Context/CartContext'
import { Toaster } from 'react-hot-toast'
import Payment from './Components/Payment/Payment';
import AllOrder from './Components/AllOrder/AllOrder';
import { Offline } from 'react-detect-offline'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import Wishlist from './Components/Wishlist/Wishlist';
import BrandProducts from './Components/BrandProducts/BrandProducts'
import CategoriesProduct from './Components/CategoriesProduct/CategoriesProduct'
import WishlistContextProvider from './Context/WishlistContext'


const myRouter = createBrowserRouter(
  [
    {
      path: '/', element: <Layout />, children:
        [
          { index: true, element: <Products /> },
          // { index: true, element: <Register /> },
          { path: 'register', element: <Register /> },
          { path: 'login', element: <Login /> },
          { path: 'products', element: <ProtectedRoute> <Products /> </ProtectedRoute> },
          { path: 'Categories', element: <ProtectedRoute><Categories /> </ProtectedRoute> },
          { path: 'ForgetPassword', element: <ForgetPassword /> },
          { path: 'ResetPassword', element: <ResetPassword /> },
          { path: 'Wishlist', element: <ProtectedRoute> <Wishlist /> </ProtectedRoute> },

          {
            path: 'Cart', element:
              <ProtectedRoute>
                <Cart />

              </ProtectedRoute>
          },
          { path: 'Brands', element: <Brands /> },


          {
            path: 'Brands/:brandId/:brandName', element: <ProtectedRoute>
              <BrandProducts />
            </ProtectedRoute>
          },
          { path: 'Categories', element: <ProtectedRoute> <Categories /> </ProtectedRoute> },


          {
            path: 'Categories/:categoryId/:categoryName', element: <ProtectedRoute>
              <CategoriesProduct />
            </ProtectedRoute>
          },




          { path: 'ProductDetails/:id', element: <ProtectedRoute> <ProductDetails /> </ProtectedRoute> },
          // { path: 'CategoriesDetails/:_id', element: <CategoriesDetails /> },



          {
            path: 'Payment', element:
              <ProtectedRoute>
                <Payment />

              </ProtectedRoute>
          },
          {
            path: 'AllOrder', element:
              <ProtectedRoute>
                <AllOrder />

              </ProtectedRoute>
          },



          { path: '*', element: <NotFound /> },

        ]

    }
  ]
)


function App() {

  const myClient = new QueryClient()

  return <>

    <QueryClientProvider client={myClient}>

      <AuthContext>
        <CartContextProvider>
          <WishlistContextProvider>


            <RouterProvider router={myRouter} />

          </WishlistContextProvider>

        </CartContextProvider>
      </AuthContext>

    </QueryClientProvider>


    <Toaster />
    <Offline>
      <div style={{ height: "100px", width: "100px", color: "red" ,fontSize:"30px"}} className=' bg-dark w-100 d-flex justify-content-center align-items-center position-absolute top-50 '>
        Your internet connection has been corrupte... </div>
    </Offline>
  </>
}

export default App
