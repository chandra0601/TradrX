import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UpdateBrokerKey from "./Update_Broker_Key";
import Loginwihapi from "./log_with_api";
import * as Config from "../../Utils/Config";
import axios from "axios";
import { TradingStatus } from "../CommonAPI/User";
import Swal from 'sweetalert2';
import { IndianRupee, Eye } from 'lucide-react';
import { LastPattern, DataStart, AutoLogin  } from '../CommonAPI/Admin'
import { GetUserBalence } from '../CommonAPI/User'


const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showFunds, setShowFunds] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        // Remove sidebar-main class on initial load
        document.body.classList.remove('sidebar-main');

        if (isSidebarOpen) {
            document.body.classList.add('sidebar-main');
        } else {
            document.body.classList.remove('sidebar-main');
        }
    }, [isSidebarOpen]);

    const navigate = useNavigate();
    const role = localStorage.getItem("Role");
    const Username = localStorage.getItem("name");
    const token = localStorage.getItem("token");
    const [isActive, setIsActive] = useState(true);
    const [isFixed, setIsFixed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeElement, setActiveElement] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [getTradingStatus, setTradingStatus] = useState(false);
    const [getBrokerName, setBrokerName] = useState("");
    const [walletBalance, setWalletBalance] = useState('');

     
    useEffect(() => {
        GetBalence()
    }, [])

    const handleToggle = async (event) => {
        const newStatus = event.target.checked;

        if (newStatus == true) {
            const requestData = {
                Username: Username,
                session: "",
                AccToken: "",
                usrid: "",
                sid: "",
                jwt_Token: "",
                BrokerName: getBrokerName,
            };
            Loginwihapi(requestData)
        } else {
            var data = {
                Username: Username,
                session: "",
                AccToken: "",
                usrid: "",
                sid: "",
                jwt_Token: "",
            }

            try {

                const response = await axios.post(`${Config.base_url}ConnectBroker`, data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });


                if (response.data.Status) { // Assuming the status is in response.data.Status

                    Swal.fire({
                        title: 'Success!',
                        text: 'Trading On successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 1000
                    }).then(() => {
                        setTimeout(() => {
                            window.location.reload();
                        }, 1000);
                    });
                } else {

                    Swal.fire({
                        title: 'Success!',
                        text: 'Trading Off successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        timer: 1000
                    }).then(() => {
                        setTimeout(() => {
                            window.location.reload();

                        }, 1000);
                    });
                }
            } catch (err) {
                console.error("Error in ConnectBroker request", err);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                });
            }


        }
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    const handleClick = (event, id) => {
        event.preventDefault();

        if (activeElement === id) {
            setActiveElement(null);
        } else {
            setActiveElement(id);
        }
    };

    const logout = async () => {

        localStorage.removeItem("Role");
        navigate("/");
    }


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 75) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement &&
            !document.mozFullScreenElement &&
            !document.webkitFullscreenElement &&
            !document.msFullscreenElement) {

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        setIsFullscreen(!isFullscreen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.search-toggle') && !event.target.classList.contains('search-input')) {
                setActiveElement(null);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    useEffect(() => {


        if (isActive) {
            document.body.classList.add('sidebar-main');
        } else {
            document.body.classList.remove('sidebar-main');
        }
    }, [isActive]);

    const fetchData = async () => {
        if (role == 'User') {

            const requestData = { userName: Username };
            const response = await TradingStatus(requestData);

            if (response) {
                setBrokerName(response.Brokername)
                if (response.Status) {
                    setTradingStatus(true)
                }
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAutoLoginbtn = async () => {
        await AutoLogin()
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        title: "Auto Login On !",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
                else {
                    Swal.fire({
                        title: "Error !",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            })
    }

    const handleDataStart = async () => {
        await DataStart()
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        title: "Data Start !",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
                else {
                    Swal.fire({
                        title: "Error !",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            })

    }
    const handleLastPattern = async () => {
        await LastPattern()
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        title: "Last Pattern On !",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
                else {
                    Swal.fire({
                        title: "Error !",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            })

    }

    const GetBalence = async () => {
      const req = {userName: Username}
      await GetUserBalence(req)
        .then((response) => {
            if (response.Status) {
                setWalletBalance(response.Balance)
            }
            else {
                setWalletBalance('')
            }
        })
        .catch((error) => {
            console.error("Error in GetUserBalence request", error);
        });   
    }





    function formatNumber(value) {
        if (value < 1000) {
            return value.toString();
        } else if (value < 10000) {
            return (value / 1000).toFixed(0) + "k";
        } else if (value < 1000000) {
            return (value / 1000).toFixed(0) + "k";
        } else if (value < 10000000) {
            return (value / 1000000).toFixed(0) + "M";
        } else if (value < 1000000000) {
            return (value / 1000000).toFixed(0) + "M";
        } else if (value < 10000000000) {
            return (value / 1000000000).toFixed(0) + "B";
        } else if (value < 1000000000000) {
            return (value / 1000000000).toFixed(0) + "B";
        } else if (value < 10000000000000) {
            return (value / 1000000000000).toFixed(0) + "T";
        } else {
            return (value / 1000000000000).toFixed(0) + "T";
        }
    }

    const walletmodal = () => { 
            navigate('/user/all/transection') 
    };

    const toggleFundsVisibility = () => {
        setShowFunds(!showFunds);
        walletmodal(showFunds);

    };

    return (
        <>
            <div className={`iq-top-navbar ${isFixed ? 'fixed-header' : ''}`}>
                <div className="iq-navbar-custom">
                    <div className="iq-sidebar-logo">
                        <div className="top-logo">
                            <a href="index.html" className="logo">
                                <img src="assets/images/inalgo.png" className="img-fluid" alt="" />
                                {/* <span>XRay</span> */}
                            </a>
                        </div>
                    </div>
                    {role === 'Admin' ? (
                        <nav className="navbar navbar-expand-lg navbar-light p-0">


                            <button className='btn btn-primary mx-4' onClick={() => setShowModal(true)}>Auto Login</button>
                            <button
                                className="navbar-toggler ms-3"
                                type="button"
                                data-bs-toggle="collapse"
                                href="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <i className="ri-menu-3-line" />
                            </button>
                            <button className='me-3 menusidebar' onClick={toggleSidebar}>
                                <i className="ri-more-fill" />
                            </button>

                            {/* <div className="iq-menu-bt-sidebar">
                                <div className="iq-menu-bt align-self-center">
                                    <div onClick={handleClick} className={`wrapper-menu ${isActive ? 'open' : ''}`}>
                                        <div className="main-circle">
                                            <i className="ri-more-fill" />
                                        </div>
                                        <div className="hover-circle">
                                            <i className="ri-more-2-fill" />
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <div className="iq-menu-bt align-self-center" style={{ color: "#000" }} onClick={toggleSidebar}>
                                <div className="wrapper-menu">
                                    <div className="main-circle">
                                        <i className="ri-more-fill" />
                                    </div>
                                    <div className="hover-circle">
                                        <i className="ri-more-2-fill" />
                                    </div>
                                </div>
                            </div> */}
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                                    <li className="nav-item">
                                        <button
                                            type="button"
                                            className="btn btn-primary mt-3 mx-3 btn1"
                                            onClick={(e) => setIsModalVisible(true)}
                                        >
                                            Set API Key
                                        </button>
                                    </li>

                                    <li className="nav-item iq-full-screen" onClick={toggleFullscreen}>
                                        <a href="#" className="iq-waves-effect" id="btnFullscreen">
                                            <i className={isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'} />
                                        </a>
                                    </li>


                                    <li className={`nav-item ${activeElement === 'profile' ? 'iq-show' : ''}`}>

                                        <a href="#"

                                            className={`search-toggle d-flex align-items-center iq-waves-effectt ${activeElement === 'profile' ? 'active' : ''}`}

                                            onClick={(e) => handleClick(e, 'profile')}
                                        >

                                            <div className="caption">
                                                <button className="btn btn-primary iq-sign-btn" onClick={logout} role="button">
                                                    Log out
                                                    <i className="ri-login-box-line ms-2" />
                                                </button>
                                            </div>
                                        </a>

                                    </li>
                                </ul>
                            </div>

                        </nav>
                    ) : (
                        <nav className="navbar navbar-expand-lg navbar-light p-0">

                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                href="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <i className="ri-menu-3-line" />
                            </button>

                            <button className='me-3 menusidebar' onClick={toggleSidebar}>
                                <i className="ri-more-fill" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <div className="custom-control custom-switch custom-switch-text custom-switch-color custom-control-inline ms-5">
                                    <div className="custom-switch-inner">

                                        <input
                                            type="checkbox"
                                            className="custom-control-input"
                                            id="customSwitch-11"
                                            checked={getTradingStatus}
                                            onChange={handleToggle}

                                        />
                                        <label
                                            className="custom-control-label"
                                            htmlFor="customSwitch-11"
                                            data-on-label="Live trading on"
                                            data-off-label="Paper trading on"
                                        ></label>
                                    </div>

                                </div>
                                <ul className="navbar-nav ms-auto navbar-list align-items-center">
                                    {
                                        getBrokerName && getBrokerName == "Demo" ?
                                            <li className="nav-item">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary"

                                                >
                                                    Demo Account
                                                </button>
                                            </li> :
                                            <>
                                                <li className="nav-item">
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary mt-4 btn1"
                                                        onClick={(e) => setIsModalVisible(true)}
                                                    >
                                                        Set API Key
                                                    </button>
                                                </li>

                                            </>
                                    }

                                    <li className="nav-item mx-3" onClick={toggleFundsVisibility}>
                                        <button
                                            type="button"
                                            data-bs-dismiss="modal"
                                            className="btn btn-primary mt-4 btn1"
                                        >
                                            {showFunds ? (
                                                <span>
                                                    <IndianRupee
                                                        style={{ height: "24px", marginRight: "10px" }}
                                                    />
                                                    <strong>
                                                        {formatNumber(walletBalance && walletBalance) || "-"}
                                                    </strong>
                                                </span>
                                            ) : (
                                                <span>
                                                    <Eye />
                                                    <strong>*****</strong>
                                                </span>
                                            )}
                                        </button>
                                    </li>

                                    <li className="nav-item iq-full-screen" onClick={toggleFullscreen}>
                                        <a href="#" className="iq-waves-effect" id="btnFullscreen">
                                            <i className={isFullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line'} />
                                        </a>
                                    </li>


                                    <li className={`nav-item ${activeElement === 'profile' ? 'iq-show' : ''}`}>

                                        <a href="#"

                                            className={`search-toggle d-flex align-items-center iq-waves-effectt ${activeElement === 'profile' ? 'active' : ''}`}

                                            onClick={(e) => handleClick(e, 'profile')}
                                        >
                                            <img
                                                src="/assets/images/user/1.jpg"
                                                className="img-fluid rounded-circle me-3"
                                                alt="user"
                                            />
                                            <div className="caption">
                                                <h6 className="mb-0 line-height">{Username}</h6>
                                                <span className="font-size-12">online</span>
                                            </div>
                                        </a>
                                        <div className="iq-sub-dropdown iq-user-dropdown">
                                            <div className="iq-card shadow-none m-0">
                                                <div className="iq-card-body p-0 ">
                                                    <div className="bg-primary p-3">
                                                        <h5 className="mb-0 text-white line-height">{Username}</h5>
                                                        <span className="text-white font-size-12">online</span>
                                                    </div>
                                                    <Link to="/user/profile" className="iq-sub-card iq-bg-primary-hover">
                                                        <div className="media align-items-center d-flex">
                                                            <div className="rounded card-icon bg-soft-primary">
                                                                <i className="ri-file-user-line" />
                                                            </div>
                                                            <div className="media-body ms-3">
                                                                <h6 className="mb-0 ">My Profile</h6>
                                                                <p className="mb-0 font-size-12">View personal profile details.</p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <Link to="/user/editprofile" className="iq-sub-card iq-bg-warning-hover">
                                                        <div className="media align-items-center d-flex">
                                                            <div className="rounded card-icon bg-soft-warning">
                                                                <i className="ri-profile-line" />
                                                            </div>
                                                            <div className="media-body ms-3">
                                                                <h6 className="mb-0 ">Change Password</h6>
                                                            </div>
                                                        </div>
                                                    </Link>

                                                    <div className="d-inline-block w-100 text-center p-3">
                                                        <button className="btn btn-primary iq-sign-btn" onClick={logout} role="button">
                                                            Log out
                                                            <i className="ri-login-box-line ms-2" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </nav>
                    )}

                </div>

            </div>

            {
                showModal && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"></div>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Auto Login
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => setShowModal(false)}
                                />
                            </div>
                            <div className=''>
                                <div className='d-flex justify-content-center'>
                                    <div className='m-4'>
                                        <button className='btn btn-primary' onClick={handleAutoLoginbtn}>Auto Login</button>
                                    </div>

                                </div>
                                <div className='d-flex justify-content-center'>

                                    <div className='m-4'>

                                        <button className='btn btn-primary' onClick={handleDataStart}>Data Start</button>
                                    </div>
                                </div>

                                <div className='d-flex justify-content-center'>
                                    <div className='m-4'>
                                        <button className='btn btn-primary' onClick={handleLastPattern}>Last Pattern</button>
                                    </div>

                                </div>



                            </div>


                        </div>
                    </div>
                </div>
            }


            <UpdateBrokerKey isVisible={isModalVisible} closeModal={handleCloseModal} Role={role} />

        </>
    );
};

export default Header;
