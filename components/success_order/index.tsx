import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, Stack, Typography } from "@mui/material";
type Props = {};
function SuccessOrder({}: Props) {
  return (
    <Stack flexDirection={"column"} alignItems={"center"}>
      <CheckCircleIcon sx={{ width: 60, height: 60, color: "green" }} />
      <Typography variant='h4'>Your order is successfully place</Typography>
      <Stack flexDirection={"row"} gap={2} mt={2}>
        <Button variant='outlined' href='/dashboard?subpath=overall'>
          Go to dashboard
        </Button>
        <Button
          variant='contained'
          className='btn_pink'
          sx={{ width: 180 }}
          href='/dashboard?subpath=orders'
        >
          View Order
        </Button>
      </Stack>
    </Stack>
  );
}
export default SuccessOrder;
