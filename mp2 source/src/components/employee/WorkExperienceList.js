    import React, { useState, useEffect } from "react";
    import { useHistory } from "react-router-dom";
    import { Button, Container, Box, Typography } from "@mui/material";
    import { DataGrid, GridToolbar } from "@mui/x-data-grid";
    import {
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    } from "@mui/icons-material/";
    import firebase from "../firebaseConfig";
    import Header from "../Header";
    import WorkExperienceEdit from "./WorkExperienceEdit";

    const EmployeeWorkExpList = () => {
    const [workExpList, setWorkExpList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFields, setShowFields] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const workExpRef = firebase.database().ref("workExp");
        const user = firebase.auth().currentUser;

        if (user) {
        const workExpListener = workExpRef
            .orderByChild("owner")
            .equalTo(user.uid)
            .on("value", (snapshot) => {
            const workExpData = snapshot.val();
            const workExpDataList = [];
            for (let id in workExpData) {
                workExpDataList.push({ id, ...workExpData[id] });
            }
            setWorkExpList(workExpDataList);
            setLoading(false);
            });
        return () => workExpRef.off("value", workExpListener);
        }
    }, [history]);

    const handleAddWorkExp = (workExpData) => {
        const user = firebase.auth().currentUser;
        if (user) {
        const workExpRef = firebase.database().ref("workExp");
        workExpRef.push({
            ...workExpData,
            owner: user.uid,
        });
        setEditMode(false);
        setShowFields(false);
        }
    };

    const handleDeleteWorkExp = (params) => {
        const workExpRef = firebase.database().ref(`workExp/${params.row.id}`);
        workExpRef.remove();
    };

    const handleEditWorkExp = (workExpData) => {
        const user = firebase.auth().currentUser;
        if (user) {
        const workExpRef = firebase.database().ref(`workExp/${currentId}`);
        workExpRef.update({
            ...workExpData,
            owner: user.uid,
        });
        setEditMode(false);
        setShowFields(false);
        }
    };

    const handleCancelEdit = () => {
        setEditMode(false);
        setShowFields(false);
    };

    const columns = [
        { field: "companyName", headerName: "Company Name", flex: 1 },
        { field: "designation", headerName: "Designation", flex: 1 },
        {
        field: "fromDate",
        headerName: "From Date",
        flex: 1,
        },
        {
        field: "toDate",
        headerName: "To Date",
        flex: 1,
        },
        {
        field: "edit",
        headerName: "Edit",
        width: 80,
        sortable: false,
        FilterPanelDeleteIcon: true,
        disableColumnMenu: true,
        renderCell: (params) => (
            <Button
            color="primary"
            onClick={() => {
                setEditMode(true);
                setCurrentId(params.row.id);
            }}
            >
            <EditIcon />
            </Button>
        ),
        },
        {
        field: "delete",
        headerName: "Delete",
        width: 80,
        sortable: false,
        disableColumnMenu: true,
        renderCell: (params) => (
            <Button
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => handleDeleteWorkExp(params)}
            ></Button>
        ),
        },
    ];

    return (
        <div>
        <Header />
        <Container maxWidth="xl">
            <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                my: 2,
            }}
            >
            <Typography variant="h5">Employee Work Experience Details</Typography>
            {!showFields && (
                <Button
                style={{ marginBottom: 15 }}
                variant="contained"
                color="primary"
                onClick={() => setShowFields(true)}
                >
                <AddIcon />
                Add
                </Button>
            )}
            </Box>
            {showFields && !editMode && (
            <WorkExperienceEdit
                onSubmit={handleAddWorkExp}
                onCancel={() => setShowFields(false)}
            />
            )}
            {editMode && (
            <WorkExperienceEdit
                workExpData={workExpList.find(
                (workExpData) => workExpData.id === currentId
                )}
                onSubmit={handleEditWorkExp}
                onCancel={handleCancelEdit}
            />
            )}
            {!loading && !editMode && !showFields && (
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                rows={workExpList}
                columns={columns}
                loading={loading}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                disableColumnMenu
                disableColumnSelector
                disableDensitySelector
                components={{
                    Toolbar: GridToolbar,
                }}
                />
            </div>
            )}
        </Container>
        </div>
    );
    };
    export default EmployeeWorkExpList;
