import React from 'react';
import './RouteButton.sass'
import {Route} from "../../utils/interface";

const RouteButton:any = (props:Route) => {
    return (
        <a onClick={props.onClick} href={props.path} className={'route-button'}>
            {props.name}
        </a>
    );
};

export default RouteButton;
