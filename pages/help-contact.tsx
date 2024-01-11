import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

type Props = {};
export default function HelpPage({}: Props) {
  return (
    <div>
      <HeaderBreadCrumbsSerVice title1='Contact Us' title2='contact us' />
      <Container maxWidth='xl'>
        <Paper sx={{ background: "rgba(243, 236, 213, 0.8)", p: 2, mt: 2 }}>
          <Stack flexDirection={"row"} gap={2}>
            <LocationOnIcon sx={{ color: "#f94073", width: 50, height: 50 }} />
            <Box>
              <Typography variant='h5' fontWeight={700}>
                Address
              </Typography>
              <Typography>
                139 Brook Drive South Richmond Hill, New York 1067 USA
              </Typography>
            </Box>
          </Stack>
          <Stack flexDirection={"row"} gap={2} mt={3}>
            <LocalPhoneIcon sx={{ color: "#f94073", width: 50, height: 50 }} />
            <Box>
              <Typography variant='h5' fontWeight={700}>
                Phone
              </Typography>
              <Typography>088-888-8956</Typography>
            </Box>
          </Stack>
          <Stack flexDirection={"row"} gap={2} mt={3}>
            <EmailIcon sx={{ color: "#f94073", width: 50, height: 50 }} />
            <Box>
              <Typography variant='h5' fontWeight={700}>
                Mail
              </Typography>
              <Typography>bzopets@support.com</Typography>
            </Box>
          </Stack>
          <Stack flexDirection={"row"} gap={2} mt={3}>
            <AccessTimeIcon sx={{ color: "#f94073", width: 50, height: 50 }} />
            <Box>
              <Typography variant='h5' fontWeight={700}>
                Openning Time
              </Typography>
              <Typography>
                Monday to Saturday:{" "}
                <span style={{ color: "#f94073" }}>9:00 AM-18:00 PM</span>
              </Typography>
              <Typography>
                Sunday:{" "}
                <span style={{ color: "#f94073" }}>10:00 AM-17:30 PM</span>
              </Typography>
            </Box>
          </Stack>
        </Paper>
      </Container>
      <Box sx={{ mt: 5, mb: 5 }}>
        <iframe
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8791167739378!2d100.52422847508977!3d13.725767686663403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e298d25667f037%3A0xfb74608e99c397ec!2sSi%20Lom%2C%20Khet%20Bang%20Rak%2C%20Krung%20Thep%20Maha%20Nakhon%2010500!5e0!3m2!1sen!2sth!4v1704117610347!5m2!1sen!2sth'
          width='100%'
          height='450'
          loading='lazy'
        />
      </Box>
    </div>
  );
}
