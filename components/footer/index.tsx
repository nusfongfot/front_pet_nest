import {
  Box,
  Button,
  Divider,
  Grid,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/router";

type Props = {};
const menuPage = [
  { title: "Home", icon: <KeyboardArrowRightIcon />, link: "/" },
  { title: "About", icon: <KeyboardArrowRightIcon />, link: "/about" },
  { title: "Shop", icon: <KeyboardArrowRightIcon />, link: "/shop" },
  { title: "FAQs", icon: <KeyboardArrowRightIcon />, link: "/faqs" },
];
export default function FooterComponent({}: Props) {
  const router = useRouter();
  return (
    <Box sx={{ background: "black", color: "white", p: 3, pt: 8 }}>
      <Grid container>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: 4 }}>
          <Typography variant='h4'>Contact Us</Typography>
          <Typography sx={{ mt: 2 }}>
            Address: 139 Brook Drive South Richmond Hill, New York 1067 USA
          </Typography>
          <Box mt={3}>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              <img
                src='/assets/images/line.png'
                style={{ width: 30, height: 30 }}
              />
              <Typography variant='h5'>@support</Typography>
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2} mt={1}>
              <LocalPhoneIcon sx={{ width: 30, height: 30 }} />
              <Typography variant='h5'>088-888-8956</Typography>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: 4 }}>
          <Typography variant='h4'>Quick Links</Typography>
          <Box sx={{ mt: 2 }} />
          {menuPage.map((item) => (
            <Stack flexDirection={"row"} gap={1} key={item.title}>
              <Box>{item.icon}</Box>
              <Typography
                sx={{
                  ":hover": {
                    color: "#F94073",
                  },
                  cursor: "pointer",
                }}
                onClick={() => router.push(`${item.link}`)}
              >
                {item.title}
              </Typography>
            </Stack>
          ))}
        </Grid>
        <Grid item xs={12} md={6} lg={4} sx={{ mt: 4 }}>
          <Typography variant='h4'>Our Newsletter</Typography>
          <Typography sx={{ mt: 2 }}>
            Subscribe to the weekly newsletter for all the latest updates & get
            a 10% off bill offers.
          </Typography>
          <Stack flexDirection={"row"}>
            <Paper
              sx={{
                p: "5px",
                display: "flex",
                alignItems: "center",
                width: 500,
                mt: 3,
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='Your email address...'
              />

              <Button variant='contained' className='btn_pink'>
                Subscribe
              </Button>
            </Paper>
          </Stack>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 8, mb: 2, background: "rgba(255,255,255,0.3)" }} />
      <Grid container>
        <Grid item xs={12} lg={6}>
          <Typography sx={{ fontSize: 14 }}>
            BzoPets &copy; 2022 Demo Store. All Rights Reserved. Designed by
            BZOTech.Com
          </Typography>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Stack flexDirection={"row"} justifyContent={"flex-end"}>
            <img src='/assets/images/payment.png' />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
