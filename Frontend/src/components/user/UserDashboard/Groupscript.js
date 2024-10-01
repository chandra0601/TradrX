import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FullDataTable from '../../../ExtraComponent/CommanDataTable';
import { GetAllGroupService } from '../../CommonAPI/Admin';
import Loader from '../../../ExtraComponent/Loader';
import { getColumns, getColumns1, getColumns2 } from './Columns';
import Swal from 'sweetalert2';

const GroupScript = ({ data, selectedType, GroupName, data2 }) => {
    const stgType = data
    const userName = localStorage.getItem('name')


    const navigate = useNavigate();
    const [selectGroup, setSelectGroup] = useState('');
    const [getAllService, setAllservice] = useState({
        loading: true,
        data: []
    });



    const handleAddScript1 = (data1) => {
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
           

            const selectedRowIndex = data1.rowIndex;
            const selectedRow = getAllService.data[selectedRowIndex];
            const data = { selectStrategyType: "Scalping",type : "group" ,  ...selectedRow };
         
            navigate('/user/addscript/scalping', { state: { data } });
        }
    }

    const handleAddScript2 = (data1) => {
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

            const selectedRowIndex = data1.rowIndex;
            const selectedRow = getAllService.data[selectedRowIndex];
            const data = { selectGroup: selectGroup, selectStrategyType: 'Option Strategy', type : "group" ,  ...selectedRow };
            navigate('/user/addscript/option', { state: { data } });
        }
    }

    const handleAddScript3 = (data1) => {
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
            const selectedRowIndex = data1.rowIndex;
            const selectedRow = getAllService.data[selectedRowIndex];
            const data = { selectGroup: selectGroup, selectStrategyType: 'Pattern', type : "group" ,  ...selectedRow };
            navigate('/user/addscript/pattern', { state: { data } });
        }
    }



    const GetAllUserScriptDetails = async () => {


        const data = { Strategy: stgType, Group: GroupName }

        await GetAllGroupService(data)
            .then((response) => {
                if (response.Status) {
                    setAllservice({
                        loading: false,
                        data: response.Data

                    });
                } else {
                    setAllservice({
                        loading: false,
                        data: []
                    });
                }
            })
            .catch((err) => {
                console.log("Error in finding group service", err);
            });
    }

    useEffect(() => {
        GetAllUserScriptDetails();
    }, [selectedType, stgType, GroupName]);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-12">
                    <div className="iq-card">
                        <div className="iq-card-body " style={{ padding: '3px' }}>
                            <div className="tab-content" id="myTabContent-3">
                                <div className="tab-pane fade show active" id="home-justify" role="tabpanel" aria-labelledby="home-tab-justify">
                                    {data && (
                                        <>
                                            <div className="iq-card-body " style={{ padding: '3px' }}>
                                                <div className="table-responsive">
                                                    {getAllService.loading ? <Loader /> :
                                                        <FullDataTable
                                                            columns={data === "Scalping" ? getColumns(handleAddScript1) : data === "Option Strategy" ? getColumns1(handleAddScript2) : data === "Pattern" ? getColumns2(handleAddScript3) : getColumns(handleAddScript1)}
                                                            data={getAllService.data}
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
        </div>
    );
}

export default GroupScript;
