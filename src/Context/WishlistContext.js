import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';

export const wishlistContext = createContext();



function WishlistContextProvider({ children }) {
    const { token } = useContext(authContext)
    const [countWishList, setCount] = useState(0);
    const [productWish, setProductWishList] = useState(null);
    const [productWishIds, setproductWishIds] = useState([]);
    const productWishIdsArry = [];


    function getUserWishlist() {
        axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {
                headers: { token: localStorage.getItem('tkn') }
            }).then((res) => {
                console.log("res", res);
                setCount(res.data.count);
                setProductWishList(res.data.data);
                setproductWishIds([]);
                for (let i = 0; i < res.data.data.length; i++) {
                    productWishIdsArry.push(res.data.data[i].id);
                    setproductWishIds(productWishIdsArry);

                }

            }).catch((err) => {
                console.log("err", err);
                setProductWishList([])

            })


    }

    function addProductToWishlist(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            "productId": id
        }, {
            headers: { token: localStorage.getItem('tkn') }
        }).then(() => {
            getUserWishlist()
        })

    }

    //id => Product Id from wish
    
    function deleteProductWish(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers: { token: localStorage.getItem('tkn') }
        }).then(() => {
            getUserWishlist()
        })
    }



    useEffect(function () {
        getUserWishlist()
    }, [token]);

    return <wishlistContext.Provider value={{
        addProductToWishlist,
        countWishList,
        productWish,
        productWishIds,
        deleteProductWish
    }}
    >
        {children}

    </wishlistContext.Provider>
}

export default WishlistContextProvider














//    async function addProductToWishlist(id) {
//       return await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
//             "productId": id
//         }, {
//             headers: { token: localStorage.getItem('tkn') }
//         }).then((res) => {
//             console.log("res", res);
//             return true;

//         }).catch((err) => {
//             console.log("err", err);
//             return false;

//         })

//     }
