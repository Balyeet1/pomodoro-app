"use client"
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TimerIcon from '@mui/icons-material/Timer';
import HomeIcon from '@mui/icons-material/Home';
import Link from 'next/link';

export default function DrawerMenu({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
            <List>
                <Link href="/">
                    <ListItem key={"home"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                </Link>
                <Link href="/pomodoro">
                    <ListItem key={"pomodoro"} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <TimerIcon />
                            </ListItemIcon>
                            <ListItemText primary="Pomodoro" />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
        </Box>
    );

    return (
        <Drawer open={isOpen} onClose={onClose}>
            {DrawerList}
        </Drawer>
    );
}
