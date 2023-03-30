import React, { useState } from 'react'
import Login from './Login'
import Registration from './Registration'

import {connect} from 'react-redux'
import {
    login,
    registration
} from './../../redux'
const Auth = (props) => {

    const [View, setView] = useState('login')

    const toggleAuth = () => {
        setView(View === 'login' ? 'registration' : 'login');
    }
    return (
        <div className="bg-ovarlay">
            {View === 'login' ?
                <Login
                    toggle={toggleAuth} 
                    close={props.close}
                    login = {props.login}/>
                :
                <Registration
                    toggle={toggleAuth} 
                    close={props.close}
                    registration={props.registration}/>}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        me: state.user.me
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (data) => dispatch(login(data)),
        registration: (data) => dispatch(registration(data))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Auth)