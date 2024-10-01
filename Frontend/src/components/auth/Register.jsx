import React, { useState ,useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegistorUser } from '../CommonAPI/Common'
import Swal from 'sweetalert2'
import { Eye, EyeOff } from 'lucide-react'
import { GetLogo } from '../CommonAPI/Admin'


const Register = () => {
    const navigate = useNavigate()
    const [Username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [cnfPass, setCnfPass] = useState('')
    const [number, setNumber] = useState('')
    const [showPass, setShowPass] = useState(false);
    const [showCnfPass, setShowCnfPass] = useState(false);


    const handleRegistor = async () => {
        const data = {
            SignuserName: Username,
            Signpassword: pass,
            ConfirmPassword: cnfPass,
            SignEmail: email,
            mobile_no: number
        }
        await RegistorUser(data)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        title: "Success!",
                        text:  response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        navigate('/login')
                    }, 1500)
                }
                else {
                    Swal.fire({
                        title: "Error!",
                        text:  response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            })
            .catch((err) => {
                console.log("Error in adding the new user", err)
            })
    }

    const GetLogoimage = async () => {
        await GetLogo()
            .then((response) => {
                if (response.status) { 
                    document.getElementById('imglogo1').src = "data:image/png;base64," + response.image_data
                } else { 
                }
            })
            .catch((err) => {
                console.log("Error Group data fetch error", err);
            });
    };

    useEffect(() => { GetLogoimage() }, [])


    return (
        <div>
            <section className="sign-in-page">
                <div className="container sign-in-page-bg mt-5 mb-md-5 mb-0 p-0">
                    <div className="row no-gutters">
                        <div className="col-md-6 text-center">
                            <div className="sign-in-detail text-white">
                                <a className="sign-in-logo mb-5">
                                    <img src="assets/images/inalgologo.png" className="img-fluid" alt="logo" id="imglogo1" />
                                </a>
                                <div
                                    className="owl-carousel owl-loaded owl-drag"
                                    data-autoplay="true"
                                    data-loop="true"
                                    data-nav="false"
                                    data-dots="true"
                                    data-items={1}
                                    data-items-laptop={1}
                                    data-items-tab={1}
                                    data-items-mobile={1}
                                    data-items-mobile-sm={1}
                                    data-margin={0}
                                >
                                    <div className="owl-stage-outer">
                                        <div
                                            className="owl-stage"
                                            style={{
                                                transform: "translate3d(-1432px, 0px, 0px)",
                                                transition: "all 0.25s ease 0s",
                                                width: 2506
                                            }}
                                        >
                                            <div className="owl-item cloned" style={{ width: 358 }}>
                                                <div className="item">
                                                    <img
                                                        src="assets/images/tradesoft.jpg"
                                                        className="img-fluid mb-4"
                                                        alt="logo"
                                                    />
                                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be
                                                        distracted by the readable content.
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="owl-item cloned" style={{ width: 358 }}>
                                                {/* <div className="item">
                                                    <img
                                                      src="assets/images/tradstreet.jpeg"
                                                        className="img-fluid mb-4"
                                                        alt="logo"
                                                    />
                                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be
                                                        distracted by the readable content.
                                                    </p>
                                                </div> */}
                                            </div>
                                            <div className="owl-item" style={{ width: 358 }}>
                                                {/* <div className="item">
                                                    <img
                                                        src="assets/images/tradstreet.jpeg"
                                                        className="img-fluid mb-4"
                                                        alt="logo"
                                                    />
                                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be
                                                        distracted by the readable content.
                                                    </p>
                                                </div> */}
                                            </div>
                                            <div className="owl-item" style={{ width: 358 }}>
                                                {/* <div className="item">
                                                    <img
                                                       src="assets/images/tradstreet.jpeg"
                                                        className="img-fluid mb-4"
                                                        alt="logo"
                                                    />
                                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be
                                                        distracted by the readable content.
                                                    </p>
                                                </div> */}
                                            </div>
                                            <div className="owl-item active" style={{ width: 358 }}>
                                                <div className="item">
                                                    <img
                                                        src="/assets/images/tradesoft.jpg"
                                                        className="img-fluid mb-4"
                                                        alt="logo"
                                                        style={{ borderRadius: "20px",}}
                                                    />
                                                    {/* <h4 className="mb-1 text-white">Manage your orders</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be
                                                        distracted by the readable content.
                                                    </p> */}
                                                </div>
                                            </div>
                                            <div className="owl-item cloned" style={{ width: 358 }}>
                                                {/* <div className="item">
                                                    <img
                                                        src="assets/images/tradstreet.jpeg"
                                                        className="img-fluid mb-4"
                                                        alt="logo"
                                                    />
                                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be
                                                        distracted by the readable content.
                                                    </p>
                                                </div> */}
                                            </div>
                                            <div className="owl-item cloned" style={{ width: 358 }}>
                                                <div className="item">
                                                    <img
                                                        src="assets/images/tradstreet.jpeg"
                                                        className="img-fluid mb-4"
                                                        alt="logo"
                                                    />
                                                    <h4 className="mb-1 text-white">Manage your orders</h4>
                                                    <p>
                                                        It is a long established fact that a reader will be
                                                        distracted by the readable content.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="owl-nav disabled">
                                        <button type="button" role="presentation" className="owl-prev">
                                            <i className="fa fa-angle-left fa-2x" />
                                        </button>
                                        <button type="button" role="presentation" className="owl-next">
                                            <i className="fa fa-angle-right fa-2x" />
                                        </button>
                                    </div>
                                    <div className="owl-dots">
                                        {/* <button role="button" className="owl-dot">
                                            <span />
                                        </button>
                                        <button role="button" className="owl-dot">
                                            <span />
                                        </button>
                                        <button role="button" className="owl-dot active">
                                            <span />
                                        </button> */}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 position-relative">
                            <div className="sign-in-from">
                                <div className="mt-4 row">
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="username" className="mb-2">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control mb-0"
                                            id="username"
                                            placeholder="Enter Your Username"
                                            value={Username}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="phone" className="mb-2">
                                            Phone Number
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control mb-0"
                                            id="phone"
                                            placeholder="Enter Your Phone Number"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-lg-12">
                                        <label htmlFor="email" className="mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control mb-0"
                                            id="email"
                                            placeholder="Enter Your Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="password" className="mb-2">
                                            Password
                                        </label>
                                        <div className="input-container">
                                            <input
                                                type={showPass ? 'text' : 'password'}
                                                className="form-control mb-0"
                                                id="password"
                                                placeholder="Enter Your Password"
                                                value={pass}
                                                onChange={(e) => setPass(e.target.value)}
                                            />
                                            <div className="input-span" onClick={() => setShowPass(!showPass)}>
                                                {showPass ? <EyeOff /> : <Eye />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group col-lg-6">
                                        <label htmlFor="confirm-password" className="mb-2">
                                            Confirm Password
                                        </label>
                                        <div className="input-container">
                                            <input
                                                type={showCnfPass ? 'text' : 'password'}
                                                className="form-control mb-0"
                                                id="confirm-password"
                                                placeholder="Enter Confirm Password"
                                                value={cnfPass}
                                                onChange={(e) => setCnfPass(e.target.value)}
                                            />
                                            <div className="input-span" onClick={() => setShowCnfPass(!showCnfPass)}>
                                                {showCnfPass ? <EyeOff /> : <Eye />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="d-flex w-100 justify-content-end align-items-center mt-3">
                                        <button type="submit" className="btn btn-primary float-end" onClick={handleRegistor}>
                                            Sign up
                                        </button>
                                    </div>
                                    <div className="sign-info">
                                        <span className="dark-color d-inline-block line-height-2">
                                            Already have an account? <Link to="/login">Sign in</Link>
                                        </span>
                                        {/* <ul className="iq-social-media">
                                            <li>
                                                <a href="#">
                                                    <i className="ri-facebook-box-line" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="ri-twitter-line" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#">
                                                    <i className="ri-instagram-line" />
                                                </a>
                                            </li>
                                        </ul> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}

export default Register
