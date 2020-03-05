import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "../../store/actions/authActions";

import { Button, Form, Segment, Grid, Divider, Input } from "semantic-ui-react";

const SignIn = () => {
    const [errors, setError] = useState({
        emailError: "",
        passwordError: ""
    });
    const { emailError, passwordError } = errors;

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const { email, password } = credentials;

    const dispatch = useDispatch();
    const authError = useSelector(state => state.auth.authError);

    useEffect(() => {
        // Translating AuthErrors in Greek
        switch (authError) {
            case "auth/invalid-email":
                setError({ passwordError: "", emailError: "Λάθος Email" });
                break;
            case "auth/wrong-password":
                setError({ emailError: "", passwordError: "Λάθος κωδικός" });
                break;
            default:
                setError({ ...errors });
        }
    }, [authError]);

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(
            signInAction({
                email: email,
                password: password
            })
        );
    };

    return (
        <Segment placeholder>
            <Grid columns={2} relaxed="very" stackable>
                <Grid.Column>
                    <Form onSubmit={handleSubmit} style={{ width: 500 }}>
                        <Form.Field
                            style={{ width: 250 }}
                            control={Input}
                            icon="user"
                            iconPosition="left"
                            label={"Email"}
                            value={email}
                            required
                            onChange={e => setCredentials({ ...credentials, email: e.target.value })}
                            error={
                                emailError
                                    ? {
                                          content: emailError
                                      }
                                    : null
                            }
                        />
                        <Form.Field
                            style={{ width: 250 }}
                            control={Input}
                            icon="lock"
                            iconPosition="left"
                            label="Κωδικός"
                            type="password"
                            value={password}
                            required
                            onChange={e => setCredentials({ ...credentials, password: e.target.value })}
                            error={
                                passwordError
                                    ? {
                                          content: passwordError
                                      }
                                    : null
                            }
                        />

                        <Button primary type="submit">
                            Σύνδεση
                        </Button>
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign="middle">
                    <Link to="/register">
                        <Button type="submit">Εγγραφή</Button>
                    </Link>
                </Grid.Column>
            </Grid>

            <Divider vertical>Ή</Divider>
        </Segment>
    );
};

export default SignIn;
