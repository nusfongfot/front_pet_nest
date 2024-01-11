import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type Props = {};
export default function FAQsPage({}: Props) {
  return (
    <div>
      <HeaderBreadCrumbsSerVice title1='FAQs' title2='FAQs' />
      <Container maxWidth='xl' sx={{ mt: 10 }}>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Typography color={"#2d3054"} variant='h4' fontWeight={700}>
            Frequently Asked Questions
          </Typography>
          <Typography>
            This Agreement was last modified on 18th february 2022
          </Typography>
        </Stack>
        <Grid container spacing={3} mt={5} mb={5}>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' color={"#2d3054"} fontWeight={700}>
              General Questions
            </Typography>
            <Divider sx={{ mb: 3, mt: 3 }} />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>What Shipping Methods Are Available?</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium dolorema laudantium, totam anaperiam, eaque ipsa
                  quae illo inventore veritatis quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quian an
                  voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>
                  How Long Should One Wait Before Painting In Case Of A New
                  Construction?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium dolorema laudantium, totam anaperiam, eaque ipsa
                  quae illo inventore veritatis quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quian an
                  voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h5' color={"#2d3054"} fontWeight={700}>
              Other Questions
            </Typography>
            <Divider sx={{ mb: 3, mt: 3 }} />
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>
                  How Long Will It Take To Get My Package?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium dolorema laudantium, totam anaperiam, eaque ipsa
                  quae illo inventore veritatis quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quian an
                  voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur.
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography>
                  Can The Products Be Applied During Rainy Season?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium dolorema laudantium, totam anaperiam, eaque ipsa
                  quae illo inventore veritatis quasi architecto beatae vitae
                  dicta sunt explicabo. Nemo enim ipsam voluptatem quian an
                  voluptas sit aspernatur aut odit aut fugit, sed quia
                  consequuntur.
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
