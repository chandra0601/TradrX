import React, { useState, useEffect } from 'react';
import { get_User_Data } from '../../CommonAPI/Admin'
import { get_Trade_Report } from '../../CommonAPI/User'
import Loader from '../../../ExtraComponent/Loader'
import GridExample from '../../../ExtraComponent/CommanDataTable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { getColumns3, getColumns2, getColumns1, getColumns, getColumns4, getColumns5 , getColumns8 , getColumns7 , getColumns6 } from './ReportColumn'

const TradeReport = () => {
    const [selectStrategyType, setStrategyType] = useState('')
    const [tradeReport, setTradeReport] = useState('')
    const [selectedRowData, setSelectedRowData] = useState('');
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [showTable, setShowTable] = useState(false)

    const [getAllTradeData, setAllTradeData] = useState({
        loading: true,
        data1: [],
        data2: []
    })


    const Username = localStorage.getItem('name')


    // set Defult Date 
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate());
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}.${month}.${day}`;


    // from date
    const DefultToDate = new Date();

    DefultToDate.setDate(DefultToDate.getDate() + 1);
    const year1 = DefultToDate.getFullYear();
    const month1 = String(DefultToDate.getMonth() + 1).padStart(2, '0');
    const day1 = String(DefultToDate.getDate()).padStart(2, '0');
    const Defult_To_Date = `${year1}.${month1}.${day1}`;


    // Date Formetor
    const convertDateFormat = (date) => {
        if (date == '') {
            return ''
        }
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };



    const GetTradeReport = async () => {
        const data = { Data: selectStrategyType, Username: Username }

        //GET TRADE REPORT
        await get_User_Data(data)
            .then((response) => {
                if (response.Status) {
                    setTradeReport({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setTradeReport({
                        loading: false,
                        data: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })
    }
    useEffect(() => {
        GetTradeReport()
    }, [selectStrategyType])



    const handleRowSelect = (rowData) => {
        console.log("Row Data", rowData)
        setSelectedRowData(rowData);
    };


 

    const handleSubmit = async () => {
        const data = {
            MainStrategy: selectStrategyType,
            Strategy: selectStrategyType == "Scalping" ? selectedRowData && selectedRowData.ScalpType : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.STG : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TradePattern : '',
            Symbol: selectStrategyType == "Scalping" || selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Symbol : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.IName : '',
            Username: Username,
            ETPattern: selectStrategyType == "Scalping" ? '' : selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.Targettype : selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.Pattern : '',
            Timeframe: selectStrategyType == "Pattern" ? selectedRowData && selectedRowData.TimeFrame : '',
            From_date: convertDateFormat(FromDate == '' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate == '' ? Defult_To_Date : ToDate),
            Group: selectStrategyType == "Scalping" || selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.GroupN  : "",
            TradePattern: "",
            PatternName: ""
        }

        await get_Trade_Report(data)

            .then((response) => {
                if (response.Status) {
                    setAllTradeData({
                        loading: false,
                        data1: response.CloseData ? response.CloseData : [],
                        data2: response.OpenData ? response.OpenData : []
                    })
                    setShowTable(true)
                }
                else {
                    Swal.fire({
                        title: "No Records found",
                        icon: "info",
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setAllTradeData({
                        loading: false,
                        data1: [],
                        data2: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the All TradeData", err)
            })
    }
    useEffect(() => {
        setStrategyType('Scalping')
    }, []);


    useEffect(() => {
        setShowTable(false)
    }, [selectStrategyType, FromDate, ToDate, selectedRowData])


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Trade Report</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="was-validated ">
                                <div className='row'>

                                    <div className="form-group col-lg-4">
                                        <label>Select Strategy Type</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => setStrategyType(e.target.value)}
                                            value={selectStrategyType}>
                                            <option value={"Scalping"}>Scalping</option>
                                            <option value={"Option Strategy"}>Option Strategy</option>
                                            <option value={"Pattern"}>Pattern Script</option>

                                        </select>
                                    </div>
                                    <div className="form-group col-lg-4">
                                        <label>Select form Date</label>
                                        <DatePicker className="form-select" selected={FromDate == '' ? formattedDate : FromDate} onChange={(date) => setFromDate(date)} />

                                    </div>
                                    <div className="form-group col-lg-4">
                                        <label>Select To Date</label>
                                        <DatePicker className="form-select" selected={ToDate == '' ? Defult_To_Date : ToDate} onChange={(date) => setToDate(date)} />

                                    </div>
                                </div>
                            </div>
                            {
                                <div className="modal-body">
                                    <GridExample
                                        columns={selectStrategyType === "Scalping" ? getColumns() :
                                            selectStrategyType === "Option Strategy" ? getColumns1() :
                                                selectStrategyType === "Pattern" ? getColumns2() : getColumns()
                                        }
                                        data={tradeReport.data}
                                        onRowSelect={handleRowSelect}
                                        checkBox={true}
                                    />
                                </div>
                            }
                            <button className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>

                            {
                                showTable && <>
                                    <h4 className='mt-4 mb-2'>Open Trade</h4>
                                    <GridExample
                                        columns={selectStrategyType === "Scalping" ? getColumns3() :
                                            selectStrategyType === "Option Strategy" ? getColumns4() :
                                                selectStrategyType === "Pattern" ? getColumns5() : getColumns3()
                                        }
                                        data={getAllTradeData.data2}
                                        onRowSelect={handleRowSelect}
                                        checkBox={false}
                                    />
                                    <div className='mt-3'>
                                        <h4 className='mt-3 mb-2'>Close Trade</h4>
                                        <GridExample
                                            columns={selectStrategyType === "Scalping" ? getColumns6() :
                                                selectStrategyType === "Option Strategy" ? getColumns7() :
                                                    selectStrategyType === "Pattern" ? getColumns8() : getColumns6()
                                            }
                                            data={getAllTradeData.data1}
                                            onRowSelect={handleRowSelect}
                                            checkBox={false}
                                        />
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeReport;
