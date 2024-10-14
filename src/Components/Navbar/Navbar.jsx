import React, { useContext, useState } from 'react';
import logo from '../../images/freshcart-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';
import { cartContext } from '../../Context/CartContext';
import { wishlistContext } from '../../Context/WishlistContext';
function Navbar() {

    const { token, setToken, userData } = useContext(authContext);

    // {userData?.name}
    const { numOfCartItems } = useContext(cartContext)
    const { countWishList } = useContext(wishlistContext)
    const navigaet = useNavigate()
    function logout() {

        //remove token from state
        setToken(null);
        //remove from local stroge
        localStorage.removeItem('tkn');
        //use usenavigate
        navigaet('/login')
    }



    return <>

        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top py-3">
            <div className="container p-2">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Fresh Logo" />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">


                    {token ? <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/products">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Categories">Categories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="Brands">Brands</Link>
                        </li>

                        <li className='position-relative'>
                            <Link className="nav-link" to="/Cart">
                                Cart
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main">
                                    {numOfCartItems ? numOfCartItems : ""}
                                </span>
                            </Link>
                        </li>



                        <li className='nav-item position-relative'>
                            <Link className="nav-link" to="/Wishlist">
                                Wishlist
                                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {countWishList ? countWishList : ""}
                                </span>
                            </Link>
                        </li>



                        <li className="nav-item">
                            <Link className="nav-link" to="/AllOrder">AllOrder</Link>
                        </li>
                        
                    </ul> : ""}


                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
                        <li className="nav-item">

                            <ul className='list-unstyled  d-flex'>
                                <li>
                                    <i className='me-2 fa-brands fa-instagram'></i>
                                </li>
                                <li>
                                    <i className='me-2 fa-brands fa-facebook'></i>
                                </li>
                                <li>
                                    <i className='me-2 fa-brands fa-linkedin'></i>
                                </li>
                                <li>
                                    <i className='me-2 fa-brands fa-twitter'></i>
                                </li>


                            </ul>


                        </li>

                        {token ? <>

                            <li className="nav-item">
                                <span className=" ms-3 fw-bolder text-main">Hi {userData?.name}</span>
                            </li>


                            <li className="nav-item">
                                <span onClick={logout} role='button' className="nav-link fw-bold">Logout</span>
                            </li>

                        </> : <>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>}


                    </ul>
                </div>
            </div>
        </nav>



    </>
}

export default Navbar
