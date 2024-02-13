import React from 'react'
import Header from '../component/header'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../context/auth.js";
// img/hero.png
import second from '../assets/second.png';
import "./style.css";
function HomePage() {
    const [auth, setAuth] = useAuth();
    
  return (
    <>
    <Header />
        <div className="hero">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-sm-12 col-md-6">
                        <div className="hero-text">
                            <h1>blink<span>it</span>: Everything delivered in minutes</h1>
                            <p>
                            Indian instant delivery service. It was founded in December 2013 and is based out of Gurgaon. Customers of the company use a mobile application to order groceries and essentials online. 
                            </p>
                            <div className="hero-btn">
                            {auth?.user ?   <>
                                <a className="btn" href="/addimage">Add Image</a>
                                </>:<>
                                <a className="btn" href="/signUp">Join Now</a>
                                <a className="btn" href="/Login">Login</a>
                                </>
                            
                        }
                              
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6">
                        <div className="hero-image">
                            <img src={second} alt="Hero" />
                        </div>
                    </div>
                </div>
            </div>
        </div> 
    </>
  )
}

export default HomePage