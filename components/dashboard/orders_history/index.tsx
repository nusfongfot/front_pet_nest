import { getHistoryCarts } from "@/api/cart";
import DataGridServices from "@/components/service-ui/datagrid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import * as React from "react";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useLoading } from "@/zustand/loading";
import { createReviewAPI, getReviewedUserAPI } from "@/api/review";
import CloseIcon from "@mui/icons-material/Close";
import useInfo from "@/zustand/auth";
import { successToast } from "@/utils/notification";

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
export default function OrderHistoryComponent({}: Props) {
  const { setLoading } = useLoading();
  const { accInfo } = useInfo();
  const [rows, setRows] = React.useState<any[]>([]);
  const [dataReview, setDataReview] = React.useState<any[]>([]);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isReview, setIsReview] = React.useState<boolean>(false);
  const [valueStar, setValueStar] = React.useState<number>(1);
  const [valueDetail, setValueDetail] = React.useState<string>("");
  const [proId, setProId] = React.useState<string>("");
  const handleClickOpen = async (item: any) => {
    setProId(item.productId);
    setOpen(true);
    setIsReview(false);
  };

  const handleClose = () => {
    setOpen(false);
    setIsReview(false);
    setValueStar(1);
    setValueDetail("");
  };

  const handleCreateReview = async () => {
    try {
      const body = {
        productId: proId,
        name: accInfo.name,
        star: Number(valueStar),
        detail: valueDetail,
        isReview: true,
      };
      const res = await createReviewAPI(body);
      successToast(res.message, 1500);
    } catch (error) {
      return error;
    } finally {
      setOpen(false);
      setIsReview(true);
      setValueStar(1);
      setValueDetail("");
    }
  };

  const columns = [
    {
      field: "image",
      headerName: "Image",
      width: 240,
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
      field: "createdAt",
      headerName: "Order Date",
      align: "center",
      headerAlign: "center",
      width: 260,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{dayjs(params.value).format("LLL")}</Typography>
        </>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      align: "center",
      headerAlign: "center",
      width: 220,
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
      width: 220,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.row.qty}</Typography>
        </>
      ),
    },
    {
      field: "review",
      headerName: "Review",
      align: "center",
      headerAlign: "center",
      width: 250,
      sortable: false,
      renderCell: (params: any) => (
        <>
          {dataReview.some((item) => item.productId == params.row.productId) ? (
            <Typography variant='subtitle1' color={"error"}>
              Reviewed
            </Typography>
          ) : (
            <Button
              variant='contained'
              size='small'
              onClick={() => handleClickOpen(params.row)}
            >
              Review
            </Button>
          )}
        </>
      ),
    },
  ];

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getHistoryCarts();
        const dataReview = await getReviewedUserAPI();
        setDataReview(dataReview.review);
        setRows(res.data);
      } catch (error) {
        return error;
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      try {
        if (isReview) {
          const dataReview = await getReviewedUserAPI();
          setDataReview(dataReview.review);
        }
      } catch (error) {
        return error;
      }
    })();
  }, [isReview]);

  return (
    <div>
      <DataGridServices columns={columns} rows={rows} />

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        maxWidth='md'
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          Review Product
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
        <DialogContent dividers sx={{ width: { xs: "100%", sm: 400 } }}>
          <Stack flexDirection={"column"} alignItems={"center"}>
            <Rating
              name='simple-controlled'
              value={valueStar}
              onChange={(event, newValue) => {
                setValueStar(newValue || 1);
              }}
            />
            <TextField
              size='small'
              multiline
              maxRows={4}
              minRows={4}
              fullWidth
              value={valueDetail}
              onChange={(e) => setValueDetail(e.target.value)}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCreateReview}>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
