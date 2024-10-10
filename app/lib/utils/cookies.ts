import { pomodoroDefaultSettings, PomodoroSettings } from '@/app/lib/utils/pomdoro'
import Cookie from 'js-cookie'

export const getPomodoroSettingsCookie = async (): Promise<PomodoroSettings> => {
    const pomodoroSettings = await Cookie.get('pomodoroSettings')
    return pomodoroSettings ? JSON.parse(pomodoroSettings) : pomodoroDefaultSettings
}

export const setPomodoroSettingsCookie = (pomodoroSettings: PomodoroSettings) => {
    Cookie.set(
        'pomodoroSettings',
        JSON.stringify(pomodoroSettings), {
        secure: true,
    })
}