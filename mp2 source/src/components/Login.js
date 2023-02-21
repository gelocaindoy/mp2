    import { useState, useEffect } from "react";
    import { useHistory } from "react-router-dom";
    import {
    Box,
    Button,
    TextField,
    Typography,
    Grid,
    } from "@material-ui/core";
    import firebase from "./firebaseConfig";
    import ScaleLoader from "react-spinners/ScaleLoader";
    import gIcon from "../img/g-normal.png";
    import { css } from "@emotion/react";
    import "./google.css";
    import logo from "../img/gelo.png"; 

    const override = css`
    display: block;
    margin: 0 auto;
    margin-top: 45px;
    border-color: red;
    `;

    const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [userType, setUserType] = useState(null);

    const history = useHistory();

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            console.log("User", user);
            setIsLoggedIn(true);
        } else {
            history.push("/login");
            setIsLoggedIn(false);
        }
        });

        return () => unsubscribe();
    }, [history]);
    //check the current user type
    useEffect(() => {
        if (userType) {
        switch (userType) {
            case "admin":
            history.push("/admin");
            break;
            case "hr":
            history.push("/hr");
            break;
            case "employee":
            history.push("/employee");
            break;
            default:
            history.push("/login");
        }
        }
    }, [userType, history]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
        await firebase.auth().signInWithEmailAndPassword(email, password);

        const user = firebase.auth().currentUser;
        const employeeRefs = firebase.database().ref("employees");
        employeeRefs
            .orderByChild("email")
            .equalTo(user.email)
            .on("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const employeeData = childSnapshot.val();

                // Save employee data to local storage
                localStorage.setItem("employeeData", JSON.stringify(employeeData));

                // Redirect user based on their account type
                setUserType(employeeData.accountType);
            });
            });

        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(user));
        } catch (error) {
        console.error(error.message);
        if (error.code === "auth/wrong-password") {
            setError("Please enter the correct password.");
        } else if (error.code === "auth/too-many-requests") {
            setError(
            "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later."
            );
        } else if (error.code === "auth/user-not-found") {
            setError("There is no user record for this email. Please sign up");
        } else {
            setError(error.message);
        }
        } finally {
        setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await firebase.auth().signInWithPopup(provider);
        setCurrentUser(result.user);
        setUser(result.user);

        const employeeRefs = firebase.database().ref("employees");
        employeeRefs.once("value", (snapshot) => {
            const employees = snapshot.val();
            let emailFound = false;
            let employeeId;
            for (let id in employees) {
            if (employees[id].email === result.user.email) {
                emailFound = true;
                employeeId = id;
                break;
            }
            }

            if (!emailFound) {
            employeeRefs.push({
                email: result.user.email,
                accountType: "employee", // Set default account type to employee
            });
            } else {
            console.log(`User with email ${result.user.email} already exists.`);
            }

            // Save employee data to local storage
            if (employeeId && employees[employeeId] != null) {
            localStorage.setItem(
                "employeeData",
                JSON.stringify(employees[employeeId])
            );
            }

            // Redirect user based on their account type
            if (employeeId && employees[employeeId] != null) {
            const { accountType } = employees[employeeId];
            setUserType(accountType);
            console.log("account type:", accountType);
            }
        });
        } catch (error) {
        console.error(error.message);
        console.log(error);
        } finally {
        setIsLoading(false);
        }
    };

    return (
        <>
        <Box display="flex" justifyContent="center">
            <Box maxWidth={450} mt={5}>
            <Box display="flex" justifyContent="center">
            <img src={logo} alt="Logo" style={{ height: "100px" }} />
          </Box>
            <Typography align="center" variant="h2">
                Log In
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <div component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                style={{ marginTop: "16px" }}
                />
                <TextField
                type="password"
                label="Password"
                variant="outlined"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                style={{ marginTop: "16px" }}
                />
                <Grid mt={5}>
                <Grid item xs={12}>
                    <Button
                    fullWidth
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    >
                    Log In
                    </Button>
                </Grid>
                </Grid>
                <Grid mt={1}>
                <Grid item xs={12}>
                    <Typography align="center" color="textSecondary">
                    OR
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Button
                    fullWidth
                    style={{ marginTop: "16px", marginBottom: "16px" }}
                    onClick={() => handleGoogleLogin()}
                    variant="contained"
                    >
                    <img
                        src={gIcon}
                        alt="google icon"
                        style={{ height: "24px", marginRight: "16px" }}
                    />
                    Google
                    </Button>
                </Grid>
                </Grid>
                <ScaleLoader
                className="loading align-center"
                css={override}
                size={150}
                color={"#0074d9"}
                loading={isLoading}
                />
            </div>
            </Box>
        </Box>
        </>
    );
    };

    export default Login;
