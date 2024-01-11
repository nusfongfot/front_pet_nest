import DataGridServices from "@/components/service-ui/datagrid";
import { Typography } from "@mui/material";

type Props = {};
export default function OrderComponent({}: Props) {
  const columns = [
    {
      field: "orderId",
      headerName: "Order Id",
      width: 130,
      align: "center",
      headerAlign: "center",
      sortable: false,
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      align: "center",
      headerAlign: "center",
      sortable: false,
      renderCell: () => (
        <>
          <img
            src='/assets/images/meo.png'
            style={{ width: 100, height: 200, objectFit: "contain" }}
          />
        </>
      ),
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      align: "center",
      headerAlign: "center",
      width: 200,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      align: "center",
      headerAlign: "center",
      width: 200,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{`$ ${params.value}`}</Typography>
        </>
      ),
    },
    {
      field: "qty",
      headerName: "Qty",
      align: "center",
      headerAlign: "center",
      width: 300,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },

    {
      field: "status",
      headerName: "Status",
      align: "center",
      headerAlign: "center",
      width: 200,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Typography>{params.value}</Typography>
        </>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      orderId: "#123451",
      price: 40.0,
      qty: 5,
      orderDate: "18/01/2567 18:50PM",
      status: "Pending",
    },
    {
      id: 2,
      orderId: "#123456",
      price: 300.0,
      qty: 10,
      orderDate: "18/01/2567 20:50PM",
      status: "Success",
    },
  ];
  return (
    <div>
      <DataGridServices columns={columns} rows={rows} />
    </div>
  );
}
