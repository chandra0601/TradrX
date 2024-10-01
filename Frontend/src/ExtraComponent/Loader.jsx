import React from 'react';
import RiseLoader from 'react-spinners/RiseLoader';

// Define the Loader component
const Loader = () => {
    return (
        <div className='d-flex justify-content-center align-items-center'  style={{height:"50vh"}} >
            
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};


export default Loader;
