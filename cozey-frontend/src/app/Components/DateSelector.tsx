'use client';

import { useMemo, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import type { Dayjs } from 'dayjs';
import { Typography, Box } from '@mui/material';
import dayjs from 'dayjs';

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

//This is for showing the Pick List on specific Date
interface PickList {
    Product_name: string,
    Pick_List: ItemBundleMap[],
    Pick_quantity: number,
    Product_quantity: number,
    Product_price: number
}

//Made a dictionnary type for items
interface ItemBundleMap {
    item_id: number,
    item_name: string
}
//Made a dictionnary type for items
type ItemMap = Record<string, ItemBundleMap[]>

export default function DateSelector({
    ordersData, itemsData
}: {
    ordersData: OrdersData[];
    itemsData: ItemMap;
}) {
    const yesterday = dayjs().subtract(1, 'day').toISOString();
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs(yesterday));


    const thePickList = useMemo<PickList[]>(() => {

        //Created a PickList interface variable to store the product name and its lines
        const theLines: PickList[] = []

        ordersData.map((order) => {

            const theDate = order.Order_Date

            //If the selected date is the same as the date in the Orders date
            if (theDate === selectedDate?.format('DD/MM/YYYY')) {

                //Get the line items
                const theLineItems = order.Line_Items;

                //For each line items, get the bundle of line items and push it to the temporary array
                theLineItems.map((item) => {

                    //Get the line items of the product from the itemsData file
                    const bundle = itemsData[String(item.Product_id)]

                    //If it exist, then push it to the temporary file
                    if (bundle) {
                        theLines.push({ Product_name: item.Product_Name, Pick_List: bundle, Pick_quantity: item.Quantity, Product_quantity: item.Quantity, Product_price: item.Price })
                    }
                })
            }
        })
        return theLines;
    }, [ordersData, itemsData, selectedDate])

    return (
        <Box sx={{ textAlign: 'center' }}>

            {/* This is the date picker */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    label={false}
                    value={selectedDate}
                    onChange={(newValue) => setSelectedDate(newValue)}
                />
            </LocalizationProvider>

            {/* This is just the header */}
            <Box sx={{ mt: '50px' }}>
                <Typography
                    sx={{
                        fontSize: 24,
                        fontWeight: 800,
                        color: '#201F24',
                        display: 'inline-block',
                    }}
                >
                    <b>
                        Pick List for&nbsp;
                        {selectedDate ? selectedDate.format('DD/MM/YYYY') : ''}
                    </b>
                </Typography>

                {/* This displays the Pick list of the specific order dates */}
                <Box>
                    {thePickList.map((items, index) => {
                        return (
                            <Box sx={{ mt: '50px' }} key={index}>
                                <Typography sx={{ fontSize: '16px', fontWeight: '400', color: "#201F24", display: 'inline-block' }}><b><u>{items.Product_quantity}x - {items.Product_name} ({items.Product_price}$ Each)</u></b></Typography>

                                {items.Pick_List.map((picks, index) => {
                                    return (
                                        <Box sx={{ mt: '5px' }} key={index}>
                                            <Typography sx={{ fontSize: '14px', fontWeight: '400', color: "#201F24", display: 'inline-block' }}><b>- {picks.item_name}, Quantity: {items.Pick_quantity}</b></Typography>
                                        </Box>
                                    )
                                })}
                            </Box>
                        )

                    })}
                </Box>
            </Box>
        </Box>
    );
}