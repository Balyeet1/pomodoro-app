import styleVariables from '@/app/variables.module.scss'
import BoltIcon from '@mui/icons-material/Bolt'
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'
import { getPomodoroSettingsCookie, setPomodoroSettingsCookie, getCalendarRecordsCookie, setCalendarRecordCookie } from '@/app/lib/utils/cookies'

export type PomodoroSettings = {
    focusMinutes: number,
    shortBreakMinutes: number,
    longBreakMinutes: number,
    amountOfPomodori: number,
}

export type SettingsOptions<E> = {
    label: string,
    value: E,
    onChange: (value: E) => void
}

export type PomodoroMode = {
    style: string
    text: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: React.ComponentType<any>
}

export type CalendarRecord = {
    startedAt: Date,
    endedAt: Date,
    minutes: number,
}

export type CookieCalendarRecord = {
    startedAt: string,
    endedAt: string,
    minutes: number,
    comment?: string,
}

export type CookieCalendarRecords = {
    [key: string]: CookieCalendarRecord[],
}

export const pomodoroDefaultSettings: PomodoroSettings = {
    focusMinutes: 25,
    shortBreakMinutes: 5,
    longBreakMinutes: 15,
    amountOfPomodori: 4,
}

export const pomodoroModes: { [key: string]: PomodoroMode } = {
    focus: {
        style: styleVariables.focus,
        text: 'Focus',
        Icon: BoltIcon,
    },
    shortBreak: {
        style: styleVariables.shortBreak,
        text: 'Short Break',
        Icon: CoffeeRoundedIcon,
    },
    longBreak: {
        style: styleVariables.longBreak,
        text: 'Long Break',
        Icon: RocketLaunchRoundedIcon,
    },
}

export const pomodoroComponetsStyle = {
    mode: styleVariables.mode,
    primaryButton: styleVariables.primaryButton,
    secondButton: styleVariables.secondButton,
    resetButton: styleVariables.resetButton,
    progressEmpty: styleVariables.progressEmpty,
    progressFilled: styleVariables.progressFilled,
}

export const pomodoroCacheApi = {
    getSettings: getPomodoroSettingsCookie,
    setSettings: setPomodoroSettingsCookie,
    getCalendarRecords: getCalendarRecordsCookie,
    setCalendarRecord: setCalendarRecordCookie,
}

