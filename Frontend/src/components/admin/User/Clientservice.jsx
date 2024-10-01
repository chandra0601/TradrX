import React, { useEffect, useState } from 'react';
import { GetClientService, Get_Broker_Name, GetGroupNames, ExtendEndDate, EditClientPanle, ServiceCount } from '../../CommonAPI/Admin';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { Link } from 'react-router-dom';
import { SquarePen } from 'lucide-react';
import { useFormik } from 'formik';
import DropdownMultiselect from 'react-multiselect-dropdown-bootstrap';
import AddForm from '../../../ExtraComponent/FormData';
import Swal from 'sweetalert2';
import { GetAllStratgy } from '../../CommonAPI/Admin'

const Clientservice = () => {
    const [clientService, setClientService] = useState({ loading: true, data: [] });
    const [showModal, setShowModal] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [optionsArray, setOptionsArray] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [groupData, setGroupData] = useState({ loading: true, data: [] });
    const [brokers, setBrokers] = useState({ loading: true, data: [] });
    const [getServiceCount, setServiceCount] = useState([]);
    const [getExtendDate, setExtendDate] = useState([]);
    const [getDate, setExDate] = useState('');
    const [refresh, setRefresh] = useState(false)
    const [searchInput, setSearchInput] = useState('')
    const [scalpingStratgy, setScalpingStratgy] = useState([])
    const [OptionStratgy, setOptionStratgy] = useState([])
    const [PatternStratgy, setPatternStratgy] = useState([])
    const [selecteOptions, setSelecteOptions] = useState([])
    const [selecteScalping, setSelecteScalping] = useState([])
    const [selectePattern, setSelectePattern] = useState([])


    useEffect(() => {
        const fetchBrokerName = async () => {
            try {
                const response = await Get_Broker_Name();
                if (response.Status) {
                    const brokerList = response.Brokernamelist.filter(item => item.BrokerName !== 'DEMO');
                    setBrokers({ loading: false, data: brokerList });
                } else {
                    setBrokers({ loading: false, data: [] });
                }
            } catch (error) {
                console.log('Error in fetching brokers', error);
            }
        };

        fetchBrokerName();
    }, []);

    useEffect(() => {
        GetScalpingStratgy()
    }, [])

    const GetScalpingStratgy = async () => {
        await GetAllStratgy()
            .then((response) => {
                if (response.Status) {
                    setScalpingStratgy(Object.values(response.Scalping))
                    setPatternStratgy(Object.values(response.Pattern))
                    setOptionStratgy(Object.values(response.Option))

                }
                else {
                    setScalpingStratgy([])
                }
            })
            .catch((err) => {
                console.log("Error in getting the Scalping Stratgy", err)
            })
    }
    const fetchClientService = async () => {
        try {
            const response = await GetClientService();
            if (response.Status) {
                const filteredData = response.Data.filter(item => {
                    const searchInputMatch =
                        searchInput === '' ||
                        item.Username.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.Mobile_No.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.EmailId.toLowerCase().includes(searchInput.toLowerCase()) ||
                        item.BrokerName.toLowerCase().includes(searchInput.toLowerCase())
                    return searchInputMatch
                })

                setClientService({
                    loading: false,
                    data: searchInput ? filteredData : response.Data,
                });
            } else {
                setClientService({ loading: false, data: [] });
            }
        } catch (error) {
            console.log('Error in fetching client services', error);
        }
    };

    useEffect(() => {
        fetchClientService();
    }, [refresh, searchInput]);

    useEffect(() => {
        const fetchGroupDetails = async () => {
            try {
                const response = await GetGroupNames();
                if (response.Status) {
                    const options = response.Data.map(item => ({
                        label: item.GroupName,
                        key: item.GroupName,
                    }));
                    setOptionsArray(options);
                    setGroupData({ loading: false, data: response.Data });
                } else {
                    setGroupData({ loading: false, data: [] });
                }
            } catch (error) {
                console.log('Error in fetching group data', error);
            }
        };

        fetchGroupDetails();
    }, []);

 
    const formik = useFormik({
        initialValues: {
            User: "",
            Service_Count: "",
            Broker: "",
            Day: "",
            SSDate: "",
            SEDate: "",
            GroupName: "",
            select: "",
            amount: ""
        },
        validate: values => {
            const errors = {};
            if (showModal && selectedIndex.BrokerName != "Demo" && !values.Select_Product_Type) {
                errors.Select_Product_Type = "Select Edit Type"
            }
            if (!values.Select_Broker) {
                errors.Select_Broker = "Select Broker Type"
            }
            if (showModal && selectedIndex.BrokerName === "Demo" && !values.Select_Day) {
                errors.Select_Day = "Select Days"
            }
            if (!values.amount) {
                errors.amount = "Enter Amount"
            }
            console.log("errors", errors)
            return errors;
        },


        onSubmit: async (values) => {
            const req = {
                User: showModal ? selectedIndex.Username : '',
                ser: values.Select_Day === 'todays' && showModal && selectedIndex.BrokerName === "Demo" ? 1 : values.Service_Count,
                Broker: values.Select_Broker,
                Day: showModal && selectedIndex.BrokerName === 'Demo' ? values.Select_Day : '',
                SSDate: values.Select_Product_Type === "Extend Service Count" && showModal && selectedIndex.BrokerName !== "Demo" ? getDate : form_Date,
                SEDate: formattedDate,
                GroupName: selectedOptions,
                select: values.Select_Product_Type,
                Planname: "",
                clientpay: Number(values.amount),
                scalping: selecteScalping,
                option: selecteOptions,
                pattern: selectePattern
            };
             
            try {
                const response = await EditClientPanle(req);
                if (response.Status) {

                    setRefresh(!refresh)
                    Swal.fire({
                        title: "Updated",
                        text: response.message,
                        icon: "success",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setTimeout(() => {
                        setShowModal(false);
                        formik.resetForm();
                        setSelectedOptions([]);
                    }, 1500);
                } else {
                    Swal.fire({
                        title: "Error",
                        text: response.message,
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            } catch (err) {
                console.log("Error in update client", err);
            }
        },
    });

    const fields = [
        {
            name: 'Select_Product_Type',
            label: 'Product Type',
            type: 'select1',
            options: [
                { label: 'Add New Service', value: 'Add New Services' },
                { label: 'Extend Service Count', value: 'Extend Service Count' },
            ],
            showWhen: () => showModal && selectedIndex.BrokerName !== 'Demo',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Select_Broker',
            label: 'Broker',
            type: 'select1',
            options: brokers.data.map(item => ({
                label: item.BrokerName,
                value: item.BrokerName,
            })),
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Select_Day',
            label: 'Day',
            type: 'select1',
            options: [
                { value: 'todays', label: 'Two Days' },
                { value: 'onemonth', label: 'One Month' },
            ],
            showWhen: () => showModal && selectedIndex.BrokerName === 'Demo',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Service_Count',
            label: 'Service Count',
            type: 'select1',
            options: showModal && selectedIndex.BrokerName !== 'Demo' &&
                formik.values.Select_Product_Type === 'Extend Service Count'
                ? getServiceCount.map(item => ({
                    label: item,
                    value: item,
                }))
                : [
                    { label: '0', value: 0 },
                    { label: '1', value: 1 },
                    { label: '2', value: 2 },
                    { label: '5', value: 5 },
                ],
            showWhen: () =>
                showModal &&
                (selectedIndex.BrokerName !== 'Demo' ||
                    formik.values.Select_Day === 'onemonth'),
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'amount',
            label: 'Amount',
            type: 'text',
            label_size: 12,
            col_size: 6,
        },
    ];

    useEffect(() => {
        formik.setFieldValue('Select_Product_Type', "Add New Services")
        formik.setFieldValue('Select_Broker', showModal && selectedIndex.BrokerName)
        formik.setFieldValue('Service_Count', 0)
    }, [showModal])

    const Service_Count = async () => {
        if (showModal && selectedIndex.Username) {
            const data = { Username: showModal && selectedIndex.Username };
            try {
                const response = await ServiceCount(data);
                if (response.Status) {

                    setServiceCount(response.ServiceCount);
                } else {
                    setServiceCount([]);
                }
            } catch (err) {
                console.log("Error in finding the service count", err);
            }
        }
    };

    const ExtendDate = async () => {
        if (showModal && selectedIndex.Username && formik.values.Service_Count) {
            const data = {
                Username: selectedIndex.Username,
                ser: formik.values.Service_Count || 0
            };

            try {
                const response = await ExtendEndDate(data);

                if (response.Status) {
                    setExtendDate(response.ServiceStartDate || []);  // Use fallback directly
                } else {
                    setExtendDate([]);
                }
            } catch (err) {
                console.error("Error in ExtendDate function while fetching the service count:", err);
            }
        }
    };

    useEffect(() => {
        ExtendDate();
    }, [formik.values.Service_Count, formik.values.Select_Product_Type, showModal]);

    useEffect(() => {
        Service_Count();
    }, [showModal]);

    const columns = [
        {
            name: 'S.No',
            label: 'S.No',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => tableMeta.rowIndex + 1,
            },
        },
        {
            name: 'Edit',
            label: 'Edit',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (
                    <SquarePen
                        onClick={() => {
                            setShowModal(true);
                            const rowDataWithKeys = {};
                            columns.forEach((column, index) => {
                                rowDataWithKeys[column.name] = tableMeta.rowData[index];
                            });
                            setSelectedIndex(rowDataWithKeys);
                        }}
                    />
                ),
            },
        },
        {
            name: 'Username',
            label: 'Username',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Mobile_No',
            label: 'Mobile Number',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'BrokerName',
            label: 'Broker Name',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'EmailId',
            label: 'Email ID',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Group',
            label: 'Strategy Group',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta) => (

                    <span>{Array.isArray(value) ? value.join(' , ') : value ? "-" : value || '-'}</span>
                ),
            }
        },
        {
            name: 'CreateDate',
            label: 'Account Create Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceStartDate',
            label: 'Service Start Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'ServiceEndDate',
            label: 'Service End Date',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
        {
            name: 'Total Service Count',
            label: 'Total Service Count',
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => value || '-'
            }
        },
    ];

    const currentDate = new Date();
    currentDate.setDate(
        currentDate.getDate() +
        (formik.values.Select_Day === 'onemonth' ||
            (showModal && selectedIndex.BrokerName !== 'Demo')
            ? 30
            : formik.values.Select_Day === 'todays'
                ? 2
                : 0)
    );
    const formattedDate = currentDate.toISOString().split('T')[0];
    const fromDate = new Date();
    const form_Date = fromDate.toISOString().split('T')[0];
    useEffect(() => {
        if (showModal)
            setSelectedOptions(showModal && selectedIndex.Group)
    }, [showModal])
    return (


      

        <>
            <div className='row'>
                <div className='col-sm-12'>
                    <div className='iq-card'>
                        <div className='iq-card-header d-flex justify-content-between'>
                            <div className='iq-header-title'>
                                <h4 className='card-title'>Client Service</h4>
                            </div>
                            <Link to='/admin/adduser' className='btn btn-primary rounded'>
                                Create Account
                            </Link>
                        </div>
                        <div className='iq-card-body'>
                            <div className='mb-3 col-lg-3'>
                                <input type="text" className=' form-control rounded p-1 px-2' placeholder="Search..." onChange={(e) => setSearchInput(e.target.value)} value={searchInput} />
                            </div>
                            <FullDataTable columns={columns} data={clientService.data} checkBox={false} />
                        </div>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className='modal custom-modal d-flex' id='add_vendor' role='dialog'>
                    <div className='modal-dialog modal-dialog-centered modal-lg'>
                        <div className='modal-content'>
                            <div className='modal-header clientheader border-0 pb-0'>
                                <div className='form-header modal-header-title text-start mb-0'>
                                    <h4 className='mb-0'>Edit Client</h4>
                                </div>
                                <button
                                    type='button'
                                    className='btn-close'
                                    data-bs-dismiss='modal'
                                    aria-label='Close'
                                    onClick={() => {
                                        setShowModal(false);
                                        formik.resetForm();
                                        setSelectedOptions([]);
                                    }}
                                ></button>
                            </div>
                            <hr />
                            <AddForm
                                fields={fields.filter(
                                    field => !field.showWhen || field.showWhen(formik.values)
                                )}
                                btn_name='Update'
                                formik={formik}
                                btn_name1_route='/admin/clientservice'
                                additional_field={
                                    <div className='mt-2'>
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <h6>Select Group</h6>
                                                <DropdownMultiselect
                                                    options={optionsArray}
                                                    name='groupName'
                                                    handleOnChange={(selected) => setSelectedOptions(selected)}
                                                    selected={showModal ? selectedIndex.Group : ''}
                                                />
                                            </div>
                                            {scalpingStratgy && scalpingStratgy.length > 0 && (
                                                <div className="col-lg-6 mt-2 ">
                                                    <h6>Scalping Strategys</h6>
                                                    <DropdownMultiselect
                                                        options={scalpingStratgy}
                                                        name="groupName"
                                                        handleOnChange={(selected) => {
                                                            setSelecteScalping(selected);
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {OptionStratgy && OptionStratgy.length > 0 && (
                                                <div className="col-lg-6 mt-2 ">
                                                    <h6>Option Strategys</h6>
                                                    <DropdownMultiselect
                                                        options={OptionStratgy}
                                                        name="groupName"
                                                        handleOnChange={(selected) => {
                                                            setSelecteOptions(selected);
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {PatternStratgy && PatternStratgy.length > 0 && (
                                                <div className="col-lg-6 mt-2  ">
                                                    <h6>Pattern Strategys</h6>
                                                    <DropdownMultiselect
                                                        options={PatternStratgy}
                                                        name="groupName"
                                                        handleOnChange={(selected) => {
                                                            setSelectePattern(selected);
                                                        }}
                                                    />
                                                </div>

                                            )}

                                            {formik.values.Select_Day === 'todays' && showModal && selectedIndex.BrokerName === "Demo" && (
                                                <div className='col-lg-6 mt-3'>
                                                    <h6>Service Count</h6>
                                                    <h4>1</h4>
                                                </div>
                                            )}
                                            {(formik.values.Select_Product_Type === "Add New Services" || showModal && selectedIndex.BrokerName === "Demo") ? (
                                                <div className='col-lg-3 mt-3'>
                                                    <h6>Service Start Date</h6>
                                                    <h6>{form_Date}</h6>
                                                </div>
                                            ) : (
                                                <div className='col-lg-3 mt-3'>

                                                    <h6>Service Start Date</h6>
                                                    <select
                                                        value={getDate}
                                                        onChange={(e) => setExDate(e.target.value)}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Service Type</option>
                                                        {getExtendDate.map((item) => (
                                                            <option value={item} key={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                            <div className='col-lg-3 mt-3'>
                                                <h6>Service End Date:</h6>
                                                <h6>{formattedDate}</h6>
                                            </div>

                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Clientservice;
