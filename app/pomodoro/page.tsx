import SideMenu from '@/app/lib/components/SideMenu'
import PomodoroTimer from '@/app/lib/components/pomodoro/PomodoroTimer';

export default function Page() {
  return (
    <div role='main'>
      <SideMenu />
      <PomodoroTimer />
    </div>
  );
}