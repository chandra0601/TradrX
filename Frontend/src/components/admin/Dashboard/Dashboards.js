import React, { useState, useEffect } from 'react';
import { GetAdminDashboard, AdmindashboardGraph, AdmindashboardData } from '../../CommonAPI/Admin'
import Loader from '../../../ExtraComponent/Loader';
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";
import { AgChartsReact } from 'ag-charts-react';

const Dashboards = () => {

    const [dashData, setData] = useState({
        loading: true,
        data: []
    });
    const [Data2, setData2] = useState({
        data: "",
        data1: ""
    });
    const [Data1, setData1] = useState({
        loading: true,
        data: []
    });





    const options = {
        data: Data1 && Data1.data,
        series: [{ type: "bar", xKey: "ServiceStartDate", yKey: "Credit Use" }],
        axes: [
            {
                type: 'category',
                position: 'bottom',
                title: {
                    text: 'Service Start Date',
                },
            },
            {
                type: 'number',
                position: 'left',
                title: {
                    text: 'Credit Use',
                },
            },
        ],
        zoom: {
            enabled: true,
        }
    };



    const GetAdminDashboardData = async () => {
        await GetAdminDashboard()
            .then((response) => {
                if (response.Status) {
                    setData({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setData({
                        loading: false,
                        data: []
                    })

                }

            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)

            })

    };

    useEffect(() => {
        GetAdminDashboardData();
    }, []);

    const GetDashboardGraphData = async () => {
        await AdmindashboardGraph()
            .then((response) => {
                if (response.Status) {
                    setData2({
                        loading: false,
                        data: response.TotalAccount,
                        data1: response.ammount
                    })
                }
                else {
                    setData2({
                        loading: false,
                        data: "",
                        data1: ""
                    })

                }

            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    }

    const GetDashboardData = async () => {

        await AdmindashboardData()
            .then((response) => {
                if (response.Status) {
                    setData1({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setData1({
                        loading: false,
                        data: []
                    })

                }

            })
            .catch((err) => {
                console.log("Error in fatching the Dashboard Details", err)
            })
    }

    useEffect(() => {
        GetDashboardGraphData()
        GetDashboardData()
    }, [])





    return (
        <div>
            {
                dashData.loading ? <Loader /> :

                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-sm-12">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Live Account</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-online mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Total: </h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Total_Live_Account}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-blue mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Active: </h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Active_Live_Account}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-primary mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Expired: </h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Expired_Live_Account}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Free Demo Account</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-online mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Total:</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Total_Free_Demo_Account}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-blue mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Active</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Active_Free_Demo_Account}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-primary mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Expired</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Expired_Free_Demo_Account}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Two Days Live Account</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-online mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Total</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Total_Two_Days_Live_Account}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-blue mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Active</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Active_Two_Days_Live_Account}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-primary mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Expired</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Expired_Two_Days_Live_Account}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Total Service Count of 1</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-online mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Total: </h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Total_Service_Count_1}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-blue mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Active: </h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Active_Service_Count_1}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-primary mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Expired: </h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Expired_Service_Count_1}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Total Service Count of 2</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-online mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Total:</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Total_Service_Count_2}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-blue mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Active</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Active_Service_Count_2}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-primary mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Expired</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Expired_Service_Count_2}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-4">
                                        <div className="iq-card ">
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">Total Service Count of 5</h4>
                                                </div>
                                            </div>
                                            <div className="iq-card-body">
                                                <div className="progress mt-3">
                                                    <div
                                                        className="progress-bar bg-primary"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-warning"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-info"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-danger"
                                                        role="progressbar"
                                                        aria-valuenow={40}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "40%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-success"
                                                        role="progressbar"
                                                        aria-valuenow={20}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "20%" }}
                                                    ></div>
                                                    <div
                                                        className="progress-bar bg-secondary"
                                                        role="progressbar"
                                                        aria-valuenow={10}
                                                        aria-valuemin={0}
                                                        aria-valuemax={100}
                                                        style={{ width: "10%" }}
                                                    ></div>
                                                </div>
                                                <div className="table-responsive mt-4">
                                                    <table className="table mb-0 table-borderless">
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-online mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Total</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Total_Service_Count_5}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-blue mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Active</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{ dashData?.data[0]?.Active_Service_Count_5}</span>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <div className="iq-profile-avatar status-primary mt-4"> </div>
                                                                </td>
                                                                <td>
                                                                    <h4>Expired</h4>
                                                                </td>
                                                                <td>
                                                                    <span className="text-muted">{dashData?.data[0]?.Expired_Service_Count_5}</span>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="row">

                                <div className="col-lg-4">
                                    <div className="iq-card iq-user-profile-block">
                                        <div className="iq-card-body">
                                            <div className="user-details-block">
                                                <div className="user-profile text-center">
                                                    <img
                                                        src="assets/images/user/11.png"
                                                        alt="profile-img"
                                                        className="avatar-130 img-fluid"
                                                    />
                                                </div>
                                                <div className="text-center mt-3">
                                                    <h4>
                                                        <b>Admin</b>
                                                    </h4>

                                                </div>
                                                <hr />
                                                <ul className="doctoe-sedual d-flex align-items-center justify-content-between p-0">
                                                    <h4>Total Revenue <span style={{marginLeft: "10px"}}>-</span></h4>
                                             
                                                    <h3 className="counter">{Data2.data1}</h3>
                                                </ul>
                                                <hr />
                                                <ul className="doctoe-sedual d-flex align-items-center justify-content-between p-0">
                                                    <h4>Total Clients <span style={{marginLeft: "28px"}}>-</span></h4>
                                                   
                                                    <h3 className="counter">{Data2.data}</h3>

                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="iq-card">
                                        <div className="iq-card-header d-flex justify-content-between">
                                            <div className="iq-header-title">
                                                <h4 className="card-title">Earning Per Day</h4>
                                            </div>
                                        </div>
                                        <AgChartsReact options={options} />

                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
            }

        </div>
    )
}

export default Dashboards
