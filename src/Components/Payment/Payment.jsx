import axios from 'axios'
import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import img from'../../images/Capture.da0d2e2d0d0c81197c83.png'

function Payment() {


    const { cartId, getUserCart, clearCart } = useContext(cartContext)
    const nav = useNavigate()

    function confirmCashPayment() {

        const details = document.getElementById('details').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;


        const shippingObject = {
            "shippingAddress": {
                "details": details,
                phone,
                city
            }
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, shippingObject, {
            headers: {
                token: localStorage.getItem('tkn')
            }
        }).then((res) => {
            if (res.data.status === "success") {
                toast.success("Payment Completed Successfuly")
            }
            getUserCart();
            clearCart();
            setTimeout(() => {
                nav("/products")
            }, 2000)

        })
            .catch((err) => {
                console.log("err", err);
                toast.error("Payment Failed")
            })
    }


    function confirmOnlinePayment() {

        const details = document.getElementById('details').value;
        const phone = document.getElementById('phone').value;
        const city = document.getElementById('city').value;


        const shippingObject = {
            "shippingAddress": {
                "details": details,
                phone,
                city
            }
        }

        axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`, shippingObject, {
            headers: {
                token: localStorage.getItem('tkn')
            },
            // location.href    => 'http://localhost:3000/Cart'
            params: { url: "https://localhost:3000" }
        }).then((res) => {
            if (res.data.status === "success") {
                window.open(res.data.session.url, "_self")
            }
            setTimeout(() => {
                nav("/products")
            }, 2000)
        
        })
            .catch((err) => {
                console.log("err", err);
                toast.error("Payment Failed")
            })
    }


    return <>


        <Helmet>
            <title>Payment</title>
            <link rel="icon" href={img} />

        </Helmet>

        <div className="w-50 m-auto py-2">

            <label htmlFor="phone">phone</label>
            <input type="text" id='phone' placeholder='phone..' className='form-control mb-2' />


            <label htmlFor="city">city</label>
            <input type="text" id='city' placeholder='city..' className='form-control mb-2' />


            <label htmlFor="details">details</label>
            <textarea type="text" id='details' placeholder='details..' className='form-control mb-2' ></textarea>

            <button onClick={confirmCashPayment} className='btn btn-primary'>Confirm cash payment</button>
            <button onClick={confirmOnlinePayment} className='btn btn-primary'>Confirm online payment</button>
        </div>

    </>
}

export default Payment
