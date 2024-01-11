import HeaderBreadCrumbsSerVice from "@/components/service-ui/header-breadcrumbs";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { googleLoginOauth } from "@/api/auth";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
  googleLogout,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import useInfo from "@/zustand/auth";
import { deleteCookie, setCookie } from "cookies-next";
import { successToast } from "@/utils/notification";

type Props = {};

export default function SignPage({}: Props) {
  const router = useRouter();
  const { setInfo, accInfo } = useInfo();

  const handleLogOut = () => {
    deleteCookie("tokenPet");
    googleLogout();
    window.location.replace("/");
  };

  console.log("accInfo", accInfo);
  return (
    <Box>
      <HeaderBreadCrumbsSerVice title1='Sign in' title2='sign in' />
      <Container maxWidth='xl'>
        <Stack
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant='h4' mt={3} mb={3}>
            Sign in with google
          </Typography>

          {accInfo.userId == "" ? (
            <GoogleOAuthProvider
              clientId={
                process.env.NEXT_PUBLIC_BASEURL_CLIENT_GOOGLE_ID as string
              }
            >
              <GoogleLogin
                onSuccess={async (credentialResponse: CredentialResponse) => {
                  // const decoded = jwtDecode(credentialResponse.credential);
                  const res = await googleLoginOauth({
                    token: credentialResponse.credential,
                  });
                  if (res.data) {
                    setCookie("tokenPet", res.token);
                    // setInfo(res.data);
                    window.location.replace("/");
                    successToast("login successfully", 1500);
                  }
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
                width={"300"}
                logo_alignment='left'
              />
            </GoogleOAuthProvider>
          ) : (
            <Button
              variant='contained'
              color='error'
              size='small'
              sx={{ width: 300 }}
              onClick={handleLogOut}
            >
              Log out
            </Button>
          )}

          <Box mt={2} />
        </Stack>
      </Container>
    </Box>
  );
}
