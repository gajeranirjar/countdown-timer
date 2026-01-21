import { Stack, Paper, Typography, Box } from "@mui/material";


export const TimerCard = ({ timeLeft }) => {

  if (timeLeft === "DONE") {
    return <Typography variant="h5">🎉 Countdown Finished 🎉</Typography>;
  }

  const seconds = Math.floor((timeLeft / 1000) % 60);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));

  const items = [
    { lable: "Days", value: days || 0 },
    { lable: "Hours", value: hours || 0},
    { lable: "Minutes", value: minutes || 0},
    { lable: "Seconds", value: seconds || 0},
  ];

  return (
    <Box sx={{ mt: 3 }}>
      <Stack
        direction="row"
        gap={3}
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {items.map(({lable , value}) => (
          <Paper
            key={lable}
            sx={{
              p: 1,
              minWidth: 100,
              textAlign: "center",
              mb : 2
            }}
          >
            <Typography variant="h5">{value}</Typography>
            <Typography variant="body2">{lable}</Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
