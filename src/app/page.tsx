
import GroupControls from '@/components/GroupControls';
import { ControlCfg } from '@/interfaces';



export default function Home() {

  return (
    <main>
      <div className="flex flex-wrap justify-start gap-4 ">
        <GroupControls controlCfgs={controlCfgs} />
      </div>
    </main>
  )
}


const controlCfgs : ControlCfg[] = 
[
  {
    "id": 0,
    "title": "Backs",
    "fixtures": [ 0, 1, 2, 3],
    "image": "group_control.jpg",
    "type": "group",
    "numChannels": 4,
    "description": "illuminate backs of artists",
    "stale": false
  },
  {
    "id": 1,
    "title": "Curtains",
    "fixtures": [ 4, 5],
    "image": "group_control.jpg",
    "type": "group",
    "numChannels": 4,
    "description": "illuminate curtains",
    "stale": true
  },
  {
    "id": 2,
    "title": "Fronts 1-3-5",
    "fixtures": [ 6, 8, 10],
    "image": "group_control.jpg",
    "type": "group",
    "numChannels": 4,
    "description": "front lights",
    "stale": false
  },
  {
    "id": 3,
    "title": "Fronts 2-4",
    "fixtures": [ 7, 9],
    "image": "group_control.jpg",
    "type": "group",
    "numChannels": 4,
    "description": "front lights",
    "stale": true
  }
]