"use client"
import { useState, useEffect, useCallback } from 'react'
import DrawerMenu from '@/app/lib/components/drawerMenu'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PauseIcon from '@mui/icons-material/Pause'
import FastForwardIcon from '@mui/icons-material/FastForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Button from '@mui/material/Button'
import TimerDisplay from '@/app/lib/components/pomodoro/TimerDisplay'
import { pomodoroModes, PomodoroMode, pomodoroComponetsStyle } from '@/app/lib/utils/pomdoro'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box'
import ReplayIcon from '@mui/icons-material/Replay';
import GenericDialog from '@/app/lib/components/generic/GenericDialog'

type Settings = {
  focusMinutes: number,
  shortBreakMinutes: number,
  longBreakMinutes: number
}

type SettingsOptions<E> = {
  label: string,
  value: E,
  onChange: (value: E) => void
}

export default function PomodoroTimer() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeInSeconds, setTimeInSeconds] = useState(25 * 60);
  const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>(pomodoroModes.focus);

  const [settings, setSettings] = useState<Settings>({
    focusMinutes: 25 * 60,
    shortBreakMinutes: 5 * 60,
    longBreakMinutes: 15 * 60,
  });

  const settingsOptions: SettingsOptions<number>[] = [
    {
      label: 'Focus length',
      value: settings.focusMinutes / 60,
      onChange: (value: number) =>
        setSettings({
          ...settings,
          focusMinutes: value * 60,
        }),
    },
    {
      label: 'Short break length',
      value: settings.shortBreakMinutes / 60,
      onChange: (value: number) =>
        setSettings({
          ...settings,
          shortBreakMinutes: value * 60,
        }),
    },
    {
      label: 'Long break length',
      value: settings.longBreakMinutes / 60,
      onChange: (value: number) =>
        setSettings({
          ...settings,
          longBreakMinutes: value * 60,
        }),
    },
  ];

  const getCurrentModeTimer = () => {
    switch (pomodoroMode) {
      case pomodoroModes.focus:
        return settings.focusMinutes;
      case pomodoroModes.shortBreak:
        return settings.shortBreakMinutes;
      case pomodoroModes.longBreak:
        return settings.longBreakMinutes;
      default:
        return 0;
    }
  };

  const canResetTimer = () =>
    isTimerRunning ||
    getCurrentModeTimer() !== timeInSeconds;

  const handleSettingsDialogClose = () => {
    setIsSettingsDialogOpen(false);

    if (isTimerRunning) return;

    setTimeInSeconds(getCurrentModeTimer());
  };

  const resetTimer = () => {
    setTimeInSeconds(getCurrentModeTimer());
    setIsTimerRunning(false);
  };

  const changePomodoroMode = useCallback(() => {
    switch (pomodoroMode) {
      case pomodoroModes.focus:
        setPomodoroMode(pomodoroModes.shortBreak);
        setTimeInSeconds(settings.shortBreakMinutes);
        break;
      case pomodoroModes.shortBreak:
        setPomodoroMode(pomodoroModes.longBreak);
        setTimeInSeconds(settings.longBreakMinutes);
        break;
      case pomodoroModes.longBreak:
        setPomodoroMode(pomodoroModes.focus);
        setTimeInSeconds(settings.focusMinutes);
        break;
      default:
        break;
    }

    setIsTimerRunning(false);
  }, [pomodoroMode, settings, setPomodoroMode, setTimeInSeconds, setIsTimerRunning]);

  
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isTimerRunning && timeInSeconds === 0) {
      changePomodoroMode();
    }

    if (isTimerRunning && timeInSeconds > 0) {
      intervalId = setInterval(() => {
        setTimeInSeconds((prevTime) => prevTime - 1);
      }, 990);

      if (intervalId) {
        return () => clearInterval(intervalId);
      }
    }
  }, [isTimerRunning, timeInSeconds, changePomodoroMode]);

  return (
    <div className={`${pomodoroMode.style}`}>
      <DrawerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <SettingsMenu
        isDialogOpen={isSettingsDialogOpen}
        onClose={handleSettingsDialogClose}
        style={pomodoroMode.style}
        settingsOptions={settingsOptions}
      />
      <ExpandMoreIcon
        className='absolute top-4 left-4'
        onClick={() => setIsMenuOpen(true)}
      />
      <div className='mx-32 p-4 flex flex-col items-center h-screen align-center justify-center'>
        <div className='w-full flex justify-center'>
          <div className={`border-2 flex items-center rounded-3xl p-1 ${pomodoroComponetsStyle.mode}`}>
            <pomodoroMode.Icon className='mr-1 ml-1' fontSize='medium' />
            <h5 className='text-xl mr-1 whitespace-nowrap'>{pomodoroMode.text}</h5>
          </div>
        </div>
        <TimerDisplay
          minutes={Math.floor(timeInSeconds / 60)}
          seconds={timeInSeconds % 60}
          isTimerRunning={isTimerRunning}
        />
        <div className='flex justify-center items-center flex-nowrap mt-4'>
          <Button
            onClick={() => setIsSettingsDialogOpen(true)}
            className={`${pomodoroComponetsStyle.secondButton}`}
          >
            <MoreHorizIcon fontSize='medium' />
          </Button>
          <div className='mr-1 ml-4 flex justify-center'>
            <Button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className={`${pomodoroComponetsStyle.primaryButton}`}
            >
              {
                isTimerRunning
                  ? <PauseIcon fontSize='large' />
                  : <PlayArrowIcon fontSize='large' />
              }
            </Button>
          </div>
          <div className='mr-4 ml-2 flex justify-center'>
            <Button
              disabled={!canResetTimer()}
              onClick={resetTimer}
              className={
                canResetTimer()
                  ? pomodoroComponetsStyle.primaryButton
                  : pomodoroComponetsStyle.resetButton
              }
            >
              <ReplayIcon fontSize='large' />
            </Button>
          </div>
          <Button
            onClick={() => changePomodoroMode()}
            className={`${pomodoroComponetsStyle.secondButton}`}
          >
            <FastForwardIcon fontSize='medium' />
          </Button>
        </div>
      </div>
    </div>
  );
}

/**
 * A generic settings menu dialog component.
 *
 * @param {string} [style] - Optional class string for styling the dialog.
 * @param {boolean} isDialogOpen - Whether the dialog is open or not.
 * @param {() => void} onClose - The function to be called when the dialog is closed.
 * @param {SettingsOptions[]} settingsOptions - The options to be rendered in the dialog.
 *
 * @returns {JSX.Element} The dialog component.
 */
function SettingsMenu({
  style,
  isDialogOpen,
  onClose,
  settingsOptions,
}: {
  style?: string,
  isDialogOpen: boolean,
  onClose: () => void,
  settingsOptions: SettingsOptions<number>[],
}) {

  return (
    <GenericDialog
      isOpen={isDialogOpen}
      onClose={onClose}
      title="Settings"
      className={style}
    >
      {settingsOptions.map((option) => (
        <div className='flex items-center justify-between' key={option.label}>
          <h5 className='mr-8 text-sm'><strong>{option.label}</strong></h5>
          <Box sx={{ display: 'flex', alignItems: 'center', '& .MuiTextField-root': { m: 1, width: '7ch' } }}>
            <TextField
              id="outlined-number"
              type="number"
              size='small'
              value={option.value}
              onChange={(e) => {
                e.preventDefault();
                const value = Number(e.target.value);
                if (value < 1 || value > 99) {
                  return;
                }
                option.onChange(value);
              }}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Box>
        </div>
      ))}
    </GenericDialog >
  )
}