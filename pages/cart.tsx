import DataGridServices from "@/components/service-ui/datagrid";
import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

type Props = {};
export default function CartPage({}: Props) {
  const router = useRouter();
  const columns = [
    {
      field: "item",
      headerName: "Item",
      width: 200,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: () => (
        <>
          <img
            src='/assets/images/meo.png'
            style={{ width: 100, height: 200, objectFit: "contain" }}
          />
        </>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderCell: (params: any) => (
        <>
          <Typography>{`$ ${params.value}`}</Typography>
        </>
      ),
    },
    {
      field: "qty",
      headerName: "Qty",
      align: "center",
      headerAlign: "center",
      width: 300,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderCell: (params: any) => (
        <>
          <Typography>
            $ {(params.row.qty * params.row.price).toLocaleString("en")}
          </Typography>
        </>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      align: "center",
      headerAlign: "center",
      width: 200,
      renderCell: (params: any) => (
        <>
          <Button variant='contained' size='small' color='error'>
            X
          </Button>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      price: 40.0,
      qty: 5,
    },
    {
      id: 2,
      price: 300.0,
      qty: 10,
    },
  ];
  return (
    <Box>
      <HeaderBreadCrumbsSerVice title1='Shopping Cart' title2='shopping cart' />
      <Container maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={9}>
            <DataGridServices columns={columns} rows={rows} />
          </Grid>
          <Grid item xs={12} lg={3}>
            <Paper sx={{ p: 2, background: "#F5F5F5" }}>
              <Typography fontWeight={700} variant='h5'>
                Summary
              </Typography>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Subtotal</Typography>
                <Typography>$ 3,200.00</Typography>
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Shipping</Typography>
                <Typography>Free</Typography>
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography>Discount</Typography>
                <Typography>$ 0</Typography>
              </Stack>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Stack flexDirection={"row"} justifyContent={"space-between"}>
                <Typography fontWeight={700} variant='h6'>
                  Total
                </Typography>
                <Typography fontWeight={700} variant='h6'>
                  $ 3,200.00
                </Typography>
              </Stack>
              <Stack flexDirection={"row"} justifyContent={"center"}>
                <Button
                  sx={{ mt: 2 }}
                  variant='contained'
                  fullWidth
                  className='btn_pink'
                  onClick={() => router.push("/checkout")}
                >
                  proceed to checkout
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
