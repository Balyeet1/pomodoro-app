"use client"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DrawerMenu from '@/app/lib/components/drawerMenu';
import { useState } from 'react';
export default function SideMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
            <ExpandMoreIcon
                sx={{ color: 'black' }}
                className='absolute top-4 left-4'
                onClick={() => setIsMenuOpen(true)}
            />
        </>
    )
}