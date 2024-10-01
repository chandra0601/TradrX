import React from 'react'
import DiscriptionData from './DiscriptionData'

const Discription = () => {
    return (
        <div>
            <div className="iq-card">
                <div className="iq-card-header d-flex justify-content-between">
                    <div className="iq-header-title">
                        <h4 className="card-title">Description</h4>
                    </div>
                </div>
                <div className="iq-card-body">
                    <ul className="nav nav-pills mb-3 nav-fill" id="pills-tab-1" role="tablist">
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link active"
                                id="pills-home-tab-fill"
                                data-bs-toggle="pill"
                                href="#pills-home-fill"
                                role="tab"
                                aria-controls="pills-home"
                                aria-selected="true"
                            >
                                Scalping
                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="pills-profile-tab-fill"
                                data-bs-toggle="pill"
                                href="#pills-profile-fill"
                                role="tab"
                                aria-controls="pills-profile"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                Option

                            </a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a
                                className="nav-link"
                                id="pills-contact-tab-fill"
                                data-bs-toggle="pill"
                                href="#pills-contact-fill"
                                role="tab"
                                aria-controls="pills-contact"
                                aria-selected="false"
                                tabIndex={-1}
                            >
                                Pattern
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent-1">
                        <div
                            className="tab-pane fade active show"
                            id="pills-home-fill"
                            role="tabpanel"
                            aria-labelledby="pills-home-tab-fill"
                        >
                            <DiscriptionData Type={'Scalping'}/>
                             
                             

                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-profile-fill"
                            role="tabpanel"
                            aria-labelledby="pills-profile-tab-fill"
                        >
                             <DiscriptionData Type={'Option'}/>
                        </div>
                        <div
                            className="tab-pane fade"
                            id="pills-contact-fill"
                            role="tabpanel"
                            aria-labelledby="pills-contact-tab-fill"
                        >
                             <DiscriptionData Type={'Pattern'}/>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Discription

