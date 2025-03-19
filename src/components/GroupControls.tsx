"use client";

import React from 'react'
import { useContext } from "react"; // ✅ Import useContext
import ControlCard from '@/components/ControlCard'
import { ControlCfg } from '@/interfaces/controls'

import { SocketContext } from '@/contexts/SocketProvider'; // Adjust path to match your project structure
import SkeletonCard from './SkeletonCard';

export default function GroupControls({controlCfgs} : {controlCfgs: ControlCfg[]}) {
    //const controlCfgs = await getControlCfgs();
    const sc = useContext(SocketContext); // Get fixture data from context
    // console.log("Render GroupControls");
    const groupData = sc ? sc.groupData : null;

        //const scene = sc ? sc.scene : null;
    if (!groupData) {
        return controlCfgs.map((controlCfg, i) => (
          <SkeletonCard key={controlCfg.id} />
      ))
    }

    const cards = () => {
        return controlCfgs.map((controlCfg, i) => (
            <ControlCard key={controlCfg.id} control={controlCfg} fixtureData={groupData[i]} className="flex flex-col justify-between"/>
        ))
    }

    return (
        cards()
  )
}