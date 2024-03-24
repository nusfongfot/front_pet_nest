import * as React from "react";
import {
  Button,
  Divider,
  FormControlLabel,
  FormGroup,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import CustomAddressDialog from "./address_dialog";
import {
  deleteAddress,
  getAllAddressOfUser,
  updateSelectedAddressByUser,
} from "@/api/address";
import useInfo from "@/zustand/auth";
import { useLoading } from "@/zustand/loading";
import { successToast } from "@/utils/notification";
import { formatPhone } from "@/utils/formatPhone";

type Props = {};
export default function AddressComponent({}: Props) {
  const { accInfo } = useInfo();
  const { setLoading } = useLoading();

  const [openAddress, setOpenAddress] = React.useState<boolean>(false);
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const [textUpdate, setTextUpdate] = React.useState<string>("");
  const [textEdit, setTextEdit] = React.useState<string>("");
  const [addresses, setAddresses] = React.useState<any[]>([]);
  const [singleAdd, setSingleAdd] = React.useState<any[]>([]);

  const handleClickOpenAddress = () => {
    setOpenAddress(true);
    setIsEdit(false);
  };
  const handleCloseAddress = () => {
    setOpenAddress(false);
    setIsEdit(false);
  };

  const handleOpenEditAddress = (addId: string) => {
    const filterAdd = addresses.filter((item) => item.addressId == addId);
    setIsEdit(true);
    setOpenAddress(true);
    setSingleAdd(filterAdd);
  };

  const handleSwitchChange = async (addId: string) => {
    try {
      const res = await updateSelectedAddressByUser(addId, accInfo.userId);
      successToast(res.message, 1500);
      setTextUpdate(addId);
    } catch (error) {
      return error;
    }
  };

  const handleDeleteAddress = async (addId: string) => {
    try {
      if (confirm("Are you sure to delete!")) {
        const res = await deleteAddress(addId);
        const filter = addresses.filter((item) => item.addressId !== addId);
        setAddresses(filter);
        successToast(res.message, 1500);
      }
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getAllAddressOfUser(accInfo.userId);
        setAddresses(res.data);
      } catch (error) {
        return error;
      }
      setLoading(false);
    })();
  }, [textUpdate, textEdit]);

  return (
    <div>
      <Button variant='contained' size='small' onClick={handleClickOpenAddress}>
        Add address
      </Button>
      {addresses.map((item, i) => (
        <Paper sx={{ p: 2, mt: 2 }} key={item.addressId}>
          <Typography>Address {i + 1}</Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant='h6'>Billing Address</Typography>
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Typography variant='h6'>{accInfo.name}</Typography>
          <Typography variant='h6'>
            {`House no ${item.houseNo} ${item.road} ${item.tambon} ${item.amphoe} ${item.province} ${item.zipcode}`}
          </Typography>
          <Typography variant='h6'>Detail: {item.detail}</Typography>
          <Typography variant='h6'>Phone: {formatPhone(item.phone)}</Typography>
          <Stack flexDirection={{ xs: "column", md: "row" }} gap={2} mt={1}>
            <Button
              variant='contained'
              color='error'
              size='small'
              onClick={() => handleDeleteAddress(item.addressId)}
              disabled={addresses.length == 1}
            >
              delete address
            </Button>
            <Button
              variant='contained'
              size='small'
              onClick={() => handleOpenEditAddress(item.addressId)}
            >
              edit address
            </Button>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={item.isDefault}
                    onChange={(e: any) => handleSwitchChange(item.addressId)}
                  />
                }
                label='Set as default'
              />
            </FormGroup>
          </Stack>
        </Paper>
      ))}

      <CustomAddressDialog
        openAddress={openAddress}
        setAddresses={setAddresses}
        setOpenAddress={setOpenAddress}
        addresses={addresses}
        isEdit={isEdit}
        singleAdd={singleAdd}
        setTextEdit={setTextEdit}
      />
    </div>
  );
}
