import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Add_Group, GetGroupNames } from '../../CommonAPI/Admin';
import GridExample from '../../../ExtraComponent/CommanDataTable'
import AddForm from '../../../ExtraComponent/FormData'
import { useFormik } from 'formik';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

const Strategygroup = () => {
    const [getGroupData, setGroupData] = useState({
        loading: true,
        data: []
    });
    const [showModal, setShowModal] = useState(false);
    const [refresh, setRefresh] = useState(false)

    const columns = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "GroupName",
            label: "Group Name",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Fund_Requierment",
            label: "Fund Requirement",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Risk",
            label: "Risk in %",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Time",
            label: "Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        
        {
            name: "PRtype",
            label: "Product Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Message",
            label: "Message",
            options: {
                filter: true,
                sort: true,
                width: '20%'
            }
        },
    ];

    const GetAllGroupDetails = async () => {
        try {
            await GetGroupNames()
                .then((response) => {
                    if (response.Status) {
                        setGroupData({
                            loading: false,
                            data: response.Data
                        });
                    } else {
                        setGroupData({
                            loading: false,
                            data: []
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error Group data fetch error", err);
                });
        } catch {
            console.log("Error Group data fetch error");
        }
    };

    useEffect(() => {
        GetAllGroupDetails();
    }, [refresh]);

    const formik = useFormik({
        initialValues: {
            Message: "",
            ProductType: "",
            TimeOrigin: "",
            Risk: "",
            FundReuirement: "",
            GroupName: "",
        },
        validate: values => {
            const errors = {};
            if (!values.Message) {
                errors.Message = 'Please Enter Message';
            }
            if (!values.ProductType) {
                errors.ProductType = 'Please Select Product Type';
            }
            if (!values.TimeOrigin) {
                errors.TimeOrigin = 'Please Select Time Origin';
            }
            if (!values.Risk) {
                errors.Risk = 'Please Enter Risk %';
            }
            if (!values.FundReuirement) {
                errors.FundReuirement = 'Please Enter Fund Requirement';
            }
            if (!values.GroupName) {
                errors.GroupName = 'Please Enter Group Name';
            }
            return errors;
        },
        onSubmit: async (values) => {
            const data = {
                GroupName: values.GroupName,
                FundReuirement: values.FundReuirement,
                Risk: values.Risk.toString(),
                TimeOrigin: values.TimeOrigin,
                ProductType: values.ProductType,
                Message: values.Message
            };
            await Add_Group(data)
                .then((response) => {
                    if (response.Status) {
                        setRefresh(!refresh)
                        Swal.fire({
                            title: 'Created successfully!',
                            text:  response.message,
                            icon: 'success',
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            setShowModal(false);
                            formik.resetForm();
                        }, 1500);
                    } else {
                        Swal.fire({
                            title: 'Error',
                            text: response.message,
                            icon: 'error',
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
                .catch((err) => {
                    console.log('Error in group creation...');
                    Swal.fire({
                        title: 'Error',
                        text: 'Group creation error!',
                        icon: 'error',
                        timer: 1500,
                        timerProgressBar: true
                    });
                });
        },
    });

    const handleCloseModal = () => {
        setShowModal(false);
        formik.resetForm();
    };

    const fields = [
        {
            name: 'GroupName',
            label: 'Group Name',
            type: 'text',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'FundReuirement',
            label: 'Fund Requirement',
            type: 'text3',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Risk',
            label: 'Risk in %',
            type: 'text4',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'TimeOrigin',
            label: 'Time Origin',
            type: 'select',
            options: [
                { label: 'Weekly', value: 'Weekly' },
                { label: 'Monthly', value: 'Monthly' },
                { label: 'Half Yearly', value: 'Half_Yearly' },
                { label: 'Yearly', value: 'Yearly' },
            ],
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'ProductType',
            label: 'Product Type',
            type: 'select',
            options: [
                { label: 'Intraday', value: 'Intraday' },
                { label: 'Delivery', value: 'Delivery' },
            ],
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'Message',
            label: 'Message',
            type: 'msgbox',
            label_size: 12,
            col_size: 6,
        },
    ];

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Strategy Group</h4>
                            </div>
                            <div className="iq-card-header-toolbar d-flex align-items-center">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(true)}
                                >
                                    Add New Group
                                </button>
                            </div>
                        </div>

                        <div className="iq-card-body">
                            <div className="table-responsive customtable">
                                <GridExample
                                    columns={columns}
                                    data={getGroupData.data}
                                    checkBox={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal custom-modal d-flex" id="add_vendor" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header border-0 pb-0">
                                <div className="form-header modal-header-title text-start mb-0">
                                    <h4 className="mb-0">Add New Group</h4>
                                </div>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                    onClick={handleCloseModal}
                                ></button>
                            </div>
                            <hr />
                            
                            <AddForm
                                fields={fields.filter(
                                    field => !field.showWhen || field.showWhen(formik.values)
                                )}
                                btn_name='Add Group'
                                formik={formik}
                                btn_name1_route='/admin/clientservice'
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Strategygroup;
