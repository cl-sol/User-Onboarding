import React, {useState} from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    return (
        <form 
            onSubmit = {e => {
                e.preventDefault();
        }}> 
            <label htmlFor = "name">Name:
                <input
                    id = "name"
                    type = "text"
                    name = "name"
                    placeholder = "Type your name here"
                    //value = 
                    //onChange =
                />
            </label>
            <label htmlFor = "email">Email:
                <input
                    id = "email"
                    type = "text"
                    name = "email"
                    placeholder = "Type your email here"
                    //value = 
                    //onChange =
                />
            </label>
            <label htmlFor = "password">Password:
                <input
                    id = "password"
                    type = "text"
                    name = "password"
                    placeholder = "Type your password here"
                    //value = 
                    //onChange =
                />
            </label>
            <label htmlFor = "terms">
                <input
                    id = "terms"
                    type = "checkbox"
                    name = "terms"
                    //checked = 
                    //onChange = 
                />
            </label>
            I agree to the Terms and Conditions
            <button type = "submit"> Click here to submit!</button>
        </form>
    )
}

export default Form;