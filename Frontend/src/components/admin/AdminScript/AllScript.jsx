import React, { useState, useEffect } from 'react'
import { GetAllGroupService, GetGroupNames, DeleteScript } from '../../CommonAPI/Admin';
import { useNavigate } from 'react-router-dom';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import Loader from '../../../ExtraComponent/Loader'

import Swal from 'sweetalert2';
import Checkbox from '@mui/material/Checkbox';
import { columns2, columns1, columns } from './ScriptColumns'


const Addscript = () => {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)
    const [selectGroup, setSelectGroup] = useState('')
    const [selectStrategyType, setStrategyType] = useState('')
    const [GroupError, setGroupError] = useState('')
    const [stgError, setStgError] = useState('')
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [getAllService, setAllservice] = useState({
        loading: true,
        data: []
    })

    const [getGroupData, setGroupData] = useState({
        loading: true,
        data: []
    })


    const handleDelete = async (rowData) => {
        const index = rowData.rowIndex
        const data = {
            Groupname: getAllService.data[index].Username,
            Sop: selectStrategyType,
            Strategy: selectStrategyType == 'Option Strategy' ? getAllService.data[index].STG : selectStrategyType == 'Pattern' ? getAllService.data[index].TradePattern : getAllService.data[index].ScalpType,
            Symbol: selectStrategyType == 'Option Strategy' ? getAllService.data[index].MainSymbol : selectStrategyType == 'Pattern' ? getAllService.data[index].Symbol : getAllService.data[index].Symbol,
            ETPattern: selectStrategyType == 'Option Strategy' ? getAllService.data[index].Targettype : selectStrategyType == 'Pattern' ? getAllService.data[index].Pattern : "",
            Timeframe: selectStrategyType == 'Pattern' ? getAllService.data[index].TimeFrame : '',
            TType: selectStrategyType == 'Pattern' ? getAllService.data[index].TType : "",
            Group: selectStrategyType == 'Pattern' ? '' : getAllService.data[index].GroupN,
            Tradepattern: selectStrategyType == 'Pattern' ? getAllService.data[index].TradePattern : ''
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await DeleteScript(data);
                    if (response.Status) {
                        setRefresh(!refresh);
                        Swal.fire({
                            title: "Deleted!",
                            text: response.message,
                            icon: "success",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    } else {
                        Swal.fire({
                            title: "Error!",
                            text: response.message,
                            icon: "error",
                            timer: 1500,
                            timerProgressBar: true
                        });
                    }
                } catch (err) {
                    console.error("Error in delete script", err);
                    Swal.fire({
                        title: "Error!",
                        text: "Something went wrong while deleting.",
                        icon: "error",
                        timer: 1500,
                        timerProgressBar: true
                    });
                }
            }
        });
    }

    // 1
    const GetAllGroupDetails = async () => {
        try {
            await GetGroupNames()
                .then((response) => {

                    if (response.Status) {
                        setGroupData({
                            loading: false,
                            data: response.Data
                        })
                    }
                    else {
                        setGroupData({
                            loading: false,
                            data: []
                        })
                    }
                })
                .catch((err) => {
                    console.log("Error Group data fetch", err)
                })
        }
        catch {
            console.log("Error Group data fetch")
        }
    }

    useEffect(() => {
        GetAllGroupDetails()
    }, [])

    // 2
    const getAllgroupService = async () => {
        const data = { Strategy: selectStrategyType, Group: selectGroup }
        await GetAllGroupService(data)
            .then((response) => {
                if (response.Status) {

                    setAllservice({
                        loading: false,
                        data: response.Data
                    })

                }
                else {
                    setAllservice({
                        loading: false,
                        data: []
                    })

                }
            })
            .catch((err) => {
                console.log("Error in finding group service")
            })
    }

    const handleAddScript = () => {
        setFormSubmitted(true);
        const data = { selectGroup: selectGroup, selectStrategyType: selectStrategyType };
        if (selectGroup != '' && selectStrategyType != '') {
            navigate(selectStrategyType == "Scalping" ? '/admin/addscript/scalping' :
                selectStrategyType == "Option Strategy" ? '/admin/addscript/option' : '/admin/addscript/pattern', { state: { data } });
        }
    }

    useEffect(() => {
        setStrategyType('Scalping')
    }, []);

    useEffect(() => {
        if (formSubmitted) {
            if (selectGroup == '') {
                setGroupError("Select Group Name")
            } else {
                setGroupError("")
            }
            if (selectStrategyType == '') {
                setStgError("Select Strategy Type")
            } else {
                setStgError("")
            }
        }
    }, [selectGroup, selectStrategyType, formSubmitted])



    useEffect(() => {

        if (!getGroupData.loading && getGroupData.data.length > 0) {

            setSelectGroup(getGroupData && getGroupData.data[0].GroupName)

        }

    }, [getGroupData]);


    useEffect(() => {
        setStrategyType('Scalping')
    }, []);

    useEffect(() => {
        getAllgroupService()
    }, [selectStrategyType, selectGroup, refresh])

    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="iq-card">
                        <div className="iq-card-header d-flex justify-content-between">
                            <div className="iq-header-title">
                                <h4 className="card-title">All Scripts</h4>
                            </div>
                        </div>
                        <div className="iq-card-body">


                            <form className="was-validated ">
                                <div className='d-md-flex'>
                                    <div className="form-group ms-3 col-md-5">
                                        <label>Group Name</label>
                                        <select className="form-select "
                                            required=""
                                            onChange={(e) => setSelectGroup(e.target.value)}
                                            value={selectGroup}
                                        >
                                            <option value=''>Select Group Name</option>
                                            {getGroupData.data && getGroupData.data.map((item) => {
                                                return <>
                                                    <option value={item.GroupName}>{item.GroupName}</option>
                                                </>
                                            })}

                                        </select>
                                        {GroupError && <div style={{ "color": "red" }}>
                                            {GroupError}
                                        </div>}
                                    </div>
                                    <div className="form-group col-md-5 ms-3 ">
                                        <label>Strategy Type</label>
                                        <select className="form-select" required=""
                                            onChange={(e) => { setAllservice({ loading: true, data: [] }); setStrategyType(e.target.value) }}
                                            value={selectStrategyType}>
                                            <option value=''>Select Strategy Type</option>
                                            <option value={"Scalping"}>Scalping</option>
                                            <option value={"Option Strategy"}>Option Strategy</option>
                                            <option value={"Pattern"}>Pattern Script</option>
                                        </select>
                                        {stgError && <div style={{ "color": "red" }}>
                                            {stgError}
                                        </div>}
                                    </div>
                                    <div className='col-md-2 ms-3 mt-4 strategy'>
                                        <button style={{ height: "45px" }} className='btn btn-primary' onClick={handleAddScript}>Add Script</button>
                                    </div>
                                </div>
                            </form>


                            {getAllService.loading ? <Loader /> :
                                <FullDataTable
                                    columns={selectStrategyType == "Scalping" ? columns(handleDelete) : selectStrategyType == "Option Strategy" ? columns1(handleDelete) : selectStrategyType == "Pattern" ? columns2(handleDelete) : columns(handleDelete)}
                                    data={getAllService.data}
                                    checkBox={false}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Addscript
