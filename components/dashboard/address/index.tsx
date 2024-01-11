import {
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import CustomAddressDialog from "./address_dialog";
import * as React from "react";

type Props = {};
export default function AddressComponent({}: Props) {
  const [openAddress, setOpenAddress] = React.useState(false);

  const handleClickOpenAddress = () => {
    setOpenAddress(true);
  };
  const handleCloseAddress = () => {
    setOpenAddress(false);
  };
  return (
    <div>
      <Button variant='contained' size='small' onClick={handleClickOpenAddress}>
        Add address
      </Button>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography>Address</Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant='h6'>Billing Address</Typography>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Typography variant='h6'>Demo Testname</Typography>
        <Typography variant='h6'>
          House no 555/555 ถ.บรูพา ชุมโค ปะทิว ชุมพร 86160
        </Typography>
        <Typography variant='h6'>Detail: ตรงข้ามบ้านดินดำ</Typography>
        <Typography variant='h6'>Phone: 0855555555</Typography>
        <Stack flexDirection={{ xs: "column", md: "row" }} gap={2} mt={1}>
          <Button variant='contained' color='error' size='small'>
            delete address
          </Button>
          <Button
            variant='contained'
            size='small'
            onClick={handleClickOpenAddress}
          >
            edit address
          </Button>
          <FormGroup>
            <FormControlLabel control={<Switch />} label='Set as default' />
          </FormGroup>
        </Stack>
      </Paper>

      <CustomAddressDialog
        openAddress={openAddress}
        handleCloseAddress={handleCloseAddress}
      />
    </div>
  );
}
