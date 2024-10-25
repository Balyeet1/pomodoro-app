"use client"
import { useState, useEffect } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Calendar from '@/app/lib/components/generic/Calendar'
import Drawer from '@mui/material/Drawer';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider/Divider'
import { pomodoroCacheApi, CookieCalendarRecords } from "@/app/lib/utils/pomdoro";
import FocusSessionsList from "@/app/lib/components/pomodoro/FocusSessionsList";


export default function CalendarDrawer() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [calendarRecords, setCalendarRecords] = useState<CookieCalendarRecords | null>(null);
    const [selectedDate, setSelectedDate] = useState<string>("");

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const fetchedRecords = await pomodoroCacheApi.getCalendarRecords();
                setCalendarRecords(fetchedRecords);
            } catch (error) {
                console.error("Error fetching calendar records", error);
            }
        };

        fetchRecords();
    }, []);

    return (
        <>
            <CalendarMonthIcon
                className="absolute top-4 right-8"
                onClick={() => setIsDrawerOpen(true)}
            />
            <Drawer
                anchor="right"
                sx={{
                    width: 330,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: 330,
                        boxSizing: "border-box",
                    },
                }}
                variant="persistent"
                open={isDrawerOpen}
            >
                <ChevronRightIcon
                    className="mx-4 mt-4 text-black"
                    onClick={() => setIsDrawerOpen(false)}
                />
                <div className="flex flex-col items-center justify-center">
                    <Calendar onChange={(date) => setSelectedDate(date)} />
                    <div className="mt-4" />
                    <Divider />
                    <div className="flex flex-col items-center justify-start mt-4">
                        <strong className="text-2xl mb-2">Focus Sessions</strong>
                        {selectedDate && calendarRecords && (
                            <FocusSessionsList
                                focusRecords={calendarRecords[selectedDate] || []}
                            />
                        )}
                    </div>
                </div>
            </Drawer>
        </>
    );
}
