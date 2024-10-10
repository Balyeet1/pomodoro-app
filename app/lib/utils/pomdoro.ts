import styleVariables from '@/app/variables.module.scss'
import BoltIcon from '@mui/icons-material/Bolt'
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'

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

export const pomodoroDefaultSettings: PomodoroSettings = {
    focusMinutes: 25 * 60,
    shortBreakMinutes: 5 * 60,
    longBreakMinutes: 15 * 60,
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