import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  NoSsr,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/router";
import OverAllComponent from "@/components/dashboard/overall";
import AddressComponent from "@/components/dashboard/address";
import OrderHistoryComponent from "@/components/dashboard/orders_history";
import HistoryIcon from "@mui/icons-material/History";
import OrdersComponent from "@/components/dashboard/orders";

type Props = {};
const data = [
  {
    title: "Dashboard",
    link: "/dashboard?subpath=overall",
    icon: <DashboardIcon />,
    subpath: "overall",
  },
  {
    title: "Address",
    link: "/dashboard?subpath=address",
    icon: <HomeIcon />,
    subpath: "address",
  },
  {
    title: "Orders",
    link: "/dashboard?subpath=orders",
    icon: <ShoppingCartIcon />,
    subpath: "orders",
  },
  {
    title: "Orders History",
    link: "/dashboard?subpath=orders-history",
    icon: <HistoryIcon />,
    subpath: "orders-history",
  },
];
export default function DashboardPage({}: Props) {
  const router = useRouter();
  return (
    <Container maxWidth='xl' sx={{ mt: 10, mb: 15.1 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} lg={2}>
          <List>
            {data.map((item) => (
              <ListItem
                disablePadding
                key={item.title}
                sx={{
                  background:
                    router.query.subpath == item.subpath ? "#F94073" : "",
                }}
                onClick={() => router.push(`${item.link}`)}
              >
                <ListItemButton>
                  <ListItemIcon
                    sx={{
                      color:
                        router.query.subpath == item.subpath ? "#ffffff" : "",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      color:
                        router.query.subpath == item.subpath ? "#ffffff" : "",
                    }}
                    primary={item.title}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} sm={8} lg={10}>
          <NoSsr>
            {router.query.subpath == "overall" && <OverAllComponent />}
            {router.query.subpath == "address" && <AddressComponent />}
            {router.query.subpath == "orders-history" && (
              <OrderHistoryComponent />
            )}
            {router.query.subpath == "orders" && <OrdersComponent />}
          </NoSsr>
        </Grid>
      </Grid>
    </Container>
  );
}
