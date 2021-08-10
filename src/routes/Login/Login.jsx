import React, { useState } from "react";
import { Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Divider from "@material-ui/core/Divider";
import * as Yup from "yup";
import { loginUser } from "../../store/auth/Auth.actions";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import "./Login.css";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { error, isPending, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    if (isAuthenticated) {
        history.push("/");
    }

    const handleLogin = async (credentials) => {
        await dispatch(loginUser(credentials));
    };
    const formatError = (message) => {
        switch (message) {
            case "User not found":
                return "Incorrect email or password";
            case "Unauthorized":
                return "Incorrect email or password";
            default:
                return message;
        }
    };

    const credentialsSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email address is required"),
        password: Yup.string().required("Password is required"),
    });

    return (
        <div className="app">
            <div className="formWrapper">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={credentialsSchema}
                    validateOnBlur
                    onSubmit={async (values) => {
                        const { email, password } = values;
                        await handleLogin({ email, password });
                    }}
                >
                    <Form className="baseForm">
                        <h1 className="baseFormHeading">Login</h1>
                        <TextField
                            label="Email"
                            name="email"
                            id="email-input"
                        />
                        <TextField
                            label="Password"
                            name="password"
                            id="password-input"
                            type="password"
                            autoComplete="on"
                        />
                        {error && <div>{formatError(error)}</div>}
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            isLoading={isPending}
                        >
                            Submit
                        </Button>
                        <p>Forgotten your password?</p>
                        <Divider />
                        <div>
                            <div
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <p>Sign in with</p>
                            </div>
                            <div className="social-btn-container">
                                <p>Google to be implemented</p>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Login;