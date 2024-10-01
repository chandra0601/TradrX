import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { SquarePen } from 'lucide-react';
import { UploadImage, GetPanleName, GetHeaderImg2, GetHeaderImg1, GetLogo, Getfaviconimage } from '../../CommonAPI/Admin';
import AddForm from '../../../ExtraComponent/FormData';
import { useFormik } from 'formik';

const Strategygroup = () => {
    const [showModal, setShowModal] = useState(false);
    const [panleName, setPanleName] = useState('');
    const [panleLogo, setPanleLogo] = useState('');
    const [HeaderImg1, setHeaderImg1] = useState('');
    const [HeaderImg2, setHeaderImg2] = useState('');
    const [getfaviconImage, setFaviconImage] = useState('');




    const fetchPanelDetails = async () => {
        try {
            localStorage.removeItem('pannel_name');
            localStorage.removeItem('header_img1');
            localStorage.removeItem('logo');
            localStorage.removeItem('header_img2');
            localStorage.removeItem('fevicon');

            const panelNameRes = await GetPanleName();
            setPanleName(panelNameRes.Status ? panelNameRes.CompanyName : '');
            localStorage.setItem('pannel_name', panelNameRes.CompanyName);

            const headerimage1 = await GetHeaderImg1();
            setHeaderImg1(headerimage1.status ? headerimage1.image_data : '');
            localStorage.setItem('header_img1', "data:image/png;base64," + headerimage1.image_data);

            const logoRes = await GetLogo();
            setPanleLogo(logoRes.status ? logoRes.image_data : '');
            localStorage.setItem('logo', "data:image/png;base64," + logoRes.image_data);

            const headerimage2 = await GetHeaderImg2();
            setHeaderImg2(headerimage2.status ? headerimage2.image_data : '');
            localStorage.setItem('header_img2', "data:image/png;base64," + headerimage2.image_data);

            const faviconImage = await Getfaviconimage();
            setFaviconImage(faviconImage.status ? faviconImage.image_data : '');
            localStorage.setItem('fevicon', "data:image/png;base64," + faviconImage.image_data);
        } catch (err) {
            console.log("Error fetching panel details", err);
        }
    };

    useEffect(() => {
        fetchPanelDetails();
    }, []);

    
    const ReloadFun = () => {
        setTimeout(() => {
            console.log('Reload');
            window.location.reload();

        }, 2000);
    }

    const fields = [
        {
            name: 'PanelName',
            label: 'Panel Name',
            type: 'text',
            label_size: 12,
            col_size: 12,
        },
        {
            name: 'logo',
            label: 'Logo',
            type: 'file1',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'header_img1',
            label: 'Header Img1',
            type: 'file1',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'header_img2',
            label: 'Header Img2',
            type: 'file1',
            label_size: 12,
            col_size: 6,
        },
        {
            name: 'favicon',
            label: 'Favicon',
            type: 'file1',
            label_size: 12,
            col_size: 6,
        },
    ];

    const formik = useFormik({
        initialValues: {
            header_img2: "",
            header_img1: "",
            logo: "",
            PanelName: "",
            favicon: "",
        },
        validate: values => {
            const errors = {};
            if (!values.header_img1) errors.header_img1 = 'Please Select header img1';
            if (!values.header_img2) errors.header_img2 = 'Please Select header img2';
            if (!values.logo) errors.logo = 'Please Select Logo';
            if (!values.PanelName) errors.PanelName = 'Please Enter Panel Name';
            if (!values.favicon) errors.favicon = 'Please Select Favicon';
            return errors;
        },
        onSubmit: async (values) => {
            const data = {
                icon: values.header_img1,
                frontimage: values.header_img2,
                logo: values.logo,
                company_name: values.PanelName,
                favicon: values.favicon,
            };
            try {
                const response = await UploadImage(data);
                if (response.Status) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Data Added Successfully',
                        
                    });
                    setShowModal(false);
                    formik.resetForm();
                    fetchPanelDetails();
                    // window.location.reload();
                    ReloadFun()
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Data Not Added',
                    });
                }
            } catch (err) {
                console.error("Error in Adding Data", err);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while adding data.',
                });
            }
        }
    });

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="card h-100">
                        <div className="card-header d-flex justify-content-between">
                            <h4 className="card-title">System</h4>
                        </div>

                        <div className="table-responsive">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">SR. No</th>
                                        <th scope="col">Panel Name</th>
                                        <th scope="col">Favicon</th>
                                        <th scope="col">Header Image1</th>
                                        <th scope="col">Header Image2</th>
                                        <th scope="col">Login Image</th>
                                        <th scope="col">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{panleName}</td>
                                        <td>{getfaviconImage && <img src={`data:image/png;base64,${getfaviconImage}`} className='api_img' alt="Panel Front Image" style={{ width: '70px', height: '70px' }} />}</td>
                                        <td>{HeaderImg1 && <img src={`data:image/png;base64,${HeaderImg1}`} className='api_img' alt="Panel Icon" style={{ width: '70px', height: '70px' }} />}</td>
                                        <td>{HeaderImg2 && <img src={`data:image/png;base64,${HeaderImg2}`} className='api_img' alt="Panel Front Image" style={{ width: '70px', height: '70px' }} />}</td>
                                        <td>{panleLogo && <img src={`data:image/png;base64,${panleLogo}`} className='api_img' alt="Panel Logo" style={{ width: '70px', height: '70px' }} />}</td>
                                        <td><SquarePen onClick={() => setShowModal(true)} /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <div className="modal fade show d-flex" role="dialog" style={{ display: 'block' }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Update Panel</h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowModal(false);
                                        formik.resetForm();
                                    }}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <AddForm
                                    fields={fields}
                                    btn_name="Update"
                                    formik={formik}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Strategygroup;
