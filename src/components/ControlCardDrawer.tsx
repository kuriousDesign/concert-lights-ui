"use client"

import * as React from "react"


import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

import GroupControls from "./GroupControls"
import { ControlCfg } from "@/interfaces"



export function ControlCardDrawer({control} : {control: ControlCfg}) {


  return (
    <Drawer >
      <DrawerTrigger asChild>
        <Button variant="outline">Show All</Button>
      </DrawerTrigger>
      <DrawerContent className="">
        <div className="mx-auto w-full items-center justify-center">
          <DrawerHeader className='items-center'>
            <DrawerTitle>{control.title}</DrawerTitle>
            <DrawerDescription>{control.description}</DrawerDescription>
          </DrawerHeader>
          <div className="w-full flex items-center justify-center space-x-4">
              <GroupControls controlCfgs={controlCfgsMatrix[control.id]} />
          </div>
          <DrawerFooter className='flex items-center justify-center'>
            <DrawerClose asChild>
              <Button className="max-w-44" variant="outline">Hide</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}




const controlCfgsG1 : ControlCfg[] = 
[
  {
    "id": 0,
    "title": "Left Bottom",
    "fixtures": [0],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate backs of artists",
    "stale": false
  },
  {
    "id": 1,
    "title": "Left Top",
    "fixtures": [1],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate backs of artists",
    "stale": false
  },
  {
    "id": 2,
    "title": "Right Top",
    "fixtures": [2],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate backs of artists",
    "stale": false
  },
  {
    "id": 3,
    "title": "Right Bottom",
    "fixtures": [3],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate backs of artists",
    "stale": false
  }
]


const controlCfgsG2 : ControlCfg[] = 
[
  {
    "id": 4,
    "title": "Left Curtain",
    "fixtures": [4],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate curtains by drummer",
    "stale": false
  },
  {
    "id": 5,
    "title": "Right Curtain",
    "fixtures": [5],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate curtains by drummer",
    "stale": false
  }
]

const controlCfgsG3 : ControlCfg[] = 
[
  {
    "id": 6,
    "title": "Front 1",
    "fixtures": [6],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate front of artists",
    "stale": false
  },
  {
    "id": 8,
    "title": "Front 3",
    "fixtures": [8],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate front of artists",
    "stale": false
  },
  {
    "id": 10,
    "title": "Front 5",
    "fixtures": [10],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate front of artists",
    "stale": false
  }
]

const controlCfgsG4 : ControlCfg[] = 
[
  {
    "id": 7,
    "title": "Front 2",
    "fixtures": [7],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate front of artists",
    "stale": false
  },
  {
    "id": 9,
    "title": "Front 4",
    "fixtures": [9],
    "image": "fixture_control.jpg",
    "type": "fixture",
    "numChannels": 4,
    "description": "illuminate front of artists",
    "stale": false
  }
]

const controlCfgsMatrix : ControlCfg[][] = [
  controlCfgsG1,
  controlCfgsG2,
  controlCfgsG3,
  controlCfgsG4,
]