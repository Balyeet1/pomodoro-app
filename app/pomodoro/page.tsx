"use client"
import { useState, useEffect } from 'react';
import DrawerMenu from '@/app/lib/components/drawerMenu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BoltIcon from '@mui/icons-material/Bolt';
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PauseIcon from '@mui/icons-material/Pause';
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded';
import FastForwardIcon from '@mui/icons-material/FastForward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import Button from '@mui/material/Button';
import { poppins } from '@/app/lib/fonts/fonts';
import styleVariables from '@/app/pomodoro/variables.module.scss';

type PomodoroMode = {
  style: string;
  text: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: React.ComponentType<any>;
};

const pomodoroModes: { [key: string]: PomodoroMode } = {
  focus: {
    style: styleVariables.focus,
    text: "Focus",
    Icon: BoltIcon,
  },
  shortBreak: {
    style: styleVariables.shortBreak,
    text: "Short Break",
    Icon: CoffeeRoundedIcon,
  },
  longBreak: {
    style: styleVariables.longBreak,
    text: "Long Break",
    Icon: RocketLaunchRoundedIcon,
  },
};

export default function HomePage() {

  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);

  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [count, setCount] = useState<number>(25 * 60); // 1 minute
  const [currentMode, setCurrentMode] = useState<PomodoroMode>(pomodoroModes.focus);

  const changePomodoroMode = () => {
    if (currentMode === pomodoroModes.focus) {
      setCurrentMode(pomodoroModes.shortBreak);
    } else if (currentMode === pomodoroModes.shortBreak) {
      setCurrentMode(pomodoroModes.longBreak);
    } else {
      setCurrentMode(pomodoroModes.focus);
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isTimerRunning && count > 0) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    }
  }, [isTimerRunning]);

  return (
    <>
      <div className={`${currentMode.style}`}>
        <DrawerMenu isOpen={isMenuOpen} onClose={() => setisMenuOpen(false)} />
        <ExpandMoreIcon className='absolute top-4 left-4' onClick={() => setisMenuOpen(true)} />
        <div className='mx-32 p-4 flex flex-col items-center h-screen align-center justify-center'>
          <div className='w-full flex justify-center'>
            <div className={`border-2 flex justify-centen items-center rounded-3xl p-1 ${styleVariables.mode}`}>
              <currentMode.Icon className='mr-1 ml-1' fontSize="medium" />
              <h5 className='text-xl mr-1 whitespace-nowrap'>{currentMode.text}</h5>
            </div>
          </div>
          <div className={`w-full flex flex-col align-center items-center mt-4 ${poppins.className}`}>
            {isTimerRunning
              ? (
                <>
                  <h5 className='text-11xl leading-none'><strong>{Math.floor(count / 60)}</strong></h5>
                  <h5 className='text-11xl leading-none'><strong>{count % 60 < 10 ? `0${count % 60}` : count % 60}</strong></h5>
                </>
              ) : (
                <>
                  <h5 className='text-11xl leading-none'>25</h5>
                  <h5 className='text-11xl leading-none'>00</h5>
                </>
              )


            }
          </div>
          <div className='flex justify-center align-center items-center flex-nowrap mt-4'>
            <Button className={`${styleVariables.secondButton}`}><MoreHorizIcon fontSize="medium" /></Button>
            <div className='mx-4 flex justify-center'>
              <Button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`${styleVariables.primaryButton}`}>
                {
                  isTimerRunning
                    ? <PauseIcon fontSize="large" />
                    : <PlayArrowIcon fontSize="large" />
                }
              </Button>
            </div>
            <Button onClick={() => changePomodoroMode()} className={`${styleVariables.secondButton}`}><FastForwardIcon fontSize="medium" /></Button>
          </div>
        </div>
      </div >
    </>
  );
}
