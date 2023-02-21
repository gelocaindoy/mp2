import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Badge,
  IconButton,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import Header from "../Header";
import firebase from "../firebaseConfig";

const LeaveApplication = () => {
  const [leaves, setLeaves] = useState([]);
  const [selectedLeave, setSelectedLeave] = useState("");
  const [appliedDays, setAppliedDays] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [leaveApplied, setLeaveApplied] = useState(false);
  const [employeeData, setEmployeeData] = useState({});

  useEffect(() => {
    // Load data from Firebase Realtime Database
    const leavesRef = firebase.database().ref("leaves");
    leavesRef.on("value", (snapshot) => {
      const leavesData = snapshot.val();
      const leavesList = [
        {
          id: 1,
          name: "Bereavement Leave",
          remainingDays: 3,
        },
        {
          id: 2,
          name: "Birthday Leave",
          remainingDays: 1,
        },
        {
          id: 3,
          name: "Calamity Leave",
          remainingDays: 5,
        },
        {
          id: 4,
          name: "Paternity Leave",
          remainingDays: 7,
        },
        {
          id: 5,
          name: "Service Incentive Leave",
          remainingDays: 10,
        },
        {
          id: 6,
          name: "Sick Leave",
          remainingDays: 10,
        },
        {
          id: 7,
          name: "Solo Parent Leave",
          remainingDays: 7,
        },
        {
          id: 8,
          name: "Vacation Leave",
          remainingDays: 15,
        },
      ];
      for (let id in leavesData) {
        leavesList.push({ id, ...leavesData[id] });
      }
      setLeaves(leavesList);
    });

    // Load employee data from Firebase Realtime Database
    const email = localStorage.getItem("employeeData");
    if (email) {
      const employeeRef = firebase
        .database()
        .ref("employees")
        .orderByChild("email")
        .equalTo(email);
      employeeRef.on("value", (snapshot) => {
        const employeeData = snapshot.val();
        if (employeeData) {
          setEmployeeData(Object.values(employeeData)[0]);
        }
      });
    }
  }, []);

  const handleAddLeaveClick = () => {
    // Apply leave
    if (selectedLeave && appliedDays && employeeData.email) {
      const leavesRef = firebase
        .database()
        .ref(`leaves/${selectedLeave.id}/applications`);
      leavesRef.push(
        {
          appliedDays: appliedDays,
          employeeEmail: employeeData.email,
        },
        (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("Leave application saved");
            setSelectedLeave("");
            setAppliedDays(0);
            setLeaveApplied(true);
          }
        }
      );
    }
  };

  const handleRemainingDaysClick = (leave) => {
    if (employeeData) {
      const { remainingLeaves } = employeeData;
      const leaveName = leave.name;
      let remainingDays = 0;

      if (remainingLeaves && remainingLeaves[leaveName]) {
        remainingDays = remainingLeaves[leaveName];
      } else {
        remainingDays = leave.remainingDays;
      }

      setRemainingDays(remainingDays);
    }
  };

  const renderLeavesTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Leaves table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Remaining Days</TableCell>
              <TableCell align="right">Apply</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell component="th" scope="row">
                  {leave.name}
                </TableCell>
                <TableCell align="right">
                  <Badge
                    badgeContent={leave.remainingDays}
                    color={leave.remainingDays > 0 ? "success" : "error"}
                  >
                    {leave.remainingDays}
                  </Badge>
                  <IconButton
                    color="info"
                    size="small"
                    onClick={() => handleRemainingDaysClick(leave)}
                  >
                    ?
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<Add />}
                    onClick={() => setSelectedLeave(leave)}
                  >
                    Apply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <>
      <Header title="Leave Application" />
      <Box m={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Available Leaves
                </Typography>
                {renderLeavesTable()}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  Apply Leave
                </Typography>
                <TextField
                  select
                  label="Select Leave"
                  value={selectedLeave}
                  onChange={(event) =>
                    setSelectedLeave(
                      leaves.find((leave) => leave.id === +event.target.value)
                    )
                  }
                  fullWidth
                  margin="normal"
                >
                  {leaves.map((leave) => (
                    <MenuItem key={leave.id} value={leave.id}>
                      {leave.name}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  type="number"
                  label="Applied Days"
                  value={appliedDays}
                  onChange={(event) => setAppliedDays(event.target.value)}
                  fullWidth
                  margin="normal"
                />
                {leaveApplied && (
                  <Typography color="success.main">
                    Leave application successful!
                  </Typography>
                )}
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddLeaveClick}
                  >
                    Apply Leave
                  </Button>
                </Box>
              </CardContent>
            </Card>
            {remainingDays > 0 && (
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Remaining Days
                  </Typography>
                  <Typography variant="h3" color="primary">
                    {remainingDays}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default LeaveApplication;
