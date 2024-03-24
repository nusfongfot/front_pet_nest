import {
  Avatar,
  Box,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import PendingIcon from "@mui/icons-material/Pending";
import * as React from "react";
import useInfo from "@/zustand/auth";
import { getSeletedAddress } from "@/api/address";
import { getAllCarts, getHistoryCarts } from "@/api/cart";
import { useLoading } from "@/zustand/loading";
import { getCookie } from "cookies-next";

type Props = {};
export default function OverAllComponent({}: Props) {
  const { accInfo } = useInfo();
  const { setLoading } = useLoading();
  const tokenPet = getCookie("tokenPet");

  const [address, setAddress] = React.useState<any[]>([]);
  const [totalOrders, setTotalOrders] = React.useState<number>(0);
  const [pendingOrders, setPendingOrders] = React.useState<number>(0);
  const formattedNumber = address[0]?.phone?.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "$1-$2-$3"
  );

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        if (!!tokenPet) {
          const res = await getSeletedAddress(accInfo.userId);
          const history = await getHistoryCarts();
          const cartPending = await getAllCarts();

          setAddress(res.data);
          setTotalOrders(history.data.length);
          setPendingOrders(cartPending.data.length);
        }
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3 }}>
            <Stack flexDirection={"row"} justifyContent={"space-between"}>
              <Box>
                <Typography variant='h4' fontWeight={700}>
                  {totalOrders || 0}
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
                  {pendingOrders || 0}
                </Typography>
                <Typography variant='h6' fontWeight={700}>
                  Pending In Carts
                </Typography>
              </Box>
              <PendingIcon sx={{ width: 90, height: 90, color: "#e74c3c" }} />
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3} mt={5}>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant='h6'>Accout Info</Typography>
            <Divider sx={{ mt: 2, mb: 2 }} />
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <Avatar src={accInfo.picture || ""} />
              <Typography>{accInfo.name}</Typography>
            </Stack>
            <Typography variant='h6' mt={2}>
              {`Email: ${accInfo.email}`}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          {address.length == 0 ? (
            <Typography variant='h5'>Please Select Default Address</Typography>
          ) : (
            address.map((item) => (
              <Paper sx={{ p: 2, height: "100%" }} key={item.addressId}>
                <Typography variant='h6'>Billing Address</Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography variant='h6'>{accInfo.name}</Typography>
                <Typography variant='h6'>
                  {`House no: ${item.houseNo} road: ${item.road} tambon: ${item.tambon} amphoe: ${item.amphoe} province: ${item.province} zipcode: ${item.zipcode}`}
                </Typography>
                <Typography variant='h6'>Detail: {item?.detail}</Typography>
                <Typography variant='h6'>Phone: {formattedNumber}</Typography>
              </Paper>
            ))
          )}
        </Grid>
      </Grid>
    </div>
  );
}
