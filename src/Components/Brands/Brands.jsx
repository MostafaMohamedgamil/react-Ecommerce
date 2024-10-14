import axios from 'axios'
import React from 'react'
import { Helmet } from 'react-helmet'
import { FallingLines } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

function Brands() {


    async function getAllBrands() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }

    const { isLoading, data, isFetching } = useQuery("getAllBrands", getAllBrands, {
        refetchInterval: 3000
    })
    console.log("data:  ", data?.data.data);
    console.log("isLoading: ", isLoading);
    console.log("isFetching: ", isFetching);



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
    return <>


        <Helmet>
            <title>Brands</title>
        </Helmet>
        <div className="container">
            <h1 className='border-bottom fw-bold border-5 py-2 mb-4'>Brands</h1>

            <div className="products row">
                {data.data.data.map((brand, idx) => {
                    return <div key={idx} className="col-md-6  col-lg-4 col-xl-3">
                        <Link to={`${brand._id}/${brand.name}`}>
                            <div className='bg-gray shadow main-border rounded-2 p-2 cursor-pointer'>
                                <img src={brand.image} className='w-100' alt={brand.name} />
                                <h3 className='text-main text-center pt-2 fw-bold'>{brand.name}</h3>
                            </div>
                        </Link>

                    </div>


                })}

            </div>
        </div>

    </>
}

export default Brands
