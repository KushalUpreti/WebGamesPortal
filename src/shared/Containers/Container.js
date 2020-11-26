import React from 'react';
import "./Container.css";
import './Container2.css';

const Container = (props) => {
    let a = "Container";
    if (props.scroll) {
        a = "Container2"
    }
    return (
        <div style={{
            marginTop: `${props.marginTop}`,
            justifyContent: props.justify || "space-between",
            marginBottom: props.marginBottom || "0"
        }}
            className={a}>
            {props.children}
        </div>
    );
}

export default Container;