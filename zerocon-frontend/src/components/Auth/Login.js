import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import './Auth.css'

const initialLoginInfo = {
    contact_number: "",
    password: ""
}

const Login = (props) => {
    const [LoginInfo, setLoginInfo] = useState(initialLoginInfo);

    const inputHandler = (e) => {
        setLoginInfo({
            ...LoginInfo,
            [e.target.name]: e.target.value
        })
    }

    const login = () => {
        props.login(LoginInfo);
    }

    return (
        <div className="auth__container center-view bg-white rounded p-3">
            <div className="auth__formGroup">
                <i className="fas fa-mobile"></i>
                <input className="rounded" type="text" name="contact_number" maxLength={11} pattern="[0-9]*" value={LoginInfo.contact_number} placeholder="Contact Number" onChange={inputHandler} />
            </div>
            <div className="auth__formGroup mt-2">
                <i className="fas fa-key"></i>
                <input className="rounded" type="password" name="password" value={LoginInfo.password} placeholder="Password" onChange={inputHandler} />
            </div>
            <hr />
            <div className="w-100 d-flex justify-content-end">
                <Button variant="outline-secondary" onClick={props.close}>Cancel <i className="fas fa-times"></i></Button>
                <Button className="ml-2" variant="outline-secondary" onClick={login}>Login <i className="fas fa-sign-in-alt"></i></Button>
            </div>
            <p className="mb-0 mt-3">Don't have any account? <span className="ml-3 text-success cursor-pointer" onClick={props.toggle}>Signup here</span></p>
        </div>
    )
}

export default Login
