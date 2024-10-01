import React, { useEffect, useState } from 'react';
import { setSmtpDetail, Get_SMTP_Details } from '../../CommonAPI/Admin';
import Swal from 'sweetalert2';

const Smtp = () => {
    const [email, setEmail] = useState('');
    const [cc, setCc] = useState('');
    const [password, setPassword] = useState('');
    const [url, setUrl] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [getSMTP, setSMTP] = useState({
        loading: true,
        data: []
    });

    const handleSubmit = async () => {
        const data = {
            emailid: email,
            cc: cc,
            password: password,
            url: url
        };
        await setSmtpDetail(data).then((response) => {
            if (response.Status) {
                Swal.fire({
                    title: "Data Saved!",
                    text:  response.message,
                    icon: "success",
                    timer: 1500,
                    timerProgressBar: true
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text:  response.message,
                    icon: "error",
                    timer: 1500,
                    timerProgressBar: true
                });
            }
        }).catch((error) => {
            console.log("Error in server Side");
        });
    };

    const getSMTPDetails = async () => {
        await Get_SMTP_Details()
            .then((response) => {
                if (response.Status) {
                    setEmail(response.SMTPDetail[0].email);
                    setCc(response.SMTPDetail[0].cc);
                    setPassword(response.SMTPDetail[0].password);
                    setUrl(response.SMTPDetail[0].url);
                } else {
                    setEmail('');
                    setCc('');
                    setPassword('');
                    setUrl('');
                }
            })
            .catch((err) => {
                console.log("Error in finding the SMTP details", err);
            });
    };

    useEffect(() => {
        getSMTPDetails();
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div>
            <div className='container-fluid'>
                <div className='row'>
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">SMTP Details</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div>
                                <div className='row'>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="email">Email address:</label>
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control my-2" id="email1" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="cc">CC</label>
                                        <input type="text" onChange={(e) => setCc(e.target.value)} value={cc} className="form-control my-2" id="cc" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="password">Password:</label>
                                        <div className="input-group">
                                            <input 
                                                type={passwordVisible ? "text" : "password"} 
                                                onChange={(e) => setPassword(e.target.value)} 
                                                value={password} 
                                                className="form-control my-2" 
                                                id="password" 
                                            />
                                            <button 
                                                type="button" 
                                                className="btn btn-outline-secondary my-2" 
                                                onClick={togglePasswordVisibility}
                                            >
                                                {passwordVisible ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="url">URL</label>
                                        <input type="text" onChange={(e) => setUrl(e.target.value)} value={url} className="form-control my-2" id="url" />
                                    </div>
                                </div>
                                <button onClick={handleSubmit} type="submit" className="btn btn-primary me-1 mt-2">
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Smtp;
