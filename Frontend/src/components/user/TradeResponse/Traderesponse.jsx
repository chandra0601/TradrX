import React, { useState, useEffect } from 'react';
import { get_User_Data } from '../../CommonAPI/Admin'
import { get_Trade_Response } from '../../CommonAPI/User'
import Loader from '../../../ExtraComponent/Loader'
import GridExample from '../../../ExtraComponent/CommanDataTable'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import {columns3 , columns2 ,columns1 , columns , columns5 , columns4} from './TradeReponseColumn'
const TradeResponse = () => {
    const [selectStrategyType, setStrategyType] = useState('')
    const [tradeHistory, setTradeHistory] = useState({
        loading : true,
        data:[]
    })
    const [selectedRowData, setSelectedRowData] = useState('');
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [showTable, setShowTable] = useState(false)

    const [getAllTradeData, setAllTradeData] = useState({
        loading: true,
        data: [],

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
  
      DefultToDate.setDate(DefultToDate.getDate()+1);
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



    const GetTradeResposne = async () => {
        const data = { Data: selectStrategyType, Username: Username }

        //GET TRADEHISTORY
        await get_User_Data(data)
            .then((response) => {
                if (response.Status) {
                    
                    const filterLiveTrade = response.Data.filter((item) => {
                        return item.TradeExecution == 'Live Trade'
                    })

                    setTradeHistory({
                        loading: false,
                        data: filterLiveTrade
                    })
                }
                else {
                    setTradeHistory({
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
        GetTradeResposne()
    }, [selectStrategyType , FromDate , ToDate])


 

    const handleRowSelect = (rowData) => {
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
            From_date: convertDateFormat(FromDate=='' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate=='' ? Defult_To_Date : ToDate),
            Group: selectStrategyType == "Scalping" || selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.GroupN  : "",
            TradePattern: "",
            PatternName: ""
        }

        await get_Trade_Response(data)

            .then((response) => {
                if (response.Status) {
                    setAllTradeData({
                        loading: false,
                        data: response.Data,

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
                        data: [],
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


    useEffect(()=>{
        setShowTable(false)
    },[selectStrategyType , FromDate , ToDate , selectedRowData])


    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Trade Response</h4>
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
                                        <DatePicker className="form-select" selected={FromDate=='' ? formattedDate : FromDate} onChange={(date) => setFromDate(date)} />
                                    </div>
                                    <div className="form-group col-lg-4">
                                        <label>Select To Date</label>
                                        <DatePicker className="form-select" selected={ToDate=='' ? Defult_To_Date : ToDate } onChange={(date) => setToDate(date)} />

                                    </div>
                                </div>
                            </div>
                            {
                                <div className="modal-body">
                                    <GridExample
                                        columns={selectStrategyType === "Scalping" ? columns :
                                            selectStrategyType === "Option Strategy" ? columns1 :
                                                selectStrategyType === "Pattern" ? columns2 : columns
                                        }
                                        data={tradeHistory.data}
                                        onRowSelect={handleRowSelect}
                                        checkBox={true}
                                    />
                                </div>
                            }
                            <button className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>

                            {
                                showTable && <>
                                    <div className='mt-3'>
                                        <GridExample
                                            columns={selectStrategyType === "Scalping" ? columns3 : selectStrategyType === "Option Strategy" ? columns4 : columns5}
                                            data={getAllTradeData.data}
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

export default TradeResponse;
