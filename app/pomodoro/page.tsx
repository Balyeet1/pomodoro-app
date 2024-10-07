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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box'
import { Divider } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay';

type TimersAmount = {
  focus: number,
  shortBreak: number,
  longBreak: number
}

export default function Pomodoro() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false)
  const [count, setCount] = useState<number>(25 * 60) // 25 minute
  const [currentMode, setCurrentMode] = useState<PomodoroMode>(pomodoroModes.focus)

  const [modeTimerAmounts, setmodeTimerAmounts] = useState<TimersAmount>({
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  })


  const handleDialogClickOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);

    if (isTimerRunning) return

    if (currentMode === pomodoroModes.focus) {
      setCount(modeTimerAmounts.focus);
    } else if (currentMode === pomodoroModes.shortBreak) {
      setCount(modeTimerAmounts.shortBreak);
    } else {
      setCount(modeTimerAmounts.longBreak);
    }
  };


  const changePomodoroMode = () => {
    if (currentMode === pomodoroModes.focus) {
      setCurrentMode(pomodoroModes.shortBreak)
      setCount(modeTimerAmounts.shortBreak);
    } else if (currentMode === pomodoroModes.shortBreak) {
      setCurrentMode(pomodoroModes.longBreak)
      setCount(modeTimerAmounts.longBreak);
    } else {
      setCurrentMode(pomodoroModes.focus)
      setCount(modeTimerAmounts.focus);
    }
    setIsTimerRunning(false)
  }

  const resetTimer = () => {
    if (currentMode === pomodoroModes.focus) {
      setCount(modeTimerAmounts.focus);
    } else if (currentMode === pomodoroModes.shortBreak) {
      setCount(modeTimerAmounts.shortBreak);
    } else {
      setCount(modeTimerAmounts.longBreak);
    }
    setIsTimerRunning(false)
  }

  useEffect(() => {
    let intervalId: NodeJS.Timeout
    if (isTimerRunning && count > 0) {
      intervalId = setInterval(() => {
        setCount((prevCount) => prevCount - 1)
      }, 950)

      if (intervalId) {
        return () => clearInterval(intervalId)
      }
    }
  }, [isTimerRunning, count])

  return (
    <>
      <div className={`${currentMode.style}`}>
        <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <Dialog
          open={isDialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="responsive-dialog-title"
          sx={{
            '& .MuiPaper-root': {
              borderRadius: '20px'
            }
          }}
        >
          <div
            className={`${currentMode.style}`}
          >
            <DialogTitle id="responsive-dialog-title">
              <div className='flex justify-between items-center'>
                <strong>
                  Settings
                </strong>
                <CloseIcon fontSize='small' className='cursor-pointer' onClick={() => setIsDialogOpen(false)} />
              </div>
            </DialogTitle>
            <Divider />
            <DialogContent>
              <div className='flex items-center justify-between '>
                <h5 className='mr-8 text-sm'><strong>Focus lenght</strong></h5>
                <Box sx={{ display: 'flex', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '7ch' } }}>
                  <TextField
                    id="outlined-number"
                    type="number"
                    size='small'
                    value={modeTimerAmounts.focus / 60}
                    onChange={(e) => setmodeTimerAmounts({ ...modeTimerAmounts, focus: Number(e.target.value) * 60 })}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Box>
              </div>
              <div className='flex items-center justify-between '>
                <h5 className='mr-8 text-sm'><strong>Small break lenght</strong></h5>
                <Box sx={{ display: 'flex', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '7ch' } }}>
                  <TextField
                    id="outlined-number"
                    type="number"
                    size='small'
                    value={modeTimerAmounts.shortBreak / 60}
                    onChange={(e) => setmodeTimerAmounts({ ...modeTimerAmounts, shortBreak: Number(e.target.value) * 60 })}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Box>
              </div>
              <div className='flex items-center justify-between '>
                <h5 className='mr-8 text-sm'><strong>Long break lenght</strong></h5>
                <Box sx={{ display: 'flex', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '7ch' } }}>
                  <TextField
                    id="outlined-number"
                    type="number"
                    size='small'
                    value={modeTimerAmounts.longBreak / 60}
                    onChange={(e) => setmodeTimerAmounts({ ...modeTimerAmounts, longBreak: Number(e.target.value) * 60 })}
                    slotProps={{
                      inputLabel: {
                        shrink: true,
                      },
                    }}
                  />
                </Box>
              </div>
            </DialogContent>
          </div>
        </Dialog>
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
            <Button
              onClick={() => handleDialogClickOpen()}
              className={`${pomodoroComponetsStyle.secondButton}`}>
              <MoreHorizIcon fontSize='medium' />
            </Button>
            <div className='mr-1 ml-4 flex justify-center'>
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
            <div className='mr-4 ml-2 flex justify-center'>
              <Button
                disabled={!isTimerRunning}
                onClick={resetTimer}
                className={`${isTimerRunning ? pomodoroComponetsStyle.primaryButton : pomodoroComponetsStyle.resetButton}`}
              >
                <ReplayIcon fontSize='large' />
              </Button>
            </div>
            <Button onClick={() => changePomodoroMode()} className={`${pomodoroComponetsStyle.secondButton}`}><FastForwardIcon fontSize='medium' /></Button>
          </div>
        </div>
      </div >
    </>
  )
}
