import { pomodoroDefaultSettings, PomodoroSettings, CalendarRecord } from '@/app/lib/utils/pomdoro'
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

export const getCalendarRecordsCookie = async () => {
    const calendarRecords = await Cookie.get('calendarRecords')
    return calendarRecords ? JSON.parse(calendarRecords) : []
}

export const setCalendarRecordCookie = async (calendarRecord: CalendarRecord) => {

    const calendarRecordDate = `${calendarRecord.startedAt.getDate()}/${calendarRecord.startedAt.getMonth() + 1}/${calendarRecord.startedAt.getFullYear()}`

    const previousRecords = await getCalendarRecordsCookie()

    previousRecords[calendarRecordDate] = previousRecords[calendarRecordDate] ? [...previousRecords[calendarRecordDate], calendarRecord] : [calendarRecord]

    Cookie.set(
        'calendarRecords',
        JSON.stringify(previousRecords), {
        secure: true,
    })
}