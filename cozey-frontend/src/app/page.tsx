
import { Box, Container, Typography } from "@mui/material";

import DateSelector from './Components/DateSelector'


interface LineItems {
  Line_item_id: number,
  Product_id: number,
  Product_Name: string,
  Price: number,
  Quantity: number
}

interface OrdersData {
  Order_id: number,
  Order_Total: number,
  Order_Date: string,
  Shipping_Address: string,
  Customer_Name: string,
  Customer_Email: string,
  Line_Items: LineItems[];
}

//Made a dictionnary type for items
interface ItemBundleMap {
  item_id: number,
  item_name: string
}

type ItemMap = Record<string, ItemBundleMap[]>

export default async function datePickerComponent() {


  //Fetches dates
  const res = await fetch('http://localhost:5000/getDates');
  const ordersData: OrdersData[] = await res.json();

  //Fetches the items
  const res2 = await fetch('http://localhost:5000/getItemsList');
  const itemsData: ItemMap = await res2.json();


  return (
    <Box>
      <Container>
        <Box sx={{ textAlign: 'center' }}>

          {/* This section shows the date picker to choose the dates */}
          <Typography sx={{ fontSize: '34px', fontWeight: '800', color: "#201F24", display: 'inline-block' }}><b>Pick List for Orders</b></Typography>

          <Box sx={{ mt: '50px' }}>
            <DateSelector ordersData={ordersData} itemsData={itemsData} />
          </Box>

        </Box>
      </Container>
    </Box>
  );
}
