import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from './../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { wishlistContext } from '../../Context/WishlistContext';

//     react query => manage async state  , no call fun , no made a state  >> cach data



function Products() {

    const { addProductToCart } = useContext(cartContext)
    const { addProductToWishlist, productWishIds, deleteProductWish } = useContext(wishlistContext)



    async function getAllProduct() {

        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }



    function addToWishlist(id) {
        console.log("done");
        toast.promise(addProductToWishlist(id), {
            loading: 'Loading',
            success: 'Product added to WishList successfully',
            error: 'Error in add Product try again ',
        });
    }

    function deleteFromWish(id) {
        toast.promise(deleteProductWish(id), {
            loading: 'Loading',
            success: 'Product Deleted From WishList successfully',
            error: 'Error in Delete Product try again ',
        });
    }







    async function addToCart(id) {
        toast.promise(addProductToCart(id), {
            loading: 'Loading',
            success: 'Added Successfully',
            error: 'This is an error!',
        });
    }


    //                                                     key             func => return promise
    const { isLoading, data, error, isError } = useQuery('getAllProduct', getAllProduct, {
        refetchInterval: 3000
    })
    console.log("data:  ", data?.data.data);
    console.log("Error: ", error);
    console.log("isError: ", isError);


    function deleteFromWish(id) {
        toast.promise(deleteProductWish(id), {
            loading: 'Loading',
            success: 'Product Deleted From WishList successfully',
            error: 'Error in Delete Product try again ',
        });
    }

    if (isLoading) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines
                color="#fff"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    }
    // return<></>

    return <>


        <Helmet>
            <title>Products</title>
        </Helmet>

        <div className="container">
            {/* Home , Category : Slider */}
            <div className="row mb-5 mt-3" >
                <div className="col-md-9 pe-0" >
                    <HomeSlider />
                </div>
                <div className="col-md-3 ps-0">
                    <div>
                        <img style={{ height: '200px' }} className='w-100' src={require('../../images/grocery-banner.png')} alt="" />
                    </div>
                    <div>
                        <img style={{ height: '200px' }} className='w-100' src={require('../../images/grocery-banner-2.jpeg')} alt="" />
                    </div>
                </div>
            </div>

            <CategorySlider />

            <div className="products row mt-4 gy-3 position-relative">


                {data.data.data.map((product, idx) => {

                    return <div key={idx} className="col-md-6 col-lg-4 col-xl-3 overflow-hidden rounded  shadow-sm ">


                        <div className='suc position-relative'>


                            <img className='w-100' src={product.imageCover} alt="" />

                            <h2 className='h6 text-main'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                            <h3 className='h6  fw-bold'>{product.category.name}</h3>
                            <h3 className='h6 fw-bold brandname'>{product.brand.name} | <span className='available'>Available</span></h3>


                            <div className="d-flex justify-content-between">
                                {product.priceAfterDiscount ? <p className='egp'>EGP <span className='text-decoration-line-through'> {product.price}</span> - {product.priceAfterDiscount}</p> : <p className='egp'>EGP {product.price} </p>}

                                <p> <span> <i className='fa-solid fa-star rating-color'></i> </span>      {product.ratingsAverage}</p>
                            </div>

                            <div className='position-absolute w-100 h-100  top-0 bottom-0 d-flex justify-content-center align-items-center '>
                                {/* overflow-hidden */}
                                <div className='layeer  w-100 h-25 position-relative overflow-hidden '>
                                    <div className="center-icons  w-75 ms-5 d-flex justify-content-between align-items-center position-absolute  succc top-100 ">
                                        <button onClick={() => addToCart(product.id)} style={{ fontSize: "25px" }} className='rounded-5 border-0 bg-main text-white  d-block'><i className="m-2  fa-solid fa-cart-plus"></i></button>
                                        <Link className="product bg-main rounded-5" to={`/ProductDetails/${product.id}`}>

                                            {/* <i class="m-2 fa-solid fa-eye"></i> */}
                                            <i style={{ color: "white", fontSize: "25px" }} className="m-2 fa-regular fa-eye"></i>
                                        </Link>
                                        {productWishIds.includes(product.id) ? <button onClick={() => deleteFromWish(product.id)} className='bg-main rounded-5 addBtn w-25 bg-icon text-white btn '><i className=" fa-solid fa-heart icon-red "></i></button> : <button onClick={() => addToWishlist(product.id)} className='bg-main rounded-5 addBtn w-25 bg-icon text-white btn '><i className=" fa-solid fa-heart "></i> </button>}
                                    </div>
                                </div>

                            </div>
                        </div>

                       </div>


                })}


            </div>

        </div>





    </>
}

export default Products
