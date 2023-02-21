import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateEmployee from "./components/employee/CreateEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import EmployeeList from "./components/employee/EmployeeList";
import EducationList from "./components/employee/EducationList";
import EducationCreate from "./components/employee/EducationCreate";
import EducationEdit from "./components/employee/EducationEdit";
import Login from "./components/Login";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/employee/create" component={CreateEmployee} />
        <Route exact path="/employee/edit/:id" component={EditEmployee} />
        <Route exact path="/employee" component={EmployeeList} />
        <Route exact path="/employee/education" component={EducationList} />
        <Route exact path="/employee/education/create" component={EducationCreate} />
        <Route exact path="/employee/education/edit/:employeeId/:id" component={EducationEdit} />
      </Switch>
    </Router>
  );
}

export default App;
