import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import CheckoutHeader from "./components/CheckoutHeader";
import { FlexBox } from "../../layouts";

import { states } from "./constants/states";

const Checkout = () => {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <CheckoutHeader />
      <Box sx={{ maxWidth: "700px", mx: "auto", mt: "50px" }}>
        <Box
          sx={{
            border: "1px solid",
            borderRadius: "10px",
            borderColor: (theme) => theme.palette.grey[400],
            padding: "30px",
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            Address
          </Typography>

          <Stack component="form" spacing={2} onSubmit={null}>
            <Box>
              <TextField
                label="Receiver Name"
                type="text"
                name="name"
                fullWidth
                required
                autoComplete="off"
              />
            </Box>

            <FlexBox csx={{ gap: 2 }}>
              <TextField
                label="Mobile"
                name="mobile"
                type="text"
                fullWidth
                required
                autoComplete="off"
                inputProps={{
                  inputMode: "numeric",
                  maxLength: "10",
                  pattern: "\\d*",
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                }}
              />

              <TextField
                label="PIN code"
                name="pin"
                type="text"
                fullWidth
                required
                autoComplete="off"
                inputProps={{
                  inputMode: "numeric",
                  maxLength: "6",
                  pattern: "\\d*",
                }}
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);
                }}
              />
            </FlexBox>

            <TextField
              label="House/Apartment/Colony/Street"
              type="text"
              name="addressLine1"
              fullWidth
              required
              autoComplete="off"
            />
            <TextField
              label="Area/Sector/Lane"
              type="text"
              name="addressLine2"
              fullWidth
              required
              autoComplete="off"
            />

            <FormControl fullWidth>
              <InputLabel required id="landmark-label">
                Landmark
              </InputLabel>
              <Select labelId="landmark-label" id="landmarkId" label="landmark">
                {states.map((state, i) => (
                  <MenuItem value={state} key={i}>
                    {state}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FlexBox csx={{ gap: 2 }}>
              <TextField
                label="City/Town"
                name="city"
                type="text"
                fullWidth
                required
                autoComplete="off"
              />

              <FormControl fullWidth>
                <InputLabel required id="state-label">
                  State
                </InputLabel>
                <Select labelId="state-label" id="stateId" label="state">
                  {states.map((state, i) => (
                    <MenuItem value={state} key={i}>
                      {state}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </FlexBox>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default Checkout;
