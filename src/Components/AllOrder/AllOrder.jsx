import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'

function AllOrder() {

    const [allOrders, setAllOrders] = useState([])

    function getUserOrders() {
        const UserId = localStorage.getItem('UserId')
        axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`)
            .then((res) => {
                setAllOrders(res.data)
            })
            .catch((err) => {
                console.log('err', err);
            })


    }

    const {data , isLoading , isError ,isFetching} = useQuery('orders' , getUserOrders)
    // عشان اول م يخش يجيب الداتا ع طول
    useEffect(() => {
        getUserOrders()
    }, [])

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

    return <section className='min-100vh '>
        <Helmet>
            <title>OrderS</title>
        </Helmet>
        <div className='container py-4'>
            <div className="row gy-4">
                {allOrders.map(function (order, index) {
                    return <div key={index} className=" ">
                        <table class="table table-striped">

                            <thead>
                                <tr>
                                    <th scope="col">- Order Id</th>
                                    <th scope="col">Total Price:</th>
                                    <th scope="col">Payment Method </th>
                                    <th scope="col">is paid</th>
                                    <th>Delivered To</th>
                                </tr>
                                
                            </thead>
                            <tbody>
                                <tr>

                                    <td>{order.id}</td>
                                    <td><i class="fa-solid fa-sack-dollar text-main"></i> {order.totalOrderPrice + " EGP"} </td>
                                    <td>  <span className='fw-bolder'>{order.paymentMethodType === "cash" ? <i className="fa-solid fa-money-bill text-main"></i> : <i className="fa-brands fa-cc-visa text-main"></i>} {order.paymentMethodType}</span></td>
                                    <td>{order.isPaid ? <span className='fw-bolder'> <i className="fa-solid fa-check text-main"></i>  Yes </span> : <span className='fw-bolder'> <i className="fa-solid fa-xmark text-danger "></i> No</span>}</td>
                                    <td>{order.isDelivered ? <span className='fw-bolder'> <i className="fa-solid fa-check text-main"></i>  Yes </span> : <span className='fw-bolder'> <i className="fa-solid fa-xmark text-danger "></i> Not Yet</span>}</td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                })}

            </div>
        </div>
    </section>
}

export default AllOrder
