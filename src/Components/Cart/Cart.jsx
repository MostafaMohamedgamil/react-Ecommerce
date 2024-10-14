import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { FallingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
    const { numOfCartItems, allProducts, totalCartPrice, updateCount, deleteProduct, clearCart } = useContext(cartContext);


    console.log('allProducts', allProducts);
    console.log("totalCartPrice: ", totalCartPrice)
    console.log("numOfCartItems: ", numOfCartItems)


    if (!allProducts) {
        return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
            <FallingLines
                color="#fff"
                width="100"
                visible={true}
                ariaLabel="falling-circles-loading"
            />
        </div>
    }


    async function updateMyProductCount(id, newCount) {
        //id, newCount
        const res = await updateCount(id, newCount)

        if (res) {
            toast.success('Updated successfully', { position: "top-center" })
        }
        else {
            toast.error('Failed to update', { position: "top-right" })
        }
    }

    async function myDeleteProduct(id) {
        const res = await deleteProduct(id);

        if (res) {
            toast.success('Deleted successfully', { position: "top-center" })
        }
        else {
            toast.error('Failed to delete ', { position: "top-right" })
        }

    }


    return <>
        <Helmet>
            <title>User Cart</title>
        </Helmet>

        {allProducts.length ? <div className="container">
            <h2 className='fw-bold border-bottom border-5 py-2 mb-4'>Shop cart</h2>
            
            <h5> <span className='fw-bold'>Total Cart Price:</span> {totalCartPrice} <span className='egp'> EGP</span> </h5>
            <h5> <span className='fw-bold'>numOfCartItems:</span> {numOfCartItems} <span className='main-text egp'>items</span> </h5>
            <div className='d-flex justify-content-end'>
                <button onClick={clearCart} className='btn btn-danger'>Delete all</button>


            </div>
            {allProducts?.map((product, idx) => <div key={idx} className="row border-1 border-bottom border-danger py-3 align-items-center mb-1">
                {/* P */}
                {/* col-md-6 col-lg-4 col-xl-3 */}
                <div className="col-xl-1 ">
                    <figure>
                        <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                    </figure>
                </div>


                {/* Detalis of product */}
                <div className="col-xl-9 ">
                    <article>
                        <h3>{product.product.title}</h3>
                        {/* <h3>quantity: {product.product.quantity}</h3> */}
                        <h5> <span className='fw-bold'>Price:</span> {product.price}</h5>
                        {/* <p>  <span> <i className='fa-solid fa-star rating-color'></i> </span>{product.product.ratingsAverage}</p> */}
                        <button onClick={() => myDeleteProduct(product.product.id)} className='btn btn-outline-danger mb-3'>remove</button>
                    </article>
                </div>

                {/* RIGHT */}
                <div className="col-xl-2">
                    <div className='d-flex justify-content-between align-items-center'>
                        <button onClick={() => updateMyProductCount(product.product.id, product.count + 1)} className='btn btn-outline-success '>+</button>
                        <p>{product.count}</p>
                        <button disabled={product.count == 1} onClick={() => updateMyProductCount(product.product.id, product.count - 1)} className='btn btn-outline-success '>-</button>
                    </div>
                </div>

            </div>)}
            <Link to='/payment' className='d-flex justify-content-end mt-3 mb-3'>
                <button className='btn btn-primary'>Confirm Payment</button>
            </Link>

        </div> : <div className="container-fluid  mt-100">
            <div className="row">

                <div className="col-md-12">


                    <div className="card-body cart">
                        <div className="col-sm-12 empty-cart-cls text-center">
                            <img src="https://i.imgur.com/dCdflKN.png" width="130" height="130" className="img-fluid mb-4 mr-3" />
                            <h3><strong>Your Cart is Empty</strong></h3>
                            <h4>Add something to make me happy :)</h4>


                        </div>
                    </div>


                </div>

            </div>

        </div>}

    </>
}




