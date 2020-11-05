import React from 'react';
import './Spinner.css'

const Spinner = () => {
    return (
        <React.Fragment>
            <div className="loader">
                <div className="face">
                    <div className="circle"></div>
                </div>
                <div className="face">
                    <div className="circle"></div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Spinner;