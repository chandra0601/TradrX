import React, { useEffect, useState } from 'react'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'
import { GetAllTaskStatus, GetClientService, Get_All_Client_Logs } from '../../CommonAPI/Admin'
import {columns2 , columns1 , columns} from './UserAllColumn'

const Pannel = () => {

    const [getPanleData, setPanleData] = useState({
        loading: true,
        data: []
    })
    const [userName, setUserName] = useState('')
    const [getScript, setScript] = useState('')
    const [getActivity, setActivity] = useState('')
    const [gettaskStatus, setAllTaskStatus] = useState([])
    const [clientService, setClientService] = useState({ loading: true, data: [] });

    const AllTaskStatus = async () => {
        await GetAllTaskStatus()
            .then((response) => {
                if (response.Status) {
                    setAllTaskStatus(response.Taskstatus)
                }
                else {
                    setAllTaskStatus([])
                }
            })
            .catch((err) => {
                console.log("Error in finding the Task Status", err)
            })

    }

    useState(() => {
        AllTaskStatus()
    }, [])

    useEffect(() => {
        const fetchClientService = async () => {
            try {
                const response = await GetClientService();
                if (response.Status) {

                    
                    setClientService({
                        loading: false,
                        data: response.Data
                    });
                } else {
                    setClientService({ loading: false, data: [] });
                }
            } catch (error) {
                console.log('Error in fetching client services', error);
            }
        };

        fetchClientService();
    }, []);
   
    useEffect(() => {

        if (!clientService.loading && clientService.data.length > 0) {
            setUserName(clientService.data[0].Username)
        }


        setScript('Scalping')

        if (gettaskStatus && gettaskStatus.length > 0) {
            setActivity(gettaskStatus[0])
        }

    }, [clientService, gettaskStatus])


    const getAllUserLogs = async () => {
        const data = { User: userName, Strategy: getScript, TaskStatus: getActivity }
        await Get_All_Client_Logs(data)
            .then((response) => {
                if (response.Status) {
                    setPanleData({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setPanleData({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the user logs", err)
            })
    }

    useEffect(() => {
        getAllUserLogs()
    }, [userName, getScript, getActivity])


    return (
        <>
            <div>
                <div className="col-sm-12 col-lg-12">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">User Panel Logs</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">
                            <div>
                                <div className='row'>
                                    <div className="form-group col-lg-4">
                                        <label>Username</label>
                                        <select
                                            className="form-select my-2"
                                            required
                                            onChange={(e) => setUserName(e.target.value)}
                                            value={userName}
                                        >
                                            <option value="">Select Username</option>
                                            {clientService.data && clientService.data.map((item, index) => (
                                                <option key={index} value={item.Username}>
                                                    {item.Username}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group col-lg-4">
                                        <label>Strategy</label>
                                        <select className="form-select my-2" required=""
                                            onChange={(e) => setScript(e.target.value)}
                                            value={getScript}>
                                            <option value="">select Script</option>
                                            <option value="Scalping">Scalping</option>
                                            <option value="Option Strategy">Option Strategy</option>
                                            <option value="Pattern">Pattern</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4">
                                        <label htmlFor="email">Task Status</label>
                                        <select className="form-select my-2" required=""
                                            onChange={(e) => setActivity(e.target.value)}
                                            value={getActivity}>
                                            <option value="">Select Task Status</option>
                                            {gettaskStatus && gettaskStatus.map((item , index) => {
                                                return <option value={item}  key={index}>{item}</option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <FullDataTable
                                    columns={getScript == 'Scalping' ? columns() : getScript == 'Option Strategy' ? columns1() : getScript == 'Pattern' ? columns2() : columns()}
                                    data={getPanleData.data}
                                    checkBox={false}
                                />
                            </div >
                        </div>
                    </div >
                </div >
            </div>
        </>
    )
}
export default Pannel

