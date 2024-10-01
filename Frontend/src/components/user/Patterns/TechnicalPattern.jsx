import React, { useEffect, useState } from 'react';
import { Get_Pattern_Time_Frame, Get_Pattern_Name, Get_Pattern_Charting } from '../../CommonAPI/Admin';
import { AvailableScript, GetSymbolIp, ChartPatternAPI, Candlestick_Pattern, GetSingleChart } from '../../CommonAPI/User';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { columns, columns1 } from './PatternsColumns';
import "ag-charts-enterprise";
import AgChartsReact from "./TechnicalPatternCandle";

const LastPattern = () => {
    const Username = localStorage.getItem('name');
    const [selectedPatternType, setSelectedPatternType] = useState('Candlestick Patterns');
    const [selectedRowData, setSelectedRowData] = useState('');
    const [scriptType, setScriptType] = useState('');
    const [candlestickPattern, setCandlestickPattern] = useState('');
    const [selectedTimeFrame, setSelectedTimeFrame] = useState('');
    const [chartPattern, setChartPattern] = useState('');
    const [patternNames, setPatternNames] = useState([]);
    const [allSymbols, setAllSymbols] = useState([]);
    const [showCandle, setShowCandle] = useState(false);
    const [availableScripts, setAvailableScripts] = useState([]);
    const [getCandlestickTable, setCandlestickTable] = useState({ loading: true, data1: [], data2: [] });
    const [ChartPatternTableData, setChartPatternTableData] = useState({ loading: true, PatternData: [], CandleData: [] });
    const [timeFrameData, setTimeFrameData] = useState({ loading: true, data: [] });
    const [getSingleChartImg, setSingleChartImg] = useState({ loading: true, data: "" });
    const [chartingPatternNames, setChartingPatternNames] = useState({ loading: true, data: [] });
    const [chartingPattern, setChartingPattern] = useState('');

    useEffect(() => {
        fetchAllSymbols();
        fetchAvailableScripts();
    }, [selectedPatternType, scriptType]);

    useEffect(() => {
        fetchPatternTimeFrames();
        fetchPatternNames();
        fetchChartingPatternNames();
    }, []);

    useEffect(() => {
        GetSingleChartPattern()
    }, [candlestickPattern]);

    useEffect(() => {
        fetchChartingData();
    }, [selectedPatternType, scriptType, selectedTimeFrame, chartPattern,chartingPattern, candlestickPattern]);

    useEffect(() => {
        setShowCandle(false);
    }, [selectedPatternType, candlestickPattern, scriptType, chartingPattern, selectedTimeFrame, chartPattern]);

    const handleRowSelect = (rowData) => {
        setSelectedRowData(rowData);
    };

    const fetchAvailableScripts = async () => {
        try {
            const response = await AvailableScript();
            setAvailableScripts(response.Status ? response.Symbol : []);
        } catch (err) {
            console.error("Error in fetching available scripts", err);
        }
    };

    const fetchAllSymbols = async () => {
        try {
            const data = { Username, Strategy: selectedPatternType === "Candlestick Patterns" ? "CandlestickPattern" : "ChartingPattern" };
            const response = await GetSymbolIp(data);
            setAllSymbols(response.Status ? response.Data : []);
        } catch (err) {
            console.error("Error in fetching symbols", err);
        }
    };

    const fetchPatternTimeFrames = async () => {
        try {
            const response = await Get_Pattern_Time_Frame();
            setTimeFrameData({ loading: false, data: response });
        } catch (err) {
            console.error("Error in fetching time frames", err);
        }
    };

    const fetchPatternNames = async () => {
        try {
            const response = await Get_Pattern_Name();
            setPatternNames({ loading: false, data: response.Status ? response.PatternName : [] });
        } catch (err) {
            console.error("Error in fetching pattern names", err);
        }
    };

    const fetchChartingPatternNames = async () => {
        try {
            const response = await Get_Pattern_Charting();
            setChartingPatternNames({ loading: false, data: response.Status ? response.PatternName : [] });
        } catch (err) {
            console.error("Error in fetching pattern names", err);
        }
    };

    const fetchChartingData = async () => {
        try {
            if (scriptType && selectedTimeFrame && chartPattern && chartingPattern) {
                const data = { Script: scriptType, TimeFrame: selectedTimeFrame, Username, Symbol: chartPattern, Patternname: chartingPattern };
                const response = await ChartPatternAPI(data);
                setChartPatternTableData({
                    loading: false,
                    CandleData: response.Status ? response?.Data?.CandleData : [],
                    PatternData: response.Status ? response?.Data?.PatternData : []
                });
                setShowCandle(response.Status);
            }

            if (candlestickPattern && selectedTimeFrame && chartPattern) {
                const data = { PatternName: candlestickPattern, TimeFrame: selectedTimeFrame, Username, Symbol: chartPattern };
                const response = await Candlestick_Pattern(data);
                setCandlestickTable({
                    loading: false,
                    data1: response.Status ? response.Data.CandleData : [],
                    data2: response.Status ? response.Data.PatternData : []
                });
                setShowCandle(response.Status);
            }
        } catch (err) {
            console.error("Error in fetching data:", err);
        }
    };

    const GetSingleChartPattern = async () => {
        const data = { patternName: candlestickPattern };
        await GetSingleChart(data)
            .then((response) => {
                if (response.status) {
                    setSingleChartImg({ loading: false, data: response.image_data });
                }
                else {
                    setSingleChartImg({ loading: false, data: [] });
                }
            })
            .catch((err) => {
                console.error("Error in fetching single chart image", err);
            });
    }

    useEffect(() => {
        setCandlestickPattern('');
        setChartingPattern('');
        setScriptType('');
        setSelectedTimeFrame('');
        setChartPattern('');
        setSelectedRowData('');
    }, [selectedPatternType]);


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">Technical Pattern</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div className="row">
                                <div className={`col-md-3`}>
                                    <div className="form-group">
                                        <label>Select Technical pattern</label>
                                        <select className="form-control form-control-lg mt-2"
                                            onChange={(e) => setSelectedPatternType(e.target.value)}
                                            value={selectedPatternType}>
                                            <option value="Candlestick Patterns" selected>Candlestick Patterns</option>
                                            <option value="Charting Patterns">Charting Patterns</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={`col-md-3`}>
                                    <div className="form-group">
                                        {selectedPatternType === "Candlestick Patterns" ? (
                                            <>
                                                <label>Pattern</label>
                                                <select className="form-control form-control-lg mt-2"
                                                    onChange={(e) => setCandlestickPattern(e.target.value)} value={candlestickPattern}>
                                                    <option value="">Please Select Pattern</option>
                                                    {patternNames.data && patternNames.data.map((item) => (
                                                        <option value={item} key={item}>{item}</option>
                                                    ))}
                                                </select>
                                            </>
                                        ) :
                                            (
                                                <>
                                                    <label>Pattern</label>
                                                    <select className="form-control form-control-lg mt-2" onChange={(e) => setChartingPattern(e.target.value)} value={chartingPattern}>
                                                        <option value="">Please Select Pattern</option>
                                                        {chartingPatternNames.data.map((item) => (
                                                            <option value={item} key={item}>{item}</option>
                                                        ))}
                                                    </select>
                                                </>
                                            )
                                        }
                                    </div>
                                </div>

                                {
                                    selectedPatternType === "Candlestick Patterns" ? "" : (
                                        <div className={`${selectedPatternType == "Charting Patterns" ? "col-md-2" : "col-md-3"}`}>
                                            <div className="form-group">
                                                <label>Script</label>
                                                <select className="form-control form-control-lg mt-2" onChange={(e) => setScriptType(e.target.value)} value={scriptType}>
                                                    <option value="">Please Select Script</option>
                                                    <option value="AvailableScript">Available Script</option>
                                                    <option value="MyScript">My Script</option>
                                                </select>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className={`${selectedPatternType == "Charting Patterns" ? "col-md-2" : "col-md-3"}`}>
                                    <div className="form-group">
                                        <label>Time Frame</label>
                                        <select className="form-control form-control-lg mt-2" onChange={(e) => setSelectedTimeFrame(e.target.value)} value={selectedTimeFrame}>
                                            <option value="">Please Select Time Frame</option>
                                            {timeFrameData.data.map((item) => (
                                                <option value={item} key={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={`${selectedPatternType == "Charting Patterns" ? "col-md-2" : "col-md-3"}`}>
                                    <div className="form-group">
                                        <label>Select Specific Pattern</label>
                                        <select className="form-control form-control-lg mt-2" onChange={(e) => setChartPattern(e.target.value)} value={chartPattern}>
                                            {allSymbols.length === 0 ? <option value="">No Pattern Script Subscribed</option> : <option value="">Please Select Specific Script</option>}
                                            {allSymbols.map((item) => (
                                                <option value={item} key={item}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center'>
                            {
                                getSingleChartImg.data == "" ? "" : <div className=''>{<img src={`data:image/png;base64,${getSingleChartImg?.data}`} className='api_img' alt="Panel Front Image" style={{ width: '350px', height: '350px' }} />}</div>
                            }
                        </div>




                        <div className="table-responsive">
                            {selectedPatternType === 'Candlestick Patterns' ? (
                                <FullDataTable columns={columns1()} data={getCandlestickTable.data2} checkBox={false} />
                            ) : (
                                <FullDataTable columns={columns()} data={ChartPatternTableData.PatternData} onRowSelect={handleRowSelect} checkBox={true} />
                            )}
                        </div>
                        {showCandle && (
                            <div className="row">
                                <div className="">
                                    {(!getCandlestickTable.loading || !ChartPatternTableData.loading) && (
                                        <div className='shadow p-3 bg-white rounded m-4'>
                                            {selectedPatternType === 'Candlestick Patterns' ? (

                                                <AgChartsReact ChartData={getCandlestickTable && getCandlestickTable.data1} timeFrame={selectedTimeFrame} />
                                            ) : (
                                                <AgChartsReact ChartData={ChartPatternTableData?.CandleData} timeFrame={selectedTimeFrame} />
                                            )
                                            }
                                            {/* <AgChartsReact ChartData={getCandlestickTable && getCandlestickTable.data1} type={'technicalPattern'} timeFrame={selectedTimeFrame}/> */}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LastPattern;
