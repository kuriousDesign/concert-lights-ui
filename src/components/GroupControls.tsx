"use client";

import React from 'react'
import { useContext } from "react"; // ✅ Import useContext
import ControlCard from '@/components/ControlCard'
import { ControlCfg } from '@/components/ControlCard'

import { SocketContext } from '@/contexts/SocketProvider'; // Adjust path to match your project structure

// async function getControlCfgs(): Promise<ControlCfg[]> {
//     const result = await fetch('http://localhost:7000/groupControls')
//     // await new Promise((resolve) => setTimeout(resolve, 1000)) // delay response
//     return result.json()
//   }




export default function GroupControls() {
    //const controlCfgs = await getControlCfgs();
    const sc = useContext(SocketContext); // Get fixture data from context
    // console.log("Render GroupControls");
    const groupData = sc ? sc.groupData : null;
    //const scene = sc ? sc.scene : null;
    if (!groupData) {
        return <div>Loading...</div>
    }
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-8">
        {controlCfgs.map((controlCfg, i) => (
          <ControlCard key={controlCfg.id} control={controlCfg} fixtureData={groupData[i]} className="flex flex-col justify-between"/>
        ))}
      </div>
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
    "description": "illuminate backs of artists.",
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
    "description": "illuminate backs of artists.",
    "stale": false
  },
  {
    "id": 3,
    "title": "Fronts 2-4",
    "fixtures": [ 7, 9],
    "image": "group_control.jpg",
    "type": "group",
    "numChannels": 4,
    "description": "illuminate curtains",
    "stale": true
  }
]