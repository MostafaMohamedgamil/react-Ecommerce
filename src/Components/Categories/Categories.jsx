import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { FallingLines } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

function Categories() {

    // const [searchTerm, setSearchTerm] = useState("")
    // const [searchList, setSearchList] = useState([])

    async function getAllCategories() {
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)

    }


    const { isLoading, data, isFetching } = useQuery("getAllCategories", getAllCategories, {
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

    // //Search
    //     useEffect(() => {

    //         setSearchList(
    //             data?.filter(Categori => Categori.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
    //         )

    //     }, [searchTerm])
    return <>


        <Helmet>
            <title>Categories</title>
        </Helmet>

        <div className="container">

            <h1 className='border-bottom fw-bold border-5 py-2 mb-4'>Categories</h1>
            {/* {input of search} */}
            {/* <input type="text" onChange={(e) => setSearchTerm(e.target.value)} className='form-control mb-3 w-75 m-auto' placeholder='Search...' /> */}

            <div className="row gy-4">
                {data.data.data.map((Categori, index) => {
                    return <div key={Categori._id} className="col-md-6  col-lg-4 col-xl-3  ">
                    {/* return <div key={Categori._id} className="col-md-2 "> */}


                        <Link to={`${Categori._id}/${Categori.name}`}>

                            <figure className=' bg-gray shadow main-border rounded-2 p-2 cursor-pointer position-relative  '>
                                <img src={Categori.image} className='w-100' height={400} alt={Categori.name} />
                                <h3 className='text-main text-center pt-2 fw-bold'>{Categori.name}</h3>
                                {index != 1 && index != 2 && index != 9 ? (
                                    // <p className='bg-danger d-flex justify-content-center align-items-center'>   
                                    // <p className="bg-red-600 bg-opacity-50 text-sm w-[95%] text-white uppercase  text-center absolute top-1/2  -translate-y-1/2">
                                    // Out OFF STOCK
                                    // </p>
                                    <p class="out-of-stock d-flex justify-content-center align-items-center fw-bolder">
                                        OUT OF STOCK
                                    </p>

                                ) : (
                                    ""
                                )}
                            </figure>
                        </Link>

                    </div>

                })}

            </div>
        </div>

    </>
}


export default Categories
