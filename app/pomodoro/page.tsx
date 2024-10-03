"use client"
import { useState } from 'react';
import DrawerMenu from '@/app/lib/components/drawerMenu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import clsx from 'clsx';

export default function HomePage() {

  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <>
      <div className="focus-container h-screen">
        <DrawerMenu isOpen={isMenuOpen} onClose={() => setisMenuOpen(false)} />
        <ExpandMoreIcon className='absolute top-4 left-4' onClick={() => setisMenuOpen(true)} />
      </div>
    </>
  );
}
