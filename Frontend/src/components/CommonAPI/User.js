import axios from "axios"
import * as Config from "../../Utils/Config";

export const Get_Last_Pattern_Data = async (data) => {
    var token = localStorage.getItem('token')

    try {
        const res = await axios.post(`${Config.base_url}CCLPattern`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}

export const Get_Profile_Data = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Profile/${data.username}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data
    }
    catch (err) {
        return err
    }

}

export const getNetPnLData = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}NetPnL`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err


    }
}

export const get_Trade_Response = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Traderesponse`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetAllUserScript = async (data) => {
    try {

        var token = localStorage.getItem('token')

        const res = await axios.get(`${Config.base_url}Dashboard/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetAllUserGroup = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}clientalotgroupname`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const AddScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Addscript`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const get_Trade_Report = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Tradereport`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const Get_Panle_Logs = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}PanelTrackAll`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const DeleteUserScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Squareoff`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const Continue = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Continue`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const Discontinue = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Discontinue`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const OpenPosition = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}DashboardOpen/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetBrokerData = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Brokername/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        return res?.data




    }
    catch (err) {
        return err
    }
}

export const UpdateBrokerData = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Broker`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const TradingStatus = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}TradingStatus/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const ConnectBroker = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ConnectBroker`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}


export const Get_Pattern_Name2 = async (data) => {
    const token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Pattern/${data.selectPattern}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data

    }
    catch (err) {
        return err
    }
}
export const AvailableScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Script/AvailableScript`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetSymbolIp = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}SymbolP`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const ChartPatternAPI = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ChartPattern`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const Candlestick_Pattern = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CandlestickPattern`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const LastPatternCandleData = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.get(`${Config.base_url}DailyData/${data.CartName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const SortPattern = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}CCLPattern`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const get_Trade_Data = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}ScalpingData`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const UpdateUserScript = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Updatescript`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const CheckPnL = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}MaxPnlStrike`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetName = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.get(`${Config.base_url}ClientTaskStatus/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetSingleChart = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.get(`${Config.base_url}CandlestickImage/${data.patternName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetAllTransection = async (data) => {
    var token = localStorage.getItem('token')
    try {

        const res = await axios.get(`${Config.base_url}ClienttransactionDetails/${data.Name}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const AddBalance = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}Clienttransaction`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const GetUserBalence = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}checkbalance/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const Get_All_Plans = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}AllPlanDetails`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}

export const Get_All_Buyed_Plans = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}Allotplan/${data.userName}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}


export const BuyPlan = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.post(`${Config.base_url}BuyPlan`, data,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}


export const GetUserScripts = async (data) => {
    var token = localStorage.getItem('token')
    try {
        const res = await axios.get(`${Config.base_url}AllotStretegy/${data.Username}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        )
        return res?.data
    }
    catch (err) {
        return err
    }
}







