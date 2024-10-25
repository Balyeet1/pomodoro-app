import { CookieCalendarRecord } from "@/app/lib/utils/pomdoro"
import BoltIcon from '@mui/icons-material/Bolt'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider/Divider'

export default function FocusSessionsList({ focusRecords }: { focusRecords: CookieCalendarRecord[] }) {
    const totalFocusDuration = focusRecords.reduce((total, record) => total + record.minutes, 0);

    return (
        <>
            <List className="shadow-lg" sx={{ overflowY: 'auto', height: '40vh' }}>
                {focusRecords.map((record, index) => (
                    <div key={index}>
                        <ListItem>
                            <BoltIcon />
                            <div className="flex mx-4 flex-col align-center justify-start mb-4">
                                <div><strong className="text-lg mr-2">Started Time: </strong>{record.startedAt}</div>
                                <div className="my-1"><strong className="text-lg mr-10">End Time: </strong>{record.endedAt}</div>
                                <div><strong className="text-lg mr-12">Duration: </strong>{record.minutes} Minutes</div>
                            </div>
                        </ListItem>
                        {index !== focusRecords.length - 1 && <Divider />}
                    </div>
                ))}
            </List>
            <div className="mx-4 mt-6 flex align-center">
                <strong className="mr-1">Total Focus Duration: </strong>{totalFocusDuration} Minutes
            </div>
        </>
    );
}
