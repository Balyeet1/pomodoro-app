"use client"
import { useState } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from '@/app/lib/components/generic/Calendar'
import Drawer from '@mui/material/Drawer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider/Divider'
//import IconButton from '@mui/material/IconButton'

export default function CalendarDrawer() {

    const [isCaledarDrawerOpen, setIsCalendarDrawerOpen] = useState(false);

    return (
        <>
            <CalendarMonthIcon
                className='absolute top-4 right-8'
                onClick={() => setIsCalendarDrawerOpen(true)}
            />
            <Drawer
                anchor="right"
                sx={{
                    width: 330,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 330,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                open={isCaledarDrawerOpen}
            >
                <ChevronRightIcon className='mx-4 mt-4 text-black' onClick={() => setIsCalendarDrawerOpen(false)} />
                <div className='flex flex-col align-center justify-center'>
                    <Calendar onChange={(date: string) => console.log(date)}></Calendar>
                    <div className='mt-4'></div>
                    <Divider />
                </div>
            </Drawer>
        </>

    )
}