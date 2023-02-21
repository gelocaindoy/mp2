    import React, { useState, useEffect } from "react";
    import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Badge,
    IconButton,
    } from "@mui/material";
    import { Add } from "@mui/icons-material";
    import Header from "../Header";
    import firebase from "./firebaseConfig";

    const LeaveManagement = () => {
    const [leaves, setLeaves] = useState([]);

    useEffect(() => {
        // Load data from Firebase Realtime Database
        const leavesRef = firebase.database().ref("leaves");
        leavesRef.on("value", (snapshot) => {
        const leavesData = snapshot.val();
        if (leavesData) {
            // Check if leavesData is not null or undefined
            const leavesList = [];
            for (let id in leavesData) {
            leavesList.push({ id, ...leavesData[id] });
            }
            setLeaves(leavesList);
        }
        });
    }, []);

    const applyLeave = (id) => {
        // Update the leave with the given id in the database
        const leaveRef = firebase.database().ref(`leave/${id}`);
        leaveRef.transaction((leave) => {
        if (leave) {
            leave.remainingDays -= 1;
        }
        return leave;
        });
    };

    const LeaveCard = ({ leave }) => {
        return (
        <Card sx={{ maxWidth: 300 }}>
            <CardContent sx={{ flexDirection: "row", width: "100%" }}>
            <IconButton
                aria-label="add"
                sx={{ ml: 1, alignItems: "left", color: "green" }}
                onClick={() => applyLeave(leave.id)}
            >
                <Add />
            </IconButton>
            <Typography variant="h6" component="div" color="primary">
                {leave.name}
            </Typography>
            <Box sx={{ marginTop: "auto", fontSize: 28 }}>
                <Badge badgeContent={leave.remainingDays} color="primary">
                <Typography variant="subtitle1" component="div">
                    Remaining day(s)
                </Typography>
                </Badge>
            </Box>
            </CardContent>
        </Card>
        );
    };

    return (
        <>
        <Header />
        <Box
            width="100%"
            sx={{ my: 2, alignContent: "center", alignItems: "center" }}
        >
            <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
                <div
                style={{
                    display: "flex",
                    flexWrap: "nowrap",
                    gap: "20px",
                    width: "100%",
                    justifyContent: "center",
                }}
                >
                {leaves.map((leave) => (
                    <LeaveCard key={leave.id} leave={leave} />
                ))}
                </div>
            </Grid>
            </Grid>
        </Box>
        </>
    );
    };

    export default LeaveManagement;
