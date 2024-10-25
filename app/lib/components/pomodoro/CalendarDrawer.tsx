"use client"
import { useState, useEffect } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from '@/app/lib/components/generic/Calendar'
import Drawer from '@mui/material/Drawer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider/Divider'
import { pomodoroCacheApi, CookieCalendarRecords } from "@/app/lib/utils/pomdoro";
import BoltIcon from '@mui/icons-material/Bolt'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


export default function CalendarDrawer() {

    const [isCaledarDrawerOpen, setIsCalendarDrawerOpen] = useState(false);
    const [calendarRecords, setCalendarRecords] = useState<CookieCalendarRecords>();
    const [currentSelectedDate, setCurrentSelectedDate] = useState<string>("");

    useEffect(() => {
        async function fetchData() {
            const records = await pomodoroCacheApi.getCalendarRecords();
            setCalendarRecords(records);
        }

        fetchData();
    }, [])

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
                    <Calendar onChange={(date: string) => setCurrentSelectedDate(date)}></Calendar>
                    <div className='mt-4' />
                    <Divider />
                    <div className="flex flex-col align-center justify-start mt-4">
                        <strong className="text-2xl flex align-center justify-center mb-2">Focus Sessions</strong>
                        <List className="shadow-lg" sx={{ overflowY: 'auto', height: '40vh' }}>
                            {currentSelectedDate && calendarRecords && calendarRecords[currentSelectedDate] && calendarRecords[currentSelectedDate].map((record, index) => (
                                <div>
                                    <ListItem key={index}>

                                        <BoltIcon />
                                        <div className="flex mx-4 flex-col align-center justify-start mb-4o">
                                            <div><strong className="text-lg mr-2">Started Time: </strong>{record.startedAt}</div>
                                            <div className="my-1"><strong className="text-lg mr-10">End Time: </strong>{record.endedAt}</div>
                                            <div><strong className="text-lg mr-12">Duration: </strong>{record.minutes} Minutes</div>
                                        </div>
                                    </ListItem>
                                    {index !== calendarRecords[currentSelectedDate].length - 1 && <Divider />}
                                </div>
                            ))}
                        </List>
                        <div className="mx-4 mt-6 flex align-center">
                            <strong className="mr-1">Total Focus Duration: </strong>{currentSelectedDate && calendarRecords && calendarRecords[currentSelectedDate] && calendarRecords[currentSelectedDate].reduce((acc, record) => acc + record.minutes, 0) || 0} Minutes
                        </div>
                    </div>
                </div>
            </Drawer >
        </>

    )
}