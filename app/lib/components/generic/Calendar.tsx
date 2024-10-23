"use client"
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from 'dayjs';

export default function Calendar({
    onChange
}: {
    onChange?: (value: string) => void
}) {

    const [value, setValue] = useState<Dayjs | null>(dayjs());

    useEffect(() => {
        if (onChange) {
            onChange(value?.format('DD/MM/YYYY') || '')
        }
    }, [value, onChange])


    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                value={value}
                views={['year', 'month', 'day']}
                onChange={(selectedDate) => {
                    setValue(selectedDate)
                }}
            />
            <div className='flex justify-center'>
                <Button size='small' onClick={() => setValue(dayjs())}>Today</Button>
            </div>
        </LocalizationProvider>
    )
}