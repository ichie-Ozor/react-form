import React, { useState } from 'react'
import "./App.css";
import FormInput from "./components/FormInput";


function App() {
  const [values, setValue] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  })

//  console.log(values)

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:"Username should be 3-16 characters and shouln't include any special character!",
      label: "Username",
      pattern:"^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage:"It should be a valid email address!",
      label: "Email",
      required: true

    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday"
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:"Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern:`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*</>])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "confirm Password",
      errorMessage:"Password don't match!",
      label: "confirm Password",
      pattern: values.password,
      required: true
    }
  ]

const submitHandler = async(e) => {
  e.preventDefault()
  // console.log(values,'look at me here')

  try {
    const response = await fetch('http://localhost:5000/account', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const result = await response.json()
    console.log("Success:", result)
  }catch (error){
    console.log("Error:", error)
  }

  
  // const data = new FormData(e.target)  We can use this method if we dont want to it to re-render. useref can also be used.
  // console.log(Object.fromEntries(data.entries()))
}

const onChange = (e) => {
  console.log(e.target)
  setValue({...values, [e.target.name]: e.target.value})
}
// console.log(values)

  return (
    <div className="App">
      <form onSubmit={submitHandler} action='POST'>
      <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput  
          key={input.id} 
          {...input} 
          value={values[input.name]} 
          onChange={onChange}
          />
        ))}
      
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
