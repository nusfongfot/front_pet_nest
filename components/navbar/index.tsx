import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";

import {
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import LiveHelpIcon from "@mui/icons-material/LiveHelp";
import { useRouter } from "next/router";
import useInfo from "@/zustand/auth";
import { deleteCookie, getCookie } from "cookies-next";
import { googleLogout } from "@react-oauth/google";
import { deleteCarts, getAllCarts } from "@/api/cart";
import { useCartStore } from "@/zustand/carts";
import { successToast } from "@/utils/notification";
import { useProductStore } from "@/zustand/products";
import { useSearchStore } from "@/zustand/search";

type Anchor = "top" | "left" | "bottom" | "right";

const menuPageLeft = [
  {
    title: "Order Tracking",
    icon: <LocalShippingIcon />,
    link: "/order-tracking",
  },
  { title: "Help & Contact", icon: <HelpOutlineIcon />, link: "/help-contact" },
];
const menuPage = [
  { title: "Home", icon: <HomeIcon />, link: "/" },
  { title: "About", icon: <AccountBoxIcon />, link: "/about" },
  { title: "Shop", icon: <AddBusinessIcon />, link: "/shop" },
  { title: "FAQs", icon: <LiveHelpIcon />, link: "/faqs" },
  {
    title: "Order Tracking",
    icon: <LocalShippingIcon />,
    link: "/order-tracking",
  },
  { title: "Help & Contact", icon: <HelpOutlineIcon />, link: "/help-contact" },
];

export default function MyNavbar() {
  const router = useRouter();
  const { accInfo } = useInfo();
  const { search, setSearch } = useSearchStore();
  const tokenPet = getCookie("tokenPet");
  const { carts, setCarts } = useCartStore();
  const totalPrice = carts?.reduce((acc, val) => {
    const total = Number(val.product.price) * val.qty;
    return acc + total;
  }, 0);
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(
    null
  );
  // const [search, setSearch] = React.useState<string>("");

  const isMenuOpen = Boolean(anchorEl);
  const isMenuCartOpen = Boolean(anchorElCart);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const listMobileRender = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Stack
        flexDirection={"row"}
        alignItems={"center"}
        sx={{ background: "#00B8D9", p: 2, height: 100 }}
        gap={2}
      >
        <Avatar
          sx={{ width: 50, height: 50 }}
          onClick={() => router.push("/dashboard?subpath=overall")}
        />
        <Box>
          <Typography color={"white"}>Welcome!</Typography>
          <Typography color={"white"} onClick={() => router.push("/sign-in")}>
            Sign in
          </Typography>
        </Box>
      </Stack>
      <List>
        {menuPage.map((item) => (
          <ListItem
            key={item.title}
            disablePadding
            sx={{ background: router.pathname == item.link ? "#F94073" : "" }}
          >
            <ListItemButton onClick={() => router.push(`${item.link}`)}>
              <ListItemIcon
                sx={{
                  color: router.pathname == item.link ? "#ffffff" : "",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={{
                  color: router.pathname == item.link ? "#ffffff" : "",
                }}
                primary={item.title}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCart = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCart(event.currentTarget);
  };

  const handleMenuCloseCart = () => {
    setAnchorElCart(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    deleteCookie("tokenPet");
    googleLogout();
    window.location.replace("/");
  };

  const handleSearchAPI = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({
      pathname: "/shop",
      query: `search=${search}`,
    });
  };

  const handleDeleteProductInCart = async (cartId: string) => {
    try {
      const res = await deleteCarts(cartId);
      const deleteProduct = carts.filter((item) => item.cartId !== cartId);
      setCarts(deleteProduct);
      successToast(res.message, 1500);
    } catch (error) {
      return error;
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          router.push({
            pathname: "/dashboard",
            query: "subpath=overall",
          });
          handleMenuClose();
        }}
      >
        Dashboard
      </MenuItem>
      <MenuItem onClick={handleLogOut}>Log out</MenuItem>
    </Menu>
  );

  const renderMenuCart = (
    <Menu
      anchorEl={anchorElCart}
      sx={{ mt: 1, overflow: "auto" }}
      id={menuId}
      keepMounted
      open={isMenuCartOpen}
      onClose={handleMenuCloseCart}
    >
      <Box sx={{ width: { xs: "100%", md: 400 }, p: 1, overflow: "auto" }}>
        <Stack flexDirection={"row"} justifyContent={"space-between"}>
          <Typography>{`${carts?.length} items in cart`}</Typography>
          <Typography>Cart Subtotal</Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"flex-end"}>
          <Typography fontWeight={700} variant='h5'>
            {`$ ${totalPrice}`}
          </Typography>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"center"}>
          <Button
            variant='contained'
            className='btn_pink'
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              router.push("/checkout");
              handleMenuCloseCart();
            }}
          >
            proceed to checkout
          </Button>
        </Stack>
        <Stack flexDirection={"row"} justifyContent={"center"}>
          <Button
            variant='contained'
            className='btn_purple'
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => {
              router.push("/cart");
              handleMenuCloseCart();
            }}
          >
            View Cart
          </Button>
        </Stack>
        <Divider sx={{ mt: 3, mb: 3 }} />
        {carts?.map((item) => (
          <Box key={item.cartId}>
            <Stack flexDirection={"row"} gap={2} width={"100%"}>
              <img
                src={
                  item?.product?.images?.replace(/^"(.*)"$/, "$1").split(",")[0]
                }
                style={{ width: 60, height: 60 }}
              />
              <Box>
                <Typography>{item.product.title}</Typography>
                <Typography
                  fontWeight={700}
                >{`$ ${item.product.price}`}</Typography>
                <Stack
                  flexDirection={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Typography>{`Qty : ${item.qty}`}</Typography>
                  <Button
                    size='small'
                    color='error'
                    variant='contained'
                    onClick={() => handleDeleteProductInCart(item.cartId)}
                  >
                    X
                  </Button>
                </Stack>
              </Box>
            </Stack>
            <Divider sx={{ mt: 3, mb: 3 }} />
          </Box>
        ))}
      </Box>
    </Menu>
  );

  React.useEffect(() => {
    (async () => {
      if (!!tokenPet) {
        const res = await getAllCarts();
        setCarts(res.data);
      }
    })();
  }, [totalPrice, isMenuCartOpen]);

  React.useEffect(() => {
    setTimeout(() => {
      const userLoggedIn = accInfo.userId !== "";
      setIsLoggedIn(userLoggedIn);
    }, 2000);
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <div>
        {(["left", "right"] as const).map((anchor) => (
          <React.Fragment key={anchor}>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {listMobileRender(anchor)}
            </SwipeableDrawer>
          </React.Fragment>
        ))}
      </div>

      <AppBar position='static' sx={{ background: "black" }}>
        <Toolbar sx={{ display: { xs: "none", lg: "flex" } }}>
          <Stack
            width={"100%"}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Stack flexDirection={"row"} gap={3}>
              {menuPageLeft.map((item) => (
                <Stack
                  key={item.title}
                  sx={{ cursor: "pointer" }}
                  flexDirection={"row"}
                  alignItems={"center"}
                  gap={1}
                  onClick={() => router.push(`${item.link}`)}
                >
                  <Box
                    sx={{
                      color: router.pathname == item.link ? "#F94073" : "",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    sx={{
                      color: router.pathname == item.link ? "#F94073" : "",
                    }}
                  >
                    {item.title}
                  </Typography>
                </Stack>
              ))}
            </Stack>
            <Stack flexDirection={"row"} alignItems={"center"} gap={2}>
              {menuPage.map((item) => (
                <Typography
                  key={item.title}
                  sx={{
                    cursor: "pointer",
                    color: router.pathname == item.link ? "#F94073" : "",
                  }}
                  onClick={() => router.push(`${item.link}`)}
                >
                  {item.title !== "Order Tracking" &&
                  item.title !== "Help & Contact"
                    ? item.title
                    : null}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Toolbar>

        <Divider
          sx={{
            display: { xs: "none", lg: "block" },
            color: "white",
            background: "white",
            mb: 1,
          }}
        />

        <Toolbar
          sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}
        >
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={2}
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            <img
              src='/assets/images/logo.webp'
              style={{
                width: 70,
                height: 55,
                borderRadius: "50%",
                cursor: "pointer",
              }}
              onClick={() => router.push("/")}
            />
            <Typography variant='h5'>Bull Pets Shop</Typography>
          </Stack>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='open drawer'
            sx={{ mr: 2, display: { xs: "block", lg: "none" } }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>

          <Paper
            component='form'
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "900px",
            }}
            onSubmit={(e) => handleSearchAPI(e)}
          >
            <IconButton type='button' sx={{ p: "10px" }} aria-label='search'>
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={"Search a product"}
              inputProps={{ "aria-label": "search google maps" }}
              type='search'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </Paper>
          <Box sx={{ display: { xs: "none", lg: "flex" } }}>
            {isLoggedIn === null ? (
              <Skeleton
                variant='rectangular'
                width={180}
                height={45}
                sx={{ background: "grey" }}
              />
            ) : isLoggedIn || accInfo.userId ? (
              <Box>
                <IconButton
                  size='large'
                  aria-label='show 4 new mails'
                  color='inherit'
                  onClick={handleOpenCart}
                >
                  <Badge badgeContent={carts?.length} color='error'>
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <Avatar
                    src={accInfo.picture || ""}
                    sx={{ width: 30, height: 30 }}
                  />
                </IconButton>
              </Box>
            ) : (
              <Button
                variant='text'
                sx={{ color: "white" }}
                onClick={() => router.push("/sign-in")}
              >
                Sign in
              </Button>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
            <IconButton
              size='large'
              aria-label='show 4 new mails'
              color='inherit'
              onClick={handleOpenCart}
            >
              <Badge badgeContent={carts?.length} color='error'>
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderMenuCart}
    </Box>
  );
}
