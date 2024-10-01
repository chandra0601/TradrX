import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { PasswordChange } from '../../CommonAPI/Common'
import { Eye, EyeOff } from 'lucide-react'

const Editprofile = () => {
    const userName = localStorage.getItem('name')
    const [currPass, setCurrPass] = useState('')
    const [newPass, setNewPass] = useState('')
    const [verifyPass, setVerifyPass] = useState('')
    const [getCurrentPassError, setCurrentPassError] = useState('')
    const [getNewError, setNewError] = useState('')
    const [getVeryfyError, setVeryfyError] = useState('')
    const [showPass1, setShowPass1] = useState(false)
    const [showPass2, setShowPass2] = useState(false)
    const [showPass3, setShowPass3] = useState(false)



    const handleSubmit = async () => {

        if (getVeryfyError == '' && getNewError == '' && getCurrentPassError == ''){
            const data = { User: userName, new_password: newPass, old_password: currPass, confirm_password: verifyPass }
            await PasswordChange(data)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Success",
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
                .catch((err) => {
                    console.log("Error in finding the response", err)
                })

        }
        

    }



    const handleCurrentPassword = (e) => {
        const currPass = e.target.value;
        setCurrPass(currPass);
        if (!currPass) {
            setCurrentPassError('Current Password cannot be empty');
        } else {
            setCurrentPassError('');
        }
    };

    const handleNewPassword = (e) => {
        const newPass = e.target.value;
        setNewPass(newPass);
        if (!newPass) {
            setNewError('New Password cannot be empty');
        } else {
            setNewError('');
        }
    };
    const handleVeryfyPassword = (e) => {
        const verifyPass = e.target.value;
        setVerifyPass(verifyPass);
        if (!verifyPass) {
            setVeryfyError('Email cannot be empty');
        } else {
            setVeryfyError('');
        }
    };


    

    return (
        <div>
            <div className="col-lg-12">
                <div className="iq-edit-list-data">
                    <div className="tab-content">

                        <div className="tab-pane fade active show" id="chang-pwd" role="tabpanel">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Change Password</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <div>
                                        <div className="form-group">
                                            <label htmlFor="cpass">Current Password:</label>

                                            <div className="input-container">
                                                <input
                                                    type={showPass1 ? 'text' : 'password'}
                                                    className="form-control my-2"
                                                    id="cpass"
                                                    placeholder='Enter current password'
                                                    onChange={handleCurrentPassword}
                                                    value={currPass}
                                                />
                                                <div className="input-span" onClick={() => setShowPass1(!showPass1)}>
                                                    {showPass1 ? <EyeOff /> : <Eye />}
                                                </div>
                                                {getCurrentPassError && (
                                                    <div className="error-message" style={{ color: 'red' }}>
                                                        {getCurrentPassError}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="npass">New Password:</label>
                                            <div className="input-container">
                                                <input
                                                    type={showPass2 ? 'text' : 'password'}
                                                    className="form-control my-2"
                                                    id="npass"
                                                    placeholder='Enter new password'
                                                    onChange={handleNewPassword}
                                                    value={newPass}
                                                />
                                                <div className="input-span" onClick={() => setShowPass2(!showPass2)}>
                                                    {showPass2 ? <EyeOff /> : <Eye />}
                                                </div>
                                                {getNewError && (
                                                    <div className="error-message" style={{ color: 'red' }}>
                                                        {getNewError}
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="vpass">Verify Password:</label>
                                            <div className="input-container">
                                                <input
                                                    type={showPass3 ? 'text' : 'password'}
                                                    className="form-control my-2"
                                                    id="vpass"
                                                    placeholder='Enter verify password'
                                                    onChange={handleVeryfyPassword}
                                                    value={verifyPass}
                                                />
                                                <div className="input-span" onClick={() => setShowPass3(!showPass3)}>
                                                    {showPass3 ? <EyeOff /> : <Eye />}
                                                </div>
                                                {getVeryfyError && (
                                                    <div className="error-message" style={{ color: 'red' }}>
                                                        {getVeryfyError}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary me-2" onClick={handleSubmit}>
                                            Submit
                                        </button>
                                        <Link to={'/user/dashboard'} className="btn iq-bg-danger">
                                            Cancel
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Editprofile
