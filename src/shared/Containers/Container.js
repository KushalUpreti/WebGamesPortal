import React from 'react';
import "./Container.css"

const Container = (props) => {
    return (
        <div style={{
            marginTop: `${props.marginTop}`,
            justifyContent: props.justify || "space-between",
            marginBottom: props.marginBottom || "0"
        }}
            className="Container">
            {props.children}
        </div>
    );
}

export default Container;