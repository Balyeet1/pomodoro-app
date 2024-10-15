import SideMenu from '@/app/lib/components/SideMenu'
import CalendarDrawer from '@/app/lib/components/pomodoro/CalendarDrawer';
import PomodoroTimer from '@/app/lib/components/pomodoro/PomodoroTimer';

export default function Page() {
  return (
    <div role='main'>
      <SideMenu />
      <CalendarDrawer />
      <PomodoroTimer />
    </div>
  );
}