import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../firebaseConfig";
import { Button, Card, CardContent, Typography } from "@material-ui/core";
import Header from "../Header";

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const employeeRef = firebase.database().ref(`employees/${user.uid}`);
      employeeRef.on("value", (snapshot) => {
        const employeeData = snapshot.val();
        //check if the user is admin
        if (employeeData && employeeData.accountType === "admin") {
          console.log(employeeData.accountType);
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      });
    }
  }, []);

  useEffect(() => {
    const employeesRef = firebase.database().ref("employees");
    employeesRef.on("value", (snapshot) => {
      const employeeData = snapshot.val();
      const employeeList = [];
      for (let id in employeeData) {
        employeeList.push({ id, ...employeeData[id] });
      }
      setEmployees(employeeList);
      setLoading(false);
    });
  }, []);

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push("/login");
  };

  if (!authorized) {
    return <div>You are not authorized to access this page</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const rendercard = () => {
    let temp = [];
    for (let i = 0; i < employees.length; i++) {
      const employee = employees[i];
      if (employee && employee.id) {
        temp.push(
          <Card key={employee.id} style={{ margin: "10px" }}>
            <CardContent>
              <Typography color="textPrimary" gutterBottom>
                {employee.lastName}
              </Typography>
              <Typography color="textSecondary">{employee.email}</Typography>
            </CardContent>
          </Card>
        );
      }
    }
    return temp;
  };

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" style={{ margin: "20px" }}>
          Admin Dashboard
        </Typography>
        <Button
          variant="contained"
          color="primary"
          style={{ margin: "20px" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>{rendercard()}</div>
    </div>
  );
};

export default AdminDashboard;
