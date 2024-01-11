import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

type Props = {
  title: string;
};

export default function BreadCrumbsService({ title }: Props) {
  const breadcrumbs = [
    <Link underline='hover' key='1' color='inherit' href='/'>
      Home
    </Link>,
    <Link underline='hover' key='2' color='inherit' href='/shop'>
      Shop
    </Link>,
    <Typography key='3' color='#F94073' fontWeight={500}>
      {title}
    </Typography>,
  ];

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize='small' />}
        aria-label='breadcrumb'
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
