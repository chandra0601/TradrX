import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { GetAllUserScript, DeleteUserScript, Discontinue, Continue, UpdateUserScript } from '../../CommonAPI/User';
import Loader from '../../../ExtraComponent/Loader';
import { getColumns3, getColumns4, getColumns5 } from './Columns';
import Swal from 'sweetalert2';
import Formikform from "../../../ExtraComponent/FormData";
import { useFormik } from 'formik';

const Coptyscript = ({ data, selectedType, data2 }) => {
    const userName = localStorage.getItem('name')


    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false)
    const [getAllService, setAllservice] = useState({
        loading: true,
        ScalpingData: [],
        OptionData: [],
        PatternData: [],
        PatternOption: [],
        Marketwise: [],
        PremiumRotation: []
    });
    const [showEditModal, setShowEditModal] = useState(false)
    const [EditDataScalping, setEditDataScalping] = useState({})
    const [EditDataOption, setEditDataOption] = useState({})
    const [EditDataPattern, setEditDataPattern] = useState({})


    console.log("EditDataOption", EditDataOption)
    const SweentAlertFun = (text) => {
        Swal.fire({
            title: "Error",
            text: text,
            icon: "error",
            timer: 10000,
            timerProgressBar: true
        });
    }


    const handleDelete = async (rowData) => {
        const index = rowData.rowIndex
        const req =
            data == 'Scalping' ?
                {
                    Username: userName,
                    MainStrategy: data,
                    Strategy: getAllService.ScalpingData[index].ScalpType,
                    Symbol: getAllService.ScalpingData[index].Symbol,
                    ETPattern: "",
                    Timeframe: "",
                    TType: "",
                    Group: getAllService.ScalpingData[index].GroupN,
                    TradePattern: "",
                    TSymbol: "",
                    PatternName: ""
                } : data == 'Option Strategy' ?
                    {
                        MainStrategy: data,
                        Strategy: getAllService.OptionData[index].STG,
                        Symbol: getAllService.OptionData[index].MainSymbol,
                        Username: userName,
                        ETPattern: getAllService.OptionData[index].Targettype,
                        Timeframe: "",
                        TType: "",
                        Group: getAllService.OptionData[index].GroupN,
                        TSymbol: "",
                        TradePattern: "",
                        PatternName: ""
                    }
                    : data == 'Pattern' ?
                        {

                            MainStrategy: data,
                            Strategy: getAllService.PatternData[index].TradePattern,
                            Symbol: getAllService.PatternData[index].Symbol,
                            Username: userName,
                            ETPattern: getAllService.PatternData[index].Pattern,
                            Timeframe: getAllService.PatternData[index].TimeFrame,
                            TType: getAllService.PatternData[index].TType,
                            Group: "",
                            TSymbol: "",
                            TradePattern: "",
                            PatternName: ""

                        } : ''

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await DeleteUserScript(req)
                    .then((response) => {
                        if (response.Status) {
                            Swal.fire({
                                title: "Square off Successfully!",
                                text:  response.message,
                                icon: "success",
                                timer: 1500,
                                timerProgressBar: true,
                                didClose: () => {
                                    setRefresh(!refresh);
                                }
                            });
                            setTimeout(()=>{
                                window.location.reload()
                            },1500)
                        } else {
                            Swal.fire({
                                title: "Error !",
                                text:  response.message,
                                icon: "error",
                                timer: 1500,
                                timerProgressBar: true
                            });
                        }

                    })
                    .catch((err) => {
                        console.log("Error in delete script", err)
                    })
            }
        });

    }


    const handleEdit = async (rowData) => {
        setShowEditModal(true)
        const index = rowData.rowIndex
        if (data == 'Scalping') {
            setEditDataScalping(getAllService.ScalpingData[index])
        }
        else if (data == 'Option Strategy') {
            setEditDataOption(getAllService.OptionData[index])
        }
        else if (data == 'Pattern') {
            setEditDataPattern(getAllService.PatternData[index])
        }
        else {
            setEditDataPattern(getAllService.PatternData[index])
        }
    }


    const HandleContinueDiscontinue = async (rowData) => {
        const index = rowData.rowIndex
        let trading;

        if (data == 'Scalping') {
            trading = getAllService.ScalpingData[index].Trading
        }
        else if (data == 'Pattern') {
            trading = getAllService.PatternData[index].Trading
        }
        else {
            trading = getAllService.OptionData[index].Trading
        }

        if (trading) {
            Swal.fire({
                title: "Do you want to Discontinue",
                text: "You won't be able to revert this!",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const req =
                        data == 'Scalping' ?
                            {
                                Username: userName,
                                MainStrategy: data,
                                Strategy: getAllService.ScalpingData[index].ScalpType,
                                Symbol: getAllService.ScalpingData[index].Symbol,
                                ETPattern: "",
                                Timeframe: "",
                                TType: "",
                                Group: getAllService.ScalpingData[index].GroupN,
                                TradePattern: "",
                                TSymbol: "",
                                PatternName: ""
                            } : data == 'Option Strategy' ?
                                {
                                    MainStrategy: data,
                                    Strategy: getAllService.OptionData[index].STG,
                                    Symbol: getAllService.OptionData[index].MainSymbol,
                                    Username: userName,
                                    ETPattern: getAllService.OptionData[index].Targettype,
                                    Timeframe: "",
                                    TType: "",
                                    Group: getAllService.OptionData[index].GroupN,
                                    TSymbol: "",
                                    TradePattern: "",
                                    PatternName: ""
                                }
                                : data == 'Pattern' ?
                                    {

                                        MainStrategy: data,
                                        Strategy: getAllService.PatternData[index].TradePattern,
                                        Symbol: getAllService.PatternData[index].Symbol,
                                        Username: userName,
                                        ETPattern: getAllService.PatternData[index].Pattern,
                                        Timeframe: getAllService.PatternData[index].TimeFrame,
                                        TType: getAllService.PatternData[index].TType,
                                        Group: "",
                                        TSymbol: "",
                                        TradePattern: "",
                                        PatternName: ""

                                    } : ''
                    await Discontinue(req)
                        .then((response) => {
                            if (response.Status) {
                                Swal.fire({
                                    title: "Success",
                                    text:  response.message,
                                    icon: "success",
                                    timer: 2000,
                                    timerProgressBar: true
                                });
                                setRefresh(!refresh)
                            }
                            else {
                                Swal.fire({
                                    title: "Error !",
                                    text:  response.message,
                                    icon: "error",
                                    timer: 2000,
                                    timerProgressBar: true
                                });
                            }
                        })
                        .catch((err) => {
                            console.log("Error in delete script", err)
                        })
                }
            })
        }
        else {
            {

                Swal.fire({
                    title: "Do you want to Continue",
                    text: "You won't be able to revert this!",
                    icon: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes"
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const req =
                            data == 'Scalping' ?
                                {
                                    Username: userName,
                                    MainStrategy: data,
                                    Strategy: getAllService.ScalpingData[index].ScalpType,
                                    Symbol: getAllService.ScalpingData[index].Symbol,
                                    ETPattern: "",
                                    Timeframe: "",
                                    TType: "",
                                    Group: getAllService.ScalpingData[index].GroupN,
                                    TradePattern: "",
                                    TSymbol: "",
                                    PatternName: ""
                                } : data == 'Option Strategy' ?
                                    {
                                        MainStrategy: data,
                                        Strategy: getAllService.OptionData[index].STG,
                                        Symbol: getAllService.OptionData[index].MainSymbol,
                                        Username: userName,
                                        ETPattern: getAllService.OptionData[index].Targettype,
                                        Timeframe: "",
                                        TType: "",
                                        Group: getAllService.OptionData[index].GroupN,
                                        TSymbol: "",
                                        TradePattern: "",
                                        PatternName: ""
                                    }
                                    : data == 'Pattern' ?
                                        {

                                            MainStrategy: data,
                                            Strategy: getAllService.PatternData[index].TradePattern,
                                            Symbol: getAllService.PatternData[index].Symbol,
                                            Username: userName,
                                            ETPattern: getAllService.PatternData[index].Pattern,
                                            Timeframe: getAllService.PatternData[index].TimeFrame,
                                            TType: getAllService.PatternData[index].TType,
                                            Group: "",
                                            TSymbol: "",
                                            TradePattern: "",
                                            PatternName: ""

                                        } : ''


                        await Continue(req)
                            .then((response) => {
                                if (response.Status) {
                                    setRefresh(!refresh)
                                    Swal.fire({
                                        title: "Success",
                                        text:  response.message,
                                        icon: "success",
                                        timer: 1500,
                                        timerProgressBar: true
                                    });
                                }
                                else {
                                    Swal.fire({
                                        title: "Error !",
                                        text: response.message,
                                        icon: 'error',
                                        timer: 1500,
                                        timerProgressBar: true
                                    });
                                }
                            })
                            .catch((err) => {
                                console.log("Error in delete script", err)
                            })
                    }
                })
            }

        }


    }

    const AddScript = (data) => {
        if (data2.status == false) {
            Swal.fire({
                title: "Error",
                text: data2.msg,
                icon: "error",
                timer: 1500,
                timerProgressBar: true
            });

        }
        else {

            if (data === "Option Strategy") {
                navigate('/user/newscript/option', { state: { data: { selectStrategyType: 'Option Strategy' } } });
            } else if (data === "Pattern") {
                navigate('/user/newscript/pattern', { state: { data: { selectStrategyType: 'Pattern' } } });
            } else {
                navigate('/user/newscript/scalping', { state: { data: { selectStrategyType: 'Scalping' } } });
            }
        }

    }

    const GetAllUserScriptDetails = async () => {
        const data = { userName: userName };

        await GetAllUserScript(data)
            .then((response) => {
                if (response.Status) {
                    setAllservice({
                        loading: false,
                        ScalpingData: response.Scalping,
                        OptionData: response.Option,
                        PatternData: response.Pattern,
                        PatternOption: response.PatternOption,
                        Marketwise: response.Marketwise,
                        PremiumRotation: response.PremiumRotation

                    });
                } else {
                    setAllservice({
                        loading: false,
                        ScalpingData: [],
                        OptionData: [],
                        PatternData: [],
                        PatternOption: [],
                        Marketwise: [],
                        PremiumRotation: []
                    });
                }
            })
            .catch((err) => {
                console.log("Error in finding group service", err);
            });
    }

    useEffect(() => {
        GetAllUserScriptDetails();
    }, [selectedType, refresh, showEditModal]);


    const formik = useFormik({
        initialValues: {
            TStype: "",
            Quantity: 0,
            Targetvalue: 0.0,
            Slvalue: 0,
            EntryPrice: 0,
            EntryRange: 0,
            LowerRange: 0.0,
            HigherRange: 0.0,
            HoldExit: "Hold",
            EntryTime: "",
            ExitTime: "",
            TradeCount: 0
        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (values.TStype == "" && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.TStype = "Please select Measurement Type";
            }
            if (!values.Quantity || values.Quantity == 0) {
                errors.Quantity = "Please enter Quantity";
            }
            if (values.Targetvalue == 0.0 || !values.Targetvalue) {
                errors.Targetvalue = "Please enter Target value";
            }
            if (values.Slvalue == 0 || !values.Slvalue) {
                errors.Slvalue = "Please enter SL value";
            }
            if (!values.EntryPrice && values.EntryPrice != 0 && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.EntryPrice = "Please enter Entry Price";
            }
            if (!values.EntryRange && values.EntryRange != 0 && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.EntryRange = "Please enter Entry Range";
            }
            if (!values.LowerRange && values.LowerRange != 0) {
                errors.LowerRange = "Please enter Lower Range";
            }
            if (!values.HigherRange && values.HigherRange != 0) {
                errors.HigherRange = "Please enter Higher Range";
            }
            if (values.HoldExit == "" && showEditModal && EditDataScalping.ScalpType != "Fixed Price") {
                errors.HoldExit = "Please select Hold/Exit";
            }

            if (values.ExitTime == '') {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (values.EntryTime == '') {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }
            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                Strategy: EditDataScalping.ScalpType,
                Symbol: EditDataScalping.Symbol,
                Username: userName,
                MainStrategy: data,
                ETPattern: "",
                Timeframe: "",
                Targetvalue: Number(values.Targetvalue),
                Slvalue: Number(values.Slvalue),
                TStype: EditDataScalping.ScalpType != "Fixed Price" ? values.TStype : EditDataScalping.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: Number(values.LowerRange),
                HigherRange: Number(values.HigherRange),
                HoldExit: showEditModal && EditDataScalping.ScalpType != "Fixed Price" ? EditDataScalping.HoldExit : values.HoldExit,
                EntryPrice: Number(values.EntryPrice),
                EntryRange: Number(values.EntryRange),
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataScalping.ExitDay,
                TradeExecution: EditDataScalping.TradeExecution,
                Group: EditDataScalping.GroupN,
                CEDepthLower: 0.0,
                CEDepthHigher: 0.0,
                PEDepthLower: 0.0,
                PEDepthHigher: 0.0,
                CEDeepLower: 0.0,
                CEDeepHigher: 0.0,
                PEDeepLower: 0.0,
                PEDeepHigher: 0.0,
                DepthofStrike: 0,
                TradeCount: values.TradeCount

            }
            if (Number(values.EntryPrice) > 0 && Number(values.EntryRange) && (Number(values.EntryPrice) >= Number(values.EntryRange))) {
                return SweentAlertFun(showEditModal && EditDataScalping.ScalpType == "Fixed Price" ? "Higher Price should be greater than Lower Price" : "First Trade Higher Range should be greater than First Trade Lower Range")
            }

            if (Number(values.LowerRange) > 0 && Number(values.HigherRange) > 0 && (Number(values.LowerRange) >= Number(values.HigherRange))) {
                return SweentAlertFun("Higher Range should be greater than Lower Range")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Targetvalue) <= Number(values.Slvalue))) {
                return SweentAlertFun("Target Price should be greater than Stoploss Price")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Targetvalue) <= Number(values.EntryRange))) {
                return SweentAlertFun("Target Price should be greater than Higher price")
            }

            if (EditDataScalping.ScalpType == "Fixed Price" && (Number(values.Slvalue) >= Number(values.EntryPrice))) {
                return SweentAlertFun("Lower Price should be greater than Stoploss Price")
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }

            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text:  response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text:  response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    const formik1 = useFormik({
        initialValues: {
            MainStrategy: "",
            Strategy: "",
            Symbol: "",
            Username: "",
            ETPattern: "",
            Timeframe: "",
            Targetvalue: 0,
            Slvalue: 0,
            TStype: "",
            Quantity: "",
            LowerRange: 0,
            HigherRange: 0,
            HoldExit: "",
            EntryPrice: 0,
            EntryRange: 0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            TradeExecution: "",
            Group: "",
            CEDepthLower: 0.0,
            CEDepthHigher: 0.0,
            PEDepthLower: 0.0,
            PEDepthHigher: 0.0,
            CEDeepLower: 0.0,
            CEDeepHigher: 0.0,
            PEDeepLower: 0.0,
            PEDeepHigher: 0.0,
            DepthofStrike: 0,
            TradeCount: 0,
        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.TStype) {
                errors.TStype = "Please Select Measurement Type."
            }
            if (!values.Quantity) {
                errors.Quantity = "Please Enter Lot Size."
            }
            if (!values.Targetvalue) {
                errors.Targetvalue = "Please Enter Target Value."
            }
            if (!values.Slvalue) {
                errors.Slvalue = "Please Enter Stoploss."
            }

            if (values.ExitTime == '') {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (values.EntryTime == '') {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }


            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                MainStrategy: data,
                Strategy: EditDataOption.STG,
                Symbol: EditDataOption.MainSymbol,
                Username: userName,
                ETPattern: EditDataOption.Targettype,
                Timeframe: "",
                Targetvalue: values.Targetvalue,
                Slvalue: Number(values.Slvalue),
                TStype:  values.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: EditDataOption.LowerRange,
                HigherRange: EditDataOption.HigherRange,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataOption['Product Type'],
                TradeExecution: EditDataOption.TradeExecution,
                Group: EditDataOption.GroupN,
                CEDepthLower: EditDataOption.CEDepthLower,
                CEDepthHigher: EditDataOption.CEDepthHigher,
                PEDepthLower: EditDataOption.PEDepthLower,
                PEDepthHigher: EditDataOption.PEDepthHigher,
                CEDeepLower: EditDataOption.CEDeepLower,
                CEDeepHigher: EditDataOption.PEDeepHigher,
                PEDeepLower: EditDataOption.PEDeepLower,
                PEDeepHigher: EditDataOption.PEDeepHigher,
                DepthofStrike: EditDataOption.DepthofStrike,
                TradeCount: values.TradeCount
            }
            
            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }
            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text:  response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text:  response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });
    const formik2 = useFormik({
        initialValues: {
            MainStrategy: "",
            Strategy: "",
            Symbol: "",
            Username: "",
            ETPattern: "",
            Timeframe: "",
            Targetvalue: 0,
            Slvalue: 0,
            TStype: "",
            Quantity: 0,
            LowerRange: 0.0,
            HigherRange: 0.0,
            HoldExit: "",
            EntryPrice: 0.0,
            EntryRange: 0.0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            TradeExecution: "",
            Group: "",
            CEDepthLower: 0.0,
            CEDepthHigher: 0.0,
            PEDepthLower: 0.0,
            PEDepthHigher: 0.0,
            CEDeepLower: 0.0,
            CEDeepHigher: 0.0,
            PEDeepLower: 0.0,
            PEDeepHigher: 0.0,
            DepthofStrike: 0,
            TradeCount: "",
        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.TStype) {
                errors.TStype = "Please Select Measurement Type."
            }
            if (!values.Quantity) {
                errors.Quantity = "Please Enter Lot Size."
            }
            if (!values.Targetvalue) {
                errors.Targetvalue = "Please Enter Target Value."
            }
            if (!values.Slvalue) {
                errors.Slvalue = "Please Enter Stoploss."
            }

            if (values.ExitTime == '') {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (values.EntryTime == '') {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }

            if (!values.TradeCount) {
                errors.TradeCount = "Please Enter Trade Count."
            }

            return errors;
        },
        onSubmit: async (values) => {
            const req = {
                MainStrategy: data,
                Strategy: EditDataPattern.TradePattern,
                Symbol: EditDataPattern.Symbol,
                Username: userName,
                ETPattern: EditDataPattern.Pattern,
                Timeframe: EditDataPattern.TimeFrame,
                Targetvalue: Number(values.Targetvalue),
                Slvalue: Number(values.Slvalue),
                TStype: EditDataPattern.TStype,
                Quantity: Number(values.Quantity),
                LowerRange: 0.0,
                HigherRange: 0.0,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: EditDataPattern.ExitDay,
                TradeExecution: EditDataPattern.TradeExecution,
                Group: "",
                CEDepthLower: 0.0,
                CEDepthHigher: 0.0,
                PEDepthLower: 0.0,
                PEDepthHigher: 0.0,
                CEDeepLower: 0.0,
                CEDeepHigher: 0.0,
                PEDeepLower: 0.0,
                PEDeepHigher: 0.0,
                DepthofStrike: 1,
                TradeCount: Number(values.TradeCount)
            }

            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }
            await UpdateUserScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Updated",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true,
                        });
                        setTimeout(() => {
                            setShowEditModal(false)
                            formik.resetForm()
                        }, 1500)
                    } else {
                        Swal.fire({
                            title: "Error !",
                            text:  response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                })
        }
    });

    const fields = [
        {
            name: "Targetvalue",
            label: showEditModal && EditDataScalping.ScalpType == "Fixed Price" ? "Target Price" : formik.values.Strategy == "One Directional" ? "Fixed Target" : "Booking Point",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "Slvalue",
            label: showEditModal && EditDataScalping.ScalpType == "Fixed Price" ? "Stoploss Price" : "Re-Entry Point",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "EntryPrice",
            label: showEditModal && EditDataScalping.ScalpType != "Fixed Price" ? "First Trade Lower Range" : "Lower Price",
            type: "text3",

            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "EntryRange",
            label: showEditModal && EditDataScalping.ScalpType != "Fixed Price" ? "First Trade Higher Range" : "Higher Price",
            type: "text3",

            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "LowerRange",
            label: "Lower Range",
            type: "text3",
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "HigherRange",
            label: "Higher Range",
            type: "text5",
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "Quantity",
            label: showEditModal && EditDataScalping.Exchange == "NFO" ? "Lot" : "Quantity",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "HoldExit",
            label: "Hold/Exit",
            type: "select",
            options: [
                { label: "Hold", value: "Hold" },
                { label: "Exit", value: "Exit" },
            ],
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",

            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percentage", value: "Percentage" },
                { label: "Point", value: "Point" },
            ],
            showWhen: (values) => showEditModal && EditDataScalping.ScalpType != "Fixed Price",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },

        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },

    ];
    const fields1 = [
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percentage", value: "Percentage" },
                { label: "Point", value: "Point" },
            ],

            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Quantity",
            label: "Lot Size",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },

        {
            name: "Slvalue",
            label: "Stoploss",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

    ];
    const fields2 = [
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: [
                { label: "Percantage", value: "Percantage" },
                { label: "Point", value: "Point" },
            ],

            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Quantity",
            label: "Lot Size",
            type: "text5",
            label_size: 12,
            col_size: 6,
            hiding: false,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "Slvalue",
            label: "Stoploss",
            type: "text5",
            label_size: 12,
            col_size: 6,
            disable: false,
            hiding: false,
        },
        {
            name: "TradeCount",
            label: "Trade Count",
            type: "text5",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

        {
            name: "EntryTime",
            label: "Entry Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },

    ];

    useEffect(() => {
        if (data == "Scalping") {
            formik.setFieldValue('EntryPrice', EditDataScalping.EntryPrice)
            formik.setFieldValue('EntryRange', EditDataScalping.EntryRange)
            formik.setFieldValue('TStype', EditDataScalping.TStype)
            formik.setFieldValue('Targetvalue', EditDataScalping['Booking Point'])
            formik.setFieldValue('Slvalue', EditDataScalping['Re-entry Point'])
            formik.setFieldValue('LowerRange', EditDataScalping.LowerRange)
            formik.setFieldValue('HigherRange', EditDataScalping.HigherRange)
            formik.setFieldValue('HoldExit', EditDataScalping.HoldExit)
            formik.setFieldValue('EntryTime', EditDataScalping.EntryTime)
            formik.setFieldValue('ExitTime', EditDataScalping.ExitTime)
            formik.setFieldValue('Quantity', EditDataScalping.Quantity)
            formik.setFieldValue('TradeCount', EditDataScalping.TradeCount)

        }
        else if (data == "Option Strategy") {
            formik1.setFieldValue('TStype', EditDataOption.strategytype)
            formik1.setFieldValue('Targetvalue', EditDataOption['Target value'])
            formik1.setFieldValue('Slvalue', EditDataOption['SL value'])
            formik1.setFieldValue('Quantity', EditDataOption['Lot Size'])
            formik1.setFieldValue('EntryTime', EditDataOption['Entry Time'])
            formik1.setFieldValue('ExitTime', EditDataOption['Exit Time'])
            formik1.setFieldValue('TradeCount', EditDataOption.TradeCount)

        }
        else if (data == "Pattern") {

            formik2.setFieldValue('TStype', EditDataPattern.TStype)
            formik2.setFieldValue('Targetvalue', EditDataPattern['Target value'])
            formik2.setFieldValue('Slvalue', EditDataPattern['SL value'])
            formik2.setFieldValue('Quantity', EditDataPattern.Quantity)
            formik2.setFieldValue('EntryTime', EditDataPattern.EntryTime)
            formik2.setFieldValue('ExitTime', EditDataPattern.ExitTime)
          

            formik2.setFieldValue('TradeCount', EditDataPattern.TradeCount)

        }
    }, [showEditModal, data])


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-body" style={{ padding: '3px' }}>
                            <div className="tab-content" id="myTabContent-3">

                                <div className="tab-pane fade show active" id="home-justify" role="tabpanel" aria-labelledby="home-tab-justify">
                                    {data && (
                                        <>
                                            <div className="iq-card-header d-flex justify-content-between">
                                                <div className="iq-header-title">
                                                    <h4 className="card-title">{data}</h4>
                                                </div>
                                                <div className='d-flex justify-content-end'>
                                                    <button className='btn btn-primary' onClick={() => AddScript(data)}>Add Script</button>
                                                </div>
                                            </div>
                                            <div className="iq-card-body " style={{ padding: '3px' }}>
                                                <div className="table-responsive">

                                                    {getAllService.loading ? <Loader /> :
                                                        <FullDataTable
                                                            columns={data === "Scalping" ? getColumns3(handleDelete, handleEdit, HandleContinueDiscontinue) : data === "Option Strategy" ? getColumns4(handleDelete, handleEdit, HandleContinueDiscontinue) : data === "Pattern" ? getColumns5(handleDelete, handleEdit, HandleContinueDiscontinue) : getColumns3(handleDelete, handleEdit, HandleContinueDiscontinue)}
                                                            data={data === "Scalping" ? getAllService.ScalpingData : data === "Option Strategy" ? getAllService.OptionData : data === "Pattern" ? getAllService.PatternData : []}
                                                            checkBox={false}
                                                        />
                                                    }
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showEditModal && <div className="modal show" id="exampleModal" style={{ display: "block" }}>
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content ">
                        <div className="modal-header ">
                            <h5 className="modal-title">Edit Script</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => { setShowEditModal(false); formik.resetForm() }}
                            />
                        </div>

                        {
                            data == "Scalping" ? <>
                                <Formikform
                                    fields={fields.filter(
                                        (field) => !field.showWhen || field.showWhen(formik.values)
                                    )}

                                    btn_name="Update"
                                    formik={formik}
                                />
                            </> :
                                data == "Option Strategy" ? <>

                                    <Formikform
                                        fields={fields1}
                                        btn_name="Update"
                                        formik={formik1}
                                    />
                                </>
                                    :
                                    <Formikform
                                        fields={fields2.filter(
                                            (field) => !field.showWhen || field.showWhen(formik2.values)
                                        )}

                                        btn_name="Update"
                                        formik={formik2}
                                    />



                        }
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default Coptyscript;
