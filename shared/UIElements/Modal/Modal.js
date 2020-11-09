import React from 'react';
import './Modal.css'

const Modal = (props) => {
    return (
        <React.Fragment>
            {/* TODO: BACKDROP */}
            <div className="Modal" style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? "1" : "0"
            }}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default Modal;