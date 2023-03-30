import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Shop from './Shop';
const ShopControl = (props) => {
    // console.log(props.match.path);
    return (
        <>
            <Switch>
                <Route exact path={props.match.path}>
                    <Shop />
                </Route>
                <Route exact path={`${props.match.path}/sunglass`}>
                    <Shop category="sunglass" />
                </Route>
                <Route exact path={`${props.match.path}/cap`}>
                    <Shop category="cap" />
                </Route>
            </Switch>
        </>
    )
}

export default ShopControl
