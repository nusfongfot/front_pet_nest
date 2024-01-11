import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, MenuItem, TextField } from "@mui/material";

type Props = {
  handleCloseAddress: () => void;
  openAddress: boolean;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const currencies = [
  {
    value: "USD",
    label: "$",
  },
  {
    value: "EUR",
    label: "€",
  },
  {
    value: "BTC",
    label: "฿",
  },
  {
    value: "JPY",
    label: "¥",
  },
];

export default function CustomAddressDialog({
  handleCloseAddress,
  openAddress,
}: Props) {
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleCloseAddress}
        aria-labelledby='customized-dialog-title'
        open={openAddress}
        maxWidth='xl'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Create Address Info
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleCloseAddress}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            background: "red",
            ":hover": {
              background: "red",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: 500 }}>
            <Typography>House no</Typography>
            <TextField fullWidth size='small' />

            <Typography>Road</Typography>
            <TextField fullWidth size='small' />

            <Typography>Detail (Optional)</Typography>
            <TextField fullWidth size='small' />

            <Typography>Province</Typography>
            <TextField
              id='outlined-select-currency'
              select
              fullWidth
              size='small'
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Typography>Amphoe</Typography>
            <TextField
              id='outlined-select-currency'
              select
              fullWidth
              size='small'
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Typography>Tambon</Typography>
            <TextField
              id='outlined-select-currency'
              select
              fullWidth
              size='small'
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <Typography>Zipcode</Typography>
            <TextField
              id='outlined-select-currency'
              select
              fullWidth
              size='small'
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseAddress}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
