import React, { useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Grid, Button, Link, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, CREATE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Login = () => {
    const [formState, setFormState] = useState({ email: "", password: "" });
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [createUser, { err, dat }] = useMutation(CREATE_USER);
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // update state based on form input changes
    const handleFormChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };


    // submit Login form
    const handleLoginSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...formState },
            });

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
        // clear form values
        setFormState({
            email: "",
            password: "",
        });
    };


    // submit Signup form
    const handleSignupSubmit = async (event) => {
        event.preventDefault();

        try {
            const { dat } = await createUser({
                variables: { ...formState },
            });

            Auth.login(data.createUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Login" {...a11yProps(0)} />
                    <Tab label="Sign up" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="right"
                    justifyContent="right"
                    style={{ minHeight: "25vh" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            color: "#fff",
                        }}
                    >
                        <Grid item>
                            <Box
                                component="form"
                                sx={{
                                    "& .MuiTextField-root": { m: 1, minWidth: "300px", },
                                    borderColor: "teal",
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleLoginSubmit}
                            >
                                <div>
                                    <TextField
                                        id="login-email-input"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        autoComplete="current-email"
                                        value={formState.email}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="login-password-input"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        // sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                                        value={formState.password}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <Button type="submit">Login</Button>
                                </div>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="right"
                    justifyContent="right"
                    style={{ minHeight: "25vh" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            color: "#fff",
                        }}
                    >
                        <Grid item>
                            <Box
                                component="form"
                                sx={{
                                    "& .MuiTextField-root": { m: 1, minWidth: "300px", },
                                    borderColor: "teal",
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSignupSubmit}
                            >
                                <div>
                                    <TextField
                                        id="signup-username-input"
                                        label="Username"
                                        type="username"
                                        name="username"
                                        autoComplete="current-username"
                                        value={formState.username}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="signup-email-input"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        autoComplete="current-email"
                                        value={formState.email}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        id="signup-password-input"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        autoComplete="current-password"
                                        // sx={{ input: { color: "#fff" }, label: { color: "#fff" } }}
                                        value={formState.password}
                                        onChange={handleFormChange}
                                    />
                                </div>
                                <div>
                                    <Button type="submit">Sign up</Button>
                                </div>
                            </Box>
                        </Grid>
                    </Box>
                </Grid>
            </TabPanel>
        </Box>
    );
};

export default Login;