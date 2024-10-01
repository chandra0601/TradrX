/* eslint-disable no-mixed-operators */
import React, { useEffect, useState } from 'react';
import Formikform from "../../ExtraComponent/FormData";
import { useFormik } from 'formik';
import { GetBrokerData, UpdateBrokerData } from "../CommonAPI/User";
import Swal from 'sweetalert2';
import { AdminAddBrokerCredential, Get_Broker_Details } from '../CommonAPI/Admin';

const Update_Broker_Key = ({ closeModal, isVisible, Role }) => {
    const userName = localStorage.getItem("name");


    const [refresh, setRefresh] = useState(false);
    const [userDetails, setUserDetails] = useState({ loading: true, data: {} });
    const [upDateData, setUpDateData] = useState({
        data: []
    });



    const fetchData = async () => {
        if (Role == 'User') {
            const requestData = { userName };
            const response = await GetBrokerData(requestData);
            if (response && response.BrokerDetail && response.BrokerDetail[0]) {
                setUserDetails({ loading: false, data: response.BrokerDetail[0] });
            } else {
                setUserDetails({ loading: false, data: {} });
            }
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    const formik = useFormik({
        initialValues: {
            api_key: '',
            mobileno: '',
            APIPassword: '',
            BrokerName: '',
            DOB: '',
            Password: '',
            username: '',
            broker: '',
        },
        validate: (values) => {
            const errors = {};
            if (!values.username && (values.BrokerName.toUpperCase() === "ALICEBLUE" || values.BrokerName.toUpperCase() === "5PAISA")) {
                errors.username = values.BrokerName.toUpperCase() === "ALICEBLUE" ? "Please Enter Username" : formik.values.BrokerName.toUpperCase() === "5PAISA" ? "Please Enter App Name" : "Please Enter Username"
            }
            if (!values.api_key && (
                values.BrokerName.toUpperCase() === "ANGEL" ||
                values.BrokerName.toUpperCase() === "ALICEBLUE" ||
                values.BrokerName.toUpperCase() === "ICICI" ||
                values.BrokerName.toUpperCase() === "UPSTOX" ||
                values.BrokerName.toUpperCase() === "5PAISA" ||
                values.BrokerName.toUpperCase() === "MASTERTRUST" ||
                values.BrokerName.toUpperCase() === "FYERS" ||
                values.BrokerName.toUpperCase() === "DHAN")) {

                errors.api_key = values.BrokerName.toUpperCase() === "ANGEL" ? "Please Enter API Key" :
                    formik.values.BrokerName.toUpperCase() === "ALICEBLUE" ? "Please Enter API Key" :
                        formik.values.BrokerName.toUpperCase() === "ICICI" ? "Please Enter API Key" :
                            formik.values.BrokerName.toUpperCase() === "UPSTOX" ? "Please Enter API Key" :
                                formik.values.BrokerName.toUpperCase() === "5PAISA" ? "Please Enter USER ID" :
                                    formik.values.BrokerName.toUpperCase() === "MASTERTRUST" ? "Please Enter App ID" :
                                        formik.values.BrokerName.toUpperCase() === "FYERS" ? "Please Enter App Client ID" :
                                            formik.values.BrokerName.toUpperCase() === "DHAN" ? "Please Enter Access Token" :
                                                "Please Enter API Key"
            }
            if (!values.Password && (
                values.BrokerName.toUpperCase() === "UPSTOX" ||
                values.BrokerName.toUpperCase() === "5PAISA" ||
                values.BrokerName.toUpperCase() === "MASTERTRUST" ||
                values.BrokerName.toUpperCase() === "FYERS" ||
                values.BrokerName.toUpperCase() === "DHAN")) {
                errors.Password = values.BrokerName.toUpperCase() === "UPSTOX" ? "Please Enter Redirect Url" :
                    values.BrokerName.toUpperCase() === "5PAISA" ? "Please Enter APP SOURCE" :
                        values.BrokerName.toUpperCase() === "MASTERTRUST" ? "Please Enter Client Secret" :
                            values.BrokerName.toUpperCase() === "FYERS" ? "Please Enter Secret Key" :
                                values.BrokerName.toUpperCase() === "DHAN" ? "Please Enter Client ID" :
                                    "Please Enter Password"
            }

            if (!values.mobileno && (values.BrokerName.toUpperCase() === "ZERODHA" || values.BrokerName.toUpperCase() === "5PAISA")) {
                errors.mobileno = values.BrokerName.toUpperCase() === "ALICEBLUE" ? "Please Enter Mobile No." :
                    values.BrokerName.toUpperCase() === "5PAISA" ? "Please Enter USER KEY" :
                        "Please Enter Mobile No."
            }

            if (!values.APIPassword && (values.BrokerName.toUpperCase() === "5PAISA")) {
                errors.APIPassword = values.BrokerName.toUpperCase() === "5PAISA" ? "Please Enter ENCRYPTION KEY" : "Please Enter API Password"
            }
            if (!values.DOB && (
                values.BrokerName.toUpperCase() === "ICICI" ||
                values.BrokerName.toUpperCase() === "UPSTOX" ||
                values.BrokerName.toUpperCase() === "5PAISA" ||
                values.BrokerName.toUpperCase() === "MASTERTRUST" ||
                values.BrokerName.toUpperCase() === "FYERS")) {
                errors.DOB = values.BrokerName.toUpperCase() === "ICICI" ? "Please Enter Secret Key" :
                    values.BrokerName.toUpperCase() === "UPSTOX" ? "Please Enter Secret Key" :
                        values.BrokerName.toUpperCase() === "5PAISA" ? "Please Enter PASSWORD" :
                            values.BrokerName.toUpperCase() === "MASTERTRUST" ? "Please Enter Redirect Uri" :
                                values.BrokerName.toUpperCase() === "FYERS" ? "Please Enter Redirect Uri" :
                                    "Please Enter Mobile No."
            }

            return errors;
        },
        onSubmit: async (values) => {
            let req = {
                Username: userName,
                api_key: values.api_key,
                Userid: values.username,
                Pwd: values.Password,
                DOB: values.DOB,
                MOb: values.mobileno,
                APIPassword: values.APIPassword,
                // BrokerName:values.BrokerName,
            };

            const response = await UpdateBrokerData(req);

            if (response.Status) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Broker key updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK',
                    timer: "1000"
                }).then(() => {
                    closeModal(false);
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update broker key.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    timer: "1000"

                });
            }
        }
    });



    const getBrokerDetails = async () => {
        if (Role == 'Admin') {
            try {
                const response = await Get_Broker_Details();
                if (response.Status) {
                    setUpDateData({ data: response.BrokerDetail });
                } else {
                    setUpDateData({ data: {} });
                }
            } catch (err) {
                console.log("Error in finding the broker details", err);
            }

        }

    };
    useEffect(() => {
        getBrokerDetails();
    }, []);


    const formik2 = useFormik({

        initialValues: {
            api_key: '',
            Pwd: '',
            Userid: '',
            DOB: '',
        },
        validate: (values) => {
            let errors = {};
            if (!values.api_key) {
                errors.api_key = "Please Enter API Key";
            }
            if (!values.Pwd) {
                errors.Pwd = "Please Enter Password";
            }
            if (!values.Userid) {
                errors.Userid = "Please Enter User ID";
            }
            if (!values.DOB) {
                errors.DOB = "Please Enter Authorization Key";
            }
            return errors;
        },
        onSubmit: async (values) => {
            const data = {
                Userid: values.Userid,
                api_key: values.api_key,
                Pwd: values.Pwd,
                DOB: values.DOB
            };
            try {
               
                const response = await AdminAddBrokerCredential(data);
                if (response.Status) {
                    setUpDateData({ data: response.Data });
                    
                    Swal.fire({
                        title: "Updated successfully!",
                        text: "Broker Credential Updated successfully!",
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    }).then(() => {
                        closeModal(false);
                    });

                }
                 else {
                   
                    Swal.fire({
                        title: "Error",
                        text:  response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            } catch (error) {
                console.log("Error in updating Broker", error);
            }
        }
    });

    const fields1 = [
        {
            name: "Userid",
            label: "User ID",
            type: "text",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "api_key",
            label: "API key",
            type: "text",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Pwd",
            label: "Password",
            type: "text",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "DOB",
            label: "Authorization Key",
            type: "text",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
    ];




    useEffect(() => {
        if (userDetails.data) {
            formik.setValues({
                api_key: userDetails.data.api_key || '',
                mobileno: userDetails.data.mobileno || '',
                APIPassword: userDetails.data.APIPassword || '',
                BrokerName: userDetails.data.BrokerName || '',
                DOB: userDetails.data.DOB || '',
                Password: userDetails.data.Password || '',
                username: userDetails.data.username || '',
                broker: userDetails.data.broker || '',
            });
        }
    }, [userDetails]);

    const fields = [
        {
            name: "username",
            label: formik.values.BrokerName.toUpperCase() === "ALICEBLUE" ? "Username " : formik.values.BrokerName.toUpperCase() === "5PAISA" ? "App Name" : formik.values.BrokerName.toUpperCase() === "ZEBULL" ? "Username" : formik.values.BrokerName.toUpperCase() === "MANDOT" ? "Username" : formik.values.BrokerName.toUpperCase() === "INDIRA" ? "Username" : formik.values.BrokerName.toUpperCase() === "KOTAK" ? "User ID (Received in Email) " : "Username",
            showWhen: (values) => values.BrokerName.toUpperCase() === "ALICEBLUE" || values.BrokerName.toUpperCase() === "5PAISA" || values.BrokerName.toUpperCase() === "ZEBULL" || values.BrokerName.toUpperCase() === "MANDOT" || values.BrokerName.toUpperCase() === "INDIRA" ||  values.BrokerName.toUpperCase() === "KOTAK",
            type: 'text',
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "api_key",
            label: formik.values.BrokerName.toUpperCase() === "ANGEL" ? "App Api Key" :
                formik.values.BrokerName.toUpperCase() === "ALICEBLUE" ? "App Api Key" :
                    formik.values.BrokerName.toUpperCase() === "ICICI" ? "App Api Key" :
                        formik.values.BrokerName.toUpperCase() === "UPSTOX" ? "App Api Key" :
                            formik.values.BrokerName.toUpperCase() === "5PAISA" ? "User ID" :
                                formik.values.BrokerName.toUpperCase() === "MASTERTRUST" ? "App ID" :
                                    formik.values.BrokerName.toUpperCase() === "FYERS" ? "App Client ID" :
                                        formik.values.BrokerName.toUpperCase() === "DHAN" ? "Access Token" :
                                            formik.values.BrokerName.toUpperCase() === "ZEBULL" ? "App Api Key" :
                                                formik.values.BrokerName.toUpperCase() === "MANDOT" ? "App Api Key" :
                                                    formik.values.BrokerName.toUpperCase() === "INDIRA" ? "App Api Key" :
                                                    formik.values.BrokerName.toUpperCase() === "KOTAK" ? "Consumer Key" :

                                                        "Username",
            showWhen: (values) => values.BrokerName.toUpperCase() === "ANGEL" ||
                values.BrokerName.toUpperCase() === "ALICEBLUE" ||
                values.BrokerName.toUpperCase() === "ICICI" ||
                values.BrokerName.toUpperCase() === "UPSTOX" ||
                values.BrokerName.toUpperCase() === "5PAISA" ||
                values.BrokerName.toUpperCase() === "MASTERTRUST" ||
                values.BrokerName.toUpperCase() === "FYERS" ||
                values.BrokerName.toUpperCase() === "KOTAK" ||
                values.BrokerName.toUpperCase() === "ZEBULL" ||
                values.BrokerName.toUpperCase() === "MANDOT" ||
                values.BrokerName.toUpperCase() === "DHAN" || values.BrokerName.toUpperCase() === "INDIRA",
            type: 'text',
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "Password",
            type: 'text',
            label: formik.values.BrokerName.toUpperCase() === "UPSTOX" ? "Redirect Url" :
                formik.values.BrokerName.toUpperCase() === "5PAISA" ? "App Source" :
                    formik.values.BrokerName.toUpperCase() === "MASTERTRUST" ? "Client Secret" :
                        formik.values.BrokerName.toUpperCase() === "FYERS" ? "Secret Key" :
                            formik.values.BrokerName.toUpperCase() === "DHAN" ? "Client ID" :
                                formik.values.BrokerName.toUpperCase() === "ZEBULL" ? "User Password" :
                                    formik.values.BrokerName.toUpperCase() === "INDIRA" ? "User Password" :
                                    formik.values.BrokerName.toUpperCase() === "KOTAK" ? "Demat Password" :

                                        "Mobile No.",
            showWhen: (values) => values.BrokerName.toUpperCase() === "UPSTOX" ||
                values.BrokerName.toUpperCase() === "5PAISA" ||
                values.BrokerName.toUpperCase() === "MASTERTRUST" ||
                values.BrokerName.toUpperCase() === "FYERS" ||
                values.BrokerName.toUpperCase() === "ZEBULL" ||
                values.BrokerName.toUpperCase() === "KOTAK" ||
                values.BrokerName.toUpperCase() === "DHAN" || values.BrokerName.toUpperCase() === "INDIRA",
            disable: false,
            label_size: 12,
            col_size: 6,
        },
        {
            name: "mobileno",
            type: "text",
            label: formik.values.BrokerName.toUpperCase() === "ALICEBLUE" ? "Mobile No." :
                formik.values.BrokerName.toUpperCase() === "5PAISA" ? "User Key" :
                formik.values.BrokerName.toUpperCase() === "KOTAK" ? "Mobile No." :
                    "Mobile No.",
            showWhen: (values) => values.BrokerName.toUpperCase() === "ZERODHA" ||
                values.BrokerName.toUpperCase() === "KOTAK" ||
                values.BrokerName.toUpperCase() === "5PAISA",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "APIPassword",
            type: "text",
            label: formik.values.BrokerName.toUpperCase() === "5PAISA" ? "Encryption Key" : 
            formik.values.BrokerName.toUpperCase() === "KOTAK" ? "Password (Received in Email)" : 
            "API Password",

            showWhen: (values) => values.BrokerName.toUpperCase() === "5PAISA" || values.BrokerName.toUpperCase() === "KOTAK",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
        {
            name: "DOB",
            type: "text",
            label: formik.values.BrokerName.toUpperCase() === "ICICI" ? "Secret Key" :
                formik.values.BrokerName.toUpperCase() === "UPSTOX" ? "Secret Key" :
                    formik.values.BrokerName.toUpperCase() === "5PAISA" ? "Password" :
                        formik.values.BrokerName.toUpperCase() === "MASTERTRUST" ? "Redirect Uri" :
                            formik.values.BrokerName.toUpperCase() === "FYERS" ? "Redirect Uri" :
                                formik.values.BrokerName.toUpperCase() === "ZEBULL" ? "Date of Birth" :
                                    formik.values.BrokerName.toUpperCase() === "MANDOT" ? "Secret Key" :
                                        formik.values.BrokerName.toUpperCase() === "INDIRA" ? "Mobile No." :
                                        formik.values.BrokerName.toUpperCase() === "KOTAK" ? "Consumer Secret Key" :

                                            "Mobile No.",
            showWhen: (values) => values.BrokerName.toUpperCase() === "ICICI" ||
                values.BrokerName.toUpperCase() === "UPSTOX" ||
                values.BrokerName.toUpperCase() === "5PAISA" ||
                values.BrokerName.toUpperCase() === "MASTERTRUST" ||
                values.BrokerName.toUpperCase() === "ZEBULL" ||
                values.BrokerName.toUpperCase() === "KOTAK" ||
                values.BrokerName.toUpperCase() === "MANDOT" ||
                values.BrokerName.toUpperCase() === "FYERS" || values.BrokerName.toUpperCase() === "INDIRA",
            label_size: 12,
            col_size: 6,
            disable: false,
        },
    ];


    useEffect(() => {
        if (upDateData.data && upDateData.data[0]) {

            formik2.setFieldValue('api_key', upDateData.data && upDateData.data[0].api_key || '')
            formik2.setFieldValue('Pwd', upDateData.data && upDateData.data[0].Pwd || '')
            formik2.setFieldValue("Userid", upDateData && upDateData.data[0].username || '')
            formik2.setFieldValue("DOB", upDateData && upDateData.data[0].Auth_key || '')
        }

    }, [upDateData.data])

    
    return (
        <div>


            {Role == "Admin" && isVisible ?

                <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Broker Key : - {userDetails.data && userDetails.data.BrokerName}
                                </h5>

                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => closeModal(false)}
                                />
                            </div>

                            <Formikform
                                fields={fields1.filter(
                                    (fields1) => !fields1.showWhen || fields1.showWhen(formik2.values)
                                )}

                                btn_name="Update"
                                formik={formik2}

                            />
                        </div>
                    </div>
                </div>

                : ""}


            {Role == "User" && !userDetails.loading && isVisible && (
                <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">
                                    Update Broker Key : - {userDetails.data && userDetails.data.BrokerName}
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => closeModal(false)}
                                />
                            </div>
                            <Formikform
                                fields={fields.filter(
                                    (field) => !field.showWhen || field.showWhen(formik.values)
                                )}

                                btn_name="Update"
                                formik={formik}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Update_Broker_Key;
