import React from 'react';
import '../../../UI/Modal/Button/Button.css';

const button = (props) => (
    <div>
        <button
        disabled={props.disabled}
        className={["Button",[props.btnType]].join(" ")}
    onClick={props.clicked}>{props.children}</button>
    </div>
);

export default button;