import { deleteCarts } from "@/api/cart";
import DataGridServices from "@/components/service-ui/datagrid";
import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import { successToast } from "@/utils/notification";
import { useCartStore } from "@/zustand/carts";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type Props = {};
export default function CartPage({}: Props) {
  const router = useRouter();
  const { carts, setCarts } = useCartStore();
  const totalPrice = carts.reduce((acc, val) => {
    const total = Number(val.product.price) * val.qty;
    return acc + total;
  }, 0);
  const [rows, setRows] = useState<any[]>([]);

  const handleDeleteProductInCart = async (cartId: string) => {
    try {
      const res = await deleteCarts(cartId);
      const deleteProduct = carts.filter((item) => item.cartId !== cartId);
      setCarts(deleteProduct);
      successToast(res.message, 1500);
    } catch (error) {
      return error;
    }
  };

  const columns = [
    {
      field: "item",
      headerName: "Item",
      width: 200,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => (
        <>
          <img
            src={
              params.row.product.images.replace(/^"(.*)"$/, "$1").split(",")[0]
            }
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
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{`$ ${params.row.product.price}`}</Typography>
        </>
      ),
    },
    {
      field: "qty",
      headerName: "Qty",
      align: "center",
      headerAlign: "center",
      width: 280,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.row.qty}</Typography>
        </>
      ),
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      align: "center",
      headerAlign: "center",
      width: 200,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>
            $ {(params.row.qty * params.row.product.price).toLocaleString("en")}
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
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Button
            variant='contained'
            size='small'
            color='error'
            onClick={() => handleDeleteProductInCart(params.row.cartId)}
          >
            X
          </Button>
        </>
      ),
    },
  ];

  useMemo(() => {
    setRows(carts);
  }, [carts]);

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
                <Typography>{`$ ${totalPrice}`}</Typography>
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
                  {`$ ${totalPrice}`}
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
