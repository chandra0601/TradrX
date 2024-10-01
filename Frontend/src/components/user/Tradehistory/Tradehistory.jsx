import React, { useState, useEffect } from 'react';
import { get_User_Data, get_Trade_History, get_PnL_Data, get_EQuityCurveData, get_DrapDownData, get_FiveMostProfitTrade, get_FiveMostLossTrade } from '../../CommonAPI/Admin'
import Loader from '../../../ExtraComponent/Loader'
import GridExample from '../../../ExtraComponent/CommanDataTable'
import { get_Trade_Data } from '../../CommonAPI/User'
import DatePicker from "react-datepicker";

import { AgChartsReact } from "ag-charts-react";
import "ag-charts-enterprise";
import ApexCharts from 'react-apexcharts';
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';
import { columns8, columns7, columns6, columns5, columns4, columns3, columns2, columns1, columns } from './TradeHistoryColumn'
const Tradehistory = () => {

    const [selectStrategyType, setStrategyType] = useState('')
    const [tradeHistory, setTradeHistory] = useState('')
    const [selectedRowData, setSelectedRowData] = useState('');
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [showTable, setShowTable] = useState(false)
    const [report, setReport] = useState({
        loading: true,
        data1: [],
        data2: []
    })


    const [getAllTradeData, setAllTradeData] = useState({
        loading: true,
        data: [],
        data1: "",
        data2: "",
        data3: "",
        data4: "",
        Overall: []
    })
    const [getPnLData, setPnlData] = useState({
        loading: true,
        data: [],
        data2: []
    })

    const [getEquityCurveDetails, setEquityCurveDetails] = useState({
        loading: true,
        data: []
    })
    const [getDropDownData, setDropDownData] = useState({
        loading: true,
        data: []
    })
    const [getFiveLossTrade, setFiveLossTrade] = useState({
        loading: true,
        data: [],
        data1: []
    })
    const [getFiveProfitTrade, setFiveProfitTrade] = useState({
        loading: true,
        data: [],
        data1: []
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


    const GetTradeHistory = async () => {
        const data = { Data: selectStrategyType, Username: Username }
        //GET TRADEHISTORY
        await get_User_Data(data)
            .then((response) => {
                if (response.Status) {

                    setTradeHistory({
                        loading: false,
                        data: response.Data
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



        //


    }
    useEffect(() => {
        GetTradeHistory()
    }, [selectStrategyType])






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
            From_date: convertDateFormat(FromDate == '' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate == '' ? Defult_To_Date : ToDate),

            Group: selectStrategyType == "Scalping" || selectStrategyType == "Option Strategy" ? selectedRowData && selectedRowData.GroupN : "",

            TradePattern: "",
            PatternName: ""
        }

        await get_Trade_History(data)

            .then((response) => {
                if (response.Status) {
                    setAllTradeData({
                        loading: false,
                        data: response.data,
                        data1: response.profitconsistant,
                        data2: response.profitconcount,
                        data3: response.lossconcount,
                        data4: response.lossconsistant,
                        Overall: response.Overall

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
                        data1: "",
                        data2: "",
                        data3: "",
                        data4: "",
                        Overall: []

                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the All TradeData", err)
            })



        //GET PNL DATA
        await get_PnL_Data(data)
            .then((response) => {
                if (response.Status) {
                    const newDataArray = response.Barchart.map(item => ({
                        PnL: item.PnL,
                        ETime: item.ETime.split(' ')[1].substring(0, 5)
                    }));


                    setPnlData({
                        loading: false,
                        data: newDataArray,
                        data2: response.Barchart,
                    })
                }
                else {
                    setPnlData({
                        loading: false,
                        data: [],
                        data2: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })


        //GET GetEquity CurveData
        await get_EQuityCurveData(data)
            .then((response) => {
                if (response.Status) {
                    setEquityCurveDetails({
                        loading: false,
                        data: response.Equitycurve,
                    })
                }
                else {
                    setEquityCurveDetails({
                        loading: false,
                        data: [],
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })

        //GET GetEquity CurveData
        await get_DrapDownData(data)
            .then((response) => {
                if (response.Status) {
                    setDropDownData({
                        loading: false,
                        data: response.Drawdown,
                    })
                }
                else {
                    setDropDownData({
                        loading: false,
                        data: [],
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })


        // GET 5 MONST PROFIT TRADE
        await get_FiveMostLossTrade(data)
            .then((response) => {
                if (response.Status) {
                    setFiveLossTrade({
                        loading: false,
                        data: response.fivelosstrade,
                        data1: response.fivelosstradeall,

                    })
                }
                else {
                    setFiveLossTrade({
                        loading: false,
                        data: [],
                        data1: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })

        await get_FiveMostProfitTrade(data)
            .then((response) => {
                if (response.Status) {
                    setFiveProfitTrade({
                        loading: false,
                        data: response.fiveprofittrade,
                        data1: response.fiveprofittradeall,
                    })
                }
                else {
                    setFiveProfitTrade({
                        loading: false,
                        data: [],
                        data1: [],

                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })


        // Get Trade Report 
        await get_Trade_Data(data)

            .then((response) => {
                if (response.Status) {
                    setReport({
                        loading: false,
                        data1: response.Data1,
                        data2: response.Data2
                    })

                }
                else {
                     
                    setReport({
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



    const chartOptions = {
        zoom: { enabled: true },
        data: getPnLData && getPnLData.data,
        series: [{ type: 'bar', xKey: 'ETime', yKey: 'PnL' }],
    }



    const chartOptions1 = {
        zoom: { enabled: true },
        data: getEquityCurveDetails && getEquityCurveDetails.data,
        series: [{ type: 'line', xKey: selectStrategyType == "Pattern" ? "ETime" : 'ExitTime', yKey: selectStrategyType == "Scalping" ? "EquityCurve" : 'PnL' }],
    }




    const chartOptions2 = {
        zoom: { enabled: true },
        data: getDropDownData && getDropDownData.data,
        series: [{ type: 'line', xKey: 'ETime', yKey: 'Drawdown' }],
    }




    const ETime = getFiveProfitTrade && getFiveProfitTrade.data.map(item => item.ETime);
    const PnL = getFiveProfitTrade && getFiveProfitTrade.data.map(item => item.PnL);

    const ETime1 = getFiveLossTrade && getFiveLossTrade.data.map(item => item.ETime);
    const PnL1 = getFiveLossTrade && getFiveLossTrade.data.map(item => item.PnL < 0 ? -1 * (item.PnL) : item.PnL);



    const options = {
        series: PnL,
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ETime,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };

    const options1 = {
        series: PnL1,
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: ETime1,
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    };



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
                                <h4 className="card-title">Trade History</h4>
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
                                    <div className="form-group col-lg-4 ">
                                        <label>Select form Date</label>
                                        <DatePicker className="form-select" selected={FromDate == '' ? formattedDate : FromDate} onChange={(date) => setFromDate(date)} />

                                    </div>
                                    <div className="form-group col-lg-4">
                                        <label>Select To Date</label>
                                        <DatePicker className="form-select custom-date" selected={ToDate == '' ? Defult_To_Date : ToDate} onChange={(date) => setToDate(date)} />

                                    </div>
                                </div>
                            </div>
                            {
                                <div className="modal-body">
                                    <GridExample
                                        columns={selectStrategyType === "Scalping" ? columns() :
                                            selectStrategyType === "Option Strategy" ? columns1() :
                                                selectStrategyType === "Pattern" ? columns2() : columns()
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
 
                                    <div>
                                        {/* <p className='bold mt-4' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                            Total Profit and Loss : <span style={{ color: getAllTradeData && getAllTradeData.Overall[0].PnL < 0 ? 'red' : 'green' }}>{getAllTradeData && parseFloat(getAllTradeData.Overall[0].PnL).toFixed(4)}</span>
                                        </p> */}

                                         <p className='bold mt-4' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                            Total Profit and Loss : <span style={{ color: getAllTradeData && getAllTradeData.Overall[0].PnL < 0 ? 'red' : 'green' }}>{getAllTradeData && getAllTradeData.Overall[0].PnL}</span>
                                        </p>


                                        

                                    </div>
                                    <div className='mt-3'>
                                        <GridExample
                                            columns={columns3(selectStrategyType)}
                                            data={getAllTradeData.data}
                                            onRowSelect={handleRowSelect}
                                            checkBox={false}
                                        />
                                    </div>
                                   


                                    {/* EquityCurve  Graph show */}
                                    <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                        Drawdown Graph
                                    </p>
                                    <div style={{ width: '100%', height: '500px' }}>
                                        <AgChartsReact options={chartOptions2} />
                                    </div>

 
                                    <div className='mb-3 mt-3'>
                                    <div className="accordion" id="accordionExample">
                                        <div class="accordion-item">
                                            <h2 class="accordion-header" id="headingTwo">
                                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" style={{fontWeight: 'bold'}}>
                                                    Drawdown Table
                                                </button>

                                            </h2>
                                            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                <div class="accordion-body">
                                                    <GridExample
                                                        columns={columns6()}
                                                        data={getDropDownData.data}
                                                        onRowSelect={handleRowSelect}
                                                        checkBox={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>





                                    {/* PnL Graph Table */}
                                    {/* <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                        Profit and Loss Table
                                    </p>
                                    <div className=''>
                                        <GridExample
                                            columns={columns4()}
                                            data={getPnLData.data2}
                                            onRowSelect={handleRowSelect}
                                            checkBox={false}
                                        />
                                    </div> */}




                                    {/* cp */}

                                    <div className='mt-3'>
                                        <GridExample
                                            columns={columns7()}
                                            data={report.data1}
                                            onRowSelect={handleRowSelect}
                                            checkBox={false}
                                        />
                                    </div>



                                    <div className='mt-3'>
                                        <GridExample
                                            columns={columns8()}
                                            data={report.data2}
                                            onRowSelect={handleRowSelect}
                                            checkBox={false}
                                        />
                                    </div>





                                    {/* PnL Graph show */}
                                    <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                        Profit and Loss Graph
                                    </p>
                                    <div style={{ width: '100%', height: '500px' }}>
                                        <AgChartsReact options={chartOptions} />
                                    </div>

                                    {/* 5 Most profit and loss graph */}

                                    <div className='d-flex'>
                                        <div id="chart" style={{ width: '50%', height: '300px' }}>

                                            <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                5 most Profit Trade
                                            </p>
                                            <ApexCharts
                                                options={options}
                                                series={options.series}
                                                type="pie"
                                                width={options.chart.width}
                                            />
                                        </div>
                                        <div id="chart" style={{ width: '50%', height: '300px' }}>
                                            <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                                5 most Loss Trade
                                            </p>
                                            <ApexCharts
                                                options={options1}
                                                series={options1.series}
                                                type="pie"
                                                width={options1.chart.width}
                                            />
                                        </div>

                                    </div>

                                    {/*  Consistent Loss & Profit-Making Trades: */}
                                    <div>
                                        <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                            Consistent Loss & Profit-Making Trades:
                                        </p>
                                    </div>

                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            {/* <p>Consistant Profit : <spam>{parseFloat(getAllTradeData.data1).toFixed(4)}</spam></p>
                                            <p>Count Consistant Profit : <spam>{parseFloat(getAllTradeData.data2).toFixed(4)}</spam></p> */}

                                            <p>Consistant Profit : <spam>{getAllTradeData.data1}</spam></p>
                                            <p>Count Consistant Profit : <spam>{getAllTradeData.data2}</spam></p>

                                        </div>
                                        <div className='col-lg-6'>
                                            {/* <p>Consistant Loss : <spam>{parseFloat(getAllTradeData.data4).toFixed(4)}</spam></p>
                                            <p>Count Consistant Loss : <spam>{parseFloat(getAllTradeData.data3).toFixed(4)}</spam></p> */}

                                            <p>Consistant Loss : <spam>{getAllTradeData.data4}</spam></p>
                                            <p>Count Consistant Loss : <spam>{getAllTradeData.data3}</spam></p>

                                        </div>

                                    </div>

                                    
                                    {/* EquityCurve */}

                                    {/* <div>
                                        <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                            EquityCurve
                                        </p>

                                        <GridExample
                                            columns={columns5(selectStrategyType)}
                                            data={getEquityCurveDetails.data}
                                            onRowSelect={handleRowSelect}
                                            checkBox={false}
                                        />
                                    </div> */}


                                    {/* EquityCurve  Graph show */}
                                    <p className='bold mt-3' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                        EquityCurve
                                    </p>
                                    <div style={{ width: '100%', height: '500px' }}>
                                        <AgChartsReact options={chartOptions1} />
                                    </div>

                                    <div>
                                        <div className="accordion" id="accordionExample">
                                            <div class="accordion-item">
                                                <h2 class="accordion-header" id="headingTwo">
                                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" style={{fontWeight: 'bold'}}>
                                                        Equity Curve Table
                                                    </button>
                                                </h2>
                                                <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                                    <div class="accordion-body">
                                                        <GridExample
                                                            columns={columns5(selectStrategyType)}
                                                            data={getEquityCurveDetails.data}
                                                            onRowSelect={handleRowSelect}
                                                            checkBox={false}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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

export default Tradehistory;
