import { poppins } from '@/app/lib/fonts/fonts'

export default function TimerDisplay({
    minutes: displayedMinutes,
    seconds: displayedSeconds,
    isTimerRunning,
}: {
    minutes: number;
    seconds: number;
    isTimerRunning: boolean;
}) {
    const paddedMinutes = displayedMinutes < 10 ? `0${displayedMinutes}` : String(displayedMinutes);
    const paddedSeconds = displayedSeconds < 10 ? `0${displayedSeconds}` : String(displayedSeconds);

    if (displayedMinutes === 0 && displayedSeconds === 0 && !isTimerRunning) {
        return (
            <div className={`flex flex-col items-center mt-4 ${poppins.className}`}>
                <h5 className="text-11xl leading-none opacity-0">
                    00
                </h5>
                <h5 className="text-11xl leading-none opacity-0">
                    00
                </h5>
            </div>
        )
    }

    return (
        <div className={`flex flex-col items-center mt-4 ${poppins.className}`}>
            <h5 className="text-11xl leading-none">
                {isTimerRunning ? <strong>{paddedMinutes}</strong> : paddedMinutes}
            </h5>
            <h5 className="text-11xl leading-none">
                {isTimerRunning ? <strong>{paddedSeconds}</strong> : paddedSeconds}
            </h5>
        </div>
    );
}
