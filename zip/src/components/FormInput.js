import { useState } from 'react';
import './formInput.css';

const FormInput = (props) => {
    const { errorMessage, label, onChange, id, ...inputProps } = props
    const [focused, setFocused] = useState(false)

const focusHandler = (e) => {
    setFocused(true)
}
//  console.log(inputProps)
    return (
        <div className="formInput">
            <label>{label}</label>
            <input 
            {...inputProps} 
            onChange={onChange} 
            onBlur={focusHandler} 
            focused={focused.toString()}
            onFocus={()=> 
                inputProps.name === "confirmPassword"
                 && setFocused(true)}
            />
            <span>{errorMessage}</span>
        </div>
    )
}

export default FormInput