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
    import LeaveEdit from "./LeaveManageEdit";

    const LeaveManageList = () => {
    const [leaveList, setLeaveList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showFields, setShowFields] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const leaveRef = firebase.database().ref("leaves");
        const user = firebase.auth().currentUser;

        if (user) {
        const leaveListener = leaveRef
            .orderByChild("owner")
            .equalTo(user.uid)
            .on("value", (snapshot) => {
            const leaveData = snapshot.val();
            const leaveDataList = [];
            for (let id in leaveData) {
                leaveDataList.push({ id, ...leaveData[id] });
            }
            setLeaveList(leaveDataList);
            setLoading(false);
            });
        return () => leaveRef.off("value", leaveListener);
        }
    }, [history]);

    const handleAddLeave = (leaveData) => {
        const user = firebase.auth().currentUser;
        if (user) {
        const leaveRef = firebase.database().ref("leaves");
        leaveRef.push({
            ...leaveData,
            owner: user.uid,
        });
        setEditMode(false);
        setShowFields(false);
        }
    };

    const handleDeleteLeave = (params) => {
        const leaveRef = firebase.database().ref(`leaves/${params.row.id}`);
        leaveRef.remove();
    };

    const handleEditLeave = (leaveData) => {
        const user = firebase.auth().currentUser;
        if (user) {
        const leaveRef = firebase.database().ref(`leaves/${currentId}`);
        leaveRef.update({
            ...leaveData,
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
        // { field: "leaveType", headerName: "Leave Type", flex: 1 },
        {
        field: "leaveType",
        headerName: "Leave Type",
        flex: 1,
        renderCell: (params) => <Typography>{params.value}</Typography>,
        editCellProps: {
            fullWidth: true,
            select: true,
            SelectProps: {
            native: true,
            autoWidth: true,
            },
        },
        valueGetter: (params) => {
            const relationshipOptions = [
            { value: "vacation leave", label: "Vacation Leave" },
            { value: "sick leave", label: "Sick Leave" },
            { value: "birthday leave", label: "Birthday Leave" },
            { value: "calamity leave", label: "Calamity Leave" },
            ];
            return (
            relationshipOptions.find((option) => option.value === params.value)
                ?.label || ""
            );
        },
        valueSetter: (params, value) => {
            const relationshipOptions = [
            { value: "vacation leave", label: "Vacation Leave" },
            { value: "sick leave", label: "Sick Leave" },
            { value: "birthday leave", label: "Birthday Leave" },
            { value: "calamity leave", label: "Calamity Leave" },
            ];
            const option = relationshipOptions.find(
            (option) => option.label === value
            );
            params.setValue(option?.value || "");
            return true;
        },
        },
        { field: "fromDate", headerName: "From Date", flex: 1 },
        { field: "toDate", headerName: "To Date", flex: 1 },
        { field: "reason", headerName: "Reason", flex: 1 },
        { field: "status", headerName: "Status", flex: 1 },
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
            onClick={() => handleDeleteLeave(params)}
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
            <Typography variant="h5">Leave Management</Typography>
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
            <LeaveEdit
                onSubmit={handleAddLeave}
                onCancel={() => setShowFields(false)}
            />
            )}
            {editMode && (
            <LeaveEdit
                leaveData={leaveList.find(
                (leaveData) => leaveData.id === currentId
                )}
                onSubmit={handleEditLeave}
                onCancel={handleCancelEdit}
            />
            )}
            {!loading && !editMode && !showFields && (
            <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                rows={leaveList}
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

    export default LeaveManageList;
