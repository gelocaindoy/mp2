    import React, { useState, useEffect } from "react";
    import { useHistory } from "react-router-dom";
    import { Box, Button, Typography, Container } from "@mui/material";
    import { DataGrid, GridToolbar } from "@mui/x-data-grid";
    import firebase from "../firebaseConfig";
    import EducationEdit from "./EducationEdit";
    import Header from "../Header";
    import AddIcon from "@mui/icons-material/Add";
    import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

    const EducationList = () => {
    const [educationList, setEducationList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFields, setShowFields] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState("");
    const history = useHistory();

    useEffect(() => {
        const educationRef = firebase.database().ref("education");
        const user = firebase.auth().currentUser;

        if (user) {
        const educationListener = educationRef
            .orderByChild("owner")
            .equalTo(user.uid)
            .on("value", (snapshot) => {
            const education = snapshot.val();
            const educationList = [];
            for (let id in education) {
                educationList.push({ id, ...education[id] });
            }
            setEducationList(educationList);
            setLoading(false);
            });
        return () => educationRef.off("value", educationListener);
        }
    }, [history]);

    const handleAddEducation = (education) => {
        const user = firebase.auth().currentUser;
        if (user) {
        const educationRef = firebase.database().ref("education");
        educationRef.push({
            ...education,
            owner: user.uid,
        });
        setEditMode(false);
        setShowFields(false);
        }
    };

    const handleDeleteEducation = (params) => {
        const educationRef = firebase.database().ref(`education/${params.row.id}`);
        educationRef.remove();
    };

    const handleEditEducation = (education) => {
        const user = firebase.auth().currentUser;
        if (user) {
        const educationRef = firebase.database().ref(`education/${currentId}`);
        educationRef.update({
            ...education,
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
        { field: "school", headerName: "School/University", width: 200 },
        { field: "course", headerName: "Course", width: 150 },
        { field: "degree", headerName: "Degree", width: 150 },
        { field: "passingOfYear", headerName: "Passing of Year", width: 150 },
        {
        field: "edit",
        headerName: "Edit",
        width: 80,
        sortable: false,
        FilterPanelDeleteIcon: true,
        disableColumnMenu: true,
        align: "center",
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
        align: "center",
        renderCell: (params) => (
            <Button
            color="error"
            onClick={() => handleDeleteEducation(params)}
            >
            <DeleteIcon />
            </Button>
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
            <Typography variant="h5">Employee Education Details</Typography>
            {!showFields && (
                <Button
                style={{ marginBottom: 15, marginLeft: "auto" }}
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
            <EducationEdit
                onSubmit={handleAddEducation}
                onCancel={() => setShowFields(false)}
            />
            )}
            {editMode && (
            <EducationEdit
                education={educationList.find(
                (education) => education.id === currentId
                )}
                onSubmit={handleEditEducation}
                onCancel={handleCancelEdit}
            />
            )}
            {!loading && !editMode && !showFields && (
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                rows={educationList}
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

    export default EducationList;
