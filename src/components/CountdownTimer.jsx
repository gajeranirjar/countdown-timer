import { useEffect, useState } from "react";
import { Container, Typography, Button, TextField, Stack } from "@mui/material";
import { TimerCard } from "./TimerCard";


export const Countdown = () => {
  const [targetDate, setTargetDate] = useState("");
  const [timeLeft, setTimeLeft] = useState(null);
  const [error, setError] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started || !targetDate) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft("DONE");
      } else {
        setTimeLeft(diff);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [started, targetDate]);

  const handleSubmit = () => {
    const selectedTime = new Date(targetDate).getTime();
    const now = Date.now();

    if (!targetDate || selectedTime <= now) {
      setError("Please select a future date and time");
      return;
    }

    setError("");
    setStarted(true);
    setTimeLeft(selectedTime - now);
  };

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 8 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Countdown Timer
      </Typography>

      <Stack spacing={2.5}>
        <TextField
          type="datetime-local"
          label="Select Date & Time"
          slotProps={{ inputLabel: { shrink: true } }}
          onChange={(e) => {
            setTargetDate(e.target.value);
            setStarted(false);
            setTimeLeft(null);
          }}
        />

        {error && <Typography color="#ffffff">{error}</Typography>}

        <Button
          variant="contained"
          sx={{
            width: "max-content",
            alignSelf: "center",
            px: 3,
            py: 1.2,
          }}
          onClick={handleSubmit}
        >
          Start Countdown
        </Button>

        {started && timeLeft && <TimerCard timeLeft={timeLeft} />}
      </Stack>
    </Container>
  );
};
