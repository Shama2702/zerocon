import React, { useState } from 'react'
import './Auth.css'
import { Button } from 'react-bootstrap'

const initialRegInfo = {
    first_name: "",
    last_name: "",
    gender: "",
    contact_number: "",
    address: "",
    password: ""
}

const Registration = (props) => {
    const [RegInfo, setRegInfo] = useState(initialRegInfo)

    const registration = () => {
        props.registration(RegInfo);
    }

    const inputHandler = (e) => {
        setRegInfo({
            ...RegInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="auth__container center-view bg-white rounded p-3">
            <div className="auth__formGroup">
                <i className="fas fa-user"></i>
                <input className="rounded" type="text" name="first_name" value={RegInfo.first_name} placeholder="First Name" onChange={inputHandler} />
            </div>
            <div className="auth__formGroup mt-2">
                <i className="fas fa-user"></i>
                <input className="rounded" type="text" name="last_name" value={RegInfo.last_name} placeholder="Last Name" onChange={inputHandler} />
            </div>
            <div className="auth__formGroup mt-2">
                <i className="fas fa-mobile"></i>
                <input className="rounded" type="text" name="contact_number" maxLength={11} pattern="[0-9]*" value={RegInfo.contact_number} placeholder="Contact Number" onChange={inputHandler} />
            </div>
            <div className="auth__formGroup mt-2">
                <i className="fas fa-house-user"></i>
                <textarea className="w-100" name="address" placeholder="Address" onChange={inputHandler}></textarea>
            </div>
            <div className="auth__formGroup mt-2">
                <i className="fas fa-key"></i>
                <input className="rounded" type="password" name="password" value={RegInfo.password} placeholder="Password" onChange={inputHandler} />
            </div>
            <div className="auth__formGroup d-flex justify-content-start mt-2">
                <label htmlFor="genderMale">Male</label>
                <input className="rounded w-25 mt-1" type="radio" name="gender" id="genderMale" value="male" checked={RegInfo.gender === 'male'}  onChange={inputHandler} />
                <label htmlFor="genderFemale">Female</label>
                <input className="rounded w-25 mt-1" type="radio" name="gender" id="genderFemale" value="female" checked={RegInfo.gender === 'female'} onChange={inputHandler} />
            </div>
            <hr />
            <div className="w-100 d-flex justify-content-end">
                <Button variant="outline-secondary" onClick={props.close}>Cancel <i className="fas fa-times"></i></Button>
                <Button className="ml-2" variant="outline-secondary" onClick={registration}>Registration <i className="fas fa-sign-in-alt"></i></Button>
            </div>
            <p className="mb-0 mt-3">Already have an account? <span className="ml-3 text-success cursor-pointer" onClick={props.toggle}>Login here</span></p>
        </div>
    )
}

export default Registration
