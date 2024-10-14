import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {

    const nav = useNavigate()
    async function resetPass(values) {
        const { data } = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
            .then((res) => {
                toast.success('Reset Successfuly', { position: "top-center" })
                nav('/login')
            })
            .catch((err) => {

            })
        console.log(data);

    }
    let formik = useFormik({
        initialValues: {
            email: '',
            newPassword: ''

        },
        onSubmit: resetPass
    })


    return <>

        <div className='w-75 my-5 m-auto'>
            <form onSubmit={formik.handleSubmit} >

                <label>email: </label>
                <input onChange={formik.handleChange} type="email" placeholder='Email...' className='form-control' id='email' value={formik.values.email} />



                <label>New Password: </label>
                <input onChange={formik.handleChange} type="password" placeholder='New Password: ' className='form-control' id='newPassword' value={formik.values.newPassword} />

                <button className='btn bg-main text-light my-3'>Rest Password</button>
            </form>
        </div>

    </>
}

export default ResetPassword
