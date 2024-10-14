import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';


export const cartContext = createContext()

export function CartContextProvider({ children }) {

    const { token } = useContext(authContext)

    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const [allProducts, setAllProducts] = useState(0);
    const [cartId, setCartId] = useState(null);
    console.log("cartId", cartId);

    async function addProductToCart(productId) {
        
        return await axios.post('https://ecommerce.routemisr.com/api/v1/cart', {
            "productId": productId
        }, {
            headers: { token: localStorage.getItem('tkn'), }
        }).then((res) => {
            console.log("res: ", res.data);
            getUserCart()

            return true;
        })
            .catch((err) => {
                console.log("err: ", err);

                return false;
            });
    }
    

    console.log("allproduct", allProducts);
    function getUserCart() {
        axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
            headers: { token: localStorage.getItem('tkn') }
        }).then((res) => {
            console.log('res', res.data);
            setAllProducts(res.data.data.products);
            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setCartId(res.data.data._id);
            // setCartId(res.data.data.cartOwner);
            localStorage.setItem('UserId', res.data.data.cartOwner)
        })
            .catch((err) => {
                console.log('err', err);
            })

    }
    async function updateCount(id, newCount) {
        const bolleanFlag = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            "count": newCount
        }, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((res) => {
            console.log(res);
            setTotalCartPrice(res.data.data.totalCartPrice)
            setAllProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)
            return true
        }).catch((err) => {
            console.log('err', err);
            return false
        })

        return bolleanFlag;
    }

    async function deleteProduct(id) {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((res) => {
            setTotalCartPrice(res.data.data.totalCartPrice)
            setAllProducts(res.data.data.products)
            setNumOfCartItems(res.data.numOfCartItems)

            return true;
        }).catch((err) => {
            console.log("err", err);

            return false;
        })
        return res;
    }
    async function clearCart(id) {
        const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((res) => {
            console.log("res.data", res.data);
            setTotalCartPrice(0)
            setAllProducts([])
            setNumOfCartItems(0)

            return true;
        }).catch((err) => {
            console.log("err", err);

            return false;
        })
        return res;
    }


    useEffect(() => {
        console.log("get user data");
        getUserCart()
    }, [token])

    return <cartContext.Provider value={{
        addProductToCart,
        numOfCartItems,
        totalCartPrice,
        allProducts,
        updateCount,
        deleteProduct,
        clearCart,
        cartId,
        getUserCart
    }} >

        {children}

    </cartContext.Provider>
}

export default CartContextProvider
