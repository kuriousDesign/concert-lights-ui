"use client";

import React from 'react'
import { useContext } from "react"; // ✅ Import useContext
import ControlCard from '@/components/ControlCard'
import { ControlCfg } from '@/interfaces/controls'

import { SocketContext } from '@/contexts/SocketProvider'; // Adjust path to match your project structure
import SkeletonCard from './SkeletonCard';

export default function GroupControls({controlCfgs} : {controlCfgs: ControlCfg[]}) {

    const sc = useContext(SocketContext); // Get fixture data from context
    const controlType = controlCfgs ? controlCfgs[0].type : null;
    
    const groupData = sc ? sc.groupData : null;
    const individualData = sc ? sc.fixtureData : null;

    //const scene = sc ? sc.scene : null;
    if (!groupData || !individualData) {
        return controlCfgs.map((controlCfg) => (
          <SkeletonCard key={controlCfg.id} />
      ))
    }

    const getFixtureData = (controlCfg: ControlCfg) => {
        if (controlType?.startsWith('group')) {
            return groupData[controlCfg.id];
        } else {
            return individualData[controlCfg.id];
        }
    }

    const cards = () => {
        return controlCfgs.map((controlCfg) => (
            <ControlCard key={controlCfg.id} control={controlCfg} fixtureData={getFixtureData(controlCfg)} className="flex flex-col justify-between"/>
        ))
    }

    return (
        cards()
  )
}