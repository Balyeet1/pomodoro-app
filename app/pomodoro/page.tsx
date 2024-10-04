"use client"
import { useState, useEffect } from 'react'
import DrawerMenu from '@/app/lib/components/drawerMenu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PauseIcon from '@mui/icons-material/Pause'
import FastForwardIcon from '@mui/icons-material/FastForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Button from '@mui/material/Button'
import TimerDisplay from '@/app/lib/components/pomodoro/TimerDisplay'
import { pomodoroModes, PomodoroMode, pomodoroComponetsStyle } from '@/app/lib/utils/pomdoro'

export default function Pomodoro() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [count, setCount] = useState<number>(25 * 60) // 1 minute
  const [currentMode, setCurrentMode] = useState<PomodoroMode>(pomodoroModes.focus)

  const changePomodoroMode = () => {
    if (currentMode === pomodoroModes.focus) {
      setCurrentMode(pomodoroModes.shortBreak)
    } else if (currentMode === pomodoroModes.shortBreak) {
      setCurrentMode(pomodoroModes.longBreak)
    } else {
      setCurrentMode(pomodoroModes.focus)
    }
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isTimerRunning && count > 0) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)

      if (intervalId) {
        return () => clearInterval(intervalId)
      }
    }
  }, [isTimerRunning, count])

  return (
    <>
      <div className={`${currentMode.style}`}>
        <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <ExpandMoreIcon className='absolute top-4 left-4' onClick={() => setIsMenuOpen(true)} />
        <div className='mx-32 p-4 flex flex-col items-center h-screen align-center justify-center'>
          <div className='w-full flex justify-center'>
            <div className={`border-2 flex items-center rounded-3xl p-1 ${pomodoroComponetsStyle.mode}`}>
              <currentMode.Icon className='mr-1 ml-1' fontSize='medium' />
              <h5 className='text-xl mr-1 whitespace-nowrap'>{currentMode.text}</h5>
            </div>
          </div>
          <TimerDisplay
            minutes={Math.floor(count / 60)}
            seconds={count % 60}
            isTimerRunning={isTimerRunning}
          />
          <div className='flex justify-center items-center flex-nowrap mt-4'>
            <Button className={`${pomodoroComponetsStyle.secondButton}`}><MoreHorizIcon fontSize='medium' /></Button>
            <div className='mx-4 flex justify-center'>
              <Button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`${pomodoroComponetsStyle.primaryButton}`}>
                {
                  isTimerRunning
                    ? <PauseIcon fontSize='large' />
                    : <PlayArrowIcon fontSize='large' />
                }
              </Button>
            </div>
            <Button onClick={() => changePomodoroMode()} className={`${pomodoroComponetsStyle.secondButton}`}><FastForwardIcon fontSize='medium' /></Button>
          </div>
        </div>
      </div >
    </>
  )
}
