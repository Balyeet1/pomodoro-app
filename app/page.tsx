"use client"
import { useState } from 'react';
import Button from '@mui/material/Button';
import DrawerMenu from '@/app/lib/components/drawerMenu';

export default function Home() {

  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <div role='main' className='flex m-4'>
      <Button variant="outlined" onClick={() => setisMenuOpen(true)}>Open drawer</Button>
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setisMenuOpen(false)}/>
    </div>
  );
}
