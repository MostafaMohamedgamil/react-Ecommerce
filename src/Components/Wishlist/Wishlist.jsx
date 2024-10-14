import React, { useContext } from 'react'
import { wishlistContext } from '../../Context/WishlistContext'
import { Link } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Wishlist() {

    
    const { addProductToCart } = useContext(cartContext)
    const { countWishList, productWish,deleteProductWish,productWishIds,addProductToWishlist } = useContext(wishlistContext)
    // const { addProductToWishlist, productWishIds , deleteProductWish } = useContext(wishlistContext)



    async function addToCart(id) {
        toast.promise(addProductToCart(id), {
            loading: 'Loading',
            success: 'Added Successfully',
            error: 'This is an error!',
        });
    }




    function addToWishlist(id) {
        console.log("done");
        toast.promise(addProductToWishlist(id), {
            loading: 'Loading',
            success: 'Product added to WishList successfully',
            error: 'Error, try again ',
        });
    }



    function deleteFromWish(id) {
        toast.promise(deleteProductWish(id), {
            loading: 'Loading',
            success: 'Product Deleted From WishList successfully',
            error: 'Error in Delete Product try again ',
        });
    }

    
    if (!productWish) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines
                color="#fff"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    }
    return <>
        <div className="container">

            <h3 className='border-bottom fw-bold border-5 py-2 h4 mb-4'>Wishlist({countWishList})</h3>

            <div className="row gy-4">
            <div className=" products row mt-4 gy-3">
                {productWish.map(function (product, idx) {
                    return <div key={idx} className="rounded col-sm-6 col-md-2 col-lg-3 col-xl-2 ">
                        <Link className='product' to={`/ProductDetails/${product.id}`}>
                            <div className="Wishlist ">
                                {/* imageCover */}

                                <div className='position-relative'>
                                    <p className='position-absolute end-0 bg-main rounded  '> {product.priceAfterDiscount ? <span className='discount'>-{100 - (product.priceAfterDiscount / product.price * 100).toFixed(0)}%</span> : ""}</p>
                                    <img className='w-100' src={product.imageCover} alt="Imagetitle" />

                                </div>
                               

                                <h3 className='h6 text-main fw-bold'>{product.category.name}</h3>
                                <h2 className='h6'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                              
                                <div className="d-flex justify-content-between px-1">
                                    {product.priceAfterDiscount ? <p> <span className='text-decoration-line-through'>{product.price}</span> - {product.priceAfterDiscount}EGP</p> : <p> {product.price}EGP </p>}

                                    <p>    <span> <i className='fa-solid fa-star rating-color'></i> </span>      {product.ratingsAverage}</p>
                                </div>

                                {/* <div className="info d-flex justify-content-between px-1">

                                {product.priceAfterDiscount ? <p data-dis={product.price} className=' dis position-relative'>{product.priceAfterDiscount}EGP</p> : <p>{product.price}EGP</p>}

                                <p> <i style={{ color: 'gold' }} className="fa-solid fa-star"></i> {product.ratingsAverage}</p>
                            </div> */}
                            </div>
                        </Link>
                        <div className="d-flex justify-content-between mb-2 ">
                        <button onClick={() => addToCart(product.id)} className=' btn bg-main text-white m-auto d-block'>Add to cart</button>
                        {/* <i  onClick={()=> deleteFromWishlist(product.id)} className="fa-solid fa-heart p-2 rounded-1 text-red bg-sec text-white fs-5 shadow heart"></i> */}
                        {productWishIds.includes(product.id) ? <button onClick={() => deleteFromWish(product.id)} className='w-25 bg-icon text-white btn '><i className="fa-solid fa-heart icon-red "></i></button> : <button onClick={() => addToWishlist(product.id)} className='w-25 bg-icon text-white btn '><i className="fa-solid fa-heart "></i> </button>}

                        </div>
                    </div>
                })}
                </div>





            </div>


        </div>
    </>
}

// export default Wishlist
