    import { useState } from "react";
    import { TextField, Button, Box } from "@mui/material";

    const WorkExperienceEdit = ({ workExpData, onSubmit, onCancel }) => {
    const [companyName, setCompanyName] = useState(
        workExpData?.companyName || ""
    );
    const [designation, setDesignation] = useState(
        workExpData?.designation || ""
    );
    const [fromDate, setFromDate] = useState(
        workExpData
        ? new Date(workExpData.fromDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10)
    );
    const [toDate, setToDate] = useState(
        workExpData
        ? new Date(workExpData.toDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ companyName, designation, fromDate, toDate });
    };

    return (
        <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="stretch" mb={5}>
            <Box display="flex" flexDirection="row">
            <TextField
                label="Company Name"
                variant="outlined"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            </Box>
            <Box display="flex" flexDirection="row">
            <TextField
                label="Designation"
                variant="outlined"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            </Box>
            <Box display="flex" flexDirection="column">
            <TextField
                type="date"
                label="From Date"
                variant="outlined"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
                required
                margin="normal"
            />
            </Box>
            <Box display="flex" flexDirection="column">
            <TextField
                type="date"
                label="To Date"
                variant="outlined"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                InputLabelProps={{
                shrink: true,
                }}
                required
                margin="normal"
            />
            </Box>
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

    export default WorkExperienceEdit;
