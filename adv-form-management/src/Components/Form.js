import React, {useState, useEffect} from "react";
import * as yup from "yup";
import axios from "axios";

const Form = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        email: yup
            .string()
            .email("Must be a valid email address")
            .required("Email is a required field"),
        password: yup.string().required("Password is a required field"),
        terms: yup.boolean().oneOf([true], "Please agree to our terms and conditions")
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });

    const validate = e => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then(valid => {
                setErrors({
                    ...errors,
                    [e.target.name]:""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [e.target.name]: err.errors[0]
                });
            });
    };

    const inputChange = e => {
        e.persist();
        let newFormData = {
            ...formState,
            [e.target.name]:
                e.target.type === "checkbox" ? e.target.checked : e.target.value
        };
        validate(e);
        setFormState(newFormData);
    }

    const [post, setPost] = useState([]);

    const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                //console.log(res)
                setPost([...post, res.data]);
                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms:""
                });
                console.log("success", post);
            })
            .catch(err => console.log(err));
    };

    const [buttonDisabled, setButtonDisabled] = useState(true);
    useEffect(() => {
        formSchema.isValid(formState)
            .then(valid => {
                console.log(formState)
                console.log("valid");
                setButtonDisabled(!valid);

        });
    }, [formState]);

    return (
        <form 
            onSubmit = {formSubmit}> 
            <label htmlFor = "name">Name:
                <input
                    id = "name"
                    type = "text"
                    name = "name"
                    placeholder = "Type your name here"
                    value = {formState.name}
                    onChange = {inputChange}
                />
            </label>
            {errors.name.length > 0 ? (
                <p className="error">{errors.name}</p>
            ) : null}
            <label htmlFor = "email">Email:
                <input
                    id = "email"
                    type = "text"
                    name = "email"
                    placeholder = "Type your email here"
                    value = {formState.email}
                    onChange = {inputChange}
                />
            </label>
            {errors.name.length > 0 ? (
                <p className="error">{errors.email}</p>
            ) : null}
            <label htmlFor = "password">Password:
                <input
                    id = "password"
                    type = "text"
                    name = "password"
                    placeholder = "Type your password here"
                    value = {formState.password}
                    onChange = {inputChange}
                />
            </label>
            {errors.name.length > 0 ? (
                <p className="error">{errors.password}</p>
            ) : null}
            <label htmlFor = "terms">
                <input
                    id = "terms"
                    type = "checkbox"
                    name = "terms"
                    value = {formState.terms}
                    onChange = {inputChange}
                />
            </label>
            {errors.name.length > 0 ? (
                <p className="error">{errors.terms}</p>
            ) : null}
            I agree to the Terms and Conditions
            <button type = "submit" disabled = {setButtonDisabled}> Click here to submit!</button>
        </form>
    );
}

export default Form;