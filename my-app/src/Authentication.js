import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Message } from "semantic-ui-react";

function Authentication({ updateUser }) {
  const [signUp, setSignUp] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState(null);
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: ""
  });

  const handleClick = () => setSignUp((signUp) => !signUp);

  const validateForm = () => {
    let isValid = true;
    let errors = {};

    if (!formValues.username) {
      isValid = false;
      errors.username = "Enter a username";
    }
    if (!formValues.password) {
      isValid = false;
      errors.password = "Please enter a password";
    }
    if (signUp && !formValues.email) {
      isValid = false;
      errors.email = "Enter a email";
    }

    setErrors(errors);

    return isValid;
  }

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    // e.preventDefault()
    if (validateForm()) {
      fetch(signUp ? "/signup" : "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formValues)
      })
      .then(res => {
        if (res.ok){
          res.json()
          .then(user => {
            console.log(user)
            updateUser(user)
            setErrors(null)
            // navigate.push("/")
            navigate("/")
          })
        } else {
          res.json().then(setErrors)
        }
      })
    }
  }

  return (
    <>
      {errors && Object.keys(errors).map(input => <Message error>{errors[input]}</Message>)}
      {errors && <Message error>{errors.message}</Message>}
      <h2>Please Login or Sign Up!</h2>
      <h2>{signUp ? "Already a user?" : "Not a user?"}</h2>
      <Button onClick={handleClick}>{signUp ? "Log In" : "Register"}</Button>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>Username</label>
          <input type="text" name="username" value={formValues.username} onChange={handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="password" value={formValues.password} onChange={handleChange} />
        </Form.Field>
        {signUp && (
          <Form.Field>
            <label>Email</label>
            <input type="text" name="email" value={formValues.email} onChange={handleChange} />
          </Form.Field>
        )}
        <Button type="submit">{signUp ? "Sign Up" : "Log In"}</Button>
      </Form>
    </>
  );
}

export default Authentication;




// import React, {useState} from 'react'
// // import { useHistory } from 'react-router-dom' <-- depricated with version 6
// import { useNavigate } from 'react-router-dom'
// // import styled from "styled-components";
// import { useFormik } from "formik"
// import * as yup from "yup"

// function Authentication({updateUser}) {
//     const [signUp, setSignUp] = useState(false)
//     const navigate = useNavigate()
//     const [errors, setErrors] = useState(null)

//     const handleClick = () => setSignUp((signUp) => !signUp)

//     const formSchema = yup.object().shape({
//         username: yup.string().required("Enter a username"),
//         email: yup.string().email(),
//         password: yup.string().required("Please enter a password")
//     })

//     const formik = useFormik({
//         initialValues: {
//             username: "",
//             email: "",
//             password: ""
//         },
//         validationSchema: formSchema,
//         onSubmit: (values) => {
//             fetch(signUp ? "/signup" : "/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(values)
//             })
//             .then(res => {
//                 if (res.ok){
//                     res.json()
//                     .then(user => {
//                         updateUser(user)
//                         setErrors(null)
//                         navigate.push("/")
//                     })
//                 } else {
//                     res.json().then(setErrors)
//                 }
//             })
//         }
//     })

//     return (
//         <>
//         {Object.keys(formik.errors).map(input => <h2 style={{color:"red"}}> {formik.errors[input]}</h2>)}
//         {errors && <h2 style={{color:"red"}}> {errors.message}</h2>}
//         <h2>Please Login or Sign Up!</h2>
//         <h2>{signUp?"Already a user?":"Not a user?"}</h2>
//         <button onClick={handleClick}>{signUp?"Log In":"Register"}</button>
//         <form onSubmit={formik.handleSubmit}>
//             <label>
//                 Username
//             </label>
//             <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
//             <label>
//                 Password
//             </label>
//             <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
//             {signUp&&(
//                 <>
//                 <label>
//                 Email
//                 </label>
//                 <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
//                 </>
//             )}
//             <input type="submit" value={signUp?"Sign Up":"Log In"} />
//         </form>
//         </>
//     )
// }

// export default Authentication

// // // this is a styled component created using the styled-components library
// // // it lets you inject css directly into your js
// // // and create custom, reusable components that are prestyled
// // export const Form = styled.form`
// // display:flex;
// // flex-direction:column;
// // width: 400px;
// // margin:auto;
// // font-family:Arial;
// // font-size:30px;
// // input[type=submit]{
// //   background-color:#42ddf5;
// //   color: white;
// //   height:40px;
// //   font-family:Arial;
// //   font-size:30px;
// //   margin-top:10px;
// //   margin-bottom:10px;
// // }
// // `