import React from 'react'
import { Helmet } from 'react-helmet'

function NotFound() {
    return <>

        <Helmet>
            <title>Page Not Found</title>
        </Helmet>
        <div className="conatiner">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <img src={require('../../images/404.png')} className='w-100' alt="" />

                </div>
            </div>
        </div>

    </>
}

export default NotFound
