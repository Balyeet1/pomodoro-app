"use client"
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';

export default function Calendar({
    onChange
}: {
    onChange?: (value: string) => void
}) {

    const [value, setValue] = useState<Dayjs | null>(dayjs());


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={value}
                views={['year', 'month', 'day']}
                onChange={(selectedDate) => {
                    setValue(selectedDate)
                    onChange && onChange(selectedDate.format('DD-MM-YYYY'))
                }}
            />
            <Button size='small' onClick={() => setValue(dayjs())}>Today</Button>
        </LocalizationProvider>
    )
}