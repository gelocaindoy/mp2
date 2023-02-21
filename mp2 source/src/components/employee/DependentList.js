import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Container } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import firebase from "../firebaseConfig";
import Header from "../Header";
import AddIcon from "@mui/icons-material/Add";
import { useHistory } from "react-router-dom";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import DependentEdit from "./DependentEdit";

const DependentList = () => {
  const [dependentList, setDependentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFields, setShowFields] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const dependentRef = firebase.database().ref("dependents");
    const user = firebase.auth().currentUser;

    if (user) {
      const dependentListener = dependentRef
        .orderByChild("owner")
        .equalTo(user.uid)
        .on("value", (snapshot) => {
          const dependents = snapshot.val();
          const dependentList = [];
          for (let id in dependents) {
            dependentList.push({ id, ...dependents[id] });
          }
          setDependentList(dependentList);
          setLoading(false);
        });
      return () => dependentRef.off("value", dependentListener);
    }
  }, [history]);

  const handleAddDependent = (dependentsdata) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const dependentRef = firebase.database().ref("dependents");
      dependentRef.push({
        ...dependentsdata,
        owner: user.uid,
      });
      setEditMode(false);
      setShowFields(false);
    }
  };

  const handleDeleteDependent = (id) => {
    const dependentRef = firebase.database().ref(`dependents/${id}`);
    dependentRef.remove();
  };

  const handleEditDependent = (dependentsdata) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const dependentRef = firebase.database().ref(`dependents/${currentId}`);
      dependentRef.update({
        ...dependentsdata,
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
    { field: "dependentname", headerName: "Name", width: 200 },
    {
      field: "relationship",
      headerName: "Relationship",
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
          { value: "spouse", label: "Spouse" },
          { value: "child", label: "Child" },
          { value: "parent", label: "Parent" },
          { value: "sibling", label: "Sibling" },
        ];
        return (
          relationshipOptions.find((option) => option.value === params.value)
            ?.label || ""
        );
      },
      valueSetter: (params, value) => {
        const relationshipOptions = [
          { value: "spouse", label: "Spouse" },
          { value: "child", label: "Child" },
          { value: "parent", label: "Parent" },
          { value: "sibling", label: "Sibling" },
        ];
        const option = relationshipOptions.find(
          (option) => option.label === value
        );
        params.setValue(option?.value || "");
        return true;
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Date of Birth",
      flex: 1,
    },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      sortable: false,
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
          variant="text"
          color="error"
          onClick={() => handleDeleteDependent(params.row.id)}
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
          <Typography variant="h5">Employee Dependents Details</Typography>
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
          <DependentEdit
            onSubmit={handleAddDependent}
            onCancel={() => setShowFields(false)}
          />
        )}
        {editMode && (
          <DependentEdit
            dependentsdata={dependentList.find(
              (dependentsdata) => dependentsdata.id === currentId
            )}
            onSubmit={handleEditDependent}
            onCancel={handleCancelEdit}
          />
        )}
        {!loading && !editMode && !showFields && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={dependentList}
              loading={loading}
              columns={columns}
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

export default DependentList;
