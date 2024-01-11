import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PendingIcon from "@mui/icons-material/Pending";

type Props = {};
export default function OverAllComponent({}: Props) {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Typography variant='h4' fontWeight={700}>
                  10
                </Typography>
                <Typography variant='h6' fontWeight={700}>
                  Total Orders
                </Typography>
              </Box>
              <ShoppingBasketIcon
                sx={{ width: 90, height: 90, color: "#3498db" }}
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Typography variant='h4' fontWeight={700}>
                  10
                </Typography>
                <Typography variant='h6' fontWeight={700}>
                  Pending Orders
                </Typography>
              </Box>
              <PendingIcon sx={{ width: 90, height: 90, color: "#e74c3c" }} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant='h6'>Accout Info</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <Avatar />
              <Typography>Name</Typography>
            </Stack>
            <Typography variant='h6' mt={2}>
              Email: Demo@gmail.com
            </Typography>
            <Typography variant='h6'>Phone: 0885744510</Typography>
            <Typography variant='h6'>Username: demousername</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant='h6'>Billing Address</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Typography variant='h6'>Demo Testname</Typography>
            <Typography variant='h6'>
              House no 555/555 ถ.บรูพา ชุมโค ปะทิว ชุมพร 86160
            </Typography>
            <Typography variant='h6'>Detail: ตรงข้ามบ้านดินดำ</Typography>
            <Typography variant='h6'>Phone: 0855555555</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
