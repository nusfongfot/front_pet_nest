import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { Address, CreateInput } from "thai-address-autocomplete-react";
import useInfo from "@/zustand/auth";
import { createAddress, editAddress } from "@/api/address";
import LoadingButton from "@mui/lab/LoadingButton";
import { successToast } from "@/utils/notification";
import SaveIcon from "@mui/icons-material/Save";

const InputThaiAddress = CreateInput();

type Props = {
  openAddress: boolean;
  setAddresses: React.Dispatch<React.SetStateAction<any[]>>;
  setOpenAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setTextEdit: React.Dispatch<React.SetStateAction<string>>;
  addresses: any[];
  singleAdd: any[];
  isEdit: boolean;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomAddressDialog({
  openAddress,
  setAddresses,
  addresses,
  isEdit,
  singleAdd,
  setOpenAddress,
  setTextEdit,
}: Props) {
  const { accInfo } = useInfo();
  const [loading, setLoading] = React.useState(false);
  const [address, setAddress] = React.useState<Address>({
    district: "",
    amphoe: "",
    province: "",
    zipcode: "",
  });

  const [values, setValues] = React.useState({
    houseNo: "",
    road: "",
    phone: "",
    detail: "",
  });

  const handleChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChange = (scope: string) => (value: string) => {
    setAddress((oldAddr: Address) => ({
      ...oldAddr,
      [scope]: value,
    }));
  };

  const handleSelect = (address: Address) => {
    setAddress(address);
  };

  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const body = {
        userId: accInfo.userId,
        phone: values.phone,
        houseNo: values.houseNo,
        road: values.road,
        detail: values.detail,
        province: address.province,
        amphoe: address.amphoe,
        tambon: address.district,
        zipcode: address.zipcode,
      };
      const res = await createAddress(body);
      setAddresses([res.data, ...addresses]);
      successToast(res.message, 2000);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
      setOpenAddress(false);
      setAddress({
        district: "",
        amphoe: "",
        province: "",
        zipcode: "",
      });
      setValues({
        houseNo: "",
        road: "",
        phone: "",
        detail: "",
      });
    }
  };

  const handleEditAddress = async () => {
    setLoading(true);
    try {
      const body = {
        userId: accInfo.userId,
        phone: values.phone,
        houseNo: values.houseNo,
        road: values.road,
        detail: values.detail,
        province: address.province,
        amphoe: address.amphoe,
        tambon: address.district,
        zipcode: address.zipcode,
      };
      const res = await editAddress(singleAdd[0].addressId, body);
      successToast(res.message, 2000);
      setTextEdit(singleAdd[0]);
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
      setOpenAddress(false);
      setAddress({
        district: "",
        amphoe: "",
        province: "",
        zipcode: "",
      });
      setValues({
        houseNo: "",
        road: "",
        phone: "",
        detail: "",
      });
    }
  };

  React.useMemo(() => {
    if (isEdit) {
      setAddress({
        district: singleAdd[0].tambon,
        amphoe: singleAdd[0].amphoe,
        province: singleAdd[0].province,
        zipcode: singleAdd[0].zipcode,
      });
      setValues({
        houseNo: singleAdd[0].houseNo,
        road: singleAdd[0].road,
        phone: singleAdd[0].phone,
        detail: singleAdd[0].detail,
      });
    } else {
      setAddress({
        district: "",
        amphoe: "",
        province: "",
        zipcode: "",
      });
      setValues({
        houseNo: "",
        road: "",
        phone: "",
        detail: "",
      });
    }
    if (!openAddress) {
      setAddress({
        district: "",
        amphoe: "",
        province: "",
        zipcode: "",
      });
      setValues({
        houseNo: "",
        road: "",
        phone: "",
        detail: "",
      });
    }
  }, [singleAdd, isEdit, openAddress]);

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={() => setOpenAddress(false)}
        aria-labelledby='customized-dialog-title'
        open={openAddress}
        maxWidth='xl'
        sx={{ zIndex: 20 }}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
          {isEdit ? "Edit Address" : "Create Address Info"}
        </DialogTitle>

        <IconButton
          aria-label='close'
          onClick={() => setOpenAddress(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            background: "red",
            ":hover": {
              background: "red",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box sx={{ width: 500 }}>
            <label>บ้านเลขที่</label>

            <TextField
              fullWidth
              value={values.houseNo}
              name='houseNo'
              onChange={(e: any) => handleChangeValues(e)}
              sx={{
                ".MuiOutlinedInput-input": {
                  height: 1.5,
                },
              }}
            />

            <label>ถนน</label>
            <TextField
              fullWidth
              value={values.road}
              name='road'
              onChange={(e: any) => handleChangeValues(e)}
              sx={{
                ".MuiOutlinedInput-input": {
                  height: 1.5,
                },
              }}
            />

            <label>เบอร์โทรศัพท์</label>
            <TextField
              fullWidth
              value={values.phone}
              name='phone'
              onChange={(e: any) => handleChangeValues(e)}
              sx={{
                ".MuiOutlinedInput-input": {
                  height: 1.5,
                },
              }}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />

            <label>จังหวัด</label>
            <InputThaiAddress.Province
              value={address["province"]}
              onChange={handleChange("province")}
              onSelect={handleSelect}
            />
            <label>อำเภอ</label>
            <InputThaiAddress.Amphoe
              value={address["amphoe"]}
              onChange={handleChange("amphoe")}
              onSelect={handleSelect}
            />
            <label>ตำบล</label>
            <InputThaiAddress.District
              value={address["district"]}
              onChange={handleChange("district")}
              onSelect={handleSelect}
            />
            <label>รหัสไปรษณีย์</label>
            <InputThaiAddress.Zipcode
              value={address["zipcode"]}
              onChange={handleChange("zipcode")}
              onSelect={handleSelect}
              autoCompleteProps={{ autoFocus: true }}
            />

            <label>รายละเอียดเพิ่มเติม(ทางเลือก)</label>
            <TextField
              fullWidth
              value={values.detail}
              name='detail'
              onChange={(e: any) => handleChangeValues(e)}
              sx={{
                ".MuiOutlinedInput-input": {
                  height: 1.5,
                },
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <LoadingButton
            size='small'
            onClick={isEdit ? handleEditAddress : handleSaveChanges}
            loading={loading}
            loadingPosition='start'
            variant='contained'
            sx={{ width: "160px" }}
            startIcon={<SaveIcon />}
          >
            <span>Save changes</span>
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
