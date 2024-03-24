import { getSeletedAddress } from "@/api/address";
import { getAllCarts } from "@/api/cart";
import { createOrders } from "@/api/orders";
import { uploadImages } from "@/api/upload";
import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import SuccessOrder from "@/components/success_order";
import { formatPhone } from "@/utils/formatPhone";
import { successToast } from "@/utils/notification";
import useInfo from "@/zustand/auth";
import { useCartStore } from "@/zustand/carts";
import { useLoading } from "@/zustand/loading";
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
import { useRouter } from "next/router";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

type Props = {};
const override = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "39.3vh",
  background: "white",
};
export default function CheckoutPage({}: Props) {
  const router = useRouter();
  const { accInfo } = useInfo();
  const { setLoading } = useLoading();
  const { carts, setCarts } = useCartStore();

  const totalPrice = carts?.reduce((acc, val) => {
    const total = Number(val.product.price) * val.qty;
    return acc + total;
  }, 0);
  const refInputFile = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<any[]>([]);

  const [checkValue, setCheckValue] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(true);
  const [address, setAddress] = useState<any[]>([]);

  const handleCreateOrdersByCoD = async () => {
    try {
      const body = {
        userId: accInfo.userId,
        addressId: address[0].addressId,
        slip: "",
        payment: "cod",
        status: "Already ordered",
        details: JSON.stringify(carts),
      };
      const res = await createOrders(body);
      successToast(res.message, 2000);
      setIsSuccess(true);
      setCarts([]);
    } catch (error) {
      return error;
    }
  };

  const handleCreateOrderByQrCode = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("images", files[0]);
    const upload = await uploadImages(formData);
    if (upload.message) {
      alert(upload.message);
    }
    try {
      const body = {
        userId: accInfo.userId,
        addressId: address[0].addressId,
        slip: upload.link.toString(),
        payment: "qrcode",
        status: "pending",
        details: JSON.stringify(carts),
      };
      const res = await createOrders(body);
      successToast(res.message, 2000);
      setIsSuccess(true);
      setCarts([]);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: any = event.target.files;
    setFiles(selectedFiles);
  };

  const handleCheckOutChoice = () => {
    if (checkValue == "cod") {
      handleCreateOrdersByCoD();
    } else {
      handleCreateOrderByQrCode();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getAllCarts();
        const dataAdd = await getSeletedAddress(accInfo.userId);
        setAddress(dataAdd.data);
        setCarts(res.data);
      } catch (error) {
        return error;
      }
    })();
  }, [accInfo.userId]);

  useMemo(() => {
    if (checkValue && address.length != 0) {
      setIsDone(false);
    } else {
      setIsDone(true);
    }
  }, [checkValue]);

  if (carts.length == 0 && accInfo.userId == "") {
    return (
      <PropagateLoader
        // loading={true}
        color='#36d7b7'
        size={10}
        cssOverride={override}
      />
    );
  }

  return (
    <Box>
      <HeaderBreadCrumbsSerVice title1='Checkout' title2='checkout' />
      <Container maxWidth='xl' sx={{ mt: 10, mb: 10 }}>
        {isSuccess ? <SuccessOrder /> : null}

        {carts.length == 0 && !isSuccess ? (
          <Stack flexDirection={"row"} justifyContent={"center"}>
            <Typography
              component={"a"}
              href='/shop'
              variant='h4'
              align='center'
            >
              Your cart is empty! Continue to Shopping
            </Typography>
          </Stack>
        ) : null}

        {carts.length > 0 ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={8}>
              <Typography fontWeight={700} variant='h4'>
                Billing Information
              </Typography>
              {address.length > 0 ? (
                <Paper sx={{ p: 2, mt: 2 }}>
                  <Typography>Billing Information</Typography>
                  <Divider sx={{ mt: 2, mb: 2 }} />
                  <Typography variant='h6'>{accInfo.name}</Typography>
                  <Typography variant='h6'>
                    {`House no ${address[0].houseNo} ${address[0].road} ${address[0].tambon} ${address[0].amphoe} ${address[0].province} ${address[0].zipcode}`}
                  </Typography>
                  <Typography variant='h6'>
                    Detail: {address[0].detail}
                  </Typography>
                  <Typography variant='h6'>
                    Phone: {formatPhone(address[0].phone)}
                  </Typography>
                </Paper>
              ) : (
                <Stack flexDirection={"row"} gap={2} mt={3}>
                  <Typography variant='h5' color='error'>
                    Please Set Default Address{" "}
                  </Typography>
                  <Button
                    size='small'
                    variant='contained'
                    onClick={() => router.push("/dashboard?subpath=address")}
                  >
                    Click Here
                  </Button>
                </Stack>
              )}

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
                    <input
                      type='file'
                      accept='image/jpeg, image/png'
                      onChange={handleFileChange}
                      ref={refInputFile}
                    />
                  </Box>
                ) : null}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} lg={4}>
              <Paper sx={{ p: 2, background: "#F5F5F5" }}>
                <Typography variant='h5' fontWeight={700}>
                  Order Summary
                </Typography>
                <Typography variant='h6'>{`Total Price: $ ${totalPrice}`}</Typography>
                <Divider sx={{ mt: 2, mb: 2 }} />
                {carts.map((item) => (
                  <Box key={item.cartId}>
                    <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
                      <img
                        src={
                          item?.product?.images
                            ?.replace(/^"(.*)"$/, "$1")
                            .split(",")[0]
                        }
                        style={{ width: 60, height: 60 }}
                      />
                      <Box>
                        <Typography>
                          {item.product.title.substring(0, 50) + "..."}
                        </Typography>
                        <Typography>{`$ ${item.product.price}`}</Typography>
                        <Typography>{`Qty : ${item.qty}`}</Typography>
                      </Box>
                    </Stack>
                    <Divider sx={{ mt: 2, mb: 2 }} />
                  </Box>
                ))}

                <Stack flexDirection={"row"} justifyContent={"center"}>
                  <Button
                    sx={{ mt: 2 }}
                    fullWidth
                    variant='contained'
                    className={isDone ? "" : "btn_pink"}
                    onClick={handleCheckOutChoice}
                    disabled={isDone}
                  >
                    Check out
                  </Button>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </Container>
    </Box>
  );
}
