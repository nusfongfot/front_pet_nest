import DataGridServices from "@/components/service-ui/datagrid";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useLoading } from "@/zustand/loading";
import CloseIcon from "@mui/icons-material/Close";
import { getHistoryOrders } from "@/api/orders";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { numberWithComma } from "@/utils/numberWithComma";

dayjs.extend(localizedFormat);
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
type Props = {};
export default function OrdersComponent({}: Props) {
  const { setLoading } = useLoading();
  const [rows, setRows] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [dataDetail, setDataDetail] = React.useState<any[]>([]);

  const handleClickOpen = async (item: any) => {
    setOpen(true);
    setDataDetail(JSON.parse(item));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    {
      field: "orderId",
      headerName: "Order Id",
      width: 300,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.row.orderId}</Typography>
        </>
      ),
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      align: "center",
      headerAlign: "center",
      width: 300,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{dayjs(params.value).format("LLL")}</Typography>
        </>
      ),
    },
    {
      field: "details",
      headerName: "Details",
      width: 300,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: (params: any) => (
        <>
          <RemoveRedEyeIcon
            sx={{ cursor: "pointer" }}
            onClick={() => handleClickOpen(params.row.details)}
          />
        </>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      width: 320,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.row.status}</Typography>
        </>
      ),
    },
  ];

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getHistoryOrders();
        setRows(res.data);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      <DataGridServices columns={columns} rows={rows} />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='xl'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Details
        </DialogTitle>
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: 700 }}>
            <Typography variant='h6' fontWeight={700} align='right'>
              Total:{" "}
              {dataDetail.reduce((acc, val) => {
                const total = val.qty * val.product.price;
                return acc + total;
              }, 0)}{" "}
              $
            </Typography>
            {dataDetail.map((item) => (
              <Stack flexDirection={"row"} gap={3} key={item.orderId}>
                <img
                  src={JSON.parse(item.product.images).split(",")[0]}
                  style={{ width: 150, height: 150 }}
                />
                <Box>
                  <Typography>{item.product.title}</Typography>
                  <Typography>Price: {item.product.price}</Typography>
                  <Typography>Qty: {item.qty}</Typography>
                  <Typography variant='h6' fontWeight={500}>
                    subtotal: {numberWithComma(item.product.price * item.qty)}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
