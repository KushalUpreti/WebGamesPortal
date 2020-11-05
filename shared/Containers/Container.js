import React from 'react';
import "./Container.css"

const Container = (props) => {
    return (
        <div style={{ marginTop: `${props.marginTop}` }} className="Container">
            {props.children}
        </div>
    );
}

export default Container;