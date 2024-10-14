import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {


    async function sendCode(values) {
        console.log('values', values);

        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        console.log(data);
        if (data.statusMsg == 'success') {
            document.querySelector('.forgetPass').classList.add('d-none')
            document.querySelector('.verfiyCode').classList.remove('d-none')
        }
    }
    const userData = {
        email: '',
    }

    const formik = useFormik({
        initialValues: userData,
        onSubmit: sendCode
    })







    let nav = useNavigate()


    // verfiyCode
    async function sendData(values) {
        console.log('values', values);

        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', values)
        console.log(data);
        if (data.status == 'Success') {
            nav('/ResetPassword')
        }
    }


    const verfiyFormik = useFormik({
        initialValues: {
            resetCode: ''
        },
        onSubmit: sendData
    })

    return <>


<Helmet>
            <title>ForgetPassword</title>
        </Helmet>
        <div className="forgetPass ">
            <h3 className='text-center'>ForgetPassword</h3>
            <div className="container ">

                <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>

                    <label className='mb-2' htmlFor="email">Enter Your Email:</label>
                    <input value={formik.values.email} onChange={formik.handleChange} type="email" id='email' placeholder='Email...' className='form-control mb-2' />
                    <button type='submit' className='btn bg-main text-light'>Send Code</button>
                </form>
            </div>
        </div>


        {/* verfiyCode */}
        <div className="verfiyCode d-none mt-4">
            <h3 className='text-center'>Enter VerfiyCode</h3>

            <div className="container ">

                <form onSubmit={verfiyFormik.handleSubmit} className='w-75 mx-auto my-5'>

                    <label className='mb-2' htmlFor="resetCode">Enter Your resetCode:</label>
                    <input value={verfiyFormik.values.resetCode} onChange={verfiyFormik.handleChange} type="text" id='resetCode' name='resetCode' placeholder='resetCode...' className='form-control mb-2' />
                    <button type='submit' className='btn bg-main text-light'>Send Code</button>
                </form>
            </div>
        </div>
    </>
}

export default ForgetPassword
