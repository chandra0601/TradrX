import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { AddPlan, GetAllStratgy } from '../../CommonAPI/Admin'
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../ExtraComponent/Loader';


const AddPlanPage = () => {
    const navigate = useNavigate()
    const [selecteOptions, setSelectedOptions] = useState([])
    const [selecteScalping, setSelecteScalping] = useState([])
    const [selectePattern, setSelectePattern] = useState([])
    const [scalpingStratgy, setScalpingStratgy] = useState([])
    const [OptionStratgy, setOptionStratgy] = useState([])
    const [PatternStratgy, setPatternStratgy] = useState([])

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

    const formik = useFormik({
        initialValues: {
            NumberofScript: "",
            payment: "",
            planname: "",
            Duration: "",
        },
        validate: (values) => {
            let errors = {};
            if (!values.NumberofScript) {
                errors.NumberofScript = "Please Enter Number of Script"
            }
            if (!values.payment) {
                errors.payment = "Please Enter Payment"
            }
            if (!values.planname) {
                errors.planname = "Please Enter Plan Name"
            }
            if (!values.Duration) {
                errors.Duration = "Please Select Duration"
            }
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                NumberofScript: values.NumberofScript,
                payment: values.payment,
                planname: values.planname,
                Duration: values.Duration,
                Scalping: selecteScalping,
                Option: selecteOptions,
                PatternS: selectePattern
            }
            await AddPlan(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Success!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/admin/allplan')
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
            name: "NumberofScript",
            label: "Number of Script",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "payment",
            label: "Payment",
            type: "text3",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "planname",
            label: "Plan Name",
            type: "text",
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
        {
            name: "Duration",
            label: "Duration",
            type: "select1",
            options: [
                { value: "1", label: "One Month" },
                { value: "2", label: "Quarterly" },
                { value: "3", label: "Half Yearly" },
                { value: "4", label: "Yearly" },
            ],
            label_size: 12,
            hiding: false,
            col_size: 6,
            disable: false,
        },
    ];

    return (
        <>
            <AddForm
                fields={fields.filter(
                    (field) => !field.showWhen || field.showWhen(formik.values)
                )}
                page_title="Add Plan"
                btn_name="Add"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={"/admin/clientservice"}
                additional_field={
                    <>
                        {scalpingStratgy && scalpingStratgy.length > 0 && (
                            <div className="col-lg-6 mt-2 ">
                                <h6>Scalping</h6>
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
                                <h6>Option</h6>
                                <DropdownMultiselect
                                    options={OptionStratgy}
                                    name="groupName"
                                    handleOnChange={(selected) => {
                                        setSelectedOptions(selected);
                                    }}
                                />
                            </div>
                        )}

                        {PatternStratgy && PatternStratgy.length > 0 && (
                            <div className="col-lg-6 mt-2  ">
                                <h6>Patterm</h6>
                                <DropdownMultiselect
                                    options={PatternStratgy}
                                    name="groupName"
                                    handleOnChange={(selected) => {
                                        setSelectePattern(selected);
                                    }}
                                />
                            </div>

                        )}
                    </>
                }
            />

        </>
    );
};

export default AddPlanPage;
