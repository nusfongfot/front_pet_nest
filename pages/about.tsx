import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import { Container, Grid, Typography } from "@mui/material";

type Props = {};
export default function AboutPage({}: Props) {
  return (
    <div>
      <HeaderBreadCrumbsSerVice title1='About Us' title2='about us' />
      <Container maxWidth='xl' sx={{ mt: 5, mb: 5 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' color={"#2d3054"} fontWeight={700}>
              Hello, With 25+ Years Of Experience
            </Typography>
            <Typography mt={3}>
              Simply dummy text the printing and typesetting industry. Lorem
              Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a galley of type and scrambled
              it to make a type specimen book.
            </Typography>

            <Typography mt={3}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots piece classical Latin literature from 45 BC, making
              it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more.
            </Typography>
            <Typography mt={3}>
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots piece classical Latin literature from 45 BC, making
              it over 2000 years old. Richard McClintock, a Latin professor at
              Hampden-Sydney College in Virginia, looked up one of the more.
            </Typography>
            <Grid container mt={4}>
              <Grid item xs={12} md={6}>
                <Typography variant='h5' color={"#2d3054"} fontWeight={700}>
                  Our Vision
                </Typography>
                <Typography>
                  Lorem simply dummy text the arm printing typesetting industry
                  the industry standard dummy ever since the unknown printer a
                  took galley of type and scrambled
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant='h5' color={"#2d3054"} fontWeight={700}>
                  Our Mission
                </Typography>
                <Typography>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using suffered alterationmore
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src='/assets/images/side1.jpg'
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} mt={5}>
          <Grid item xs={12} md={6}>
            <img
              src='/assets/images/side2.jpg'
              style={{ width: "100%", height: "auto" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant='h4' fontWeight={700} color={"#2d3054"}>
              We Are Proud To Provide The Best Service For Customers
            </Typography>
            <Typography>
              consectetur adipiscing elit, sed eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis
              nostrud exercitation ullamco laboris nisi ut aliquip commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit.
            </Typography>

            <Typography variant='h5' fontWeight={700} color={"#2d3054"} mt={3}>
              Our History
            </Typography>
            <Typography>
              We must explain to you how all this mistaken idea of denouncing
              pleasure and praising paint was born and I will give you acomplete
              account of the system, and expound actual teachings of the great
              explorer of the truth, the master-builder of human happiness.
            </Typography>

            <Typography variant='h5' fontWeight={700} color={"#2d3054"} mt={3}>
              Operations
            </Typography>
            <Typography>
              Accusamus et iusto odio dignissimos ducimus qui blanditiis
              praesentium voluptatum deleniti atque corrupti quos dolores et
              quasa molestias excepturi sint occaecati cupiditate provident,
              similique sunt in culpa qui officia deserunt mollitia animi,
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
