"use client"
import { useState } from 'react';
import DrawerMenu from '@/app/lib/components/drawerMenu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BoltIcon from '@mui/icons-material/Bolt';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';


export default function HomePage() {

  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <>
      <div className="focus-container">
        <DrawerMenu isOpen={isMenuOpen} onClose={() => setisMenuOpen(false)} />
        <ExpandMoreIcon className='absolute top-4 left-4' onClick={() => setisMenuOpen(true)} />
        <div className='mx-32 p-4 flex flex-col items-center h-screen align-center justify-center'>
          <div className='w-full flex justify-center'>
            <div className='border-2 flex justify-centen items-center rounded-3xl p-1 mode'>
              <BoltIcon fontSize="medium"/>
              <h5 className='text-xl mr-1'>Focus</h5>
            </div>
          </div>
          <div className='w-full flex flex-col align-center items-center mt-4'>
            <h5 className='text-11xl leading-none'>25</h5>
            <h5 className='text-11xl leading-none'>00</h5>
          </div>
          <div className='flex justify-center align-center items-center flex-nowrap mt-4'>
            <Button className='second-button'><MoreHorizIcon fontSize="medium"/></Button>
            <div className='mx-4 flex justify-center'><Button className='primary-button'><PlayArrowIcon fontSize="large"/></Button></div>
            <Button className='second-button'><FastForwardIcon fontSize="medium" /></Button>
          </div>
        </div>
      </div>
    </>
  );
}
