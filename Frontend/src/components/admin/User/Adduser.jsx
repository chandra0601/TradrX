import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { CreateAccount, Get_Broker_Name, GetGroupNames } from '../../CommonAPI/Admin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../ExtraComponent/Loader';


const Adduser = () => {
    const navigate = useNavigate()
    const [getBroker, setBroker] = useState({
        loading: true,
        data: []
    })
    const [getGroupData, setGroupData] = useState({
        loading: true,
        data: []
    })

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [optionsArray, setoptionsArray] = useState([]);

    const getBrokerName = async () => {
        await Get_Broker_Name()
            .then((response) => {
                if (response.Status) {
                    const filterOutBroker = response.Brokernamelist.filter((item) => {
                        return item.BrokerName != 'DEMO'
                    })
                    setBroker({
                        loading: false,
                        data: filterOutBroker
                    })
                }
                else {
                    setBroker({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the broker", err)
            })
    }

    useEffect(() => {
        getBrokerName()
    }, [])

    const Name_regex = (name) => {
        const nameRegex = /^[a-zA-Z]+$/;
        return nameRegex.test(name);
    };


    const GetAllGroupDetails = async () => {
        try {
            await GetGroupNames()
                .then((response) => {
                    if (response.Status) {
                        const arr = response.Data.map(item => ({
                            label: item.GroupName,
                            key: item.GroupName
                        }));
                        setoptionsArray(arr);


                        setGroupData({
                            loading: false,
                            data: response.Data
                        })
                    }
                    else {
                        setGroupData({
                            loading: false,
                            data: []
                        })
                    }
                })
                .catch((err) => {
                    console.log("Error in data fetch", err)
                })
        }
        catch {
            console.log("Error group data fetch")
        }
    }

    useEffect(() => {
        GetAllGroupDetails()
    }, [])


    const formik = useFormik({
        initialValues: {
            UserName: null,
            Email: null,
            Password: null,
            Confirm_Password: null,
            PhoneNo: null,
            Select_License: '',
            Select_License_Type: '',
            From_Date: '',
            To_Date: '',
            Service_Count: '',
            Select_Broker: ''
        },
        validate: (values) => {
            let errors = {};
            if (!values.UserName) {
                errors.UserName = "Please Enter Username"
            }
            else if (!Name_regex(values.UserName)) {
                errors.UserName = "Please Enter Valid Username"
            }

            if (!values.Email) {
                errors.Email = "Please Enter Email ID";
            } else {
                const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|ymail|rediffmail|hotmail|outlook|aol|icloud|protonmail|example).(com|co.in|in|net|org|edu|gov|uk|us|info|biz|io|...)[a-zA-Z]{0,}$/;
                if (!emailRegex.test(values.Email)) {
                    errors.Email = "Please Enter valid Email ID";
                }
            }
            if (!values.Password) {
                errors.Password = "Please Enter Password"
            }
            if (!values.Confirm_Password) {
                errors.Confirm_Password = "Please Enter Confirm Password"
            }
            if (!values.PhoneNo) {
                errors.PhoneNo = "Please Enter Mobile Number"
            }
            if (!values.Select_License) {
                errors.Select_License = "Please Select License"
            }
            if (!values.Select_License_Type) {
                errors.Select_License_Type = "Please Select Days"
            }

            if (!values.Service_Count) {
                errors.Service_Count = "Please Select Service Count"
            }
            if (!values.Service_Count) {
                errors.Service_Count = "Please Select Service Count"
            }
            if(!values.Select_Broker && formik.values.Select_License == '2'){
                errors.Select_Broker="Please Select Broker"
            }

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                username: values.UserName,
                password: values.Password,
                cpassword: values.Confirm_Password,
                email: values.Email,
                mobile_no: values.PhoneNo,
                ltype: values.Select_License_Type == '11' ? "Two Days" : values.Select_License_Type == '21' ? "One Week" : values.Select_License_Type == '12' ? "Two Days" : values.Select_License_Type == '22' ? "One Month" : '',
                scount: values.Select_License == '1' ? 2 : Number(values.Service_Count),
                ssdate: values.From_Date,
                sedate: values.To_Date,
                bname: values.Select_License == '1' ? "Demo" : values.Select_Broker,
                group: selectedOptions && selectedOptions
            }
             
            await CreateAccount(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "User Created!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/admin/clientservice')
                        }, 1500)
                    }
                    else {
                        Swal.fire({
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error in adding the new user", err)
                })
        },
    });


    const fields = [
        {
            name: "UserName",
            label: "Username",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Email",
            label: "Email ID",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Password",
            label: "Password",
            type: "password",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Confirm_Password",
            label: "Confirm Password",
            type: "password",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "PhoneNo",
            label: "Mobile Number",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {

            name: "Select_License",
            name: "Select_License",
            label: "License Type",
            type: "select1",
            options: [
                { label: "Demo", value: "1" },
                { label: "Live", value: "2" },

            ],
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {

            name: "Select_License_Type",
            label: "Days",
            type: "select1",
            options: formik.values.Select_License == '1' ? [
                { label: "2 Days Demo", value: "11" },
                { label: "1 Week Demo", value: "21" },
            ] : formik.values.Select_License == '2' ? 
                [
                    { label: "2 Days Live", value: "12" },
                    { label: "1 Month Live", value: "22" },
                ] : [],
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "From_Date",
            label: "Service StartDate",
            type: "date",
            label_size: 12,
            hiding: false,
            col_size: 3,
            disable: true,
        },
        {
            name: "To_Date",
            label: "Service EndDate",
            type: "date",
            label_size: 12,
            hiding: false,
            col_size: 3,
            disable: true,
        },
        {
            name: "Select_Broker",
            label: "Broker",
            type: "select1",
            options: getBroker.data && getBroker.data.map((item) => ({
                label: item.BrokerName,
                value: item.BrokerName
            })),
            showWhen: (values) => formik.values.Select_License == '2',
            label_size: 12,
            hiding: false,
            col_size: 3,
            disable: false,
        },
        {
            name: "Service_Count",
            label: "Service Count",
            type: "select",
            options: [
                
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "5", value: "5" },
            ],
            label_size: 12,
            showWhen: (values) => formik.values.Select_License == '2',
            hiding: false,
            col_size: 3,
            disable: false,
        },

    ];


    //Select Date form date and end date
    const currentDate = new Date();
    const daysToSubtract = formik.values.Select_License_Type === '11' || formik.values.Select_License_Type === '12' ? TwoDays(new Date()) : formik.values.Select_License_Type === '21' ? WeekDays(new Date()) : formik.values.Select_License_Type === '22' ? 30 : 0;
    currentDate.setDate(currentDate.getDate() + daysToSubtract);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // from date
    const FromDate = new Date();

    FromDate.setDate(FromDate.getDate());
    const year1 = FromDate.getFullYear();
    const month1 = String(FromDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(FromDate.getDate()).padStart(2, '0');
    const form_Date = `${year1}-${month1}-${day1}`;


    // Set Date 
    useEffect(() => {
        if (formik.values.Select_License_Type == undefined || formik.values.Select_License_Type == null) {
            formik.setFieldValue('From_Date', '')
            formik.setFieldValue('To_Date', '')

        }
        else {

            formik.setFieldValue('From_Date', form_Date)
            formik.setFieldValue('To_Date', formattedDate)
        }
    }, [formik.values.Select_License_Type])


    //set Date when change to Licence type
    useEffect(() => {

        formik.setFieldValue('From_Date', '')
        formik.setFieldValue('To_Date', '')


    }, [formik.values.Select_License])


    useEffect(() => {
        if (formik.values.Select_License == "1") {
            formik.setFieldValue('Service_Count', "2")
            formik.setFieldValue('Select_Broker', "")
        }
    }, [formik.values.Select_License])


    function TwoDays(startDate) {
        let daysToAdd = 0;
        const currentDay = startDate.getDay();

        if (currentDay === 6) { // Saturday
            daysToAdd = 4;
        } else if (currentDay === 0) { // Sunday
            daysToAdd = 3;
        } else if (currentDay === 1) { // Monday
            daysToAdd = 3;
        } else if (currentDay === 2) { // Tuesday
            daysToAdd = 3;
        } else if (currentDay === 3) { // Wednesday
            daysToAdd = 3;
        } else if (currentDay === 4) { // Thursday
            daysToAdd = 5;
        } else if (currentDay === 5) { // Friday
            daysToAdd = 5;
        } else {
            daysToAdd = 3;
        }

        return daysToAdd
    }



    function WeekDays(startDate) {
        let daysToAdd = 0;
        const currentDay = startDate.getDay();

        if (currentDay === 6) { // Saturday
            daysToAdd = 9;
        } else if (currentDay === 0) { // Sunday
            daysToAdd = 8;
        } else if (currentDay === 1) { // Monday
            daysToAdd = 7;
        } else if (currentDay === 2) { // Tuesday
            daysToAdd = 7;
        } else if (currentDay === 3) { // Wednesday
            daysToAdd = 7;
        } else if (currentDay === 4) { // Thursday
            daysToAdd = 7;
        } else if (currentDay === 5) { // Friday
            daysToAdd = 7;
        } else {
            daysToAdd = 7;
        }
        return daysToAdd

    }
 
    return (
        <>
            {getGroupData.loading ? <Loader /> :
                (
                    <AddForm
                        fields={fields.filter(
                            (field) => !field.showWhen || field.showWhen(formik.values)
                        )}
                        page_title="Create Account"
                        btn_name="Add"
                        btn_name1="Cancel"
                        formik={formik}
                        btn_name1_route={"/admin/clientservice"}
                        additional_field={
                            <div className='col-lg-6 mt-2 dropdownuser' >
                                <h6>Select Group</h6>
                                <DropdownMultiselect
                                   
                                    options={optionsArray}
                                    name="groupName"
                                    handleOnChange={(selected) => {
                                        setSelectedOptions(selected)
                                    }}
                                />
                            </div>
                        }
                    />
                )}
        </>
    );
};

export default Adduser;
