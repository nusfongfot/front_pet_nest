import { Box, Breadcrumbs, Link, Stack, Typography } from "@mui/material";

type Props = {
  title1: string;
  title2: string;
};
export default function HeaderBreadCrumbsSerVice({ title1, title2 }: Props) {
  return (
    <Box
      sx={{
        backgroundImage: 'url("assets/images/bg-breadcrumbs.jpg")',
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        height: 252,
      }}
    >
      <Stack
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100%"}
      >
        <Typography variant='h2' color={"#2d3054"} fontWeight={700}>
          {title1}
        </Typography>
        <Breadcrumbs aria-label='breadcrumb'>
          <Link underline='hover' color='inherit' href='/'>
            Home
          </Link>
          <Typography color='#F94073' fontWeight={500}>
            {title2}
          </Typography>
        </Breadcrumbs>
      </Stack>
    </Box>
  );
}
