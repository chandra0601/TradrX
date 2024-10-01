import React, { useEffect, useState } from 'react'
import { Get_Client_Report } from '../../CommonAPI/Admin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import Checkbox from '@mui/material/Checkbox';
import {ClientReportColumn} from './UserAllColumn'



const Clientreport = () => {
    const [selectUserName, setSelectUserName] = useState('')
    const [getTableData, setTableData] = useState({
        loading: true,
        data: []
    })

    const GetClientData = async () => {
        const data = { User: selectUserName }
        await Get_Client_Report(data)
            .then((response) => {
                if (response.Status) {
                    setTableData({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setTableData({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the client details", err)
            })
    }


    useEffect(() => {
        GetClientData()
    }, [selectUserName])

 

    useEffect(() => {
        setSelectUserName('AllUser')
    }, [])



    return (
        <div>
            <div>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-sm-12 col-lg-12">
                            <div className="iq-card">
                                <div className="iq-card-header d-flex justify-content-between">
                                    <div className="iq-header-title">
                                        <h4 className="card-title">Client Report</h4>
                                    </div>
                                </div>
                                <div className="iq-card-body">
                                    <div>
                                        <div className="row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="validationDefault01" className='mb-1'>Select Username</label>
                                                <select className="form-select" required=""
                                                    onChange={(e) => setSelectUserName(e.target.value)}
                                                    value={selectUserName}>
                                                    <option value={"AllUser"}>AllUser</option>
                                                    <option value={"ReadData"}>ReadData</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-body">
                                        <FullDataTable
                                            columns={ClientReportColumn()}
                                            data={getTableData.data}
                                            checkBox={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Clientreport
