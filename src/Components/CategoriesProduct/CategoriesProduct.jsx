import axios from 'axios'
import React, { useContext } from 'react'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import noProductFound from '../../images/noProductFound.png'
import { Helmet } from 'react-helmet'
import { wishlistContext } from '../../Context/WishlistContext'

function CategoriesProduct() {

    const { categoryId, categoryName } = useParams();
    const { addProductToCart } = useContext(cartContext);
    const { addProductToWishlist, productWishIds, deleteProductWish } = useContext(wishlistContext)

    const nav = useNavigate();


    function getAllProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?category[in]=${categoryId}`)
    }


    const { isError, data, isLoading,isFetching } = useQuery('getAllProduct', getAllProduct)
    console.log('data', data);

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
    if (isError) {
        nav('/Categories')
    }
    // if (data.data.results === 0) {
    //     nav('/Categories')
    // }


    async function addToCart(id) {
        toast.promise(addProductToCart(id), {
            loading: 'Loading',
            success: 'Product added to cart successfully',
            error: 'Error in add Product try again ',
        });
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



    return <>

        <Helmet>
            <title>Categories Products</title>
        </Helmet>


        {data.data.data.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center m-auto">
                <img src={noProductFound} className='w-75' alt="noProductFound" />
            </div>
        ) : <div className="container">
            <h1 className='border-bottom fw-bold border-5 py-2 mb-4'>{categoryName}: {data.data.results}</h1>
            <div className="products row gy-1">
                {data.data.data.map((product, idx) => {


                    return <div key={idx} className="rounded-2 border-2 border col-md-6  col-lg-4 col-xl-3 p-2 overflow-hidden shadow-sm" >

                        <div className='suc position-relative'>


                            <img className='w-100' src={product.imageCover} alt="" />

                            <h3 className='h6  fw-bold'>{product.category.name}</h3>
                            <h2 className='h6 text-main'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                            <h3 className='h6 fw-bold brandname'>{product.brand.name} | <span className='available'>Available</span></h3>


                            <div className="d-flex justify-content-between">
                                {product.priceAfterDiscount ? <p className='egp'>EGP <span className='text-decoration-line-through'> {product.price}</span> - {product.priceAfterDiscount}</p> : <p className='egp'>EGP {product.price} </p>}

                                <p> <span> <i className='fa-solid fa-star rating-color'></i> </span>      {product.ratingsAverage}</p>
                            </div>
                            <div className="discount position-absolute top-0 end-0 rounded-bottom-5 rounded-start-5 bg-main">
                                {product.priceAfterDiscount ? <span className='m-3'>-{100 - (product.priceAfterDiscount / product.price * 100).toFixed(0)}% <br /> </span> : ""}

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



























                        {/* <Link to={`/ProductDetails/${product.id}`}>
                            <div className="me-2 " >
                                <img src={product.imageCover} className='w-100' alt="title" />
                                <h3 className='h6  fw-bold'>{product.brand.name}</h3>

                                <h6 className='text-main fw-bold'>{product.category.name}</h6>

                                <h3 className='fs-5'>{product.title.split(' ').slice(0, 2).join(" ")}</h3>

                                <div className="d-flex justify-content-between px-1">
                                    {product.priceAfterDiscount ? <p className='egp'>EGP <span className='text-decoration-line-through'> {product.price}</span> - {product.priceAfterDiscount}</p> : <p className='egp'>EGP {product.price} </p>}


                                    <p> <i style={{ color: 'gold' }} className="fa-solid fa-star"></i> {product.ratingsAverage}</p>
                                </div>
                            </div>
                        </Link>
                        {productWishIds.includes(product.id) ? <button onClick={() => deleteFromWish(product.id)} className='bg-main rounded-5 addBtn w-25 bg-icon text-white btn '><i className=" fa-solid fa-heart icon-red "></i></button> : <button onClick={() => addToWishlist(product.id)} className='bg-main rounded-5 addBtn w-25 bg-icon text-white btn '><i className=" fa-solid fa-heart "></i> </button>}

                        <button onClick={() => addToCart(product.id)} className='addBtn btn bg-main text-white m-auto d-block'>Add to Cart</button> */}
                    </div>

                })}
            </div>
        </div>
        }
    </>
}

export default CategoriesProduct
