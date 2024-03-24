import * as React from "react";
import TrackingSteppers from "@/components/step-track";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { checkStatusOfOrder } from "@/api/orders";
import PropagateLoader from "react-spinners/PropagateLoader";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { errorToast } from "@/utils/notification";

dayjs.extend(localizedFormat);
type Props = {};
const override: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "39.3vh",
  background: "white",
};
export default function Track({}: Props) {
  const router = useRouter();
  const [dataDetail, setDataDetail] = React.useState<any>({});
  const [totalPrice, setTotalPrice] = React.useState<any[]>([]);

  React.useEffect(() => {
    (async () => {
      if (router.query.id) {
        try {
          const res = await checkStatusOfOrder(router.query.id as string);
          if (res.data) {
            setDataDetail(res.data);
            setTotalPrice(JSON.parse(res.data.details));
          } else {
            errorToast(res.message, 2000);
            router.replace("/");
          }
        } catch (error: any) {
          return error;
        }
      }
    })();
  }, [router.query.id]);

  if (router.query.id == undefined) {
    return <PropagateLoader color='#36d7b7' size={10} cssOverride={override} />;
  }

  return (
    <Container maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
      <Paper sx={{ p: 2 }}>
        <Stack
          flexDirection={"row"}
          justifyContent={"space-between"}
          sx={{ background: "rgb(254, 250, 228)", p: 2 }}
        >
          <Box>
            <Typography>{`#${dataDetail.orderId}`}</Typography>
            <Typography>
              {`Order Placed in ${dayjs(dataDetail.createdAt).format("LLL")}`}
            </Typography>
          </Box>
          <Typography color={"rgb(45, 165, 243)"} variant='h4'>
            {`$ ${totalPrice.reduce((acc: any, val: any) => {
              const total = val.qty * val.product.price;
              return acc + total;
            }, 0)}`}
          </Typography>
        </Stack>
        <Box mt={5} mb={5}>
          <TrackingSteppers status={dataDetail.status} />
        </Box>
      </Paper>
    </Container>
  );
}
