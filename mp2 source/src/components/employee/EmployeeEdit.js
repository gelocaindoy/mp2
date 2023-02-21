import React, { useState } from "react";
import {
  Button,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Grid,
  FormLabel,
  Box
} from "@mui/material";


const EditEmployee = ({ employeesData, onSubmit, onCancel }) => {
  const [firstName, setFirstName] = useState(employeesData?.firstName || "");
  const [middleName, setMiddleName] = useState(employeesData?.middleName || "");
  const [lastName, setLastName] = useState(employeesData?.lastName ||"");
  const [gender, setGender] = useState(employeesData?.gender ||"");
  const [contactNo, setContactNo] = useState(employeesData?.contactNo ||"");
  const [emergencyContactNo, setEmergencyContactNo] = useState(employeesData?.emergencyContactNo || "");
  const [email, setEmail] = useState(employeesData?.email ||"");
  const [password, setPassword] = useState(employeesData?.password ||"");
  const [philhealthNo, setPhilhealthNo] = useState(employeesData?.philhealthNo ||"");
  const [sssNo, setSssNo] = useState(employeesData?.sssNo ||"");
  const [pagIbigNo, setPagIbigNo] = useState(employeesData?.pagIbigNo ||"");
  const [dateHire, setDateHire] = useState(employeesData? new Date(employeesData?.dateHire).toISOString().substring(0, 10)
  : "");
  const [presentAddress, setPresentAddress] = useState(employeesData.presentAddress || "");
  const [permanentAddress, setPermanentAddress] = useState(employeesData?.permanentAddress ||"");


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      firstName,
      middleName,
      lastName,
      gender,
      contactNo,
      emergencyContactNo,
      email,
      password,
      philhealthNo,
      sssNo,
      pagIbigNo,
      dateHire,
      presentAddress,
      permanentAddress,
    });
  };

  return (
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="stretch" mt={5} mb={5}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <TextField
              label="First Name"
              variant="outlined"
              
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Middle Name"
              variant="outlined"
              
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Last Name"
              variant="outlined"
              
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup row value={gender} defaultValue="Male" onChange={(e) => setGender(e.target.value)}>
              <FormControlLabel value="Male" control={<Radio />} label="Male"/>
              <FormControlLabel value="Female" control={<Radio />} label="Female"/>
            </RadioGroup>
          </Grid>
          <Grid item xs={4}>
            <TextField
              type={"tel"}
              variant="outlined"
              
              label="Contact No."
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type={"tel"}
              variant="outlined"
              
              label="Emergency Contact No."
              value={emergencyContactNo}
              onChange={(e) => setEmergencyContactNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Email"
              
              variant="outlined"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              type={"password"}
              variant="outlined"
              
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Philhealth No."
              variant="outlined"
              
              value={philhealthNo}
              onChange={(e) => setPhilhealthNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="SSS No."
              variant="outlined"
              
              value={sssNo}
              onChange={(e) => setSssNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Pag-Ibig No."
              variant="outlined"
              
              value={pagIbigNo}
              onChange={(e) => setPagIbigNo(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              label="Date Hired"
              variant="outlined"
              type="date"
              value={
                dateHire
                ? new Date(dateHire).toISOString().substring(0, 10)
                : ""
              }
              onChange={(e) => setDateHire(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} md={9}>
            <TextField
              label="Present Address"
              variant="outlined"
              
              value={presentAddress}
              onChange={(e) => setPresentAddress(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} md={9}>
            <TextField
              label="Permanent Address"
              variant="outlined"
              
              value={permanentAddress}
              onChange={(e) => setPermanentAddress(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} >
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
            <Button style={{ marginLeft: "16px" }} onClick={onCancel} variant="contained" color="error">
              Cancel
            </Button>
          </Grid>
        </Grid>
        </Box>
        </form>
  );
};

export default EditEmployee;
