
import BlackoutBtn from '@/components/BlackoutBtn';
import EventBtn from '@/components/EventBtn';
import GroupControls from '@/components/GroupControls';
import { ControlCfg, FixtureCfg } from '@/interfaces';



export default function Home() {

  const sceneBlackoutCfgs:FixtureCfg = { label: "Blackout", position: { x: 25, y: 350 } };
  const sceneBlackoutBtn = (
    <BlackoutBtn
        key={999}
        className='bg-black'
        id = {999}
        controlType = {'blackout'}
        cfg={sceneBlackoutCfgs}
    />
  );
  const y6 = 350;

  const sceneBtnsCfgs:FixtureCfg[] = [
    { label: "BlueRed", position: { x: 25, y: y6 } },
    { label: "TealPurp", position: { x: 200, y: y6 } },
    { label: "RedWhite", position: { x: 375, y: y6 } },
    { label: "Joker", position: { x: 550, y: y6 } },
    { label: "Red", position: { x: 725, y: y6 } },
    { label: "Gnarly", position: { x: 900, y: y6 } },
    { label: "lowReddish", position: { x: 1075, y: y6 } },
    { label: "penthouse", position: { x: 1250, y: y6 } },
  ]

  const sceneBtns = sceneBtnsCfgs.map((cfg, index) => (
    <EventBtn
        key={index}
        id = {index}
        controlType = {'sceneSet'}
        cfg={cfg}
    />
  ));

  return (
    <main>
      <div className="flex flex-wrap justify-start gap-4 ">
        <GroupControls controlCfgs={controlCfgs} />
        <div className="flex flex-col justify-start gap-4 text-center font-bold">
          Scenes
          {sceneBtns}
          {sceneBlackoutBtn}
        </div>
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