import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { wishlistContext } from '../../Context/WishlistContext';

function ProductDetails() {

    const { id } = useParams();

    const { addProductToCart } = useContext(cartContext)

    const { addProductToWishlist, productWishIds, deleteProductWish } = useContext(wishlistContext)

    console.log("addProductToWishlist", addProductToWishlist);


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



    function getProductDetails() {
        //API get specific product
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { isLoading, data, isError } = useQuery(`ProductDetails-${id}`, getProductDetails)



    function setImage(e) {
        let imgPath = e.target.getAttribute('src')
        document.getElementById('bigImage').setAttribute("src", imgPath)
    }

    //This func. to call API and logic of cart
    async function addProduct(id) {

        const res = await addProductToCart(id)
        console.log("result: ", res);
        if (res) {
            console.log("Added Successfully");
            // duration : it mean time
            toast.success("Added Successfully ", { duration: 1500, position: "top-center" })
        }
        else {
            toast.error("This is an error!", { duration: 1500, position: "top-center" })
        }

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
    if (isError) {
        return <Navigate to='/products' />
    }

    return <>
        <Helmet>
            <title>ProductDetails</title>
        </Helmet>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-3">

                    <figure>
                        <img className='w-100 rounded-3' id='bigImage' src={data.data.data.imageCover} alt={data.data.data.title} />
                    </figure>
                    <figure className='d-flex'>
                        {data.data.data.images.map((img) => {

                            return <img onClick={setImage} className='w-100 me-2 smallImage rounded-2 cursor-pointer' height={70} src={img} alt={data.data.data.title} />

                        })}
                    </figure>




                </div>

                <div className="col-md-9">
                    <article>
                        <h1 className=' text-main'>{data.data.data.title}</h1>
                        <h6 className='fw-bold' >{data.data.data.category.name}</h6>
                        <p>{data.data.data.description}</p>

                        {/* div => price rate */}
                        <div className="d-flex justify-content-between mb-3">
                            <h6 className='egp'>{data.data.data.price} EGP</h6>
                            <h6>  <span> <i className='fa-solid fa-star rating-color'></i> </span>{data.data.data.ratingsAverage}</h6>
                        </div>

                        {/* ID */}
                        {/* <p>{data.data.data.id}</p> */}

                        <div className="d-flex gap-2">
                            <button onClick={() => addProduct(data.data.data.id)} className='btn bg-main text-white w-100'>Add to cart +</button>

                            {productWishIds.includes(data.data.data.id) ? <button onClick={() => deleteFromWish(data.data.data.id)} className='w-25 bg-icon text-white btn '><i className="fa-solid fa-heart icon-red "></i> Remove From wishlist</button> : <button onClick={() => addToWishlist(data.data.data.id)} className='w-25 bg-icon text-white btn '><i className="fa-solid fa-heart "></i> Add to wishlist</button>}

                        </div>



                    </article>
                </div>

            </div>

        </div>

    </>
}

export default ProductDetails
