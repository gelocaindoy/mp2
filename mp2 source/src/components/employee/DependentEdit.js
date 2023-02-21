import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormLabel,
  Select,
  MenuItem,
} from "@mui/material";

const DependentEdit = ({ dependentsdata, onSubmit, onCancel }) => {
  const [dependentname, setName] = useState(dependentsdata?.dependentname || "");
  const [relationship, setRelationship] = useState(
    dependentsdata?.relationship || ""
  );
  const [dateOfBirth, setDateOfBirth] = useState(
    dependentsdata
      ? new Date(dependentsdata.dateOfBirth).toISOString().substring(0, 10)
      : ""
  );
  const [occupation, setOccupation] = useState(dependentsdata?.occupation || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ dependentname, relationship, dateOfBirth, occupation });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" alignItems="stretch" mb={5}>
        <TextField
          label="Full Name"
          variant="outlined"
          value={dependentname}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormLabel id="demo-row-select-label">Relationship</FormLabel>
        <Select
          labelId="demo-row-select-label"
          id="demo-row-select"
          value={relationship}
          onChange={(e) => setRelationship(e.target.value)}
          fullWidth
        >
          <MenuItem value="spouse">Spouse</MenuItem>
          <MenuItem value="child">Child</MenuItem>
          <MenuItem value="parent">Parent</MenuItem>
          <MenuItem value="sibling">Sibling</MenuItem>
        </Select>
        <TextField
          label="Date of Birth"
          variant="outlined"
          type="date"
          value={
            dateOfBirth
              ? new Date(dateOfBirth).toISOString().substring(0, 10)
              : ""
          }
          onChange={(e) => setDateOfBirth(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Occupation"
          variant="outlined"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          fullWidth
          margin="normal"
        />
      </Box>
      <Box display="flex" justifyContent="flex-start" mt={2}>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          style={{ marginRight: "16px" }}
        >
          Submit
        </Button>
        <Button variant="contained" color="error" onClick={onCancel}>
          Cancel
        </Button>
      </Box>
    </form>
  );
};

export default DependentEdit;
