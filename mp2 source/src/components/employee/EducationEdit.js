import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";


const EducationEdit = ({ education, onSubmit, onCancel }) => {
const [school, setSchool] = useState(education?.school || "");
const [course, setCourse] = useState(education?.course || "");
const [degree, setDegree] = useState(education?.degree || "");
const [passingOfYear, setPassingOfYear] = useState(
    education?.passingOfYear || ""
);

const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ school, degree, course, passingOfYear });
};

return (
    <form onSubmit={handleSubmit}>
    <Box display="flex" flexDirection="column" alignItems="flex-start">
        <TextField
        label="School/University"
        variant="outlined"
        value={school}
        fullWidth
        onChange={(e) => setSchool(e.target.value)}
        margin="normal"
        required
        />
        <TextField
        label="Course"
        fullWidth
        variant="outlined"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        margin="normal"
        required
        />
        <TextField
        label="Degree"
        variant="outlined"
        fullWidth
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
        margin="normal"
        required
        />
        <TextField
        label="Passing of Year"
        variant="outlined"
        fullWidth
        value={passingOfYear}
        onChange={(e) => setPassingOfYear(e.target.value)}
        margin="normal"
        required
        />
        <Box display="flex" justifyContent="flex-end" mt={2}>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginRight: "16px" }}
        >
            Submit
        </Button>
        <Button variant="contained" color="error" onClick={onCancel}>
            Cancel
        </Button>
        </Box>
    </Box>
    </form>
);
};

export default EducationEdit;
