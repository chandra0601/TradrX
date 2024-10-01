import { useLocation, useNavigate } from "react-router-dom"
import AddForm from "../../../ExtraComponent/FormData";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import Swal from 'sweetalert2';
import { GET_EXPIRY_DATE, ExpriyEndDate } from '../../CommonAPI/Admin'
import { AddScript } from '../../CommonAPI/User'


const AddClient = () => {
    const location = useLocation()
    const userName = localStorage.getItem('name')
    const navigate = useNavigate()
    const [getExpiry, setExpiry] = useState({
        loading: true,
        data: []
    })

    const [serviceEndDate, setServiceEndDate] = useState('')






    const SweentAlertFun = (text) => {
        Swal.fire({
            title: "Error",
            text: text,
            icon: "error",
            timer: 30000,
            timerProgressBar: true
        });

    }

    const formik = useFormik({

        initialValues: {
            MainStrategy: location.state.data.selectStrategyType,
            Username: "",
            Strategy: location.state.data.STG,
            ETPattern: "",
            Timeframe: "",
            Exchange: "",
            Symbol: location.state.data.MainSymbol,
            Instrument: "FUTIDX",
            Strike: "",
            Optiontype: "",
            Targetvalue: 1.0,
            Slvalue: 1.0,
            TStype: "",
            Quantity: 0,
            Higher_Range: 0.0,
            Lower_Range: 0.0,
            HoldExit: "",
            EntryPrice: 0.0,
            EntryRange: 0.0,
            EntryTime: "",
            ExitTime: "",
            ExitDay: "",
            Trade_Execution: "Paper Trade",
            FixedSM: "",
            TType: "",
            serendate: "2023-10-25",
            expirydata1: "2024-06-27",
            Expirytype: location.state.data.Expirytype,
            Striketype: "",
            DepthofStrike: "",
            DeepStrike: "",
            Group: "",
            CEDepthLower: location.state.data.CEDepthLower,
            CEDepthHigher: location.state.data.CEDepthHigher,
            PEDepthLower: location.state.data.PEDepthLower,
            PEDepthHigher: location.state.data.PEDepthHigher,
            CEDeepLower: location.state.data.CEDeepLower,
            CEDeepHigher: location.state.data.CEDeepHigher,
            PEDeepLower: location.state.data.PEDeepLower,
            PEDeepHigher: location.state.data.PEDeepHigher,
            Trade_Count: 1,
            Unique_ID: location.state.data.GroupN,
            Measurment_Type: "",
            Shifting_Point: 1,


        },
        validate: (values) => {
            let errors = {};
            const maxTime = "15:29:59";
            const minTime = "09:15:00";
            if (!values.Strategy) {
                errors.Strategy = "Please Select a Strategy Type.";
            }
            if (!values.Measurment_Type) {
                errors.Measurment_Type = "Please select Option type.";
            }
            if (!values.Trade_Execution || values.Trade_Execution == 0) {
                errors.Trade_Execution = "Please Select Trade Execution.";
            }
            if (!values.Trade_Count || values.Trade_Count == 0) {
                errors.Trade_Count = "Please Enter Trade Count.";
            }
            if (!values.ETPattern && values.Measurment_Type != "Shifting/FourLeg") {
                errors.ETPattern = "Please Select Risk Handle Type.";
            }
            if (!values.Symbol) {
                errors.Symbol = "Please Select a Symbol Type.";
            }


            if ((!values.Targetvalue || values.Targetvalue == 0) && (formik.values.Measurment_Type != 'Shifting/FourLeg')) {
                errors.Targetvalue = values.Targetvalue == 0 ? "Target Can Not be Zero" : "Please Enter a Target Value.";
            }
            if ((!values.Slvalue || values.Slvalue == 0) && (formik.values.Measurment_Type != 'Shifting/FourLeg')) {
                errors.Slvalue = values.Slvalue == 0 ? "Stoploss Can Not be Zero" : "Please Enter a Stop Loss Value.";
            }

            if (!values.TStype) {
                errors.TStype = "Please Select a Measurement Type.";
            }
            if (!values.Quantity) {
                errors.Quantity = "Please Enter the Lot Value.";
            }
            if (!values.ExitTime) {
                errors.ExitTime = "Please Select Exit Time.";
            } else if (values.ExitTime > maxTime) {
                errors.ExitTime = "Exit Time Must be Before 15:29:59.";
            }
            else if (values.ExitTime < minTime) {
                errors.ExitTime = "Exit Time Must be After 09:15:00.";
            }
            if (!values.EntryTime) {
                errors.EntryTime = "Please Select Entry Time.";
            } else if (values.EntryTime < minTime) {
                errors.EntryTime = "Entry Time Must be After 09:15:00.";
            }
            else if (values.EntryTime > maxTime) {
                errors.EntryTime = "Entry Time Must be Before 15:29:59.";
            }
            if (!values.ExitDay) {
                errors.ExitDay = "Please Select an Exit Day.";
            }
            if (!values.Expirytype) {
                errors.Expirytype = "Please Select an Expiry Type.";
            }
            if (!values.Lower_Range && values.Striketype === 'Premium_Range') {
                errors.Lower_Range = "Please Enter the Lower Range.";
            }
            if (!values.Higher_Range && values.Striketype === 'Premium_Range') {
                errors.Higher_Range = "Please Enter the Higher Range.";
            }
            if (!values.Striketype && (values.Strategy != "ShortStraddle" && values.Strategy != "LongStraddle" && values.Measurment_Type != "Shifting/FourLeg" && values.Strategy != 'ShortStraddle' && values.Strategy != 'LongStraddle')) {
                errors.Striketype = "Please Select a Strike Type.";
            }
            if (!values.Unique_ID && (values.Strategy == "LongFourLegStretegy" || values.Strategy == "ShortFourLegStretegy")) {
                errors.Unique_ID = "Please Select Unique ID.";
            }
            if (!values.PEDeepLower && values.PEDeepLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDeepLower = values.PEDeepLower == 0 ? "PE Hedge Lower Cannot Be Zero." : "Please Enter PE Hedge Lower.";
            }
            if (!values.PEDeepHigher && values.PEDeepLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDeepHigher = values.PEDeepHigher == 0 ? "PE Hedge Higher Cannot Be Zero." : "Please Enter PE Hedge Higher.";
            }
            if (!values.CEDepthLower && values.CEDepthLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDepthLower = values.CEDepthLower == 0 ? "CE Main Lower Cannot Be Zero." : "Please Enter CE Main Lower.";
            }
            if (!values.PEDepthHigher && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy') && values.PEDepthHigher == 0) {
                errors.PEDepthHigher = values.PEDepthHigher == 0 ? "PE Main Higher can not be Zero" : "Please Enter PE Main Higher.";
            }
            if (!values.CEDepthHigher && values.CEDepthHigher == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDepthHigher = values.CEDepthHigher == 0 ? "CE Main Higher Cannot Be Zero." : "Please Enter CE Main Higher.";
            }
            if (!values.PEDepthLower && values.PEDepthLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDepthLower = values.PEDepthLower == 0 ? "PE Main Lower Cannot Be Zero." : "Please Enter PE Main Lower.";
            }
            if (!values.CEDeepLower && values.CEDeepLower == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDeepLower = values.CEDeepLower == 0 ? "CE Hedge Lower Cannot Be Zero." : "Please Enter CE Hedge Lower.";
            }
            if (!values.CEDeepHigher && values.CEDeepHigher == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.CEDeepHigher = values.CEDeepHigher == 0 ? "CE Hedge Higher Cannot Be Zero." : "Please Enter CE Hedge Higher.";
            }
            if (!values.PEDeepHigher && values.PEDeepHigher == 0 && (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy')) {
                errors.PEDeepHigher = values.PEDeepHigher == 0 ? "PE Hedge Higher Cannot Be Zero." : "Please Enter PE Hedge Higher.";
            }

            if (values.Striketype == "Depth_of_Strike" && values.Measurment_Type != "Shifting/FourLeg" && values.Strategy != 'LongStraddle' && values.Strategy != 'ShortStraddle') {
                if (values.DepthofStrike > 5 || values.DepthofStrike < -5 || values.DepthofStrike == 0) {
                    errors.DepthofStrike = values.DepthofStrike == 0 ? "Depth of Strike Cannot Be Zero." : "Enter Depth of Strike Value Between -5 to 5.";
                }
            }
            if (values.Striketype == "Straddle_Width" && values.Measurment_Type != "Shifting/FourLeg" && values.Strategy != 'LongStraddle' && values.Strategy != 'ShortStraddle') {
                if (values.DepthofStrike > 250 || values.DepthofStrike < -250 || values.DepthofStrike == 0) {
                    errors.DepthofStrike = values.DepthofStrike == 0 ? "Straddle Width Cannot Be Zero." : "Enter Straddle Width Between -250 to 250.";
                }
            }
            if (values.Striketype == "Per_ATM" && values.Measurment_Type != "Shifting/FourLeg" && values.Strategy != 'LongStraddle' && values.Strategy != 'ShortStraddle') {
                if (values.DepthofStrike > 2.5 || values.DepthofStrike < -2.5 || values.DepthofStrike == 0) {
                    errors.DepthofStrike = values.DepthofStrike == 0 ? "% of ATM Cannot Be Zero." : "Please Enter % of ATM Value Between -2.5 to 2.5.";
                }
            }
            if ((values.Measurment_Type == "Ladder/Coverd" && values.Measurment_Type != "Shifting/FourLeg" && (values.Strategy == 'BullCallLadder' || values.Strategy == "BullPutLadder")) || values.Strategy == "LongIronCondor" || values.Strategy == "ShortIronCondor") {
                if (values.DeepStrike > 10 || values.DeepStrike < -10 || values.DeepStrike == 0 || values.DeepStrike == 1 || values.DeepStrike == -1) {
                    errors.DeepStrike = values.DeepStrike == 0 ? "Deep Strike Cannot Be Zero." : values.DeepStrike == 1 ? "Deep Strike Cannot Be 1." : values.DeepStrike == -1 ? "Deep Strike Cannot Be -1." : "Enter Deep Strike Between -10 to 10.";
                }
            }
            if (values.Measurment_Type == "Shifting/FourLeg" && (values.Strategy == 'ShortShifting' || values.Strategy == 'LongShifting')) {
                if (values.Shifting_Point > 1000 || values.Shifting_Point < 100) {
                    errors.Shifting_Point = "Please Enter in Range 100-1000.";
                }
            }
            if (values.Measurment_Type == "Shifting/FourLeg" && values.Strategy != 'ShortFourLegStretegy' && values.Strategy != 'LongFourLegStretegy') {
                if (values.Shifting_Value > 5 || values.Shifting_Value < 1) {
                    errors.Shifting_Value = "Please Enter Number of Shifts Between 1-5.";
                }
            }

            console.log("Errors", errors)
 
            return errors;
        },
        onSubmit: async (values) => {

            
            const req = {
                MainStrategy: location.state.data.selectStrategyType,
                Username: userName,
                Strategy: values.Strategy,
                ETPattern: values.Measurment_Type != "Shifting/FourLeg" ? values.ETPattern : values.Strategy=="ShortShifting" || values.Strategy=="LongShifting" ? "Future" : "",
                Timeframe: "",
                Exchange: "NFO",
                Symbol: values.Symbol,
                Instrument: "FUTIDX",
                Strike: "",
                Optiontype: "",
                Targetvalue: values.Measurment_Type == "Shifting/FourLeg" && (values.Strategy == 'ShortShifting' || values.Strategy == 'LongShifting') ? Number(values.Shifting_Point) : Number(values.Targetvalue),
                Slvalue: values.Slvalue,
                TStype: values.TStype,
                Quantity: values.Quantity,
                LowerRange: values.Striketype == "Premium_Range" && values.Measurment_Type != "Shifting/FourLeg" ? values.Lower_Range : 0,
                HigherRange: values.Striketype == "Premium_Range" && values.Measurment_Type != "Shifting/FourLeg" ? values.Higher_Range : 0,
                HoldExit: "",
                EntryPrice: 0.0,
                EntryRange: 0.0,
                EntryTime: values.EntryTime,
                ExitTime: values.ExitTime,
                ExitDay: values.ExitDay,
                FixedSM: "",
                TType: "",
                serendate: serviceEndDate,
                expirydata1: values.Expirytype == "Weekly" ? getExpiry && getExpiry.data[0] : values.Expirytype == "Next Week" ? getExpiry && getExpiry.data[1] : getExpiry && getExpiry.data[2],
                Expirytype: values.Expirytype,

                Striketype: formik.values.Strategy != "ShortStraddle" && formik.values.Strategy != "LongStraddle" && formik.values.Measurment_Type != "Shifting/FourLeg" && formik.values.Strategy != 'ShortStraddle' && formik.values.Strategy != 'LongStraddle' ? values.Striketype : '',
                DepthofStrike: (formik.values.Striketype != "Premium_Range" && formik.values.Measurment_Type != "Shifting/FourLeg" && formik.values.Strategy != 'LongStraddle' && formik.values.Strategy != 'ShortStraddle') ? Number(values.DepthofStrike) : formik.values.Measurment_Type == "Shifting/FourLeg" && formik.values.Strategy != 'ShortFourLegStretegy' && formik.values.Strategy != 'LongFourLegStretegy' ? values.Shifting_Value : 0,
                DeepStrike: ((formik.values.Measurment_Type == "Ladder/Coverd" && formik.values.Measurment_Type != "Shifting/FourLeg" && (formik.values.Strategy == 'BullCallLadder' || formik.values.Strategy == "BullPutLadder")) || formik.values.Strategy == "LongIronCondor" || formik.values.Strategy == "ShortIronCondor") ? Number(values.DeepStrike) : 0,
                Group: values.Strategy == "LongFourLegStretegy" || values.Strategy == "ShortFourLegStretegy" ? values.Unique_ID : "",
                CEDepthLower: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.CEDepthLower) : 0,
                CEDepthHigher: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.CEDepthHigher) : 0,
                PEDepthLower: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.PEDepthLower) : 0,
                PEDepthHigher: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.PEDepthHigher) : 0,
                CEDeepLower: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.CEDeepLower) : 0,
                CEDeepHigher: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.CEDeepHigher) : 0,
                PEDeepLower: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.PEDeepLower) : 0,
                PEDeepHigher: values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy' ? Number(values.PEDeepHigher) : 0,
                TradeCount: values.Trade_Count,
                TradeExecution: values.Trade_Execution
            }
            if (values.Striketype == "Depth_of_Strike" && (Number(values.DepthofStrike) < 0 || Number(values.DepthofStrike) > 10)) {

                return SweentAlertFun("Enter Depth of Strike's Range between 1 - 10")
            }
            if (values.EntryTime >= values.ExitTime) {
                return SweentAlertFun("Exit Time should be greater than Entry Time")
            }

            if ((values.Striketype == "Premium_Range" && values.Measurment_Type != "Shifting/FourLeg" )&& (Number(values.Lower_Range) >= Number(values.Higher_Range))) {

               
                return SweentAlertFun("Higher Range should be Greater than Lower Range")
            }

            else if (values.Strategy == 'ShortFourLegStretegy' || values.Strategy == 'LongFourLegStretegy') {
                if (req.CEDepthHigher <= req.CEDepthLower) {

                    return SweentAlertFun("Enter CE Main Higher Greater Than CE Main Lower")
                }
                else if (req.PEDepthLower >= req.PEDepthHigher) {

                    return SweentAlertFun("Enter PE Main Higher Greater Than PE Main Lower")
                }
                else if (req.CEDeepLower >= req.CEDeepHigher) {

                    return SweentAlertFun("Enter CE Hedge Higher Greater Than CE Hedge Lower")
                }
                else if (req.PEDeepLower >= req.PEDeepHigher) {

                    return SweentAlertFun("Enter PE Hedge Higher Greater Than PE Hedge Lower")
                }

                else if ((req.CEDepthLower <= req.CEDeepLower) || (req.CEDepthLower <= req.CEDeepHigher)) {

                    return SweentAlertFun("Enter CE Hedge Lower & CE Hedge Higher Smaller than CE Main Lower")
                }
                else if (req.PEDepthLower <= req.PEDeepLower || req.PEDepthLower <= req.PEDeepHigher) {

                    return SweentAlertFun("Enter PE Hedge Lower & PE Hedge Higher Smaller than PE Main Lower")
                }
            }

            await AddScript(req)
                .then((response) => {
                    if (response.Status) {
                        Swal.fire({
                            title: "Script Added !",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                        setTimeout(() => {
                            navigate('/user/dashboard')
                        }, 1500)
                    }
                    else {
                        Swal.fire({
                            title: "Error !",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });

                    }
                })
                .catch((err) => {
                    console.log("Error in added new Script", err)
                })
        },

    });


  



    useEffect(() => {
        formik.setFieldValue('Measurment_Type',
            location.state.data.STG == 'ShortStrangle' || location.state.data.STG == 'LongStrangle' || location.state.data.STG == 'LongStraddle' || location.state.data.STG == 'ShortStraddle' ? "Straddle/Strangle" :
                location.state.data.STG == 'LongIronButterfly' || location.state.data.STG == 'ShortIronButterfly' || location.state.data.STG == 'LongIronCondor' || location.state.data.STG == 'ShortIronCondor' ? "Butterfly/Condor" :
                    location.state.data.STG == 'BearCallSpread' || location.state.data.STG == 'BearPutSpread' || location.state.data.STG == 'BullCallSpread' || location.state.data.STG == 'BullPutSpread' ? 'Spread' :
                        location.state.data.STG == 'BullCallLadder' || location.state.data.STG == 'BullPutLadder' || location.state.data.STG == 'CoveredCall' || location.state.data.STG == 'CoveredPut' ? "Ladder/Coverd" :
                            location.state.data.STG == 'LongCollar' || location.state.data.STG == 'ShortCollar' || location.state.data.STG == 'RatioCallSpread' || location.state.data.STG == 'RatioPutSpread' ? "Collar/Ratio" :
                                location.state.data.STG == 'LongFourLegStretegy' || location.state.data.STG == 'ShortShifting' || location.state.data.STG == 'LongShifting' || location.state.data.STG == 'ShortFourLegStretegy' ? "Shifting/FourLeg" : ""
        )
        formik.setFieldValue('Strategy', location.state.data.STG)
        formik.setFieldValue('Symbol', location.state.data.MainSymbol)
        formik.setFieldValue('Expirytype', location.state.data.Expirytype)
        formik.setFieldValue('ETPattern', location.state.data.Targettype)
        formik.setFieldValue('TStype', location.state.data.strategytype)
        formik.setFieldValue('Targetvalue', location.state.data['Target value'])
        formik.setFieldValue('Slvalue', location.state.data['SL value'])
        formik.setFieldValue('Quantity', location.state.data['Lot Size'])
        formik.setFieldValue('ExitDay', location.state.data['Product Type'])
        formik.setFieldValue('EntryTime', location.state.data['Entry Time'])
        formik.setFieldValue('ExitTime', location.state.data['Exit Time'])
        formik.setFieldValue('Striketype', location.state.data.StrikeType)
        formik.setFieldValue('DepthofStrike', location.state.data.DepthofStrike)
        formik.setFieldValue('DeepStrike', location.state.data.DeepStrike)
        formik.setFieldValue('Lower_Range', location.state.data.LowerRange)
        formik.setFieldValue('Higher_Range', location.state.data.HigherRange)
        formik.setFieldValue('Trade_Execution', location.state.data.TradeExecution)
        formik.setFieldValue('Trade_Count', location.state.data.TradeCount || 1)
        formik.setFieldValue('Unique_ID', location.state.data.GroupN)
        formik.setFieldValue('Shifting_Value', (location.state.data.Measurment_Type == "Shifting/FourLeg" && location.state.data.Strategy != 'ShortFourLegStretegy' && location.state.data.Strategy != 'LongFourLegStretegy') ? location.state.data.DepthofStrike : "")
        formik.setFieldValue('CEDepthLower', location.state.data.CEDepthLower)
        formik.setFieldValue('CEDepthHigher', location.state.data.CEDepthHigher)
        formik.setFieldValue('CEDeepLower', location.state.data.CEDeepLower)
        formik.setFieldValue('CEDeepHigher', location.state.data.CEDeepHigher)
        formik.setFieldValue('PEDepthLower', location.state.data.PEDepthLower)
        formik.setFieldValue('PEDepthHigher', location.state.data.PEDepthHigher)
        formik.setFieldValue('PEDeepLower', location.state.data.PEDeepLower)
        formik.setFieldValue('PEDeepHigher', location.state.data.PEDeepHigher)
        formik.setFieldValue('Shifting_Point', location.state.data['Target value'])


    }, [])


    const fields = [
        {
            name: "Measurment_Type",
            label: "Option Type",
            type: "select",
            options: [
                { label: "Straddle/Strangle", value: "Straddle/Strangle" },
                { label: "Butterfly/Condor", value: "Butterfly/Condor" },
                { label: "Spread", value: "Spread" },
                { label: "Ladder/Coverd", value: "Ladder/Coverd" },
                { label: "Collar/Ratio", value: "Collar/Ratio" },
                { label: "Shifting/FourLeg", value: "Shifting/FourLeg" },

            ],
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Strategy",
            label: "Strategy",
            type: "radio1",
            title: formik.values.Measurment_Type == "Straddle/Strangle" ?
                [{ title: "Long Strangle", value: "LongStrangle" }, { title: "Short Strangle", value: "ShortStrangle" }, { title: "Long Straddle", value: "LongStraddle" }, { title: "Short Straddle", value: "ShortStraddle" }] :

                formik.values.Measurment_Type == "Butterfly/Condor" ?
                    [{ title: "Long Iron Butterfly", value: "LongIronButterfly" }, { title: "Short Iron Butterfly", value: "ShortIronButterfly" }, { title: "Long Iron Condor", value: "LongIronCondor" }, { title: "Short Iron Condor", value: "ShortIronCondor" }] :

                    formik.values.Measurment_Type == "Spread" ?
                        [{ title: "Bear Call Spread", value: "BearCallSpread" }, { title: "Bear Put Spread", value: "BearPutSpread" }, { title: "Bull Call Spread", value: "BullCallSpread" }, { title: "Bull Put Spread", value: "BullPutSpread" }] :

                        formik.values.Measurment_Type == "Ladder/Coverd" ?
                            [{ title: "Bull Call Ladder", value: "BullCallLadder" }, { title: "Bull Put Ladder", value: "BullPutLadder" }, { title: "Covered Call", value: "CoveredCall" }, { title: "Covered Put", value: "CoveredPut" }] :

                            formik.values.Measurment_Type == "Collar/Ratio" ?
                                [{ title: "Long Collar", value: "LongCollar" }, { title: "Short Collar", value: "ShortCollar" }, { title: "Ratio Call Spread", value: "RatioCallSpread" }, { title: "Ratio Put Spread", value: "RatioPutSpread" }] :

                                formik.values.Measurment_Type == "Shifting/FourLeg" ?
                                    [{ title: "Short Shifting", value: "ShortShifting" }, { title: "Long Shifting", value: "LongShifting" }, { title: "ShortFourLegStrategy", value: "ShortFourLegStretegy" }, { title: "LongFourLegStrategy", value: "LongFourLegStretegy" }] :
                                    ""

            ,
            label_size: 12,
            col_size: 8,
            disable: false,
            hiding: false,
        },
        {
            name: "Symbol",
            label: "Symbol",
            type: "select",
            options: [
                { label: "BANKNIFTY", value: "BANKNIFTY" },
                { label: "NIFTY", value: "NIFTY" },
            ],
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Expirytype",
            label: "Expiry Type",
            type: "select",
            options: [
                { label: "Weekly", value: "Weekly" },
                { label: "Monthly", value: "Monthly" },

            ],
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Quantity",
            label: "Lot",
            type: "text3",
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Striketype",
            label: "Strike Type",
            type: "select",
            options: [
                { label: "Depth of Strike", value: "Depth_of_Strike" },
                { label: "Straddle Width", value: "Straddle_Width" },
                { label: "Premium Range", value: "Premium_Range" },
                { label: "% of ATM", value: "Per_ATM" },
            ],
            showWhen: (value) => value.Strategy != "ShortStraddle" && value.Strategy != "LongStraddle" && value.Measurment_Type != "Shifting/FourLeg" && value.Strategy != 'ShortStraddle' && value.Strategy != 'LongStraddle',

            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "DepthofStrike",
            label: formik.values.Striketype == "Depth_of_Strike" ? "Depth of Strike" : formik.values.Striketype == "Straddle_Width" ? "Percentage" : formik.values.Striketype == "Premium_Range" ? "Premium Range" : formik.values.Striketype == "Per_ATM" ? "% of ATM" : "Depth of Strike",
            type: formik.values.Striketype == "Per_ATM" || formik.values.Striketype == "Straddle_Width" || formik.values.Striketype == "Depth_of_Strike" ? "number" : "text4",
            hiding: false,
            showWhen: (value) => formik.values.Striketype != "Premium_Range" && value.Measurment_Type != "Shifting/FourLeg" && value.Strategy != 'LongStraddle' && value.Strategy != 'ShortStraddle',
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Lower_Range",
            label: "Lower Range",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Striketype == "Premium_Range" && value.Measurment_Type != "Shifting/FourLeg",
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Higher_Range",
            label: "Higher Range",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Striketype == "Premium_Range" && value.Measurment_Type != "Shifting/FourLeg",
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "DeepStrike",
            label: "Deep Strike",
            type: "number",
            showWhen: (value) => (value.Measurment_Type == "Ladder/Coverd" && value.Measurment_Type != "Shifting/FourLeg" && (value.Strategy == 'BullCallLadder' || value.Strategy == "BullPutLadder")) || value.Strategy == "LongIronCondor" || value.Strategy == "ShortIronCondor",
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Shifting_Value",
            label: "Number of Shifts",
            type: "text3",
            showWhen: (value) => value.Measurment_Type == "Shifting/FourLeg" && value.Strategy != 'ShortFourLegStretegy' && value.Strategy != 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "ETPattern",
            label: "Risk Handle",
            type: "select",
            options: formik.values.Strategy == "CoveredPut" || formik.values.Strategy == "CoveredCall" || formik.values.Strategy == "ShortCollar" || formik.values.Strategy == "LongCollar" ?
                [
                    { label: "Future", value: "Future" },
                    { label: "Leg vice", value: "Leg vice" },
                ] :
                [
                    { label: "Future", value: "Future" },
                    { label: "Leg vice", value: "Leg vice" },
                    { label: "Premium Addition", value: "Premium Addition" },
                ],
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg",
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "TStype",
            label: "Measurement Type",
            type: "select",
            options: formik.values.ETPattern == "Premium Addition" ?
                [
                    { label: "Point", value: "Point" },
                ] :
                [
                    { label: "Point", value: "Point" },
                    { label: "Percentage", value: "Percentage" },
                ],
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg" || (value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy')),
            col_size: 4,
            disable: false,
        },
        {
            name: "Targetvalue",
            label: "Target Value",
            type: "text3",
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg" || (value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy')),

            col_size: 4,
            disable: false,
        },
        {
            name: "Slvalue",
            label: "StopLoss Value",
            type: "text3",
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type != "Shifting/FourLeg" || (value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy')),
            col_size: 4,
            disable: false,

        },
        {
            name: "Shifting_Point",
            label: "Shifting Point",
            type: "text3",
            hiding: false,
            label_size: 12,
            showWhen: (value) => value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortShifting' || value.Strategy == 'LongShifting'),
            col_size: 4,
            disable: false,
        },
        {
            name: "ExitDay",
            label: "Exit Day",
            type: "select",
            options: [
                { label: "Intraday", value: "Intraday" },
                { label: "Delivery", value: "Delivery" },
            ],
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "Unique_ID",
            label: "Unique ID",
            type: "select1",
            options: [
                { label: "A", value: "A" },
                { label: "B", value: "B" },
                { label: "C", value: "C" },
                { label: "D", value: "D" },
                { label: "E", value: "E" },
                { label: "F", value: "F" },
                { label: "G", value: "G" },
                { label: "H", value: "H" },
                { label: "I", value: "I" },
                { label: "J", value: "J" },

            ],

            showWhen: (value) => value.Strategy == "LongFourLegStretegy" || value.Strategy == "ShortFourLegStretegy",

            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "TStype",
            label: "Measurment Type",
            type: "cp",
            hiding: false,
            label_size: 12,
            showWhen: (value) => (value.Measurment_Type == "Shifting/FourLeg" && (value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy')),
            col_size: 4,
            disable: false,
        },
        {
            name: "CEDepthLower",
            label: "CE Main Lower",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            disable: false,
        },
        {
            name: "CEDepthHigher",
            label: "CE Main Higher",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            disable: false,
        },

        {
            name: "CEDeepLower",
            label: "CE Hedge Lower",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            disable: false,
        },
        {
            name: "CEDeepHigher",
            label: "CE Hedge Higher",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            disable: false,
        },
        {
            name: "PEDepthLower",
            label: "PE Main Lower",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            disable: false,
        },
        {
            name: "PEDepthHigher",
            label: "PE Main Higher",
            type: "text3",
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            hiding: false,
            label_size: 12,
            col_size: 3,
            disable: false,
        },
        {
            name: "PEDeepLower",
            label: "PE Hedge Lower",
            type: "text3",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            disable: false,
        },
        {
            name: "PEDeepHigher",
            label: "PE Hedge Higher",
            type: "number",
            hiding: false,
            showWhen: (value) => value.Strategy == 'ShortFourLegStretegy' || value.Strategy == 'LongFourLegStretegy',
            label_size: 12,
            col_size: 3,
            disable: false,
        },
        {
            name: "Trade_Execution",
            label: "Trade Execution",
            type: "select",
            options: [
                { label: "Paper Trade", value: "Paper Trade" },
                { label: "Live Trade", value: "Live Trade" },
            ],

            label_size: 12,
            col_size: 4,
            disable: false,
            hiding: false,
        },
        {
            name: "Trade_Count",
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
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
        {
            name: "ExitTime",
            label: "Exit Time",
            type: "timepiker",
            hiding: false,
            label_size: 12,
            col_size: 4,
            disable: false,
        },
    ];

    const getExpriyData = async () => {
        const data = { Exchange: "NFO", Instrument: "FUTIDX", Symbol: formik.values.Symbol, Strike: "" }
        await GET_EXPIRY_DATE(data)
            .then((response) => {
                if (response.Status) {
                    setExpiry({
                        loading: false,
                        data: response['Expiry Date']
                    })
                }
                else {
                    setExpiry({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the Expriy Data", err)
            })

    }

    useEffect(() => {
        getExpriyData()

    }, [formik.values.Symbol])



    const GetExpriyEndDate = async () => {
        const data = { Username: userName }
        await ExpriyEndDate(data)
            .then((response) => {
                if (response.Status) {

                    setServiceEndDate(response.Data[0].ExpiryDate)
                }
                else {
                    setServiceEndDate('')
                }
            })
            .catch((err) => {
                console.log("Error in finding the Service end date", err)
            })
    }


    useEffect(() => {
        GetExpriyEndDate()
    }, [])



    useEffect(() => {
        if (formik.values.Strategy == "LongStraddle" || formik.values.Strategy == "ShortStraddle") {
            formik.setFieldValue('Striketype', "Depth_of_Strike")
        }
        if (formik.values.Striketype != "Premium_Range") {
            formik.setFieldValue('Higher_Range', 1)
            formik.setFieldValue('Lower_Range', 1)
        }
        if (((formik.values.Measurment_Type == "Ladder/Coverd" && formik.values.Measurment_Type != "Shifting/FourLeg" && (formik.values.Strategy == 'BullCallLadder' || formik.values.Strategy == "BullPutLadder")) || formik.values.Strategy == "LongIronCondor" || formik.values.Strategy == "ShortIronCondor")) {
            formik.setFieldValue('DeepStrike', 2)
        }

        if (!(formik.values.Measurment_Type == "Shifting/FourLeg" && (formik.values.Strategy == 'ShortShifting' || formik.values.Strategy == 'LongShifting'))) {
            formik.setFieldValue('Shifting_Value', 1)
        }
        if (!(formik.values.Measurment_Type != "Shifting/FourLeg" || (formik.values.Measurment_Type == "Shifting/FourLeg" && (formik.values.Strategy == 'ShortFourLegStretegy' || formik.values.Strategy == 'LongFourLegStretegy')))) {
            formik.setFieldValue('TStype', "Point")
            formik.setFieldValue('Targetvalue', 0)
            formik.setFieldValue('Slvalue', 0)
        }
        if (formik.values.Measurment_Type == "Shifting/FourLeg") {
            formik.setFieldValue('ETPattern', "Future")
        }
 
 
    }, [formik.values.Strategy, formik.values.Striketype, formik.values.Measurment_Type])


    useEffect(() => {

        const temp =  location.state.data.STG == 'ShortStrangle' || location.state.data.STG == 'LongStrangle' || location.state.data.STG == 'LongStraddle' || location.state.data.STG == 'ShortStraddle' ? "Straddle/Strangle" :
        location.state.data.STG == 'LongIronButterfly' || location.state.data.STG == 'ShortIronButterfly' || location.state.data.STG == 'LongIronCondor' || location.state.data.STG == 'ShortIronCondor' ? "Butterfly/Condor" :
            location.state.data.STG == 'BearCallSpread' || location.state.data.STG == 'BearPutSpread' || location.state.data.STG == 'BullCallSpread' || location.state.data.STG == 'BullPutSpread' ? 'Spread' :
                location.state.data.STG == 'BullCallLadder' || location.state.data.STG == 'BullPutLadder' || location.state.data.STG == 'CoveredCall' || location.state.data.STG == 'CoveredPut' ? "Ladder/Coverd" :
                    location.state.data.STG == 'LongCollar' || location.state.data.STG == 'ShortCollar' || location.state.data.STG == 'RatioCallSpread' || location.state.data.STG == 'RatioPutSpread' ? "Collar/Ratio" :
                        location.state.data.STG == 'LongFourLegStretegy' || location.state.data.STG == 'ShortShifting' || location.state.data.STG == 'LongShifting' || location.state.data.STG == 'ShortFourLegStretegy' ? "Shifting/FourLeg" : ""

        
        if(formik.values.Measurment_Type && formik.values.Measurment_Type != temp ){ 
            console.log("inside")
            formik.setFieldValue('Strategy', "")
        }

    }, [formik.values.Measurment_Type])


    return (
        <>
            <AddForm
                fields={fields.filter((field) => !field.showWhen || field.showWhen(formik.values))}
                
                page_title= {`Add Script - option , Group : ${location.state.data.Username}`}
                btn_name="Add"
                btn_name1="Cancel"
                formik={formik}
                btn_name1_route={"/user/dashboard"}

            />

        </>
    );
};
export default AddClient;























