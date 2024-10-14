import axios from 'axios'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet';
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import noProductFound from '../../images/noProductFound.png'

export default function BrandProducts() {

    const { brandId, brandName } = useParams();
    const { addProductToCart } = useContext(cartContext)

    const nav = useNavigate()

    function getAllProduct() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`)
    }
    const { isLoading, isError, data ,isFetching} = useQuery('getAllProduct', getAllProduct)
    console.log('data', data);
    console.log('isError', isError);
    console.log("isFetching: ", isFetching);


    

    if (isError) {
        nav('/brands')
    }
    // if (data.data.results === 0) {
    //     nav('/brands')
    // }

    async function addToCart(id) {
        toast.promise(addProductToCart(id), {
            loading: 'Loading',
            success: 'Product added to cart successfully',
            error: 'Error in add Product try again ',
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

    const allData = data.data.data;

    return <>


        <Helmet>
            <title>Brands Product</title>
        </Helmet>
        {allData.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center m-auto">
                <img src={noProductFound} className='w-75' alt="noProductFound" />
            </div>
        ) : <div className="container">
            <h1 className='border-bottom fw-bold border-5 py-2 mb-4'>{brandName}</h1>

            <div className="products row">
                {allData.map((specificBrand, idx) => {

                    return <div key={idx} className="rounded-2 m-1 border-2 border tobrand col-md-6  col-lg-4 col-xl-3 overflow-hidden">

                        <Link to={`/ProductDetails/${specificBrand.id}`}>
                            <img src={specificBrand.imageCover} className='w-100' alt="title" />
                            <h6 className='text-main fw-bold'>{specificBrand.category.name}</h6>
                            <h3 className='fs-5'>{specificBrand.title.split(' ').slice(0, 2).join(" ")}</h3>
                            <div className="d-flex justify-content-between px-1">

                                {specificBrand.priceAfterDiscount ? <p data-dis={specificBrand.price} className=' dis position-relative'>{specificBrand.priceAfterDiscount}EGP</p> : <p>{specificBrand.price}EGP</p>}

                                <p> <i style={{ color: 'gold' }} className="fa-solid fa-star"></i> {specificBrand.ratingsAverage}</p>
                            </div>
                        </Link>
                        <button onClick={() => addToCart(specificBrand.id)} className='addBtn btn bg-main text-white mb-2 m-auto d-block'>Add to Cart</button>


                    </div>
                })}
            </div>
        </div>
        }


    </>
}

// export default BrandProducts
