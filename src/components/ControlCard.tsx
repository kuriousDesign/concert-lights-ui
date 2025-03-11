'use client'

import { Slider } from "@/components/ui/slider"
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
  } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { signal } from '@preact/signals-react'

import {useState} from 'react'
import { FixtureRGBW } from "@/interfaces/fixture"


export interface ControlCfg {
    title: string,
    image: string,
    type: string,
    fixtures: number[],
    numChannels: number,
    description: string,
    id: number
    stale: boolean
}

const sliderIsActive = signal(false);

let intervalId: NodeJS.Timeout;


export default function ControlCard({ className, control, fixtureData }: { className?: string, control: ControlCfg, fixtureData: FixtureRGBW }) {
    const displayId = control.id  + 1;
    let letter = 'F';
    if (control.type = 'group') {
        letter = 'G';
    }
    // console.log("render control card", control.id);
    const backendBrightness = fixtureData?.brightness || 0;

    //let defaultBrightness = 50;
    const [sliderValue, setSliderValue] = useState([50]);
    if (sliderIsActive.value) {
        //displayBrightness.value = sliderBrightness.value;

    } else
    {
        if (sliderValue[0] != backendBrightness) {
            setSliderValue([backendBrightness]);
        }

    }

    const updateSliderBrightness = (value: number[]) => {
        setSliderValue(value);
        console.log("updateSliderBrightness", value[0]);
        //stopBackendUpdate();
        clearInterval(intervalId);
        sliderIsActive.value = true;
        intervalId = setInterval(() => {
            //setSliderValue([backendBrightness]);
            sliderIsActive.value = false;
            clearInterval(intervalId);
            console.log('slider is no longer active, using backend value');
            //startBackendUpdate();
        }, 2000);
    }


    return (
        <Card key={control.id} className={cn("flex flex-col justify-between" , className)}>
            <CardHeader className="flex-row gap-4 items-center">
                <Avatar>
                    <AvatarImage src={`/img/${control.image}`} alt="@shadcn" />
                    <AvatarFallback>
                    {letter}{displayId}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle>{control.title}</CardTitle>
                    <CardDescription>{control.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <p>{backendBrightness}</p>
                <Slider defaultValue={sliderValue} value={sliderValue} max={100} step={1} onValueChange={updateSliderBrightness} />

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Refresh</Button>
                {control.stale && <Badge variant="secondary">Stale!</Badge>}
            </CardFooter>
        </Card>
    )
  }