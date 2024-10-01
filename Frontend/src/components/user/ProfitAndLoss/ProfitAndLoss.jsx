import React, { useState, useEffect } from 'react';
import { getNetPnLData } from '../../CommonAPI/User'
import Loader from '../../../ExtraComponent/Loader'
import GridExample from '../../../ExtraComponent/CommanDataTable'
import DatePicker from "react-datepicker";
import { columns, columns1, columns2, columns3, columns4, columns5 } from './PnLColumn'
import Swal from 'sweetalert2';

const Tradehistory = () => {

    const [selectStrategyType, setStrategyType] = useState('')
    const [ToDate, setToDate] = useState('');
    const [FromDate, setFromDate] = useState('');
    const [showTable, setShowTable] = useState(false)

    const [getPnLData, setPnlData] = useState({
        loading: true,
        data: [],
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







    const handleSubmit = async () => {

        const data = {
            MainStrategy: selectStrategyType,
            Username: Username,
            From_date: convertDateFormat(FromDate == '' ? formattedDate : FromDate),
            To_date: convertDateFormat(ToDate == '' ? Defult_To_Date : ToDate),
        }


        //GET PNL DATA
        await getNetPnLData(data)
            .then((response) => {
                if (response.Status) {
                    Swal.fire({
                        title: "Success",
                        icon: "success",
                        text: response.message,
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setPnlData({
                        loading: false,
                        data: response.data,
                        data1: response.Overall,
                        data2: response.TotalPnL
                    })
                    setShowTable(true)
                }
                else {
                    Swal.fire({
                        title: "No Records found",
                        icon: "info",
                        text: response.message,
                        timer: 1500,
                        timerProgressBar: true
                    });
                    setPnlData({
                        loading: false,
                        data: [],
                        data1: [],
                        data2: []

                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding the user data", err)
            })
    }

    useEffect(() => {

        setStrategyType('Scalping')
    }, []);

    useEffect(() => {
        setShowTable(false)
    }, [selectStrategyType, FromDate, ToDate])

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Net P&L</h4>
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

                            <button className='btn btn-primary mt-2' onClick={handleSubmit}>Submit</button>

                            {
                                showTable && <>

                                    <div className='mt-3'>
                                        <GridExample
                                            columns={selectStrategyType == 'Scalping' ? columns1() : selectStrategyType == 'Pattern' ? columns3() : columns5()}
                                            data={getPnLData.data1}
                                            checkBox={false}
                                        />
                                    </div>

                                    <div>
                                        {/* <p className='bold mt-4' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                            Total Profit and Loss : <span style={{ color: getPnLData.data2 < 0 ? 'red' : 'green' }}>{parseFloat(getPnLData.data2).toFixed(4)}</span>
                                        </p> */}

                                        <p className='bold mt-4' style={{ fontWeight: 'bold', fontSize: '20px', color: 'black' }}>
                                            Total Profit and Loss : <span style={{ color: getPnLData.data2 < 0 ? 'red' : 'green' }}>{getPnLData.data2}</span>
                                        </p>

                                    </div>
                                    <div className='mt-3'>
                                        <GridExample
                                            columns={selectStrategyType == 'Scalping' ? columns() : selectStrategyType == 'Pattern' ? columns2() : columns4()}
                                            data={getPnLData.data}
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

export default Tradehistory;
