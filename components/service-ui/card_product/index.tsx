import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";

type Props = {};
export default function CardProductService({}: Props) {
  const router = useRouter();
  return (
    <Card
      sx={{ maxWidth: 345, cursor: "pointer" }}
      onClick={() =>
        router.push({
          pathname: "shop/detail/1",
        })
      }
    >
      <CardMedia
        component='img'
        alt='green iguana'
        height='350'
        image='/assets/images/meo.png'
      />
      <CardContent>
        <Typography gutterBottom component='div'>
          Swing Bear Leaking Food Toy 2022 Balance Car Pet Toy Pink
        </Typography>
        <Stack flexDirection={"row"} gap={2} alignItems={"center"}>
          <Rating defaultValue={5} readOnly />
          <Typography>(50)</Typography>
        </Stack>
        <Typography fontWeight={700} variant='h5' mt={1} color='#f94073'>
          $15.00
        </Typography>
        <Typography color={"rgba(0,0,0,.5)"}>salable (100)</Typography>
      </CardContent>
    </Card>
  );
}
