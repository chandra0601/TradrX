import React, { useEffect, useState } from 'react'
import Coptyscript from './Copyscript'
import GroupScript from './Groupscript'
import CurrentScript from './CurrentScript'
import { GetAllUserGroup, OpenPosition } from '../../CommonAPI/User'
import { ExpriyEndDate } from '../../CommonAPI/Admin'
import FullDataTable from '../../../ExtraComponent/CommanDataTable'
const Userdashboard = () => {
    const userName = localStorage.getItem('name')
    const [activeTab1, setActiveTab1] = useState('CurrentPosition')
    const [activeTab, setActiveTab] = useState('currentScript')
    const [subTab, setSubTab] = useState('Scalping')
    const [refresh, setRefresh] = useState(false)
    const [getGroup, setGroup] = useState('')
    const [serviceStatus, setServiceStatus] = useState({
        status: false,
        msg: ''
    })
    const [getGroupName, setGroupName] = useState({
        loading: true,
        data: []
    })
    const [getPositionData, setPositionData] = useState({
        loading: true,
        Scalping: [],
        Option: [],
        Pattern: []
    })

    const getUserAllGroup = async () => {
        const data = { User: userName }
        await GetAllUserGroup(data)
            .then((response) => {
                if (response.Status) {
                    setRefresh(!refresh)
                    setGroupName({
                        loading: false,
                        data: response.Data
                    })
                }
                else {
                    setGroupName({
                        loading: false,
                        data: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the group name", err)
            })
    }
    useEffect(() => {
        getUserAllGroup()
    }, [activeTab])

    const GetExpriyEndDate = async () => {
        const data = { Username: userName }
        await ExpriyEndDate(data)
            .then((response) => {
                setServiceStatus({
                    status: response.Status,
                    msg: response.message,
                })
            })
            .catch((err) => {
                console.log("Error in finding the Service end date", err)
            })
    }

    useEffect(() => {
        GetExpriyEndDate()
    }, [])

    const GetOpenPosition = async () => {
        const data = { userName: userName }
        await OpenPosition(data)
            .then((response) => {
                if (response.Status) {

                    setPositionData({
                        loading: false,
                        Scalping: response.Scalping,
                        Option: response.Option,
                        Pattern: response.Pattern
                    })
                }
                else {
                    setPositionData({
                        loading: false,
                        Scalping: [],
                        Option: [],
                        Pattern: []
                    })
                }
            })
            .catch((err) => {
                console.log("Error in finding the open postion data", err)
            })
    }
    useEffect(() => {
        GetOpenPosition()
    }, [])

    const columns1 = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "ScalpType",
            label: "ScalpType",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "Symbol",
            label: "Symbol",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ETime",
            label: "Entry Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "EPrice",
            label: "Entry Price",
            options: {
                filter: true,
                sort: true,
            }
        },

        {
            name: "TradeType",
            label: "Trade Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Quantity",
            label: "Quantity",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Trade",
            label: "Trade",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Target",
            label: "Target",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SL",
            label: "Stop Loss",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "GroupN",
            label: "Unique ID",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];
    const columns2 = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "STG",
            label: "Strategy",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Symbol",
            label: "Symbol",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ETime",
            label: "Entry Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "EPrice",
            label: "Entry Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "LotSize",
            label: "Quantity",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Trade",
            label: "Trade",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Option Type",
            label: "Option Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Strike price",
            label: "Strike price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Token",
            label: "Token",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Hashing",
            label: "Hashing",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TradeType",
            label: "Trade Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Target",
            label: "Target",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SL",
            label: "Stop Loss",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "GroupN",
            label: "Unique ID",
            options: {
                filter: true,
                sort: true,
            }
        },


    ];
    const columns3 = [
        {
            name: "S.No",
            label: "S.No",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const rowIndex = tableMeta.rowIndex;
                    return rowIndex + 1;
                }
            },
        },
        {
            name: "TradePattern",
            label: "TradePattern",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SPattern",
            label: "Pattern Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "PatternTime",
            label: "Pattern Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Symbol",
            label: "Symbol",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "ETime",
            label: "Entry Time",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "EPrice",
            label: "Entry Price",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TradeType",
            label: "Trade Type",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Quantity",
            label: "Quantity",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Target",
            label: "Target",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "SL",
            label: "Stop Loss",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "TimeFrame",
            label: "Time Frame",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "Trade",
            label: "Trade",
            options: {
                filter: true,
                sort: true,
            }
        },
    ];


    return (
        <div className="container-fluid">
            <div className="row p-0">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-body" style={{ padding: "3px" }}>
                            <ul className="nav nav-tabs justify-content-center" id="myTab-2" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <a
                                        className={`nav-link ${activeTab1 === 'CurrentPosition' ? 'active' : ''}`}
                                        id="home-tab-justify"
                                        data-bs-toggle="tab"
                                        href="#home-justify"
                                        role="tab"
                                        aria-controls="home"
                                        aria-selected={activeTab1 === 'CurrentPosition'}
                                        onClick={() => setActiveTab1('CurrentPosition')}
                                    >
                                        Current Script
                                    </a>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <a
                                        className={`nav-link ${activeTab1 === 'OpenPosition' ? 'active' : ''}`}
                                        id="profile-tab-justify"
                                        data-bs-toggle="tab"
                                        href="#profile-justify"
                                        role="tab"
                                        aria-controls="profile"
                                        aria-selected={activeTab1 === 'OpenPosition'}
                                        onClick={() => setActiveTab1('OpenPosition')}
                                    >
                                        Open Position
                                    </a>
                                </li>
                            </ul>

                            <div className='row'>
                                {activeTab1 === 'CurrentPosition' && (
                                    <div className='d-flex'>
                                        <div className={`form-group ${activeTab == "currentScript" || activeTab == "copyScript" ? 'col-sm-6' : 'col-md-4'}`}>
                                            <div className='px-3'>
                                                <label>Add Via</label>
                                                <select className="form-select" required=""
                                                    onChange={(e) => { setActiveTab(e.target.value) }}
                                                    value={activeTab}>
                                                    <option value="currentScript">Current Script</option>
                                                    {/* <option value="copyScript">Copy Script</option> */}
                                                    <option value="group">Group Script</option>
                                                </select>
                                            </div>
                                        </div>
                                        {activeTab == "group" && (
                                            <div className={`form-group col-md-4`}>
                                                <div className='px-3'>
                                                    <label>Group Name</label>
                                                    <select className="form-select" required=""
                                                        onChange={(e) => { setGroup(e.target.value) }}
                                                        value={getGroup}>
                                                        <option value=''>Select Group Name</option>
                                                        <option value="copyScript">Copy Script</option>
                                                        {
                                                            getGroupName && getGroupName.data.map((item) => {
                                                                return <option value={item}>{item}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                        )}
                                        <div className={`form-group ${activeTab == "currentScript" || activeTab == "copyScript" ? 'col-sm-6' : 'col-md-4'}`}>
                                            <div className='px-3'>
                                                <label>Strategy Type</label>
                                                <select className="form-select" required=""
                                                    onChange={(e) => { setSubTab(e.target.value) }}
                                                    value={subTab}>
                                                    <option value="Scalping">Scalping</option>
                                                    <option value="Option Strategy">Option Strategy</option>
                                                    <option value="Pattern">Pattern Script</option>
                                                </select>
                                            </div>
                                        </div>


                                    </div>
                                )}
                            </div>
                            <div className="tab-content">
                                {activeTab1 === 'CurrentPosition' && (
                                    <>
                                        {/* {activeTab === 'copyScript' && (
                                            <div className="tab-pane fade show active" id="home-justify" role="tabpanel">
                                                <div className="tab-content mt-3">
                                                    {subTab && <Coptyscript data={subTab} selectedType={activeTab} data2={serviceStatus && serviceStatus} />}
                                                </div>
                                            </div>
                                        )} */}

                                        {activeTab === 'group' && (
                                            <div className="tab-pane fade show active" id="home-justify" role="tabpanel">
                                                <div className="tab-content mt-3">
                                                    {getGroup == "copyScript" ? subTab && <Coptyscript data={subTab} selectedType={activeTab} data2={serviceStatus && serviceStatus} />
                                                        :
                                                        subTab && <GroupScript data={subTab} selectedType={activeTab} GroupName={getGroup} data2={serviceStatus && serviceStatus} />

                                                    }

                                                </div>
                                            </div>
                                        )}
                                        {activeTab === 'currentScript' && (
                                            <div className="tab-pane fade show active" id="home-justify" role="tabpanel">
                                                <div className="tab-content mt-3">
                                                    {subTab && <CurrentScript data={subTab} selectedType={activeTab} data2={serviceStatus && serviceStatus} />}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>

                            <div className="tab-content">
                                {activeTab1 === 'OpenPosition' && (
                                    <>
                                        <div className='mt-4'>
                                            <h4>Scalping</h4>
                                            <FullDataTable
                                                columns={columns1}
                                                data={getPositionData.Scalping}
                                                checkBox={false}
                                            />
                                        </div>

                                        <div className='mt-4'>
                                            <h4>Option</h4>
                                            <FullDataTable
                                                columns={columns2}
                                                data={getPositionData.Option}
                                                checkBox={false}
                                            />
                                        </div>

                                        <div className='mt-4'>

                                            <h4>Pattern</h4>
                                            <FullDataTable
                                                columns={columns3}
                                                data={getPositionData.Pattern}
                                                checkBox={false}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userdashboard
