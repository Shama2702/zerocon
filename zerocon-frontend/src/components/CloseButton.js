import React from 'react'
import './CloseButton.css'

export const CloseButton = ({action}) => {
    return (
        <div className="closeButton__container" onClick={action}>
            
        </div>
    )
}

export default CloseButton
