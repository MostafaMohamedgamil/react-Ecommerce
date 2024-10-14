import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';

function Register() {

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // 1 => handle form state

    const userData = {
        name: '',
        email: '',
        phone: '',
        password: '',
        rePassword: '',
    }




    async function mySubmit(values) {

        setIsLoading(true);
        console.log("submited...", values);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
            .then(function (x) {
                //in case of success
                console.log("in case of success :", x);
                setIsSuccess(true);
                //اخفي المسدج تاني
                setTimeout(function () {
                    setIsSuccess(false);
                    navigate('/login')
                    // to={`/ProductDetails/${product.id}
                }, 2000)
                setIsLoading(false);

            }).catch(function (x) {
                setIsError(x.response.data.message)

                setTimeout(function () {
                    setIsError(false);
                }, 2000)
                setIsLoading(false);
            })
    }

    const myFormik = useFormik({
        //values in input fields, intial values of input
        initialValues: userData,
        // func. when clicked submite
        onSubmit: mySubmit,

        //return your ERROR
        validate: function (values) {
            const errors = {};
            const nameRegex = /^[A-Z][a-z]{3,7}$/
            const phoneRegex = /^01[0125][0-9]{8}$/

            if (nameRegex.test(values.name) === false) {
                errors.name = "Name must be from 4 to 8 characters starting with a capital letter";
            }

            if (values.email.includes('@') !== true || values.email.includes('.') !== true) {
                errors.email = "Email must be in format: email@example.com"
            }

            if (phoneRegex.test(values.phone) === false) {
                errors.phone = "Phone must be an Egyptian number"
            }

            if (values.password.length < 6 || values.password.length > 12) {
                errors.password = "Password must be from 6 to 12 characters";
            }

            if (values.rePassword != values.password) {
                errors.rePassword = "Password and rePassword don't match";
            }
            // console.log("errors:", errors);

            return errors;
        }

    })


    return <>
        <Helmet>
            <title>Register</title>
        </Helmet>

        <div className="w-75 m-auto p-5">
            {isSuccess ? <div className="alert alert-success text-center">Congrtatulation your account has been created</div> : ""}
            {isError ? <div className="alert alert-danger text-center">{isError}</div> : ""}


            <h2>Register Now: </h2>


            <form onSubmit={myFormik.handleSubmit}>

                <label htmlFor="name">name</label>
                <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} type="text" id='name' placeholder='name' className='form-control mb-3' />
                {myFormik.errors.name && myFormik.touched.name && myFormik.touched.name ? <div className="alert alert-danger">{myFormik.errors.name}</div> : ''}


                <label htmlFor="email">email</label>
                <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" id='email' placeholder='email' className='form-control mb-3' />
                {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ''}


                <label htmlFor="phone">phone</label>
                <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="text" id='phone' placeholder='phone' className='form-control mb-3' />
                {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger">{myFormik.errors.phone}</div> : ''}


                <label htmlFor="password">password</label>
                <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" id='password' placeholder='password' className='form-control mb-3' />
                {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ''}


                <label htmlFor="rePassword">rePassword</label>
                <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} type="password" id='rePassword' placeholder='rePassword' className='form-control mb-3' />
                {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger">{myFormik.errors.rePassword}</div> : ''}

                <button type='submit' className='btn bg-main text-white rounded-3'>

                    {isLoading ? <ColorRing
                        visible={true}
                        height="40"
                        width="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#f0f3f2', '#0aad0a', '#f0f3f2', '#0aad0a', '#f0f3f2']}
                    /> : 'Register'}






                </button>
            </form>




        </div>

    </>
}

export default Register
