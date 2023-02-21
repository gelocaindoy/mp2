import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Container, Button } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import firebase from "../firebaseConfig";
import Header from "../Header";
import { Typography } from "@mui/material";
import EmployeeEdit from "./EmployeeEdit";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFields, setShowFields] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const employeesRef = firebase.database().ref("employees");
    const user = firebase.auth().currentUser;

    if (user) {
      const employeesListerner = employeesRef
        .orderByChild("email")
        .equalTo(user.email)
        .on("value", (snapshot) => {
          const employees = snapshot.val();
          const employeeList = [];
          for (let id in employees) {
            employeeList.push({ id, ...employees[id] });
          }
          setEmployees(employeeList);
          setLoading(false);
        });
      return () => employeesRef.off("value", employeesListerner);
    }
  }, [history]);

  const handleEditEmployees = (employeesData, currentId) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const employeesRef = firebase.database().ref(`employees/${currentId}`);
      employeesRef.update({
        ...employeesData,
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
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "middleName", headerName: "Middle Name", width: 180 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
    { field: "contactNo", headerName: "Contact No.", width: 180 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "philhealthNo", headerName: "Philhealth No.", width: 170 },
    { field: "sssNo", headerName: "SSS No.", width: 150 },
    { field: "pagIbigNo", headerName: "Pag-Ibig No.", width: 170 },
    { field: "dateHire", headerName: "Date Hired", width: 150 },
    { field: "presentAddress", headerName: "Present Address", width: 200 },
    { field: "permanentAddress", headerName: "Permanent Address", width: 200 },
    {
      field: "id",
      headerName: "Action",
      width: 80,
      align: "center",
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
          <Typography variant="h5">Employee Personal Details</Typography></Box>
          {editMode && (
            <EmployeeEdit
              employeesData={employees.find(
                (employee) => employee.id === currentId
              )}
              onSubmit={(employeesData) =>
                handleEditEmployees(employeesData, currentId)
              }
              onCancel={handleCancelEdit}
            />
          )}
        
        {!loading && !editMode && !showFields && (
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              loading={loading}
              columns={columns}
              rows={employees}
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

export default EmployeeList;
