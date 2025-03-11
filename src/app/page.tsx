import { groups } from '@/app/signals'
import GroupControls from '@/components/GroupControls';


export default function Home() {
  console.log("Rendering Home");
  return (
    <main>
      <GroupControls knobLevels={groups.value} />
    </main>
  )
}