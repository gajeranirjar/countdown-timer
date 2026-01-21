import { useEffect, useState } from "react";
import { Container, Typography, Button, TextField, Stack } from "@mui/material";
import { TimerCard } from "./TimerCard";


export const Countdown = () => {

    const [targetDate, setTargetDate] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!targetDate) return;
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const diff = target - now;
            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft("DONE");
                setError("Please select a future date and time");
            } else {
                setTimeLeft(diff);
                setError("");
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const handleSubmit = () => {
        // const selectedTime = new Date(targetDate).getTime();
        // const now = new Date().getTime();

        // if (!targetDate || selectedTime <= now) {
        //     setError("Please select a future date and time");
        //     return;
        // }

        // setError("");
        // setTimeLeft(selectedTime - now);
    }

    return (
        <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8}}>
            <Typography variant="h4" sx={{ mb: 3 }} >
                Countdown Timer
            </Typography>

            <Stack spacing={2.5}>
                <TextField
                    type="datetime-local"
                    label="Select Date & Time"
                    slotProps={{
                        inputLabel: { shrink: true },
                    }}
                    onChange={(e) => setTargetDate(e.target.value)}
                />

                {error && <Typography color="error">{error}</Typography>}

                <Button variant="contained" sx={{
                    width: "max-content", alignSelf: "center",
                    px: 3,
                    py: 1.2,
                }} onClick={handleSubmit}>
                    Start Countdown
                </Button>

                {timeLeft && <TimerCard timeLeft={timeLeft} />}
            </Stack>
        </Container>
    );
}
