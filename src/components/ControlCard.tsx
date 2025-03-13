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

import {useEffect, useState, useContext} from 'react'
import { FixtureRGBW } from "@/interfaces/fixture"
import { SocketContext } from '@/contexts/SocketProvider'; // Adjust path to match your project structure


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

let intervalId: NodeJS.Timeout;

//let sliderIsActive = false;

export default function ControlCard({ className, control, fixtureData }: { className?: string, control: ControlCfg, fixtureData: FixtureRGBW }) {
    const displayId = control.id  + 1;
    let letter = 'F';
    let controlType = 'fixtureSet';
    if (control.type = 'group') {
        letter = 'G';
        controlType = 'groupSet';
    }
    const { sendEvent } = useContext(SocketContext);
    
    // console.log("render control card", control.id);
    const backendBrightness = fixtureData?.brightness || 0;

    //let defaultBrightness = 50;
    const [sliderValue, setSliderValue] = useState([50]);
    const [sliderIsActive, setSliderIsActive] = useState(false);
    if (sliderIsActive) {
        //displayBrightness.value = sliderBrightness.value;

    } else
    {
        if (sliderValue[0] != backendBrightness) {
            setSliderValue([backendBrightness]);
        }

    }

    const updateSliderBrightness = (value: number[]) => {
        setSliderValue(value);
        //console.log("updateSliderBrightness", value[0]);
        fixtureData.brightness = value[0];
        sendEvent('buttonPress', { controlType, id:control.id, color: fixtureData });
        clearInterval(intervalId);
        //sliderIsActive = true;
        setSliderIsActive(true);
        intervalId = setInterval(() => {
            //setSliderValue([backendBrightness]);
            //sliderIsActive.value = false;
            //sliderIsActive = false;
            setSliderIsActive(false);
            clearInterval(intervalId);
            console.log('slider is no longer active, using backend value');
            //startBackendUpdate();
        }, 3000);
    }

    useEffect(() => {
        clearInterval(intervalId);
        //setSliderValue([backendBrightness]);
        //setSliderIsActive(false);
        //console.log('useEffect cleanup');
        return () => {
            clearInterval(intervalId);
            //console.log('useEffect cleanup');
        }
    }, []);


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
                <Slider defaultValue={sliderValue} value={sliderValue} max={100} step={.01} onValueChange={updateSliderBrightness} />

            </CardContent>
            <CardFooter className="flex justify-between">
                <Button>Refresh</Button>
                {control.stale && <Badge variant="secondary">Stale!</Badge>}
            </CardFooter>
        </Card>
    )
  }