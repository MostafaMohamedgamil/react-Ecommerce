import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from './../../Context/AuthContext';
import { Helmet } from 'react-helmet';

function Login() {

    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const { setToken, getUserData } = useContext(authContext)

    // 1 => handle form state

    const userData = {
        email: '',
        password: '',
    }


    async function mySubmit(values) {

        setIsLoading(true);
        console.log("submited...", values);
        axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            .then(function (x) {
                //in case of success
                // console.log("in case of success :", x);

                if (x.data.message == "success") {
                    console.log(x);
                    // save token in localStroge
                    localStorage.setItem('tkn', x.data.token);
                    // console.log("Token: ", x.data.token);
                    setToken(x.data.token)
                    getUserData()

                    setIsSuccess(true);
                    //اخفي المسدج تاني
                    setTimeout(function () {
                        setIsSuccess(false);
                        navigate('/products')
                    }, 2000)
                    setIsLoading(false);

                    // اول م اليوزر يعمل لوجين كول الفانكشن دي
                }


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

            if (values.email.includes('@') !== true || values.email.includes('.') !== true) {
                errors.email = "Email must be in format: email@example.com"
            }

            if (values.password.length < 6 || values.password.length > 12) {
                errors.password = "Password must be from 6 to 12 characters";
            }


            return errors;
        }

    })


    return <>
        <Helmet>
            <title>Login</title>
        </Helmet>

        <div className="w-75 m-auto p-5">
            {isSuccess ? <div className="alert alert-success text-center">Welcome back.</div> : ""}
            {isError ? <div className="alert alert-danger text-center">{isError}</div> : ""}


            <h2>Login Now: </h2>


            <form onSubmit={myFormik.handleSubmit}>



                <label htmlFor="email">email</label>
                <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email" id='email' placeholder='email' className='form-control mb-3' />
                {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ''}


                <label htmlFor="password">password</label>
                <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password" id='password' placeholder='password' className='form-control mb-3' />
                {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ''}

                <div className="d-flex justify-content-between align-items-center">
                    <button type='submit' className='btn bg-main text-white rounded-3'>

                        {isLoading ? <ColorRing
                            visible={true}
                            height="40"
                            width="40"
                            ariaLabel="color-ring-loading"
                            wrapperStyle={{}}
                            wrapperClass="color-ring-wrapper"
                            colors={['#f0f3f2', '#0aad0a', '#f0f3f2', '#0aad0a', '#f0f3f2']}
                        /> : 'Login'}


                    </button>

                    <Link to={'/ForgetPassword'}  className='text-main' >Forget Password..</Link>
                </div>
            </form>




        </div>

    </>
}

export default Login
