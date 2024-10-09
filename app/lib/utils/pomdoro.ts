import styleVariables from '@/app/variables.module.scss'
import BoltIcon from '@mui/icons-material/Bolt'
import CoffeeRoundedIcon from '@mui/icons-material/CoffeeRounded'
import RocketLaunchRoundedIcon from '@mui/icons-material/RocketLaunchRounded'

export type PomodoroMode = {
    style: string
    text: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Icon: React.ComponentType<any>
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