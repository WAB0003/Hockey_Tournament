import React, {useState} from 'react'
// import { useHistory } from 'react-router-dom' <-- depricated with version 6
import { useNavigate } from 'react-router-dom'
// import styled from "styled-components";
import { useFormik, Form } from "formik"
import * as yup from "yup"

function Authentication({updateUser}) {
    const [signUp, setSignUp] = useState(false)
    const navigate = useNavigate()
    const [errors, setErrors] = useState(null)

    const handleClick = () => setSignUp((signUp) => !signUp)

    const formSchema = yup.object().shape({
        username: yup.string().required("Enter a username"),
        email: yup.string().email(),
        password: yup.string().required("Please enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(signUp ? "/signup" : "/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok){
                    res.json()
                    .then(user => {
                        updateUser(user)
                        setErrors(null)
                        navigate.push("/")
                    })
                } else {
                    res.json().then(setErrors)
                }
            })
        }
    })

    return (
        <>
        {Object.keys(formik.errors).map(input => <h2 style={{color:"red"}}> {formik.errors[input]}</h2>)}
        {errors && <h2 style={{color:"red"}}> {errors.message}</h2>}
        <h2>Please Login or Sign Up!</h2>
        <h2>{signUp?"Already a user?":"Not a user?"}</h2>
        <button onClick={handleClick}>{signUp?"Log In":"Register"}</button>
        <Form onSubmit={formik.handleSubmit}>
            <label>
                Username
            </label>
            <input type="text" name="username" value={formik.values.username} onChange={formik.handleChange} />
            <label>
                Password
            </label>
            <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />
            {signUp&&(
                <>
                <label>
                Email
                </label>
                <input type="text" name="email" value={formik.values.email} onChange={formik.handleChange} />
                </>
            )}
            <input type="submit" value={signUp?"Sign Up":"Log In"} />
        </Form>
        </>
    )
}

export default Authentication

// // this is a styled component created using the styled-components library
// // it lets you inject css directly into your js
// // and create custom, reusable components that are prestyled
// export const Form = styled.form`
// display:flex;
// flex-direction:column;
// width: 400px;
// margin:auto;
// font-family:Arial;
// font-size:30px;
// input[type=submit]{
//   background-color:#42ddf5;
//   color: white;
//   height:40px;
//   font-family:Arial;
//   font-size:30px;
//   margin-top:10px;
//   margin-bottom:10px;
// }
// `