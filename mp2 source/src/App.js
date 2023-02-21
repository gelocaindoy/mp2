import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditEmployee from "./components/employee/EmployeeEdit";
import EmployeeList from "./components/employee/EmployeeList";
import EducationList from "./components/employee/EducationList";
import EducationEdit from "./components/employee/EducationEdit";
import Login from "./components/Login";
import DependentList from "./components/employee/DependentList";
import DependentEdit from "./components/employee/DependentEdit";
import HRDashboard from "./components/hr/HRDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import LeaveManage from "./components/employee/LeaveManageList";
import LeaveManageEdit from "./components/employee/LeaveManageEdit";
import EmployeeWorkExpList from "./components/employee/WorkExperienceList";
import EmployeeWorkExpEdit from "./components/employee/WorkExperienceEdit";

function App() {
  return (
    <Router>
      <Route>
        <Switch>
        <Route exact path="/employee" component={EmployeeList} />
        <Route exact path="/employee/edit/:id" component={EditEmployee} />
        <Route exact path="/employee/education" component={EducationList} />
        <Route exact path="/employee/education/edit/:employeeId/:id" component={EducationEdit} />
        <Route exact path="/employee/dependents" component={DependentList} />
        <Route exact path="/employee/dependents/edit/:employeeId/:id" component={DependentEdit}/>
        <Route exact path="/employee/work-experience" component={EmployeeWorkExpList} />
        <Route exact path="/employee/work-experience/edit/:employeeId/:id" component={EmployeeWorkExpEdit} />
        <Route exact path="/employee/manageleave" component={LeaveManage} />
        <Route exact path="/employee/manageleave/edit/:employeeId/:id" component={LeaveManageEdit} />
        
        <Route exact path="/hr" component={HRDashboard} />

        <Route exact path="/admin" component={AdminDashboard} />

        <Route path="/" component={Login} />
        <Route path="/login" component={Login} />
        </Switch>
      </Route>
    </Router>
  );
}

export default App;
