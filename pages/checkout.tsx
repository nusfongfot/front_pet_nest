import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import SuccessOrder from "@/components/success_order";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

type Props = {};
export default function CheckoutPage({}: Props) {
  const [checkValue, setCheckValue] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  return (
    <Box>
      <HeaderBreadCrumbsSerVice title1='Checkout' title2='checkout' />
      <Container maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
        {isSuccess ? (
          <SuccessOrder />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={9}>
              <Typography fontWeight={700} variant='h4'>
                Billing Information
              </Typography>
              <Paper sx={{ p: 2, mt: 2 }}>
                <Typography>Billing Information</Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography>Sorawit Kandajin</Typography>
                <Typography>
                  House no 555/555 ถ.บรูพา ชุมโค ปะทิว ชุมพร 86160
                </Typography>
                <Typography>Detail: ตรงข้ามบ้านดินดำ</Typography>
                <Typography>Phone: 0855555555</Typography>
              </Paper>

              <Paper sx={{ p: 2, mt: 5 }}>
                <Typography>Payment Options</Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <FormControl>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    defaultValue='female'
                    name='radio-buttons-group'
                  >
                    <FormControlLabel
                      value='cod'
                      control={<Radio />}
                      label='Cash on Delivery'
                      onChange={(e: any) => setCheckValue(e.target.value)}
                    />
                    <FormControlLabel
                      value='qrcode'
                      control={<Radio />}
                      label='QrCode / Bank'
                      onChange={(e: any) => setCheckValue(e.target.value)}
                    />
                  </RadioGroup>
                </FormControl>

                {checkValue == "qrcode" ? (
                  <Box>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography variant='h5'>โอนผ่านธนาคาร</Typography>
                    <Typography variant='h5' mt={2} ml={3}>
                      บัญชี ออมทรัพย์ ธนาคารกรุงเทพ สาขา สยามพารากอน
                    </Typography>
                    <Typography variant='h5' ml={3}>
                      ชื่อบัญชี: บริษัท คอนส์ โรโบติกส์ จำกัด
                    </Typography>
                    <Typography variant='h5' ml={3}>
                      เลขบัญชี: 855-0-65158-5
                    </Typography>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography variant='h5'>
                      Scan QR Code ผ่าน app ธนาคาร
                    </Typography>
                    <img
                      src='/assets/images/qrcode.webp'
                      style={{
                        width: 200,
                        height: 200,
                        marginTop: 10,
                        marginLeft: 20,
                      }}
                    />
                    <Divider sx={{ mt: 2, mb: 2 }} />
                    <Typography variant='h5'>
                      อัพโหลดสลิปค่าใช้จ่าย (รูปภาพ/ภาพถ่ายเท่านั้น)
                    </Typography>
                    <input type='file' />
                  </Box>
                ) : null}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <Paper sx={{ p: 2, background: "#F5F5F5" }}>
                <Typography variant='h5' fontWeight={700}>
                  Order Summary
                </Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <Typography> 1 items in Cart</Typography>
                <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                  <Avatar />
                  <Box>
                    <Typography>Name of Product</Typography>
                    <Typography>$ 3,200.00</Typography>
                    <Typography>Qty : 1</Typography>
                  </Box>
                </Stack>
                <Stack flexDirection={"row"} justifyContent={"center"}>
                  <Button
                    sx={{ mt: 2 }}
                    fullWidth
                    variant='contained'
                    className='btn_pink'
                    onClick={() => setIsSuccess(true)}
                  >
                    Check out
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
