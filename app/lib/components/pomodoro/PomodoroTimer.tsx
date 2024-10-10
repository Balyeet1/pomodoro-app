"use client"
import { useState, useEffect, useCallback } from 'react'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import PauseIcon from '@mui/icons-material/Pause'
import FastForwardIcon from '@mui/icons-material/FastForward'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import Button from '@mui/material/Button'
import TimerDisplay from '@/app/lib/components/pomodoro/TimerDisplay'
import { pomodoroModes, PomodoroMode, pomodoroComponetsStyle, PomodoroSettings, SettingsOptions } from '@/app/lib/utils/pomdoro'
import ReplayIcon from '@mui/icons-material/Replay';
import ProgressBalls from '@/app/lib/components/generic/GenericProgressBalls'
import SettingsMenu from '@/app/lib/components/pomodoro/SettingsMenu'
import { getPomodoroSettingsCookie, setPomodoroSettingsCookie } from '@/app/lib/utils/cookies'


export default function PomodoroTimer() {

    const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [pomodoroMode, setPomodoroMode] = useState<PomodoroMode>(pomodoroModes.focus);

    const [settings, setSettings] = useState<PomodoroSettings>({
        focusMinutes: 0,
        shortBreakMinutes: 0,
        longBreakMinutes: 0,
        amountOfPomodori: 4,
    });

    const [timeInSeconds, setTimeInSeconds] = useState(settings.focusMinutes);
    const [pomodori, setPomodori] = useState(settings.amountOfPomodori);


    useEffect(() => {
        async function fetchData() {
            const pomodoroSettings = await getPomodoroSettingsCookie();
            setSettings(pomodoroSettings);
            setTimeInSeconds(pomodoroSettings.focusMinutes);
            setPomodori(pomodoroSettings.amountOfPomodori);
        }
        fetchData();
    }, []);



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
        {
            label: 'Amount of pomodori',
            value: settings.amountOfPomodori,
            onChange: (value: number) => {
                if (value > 6) {
                    value = 6;
                }

                setPomodori(value);
                setSettings({
                    ...settings,
                    amountOfPomodori: value,
                });
            }
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
        setPomodoroSettingsCookie(settings);

        if (isTimerRunning) return;


        setTimeInSeconds(getCurrentModeTimer());
    };

    const resetPomodoroTimer = () => {
        setTimeInSeconds(getCurrentModeTimer());
        setIsTimerRunning(false);
    };

    const changePomodoroMode = useCallback(() => {
        switch (pomodoroMode) {
            case pomodoroModes.focus:
                setPomodori(pomodori - 1);
                if (pomodori === 1) {
                    setPomodoroMode(pomodoroModes.longBreak);
                    setTimeInSeconds(settings.longBreakMinutes);
                    return;
                }
                setPomodoroMode(pomodoroModes.shortBreak);
                setTimeInSeconds(settings.shortBreakMinutes);
                break;
            case pomodoroModes.shortBreak:
                setPomodoroMode(pomodoroModes.focus);
                setTimeInSeconds(settings.focusMinutes);
                break;
            case pomodoroModes.longBreak:
                setPomodoroMode(pomodoroModes.focus);
                setTimeInSeconds(settings.focusMinutes);
                setPomodori(settings.amountOfPomodori);
                break;
            default:
                break;
        }

        setIsTimerRunning(false);
    }, [pomodoroMode, settings, setPomodoroMode, setTimeInSeconds, setIsTimerRunning, pomodori]);


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
            <SettingsMenu
                isDialogOpen={isSettingsDialogOpen}
                onClose={handleSettingsDialogClose}
                style={pomodoroMode.style}
                settingsOptions={settingsOptions}
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
                            onClick={resetPomodoroTimer}
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
                <div className='mt-8'>
                    <ProgressBalls
                        amount={settings.amountOfPomodori}
                        amountFilled={settings.amountOfPomodori - pomodori}
                        ballStyleEmpty={pomodoroComponetsStyle.progressEmpty}
                        ballStyleFilled={pomodoroComponetsStyle.progressFilled}
                    />
                </div>
            </div>
        </div>
    )
}
