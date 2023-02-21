    import { useState } from "react";
    import {
    TextField,
    Button,
    Box,
    FormLabel,
    Select,
    MenuItem,
    } from "@mui/material";

    const LeaveManageEdit = ({ leaveData, onSubmit, onCancel }) => {
    const [leaveType, setleaveType] = useState(leaveData?.leaveType || "");
    const [fromDate, setFromDate] = useState(
        leaveData
        ? new Date(leaveData.fromDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10)
    );
    const [toDate, setToDate] = useState(
        leaveData
        ? new Date(leaveData.toDate).toISOString().substring(0, 10)
        : new Date().toISOString().substring(0, 10)
    );
    const [reason, setReason] = useState(leaveData?.reason || "");
    const [status, setStatus] = useState(leaveData?.status || "Pending");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ leaveType, status, fromDate, toDate, reason });
    };
    // {/* <TextField
    //     label="Leave Type"
    //     variant="outlined"
    //     value={leaveType}
    //     onChange={(e) => setleaveType(e.target.value)}
    //     fullWidth
    //     required
    //     margin="normal"
    // />
    // </Box> */}
    return (
        <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="stretch" mb={5}>
            <Box display="flex" flexDirection="column">
            <FormLabel id="demo-row-select-label">Leave Type</FormLabel>
            <Select
                labelId="demo-row-select-label"
                id="demo-row-select"
                value={leaveType}
                onChange={(e) => setleaveType(e.target.value)}
                fullWidth
            >
                <MenuItem value="vacation leave">Vacation Leave</MenuItem>
                <MenuItem value="sick leave">Sick Leave</MenuItem>
                <MenuItem value="birthday leave">Birthday Leave</MenuItem>
                <MenuItem value="alamity leave">Calamity Leave</MenuItem>
            </Select>
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
            <Box display="flex" flexDirection="row">
            <TextField
                label="Reason"
                variant="outlined"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                fullWidth
                required
                margin="normal"
            />
            </Box>
            <TextField
            label="Status"
            variant="outlined"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            required
            margin="normal"
            disabled
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

    export default LeaveManageEdit;
