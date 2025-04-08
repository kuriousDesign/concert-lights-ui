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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

import {useEffect, useState, useContext} from 'react'
import { FixtureRGBW } from "@/interfaces/fixture"
import { SocketContext } from '@/contexts/SocketProvider'; // Adjust path to match your project structure
import Wheel from "@uiw/react-color-wheel";
//import ShadeSlider from '@uiw/react-color-shade-slider';
import { ColorResult, rgbaToHsva } from '@uiw/color-convert';
import { ControlCardDrawer } from "./ControlCardDrawer"
import { ControlCfg } from "@/interfaces"


let intervalId: NodeJS.Timeout;

//let sliderIsActive = false;

export default function ControlCard({ className, control, fixtureData }: { className?: string, control: ControlCfg, fixtureData: FixtureRGBW }) {
    const displayId = control.id  + 1;
    let letter = 'F';
    //let controlType = 'fixtureSet';
    if (control.type === 'group' && control.id === 0 && fixtureData) {
        letter = 'G';
        //controlType = 'groupSet';
        //console.log(fixtureData.controlIsActive);
    }

    const { sendEvent } = useContext(SocketContext);
    
    const backendBrightness = fixtureData?.brightness || 0;

    const [displayFixtureData, setDisplayFixtureData] = useState({r: 255, g: 0, b: 0, w:0, brightness: 0});

    //const [sliderValue, setSliderValue] = useState([50]);
    const [controlIsActive, setControlIsActive] = useState(false);
    //const [rgb, setRgb] = useState({ r: 0, g: 0, b: 0, a: 1 });
    const [hsva, setHsva] = useState({ h: 214, s: 43, v: 100, a: 1 });
    const [hsvaDisplay, setHsvaDisplay] = useState({ h: 214, s: 43, v: 100, a: 1 });


    // update displayFixtureData when fixtureData changes from backend
    if (controlIsActive) {
        //displayBrightness.value = sliderBrightness.value;
    } 
    else {
        if (displayFixtureData != fixtureData) {
            //setRgb({ r: fixtureData.r, g: fixtureData.g, b: fixtureData.b, a: 1 });
            setHsva(rgbaToHsva({ r: fixtureData.r, g: fixtureData.g, b: fixtureData.b, a: 1 }));
            setDisplayFixtureData(fixtureData);
        }
    }
    
    const handleWheelChange = (color: ColorResult) => {
        //color.hsva.s = 100;
        setHsva({ ...hsva, ...color.hsva }); // Ensure v is always synced
        setHsvaDisplay({ ...hsvaDisplay, ...color.hsva, v: 100 });
        displayFixtureData.r = color.rgb.r;
        displayFixtureData.g = color.rgb.g;
        displayFixtureData.b = color.rgb.b;
        sendEvent('buttonPress', { controlType: control.type, id:control.id, color: displayFixtureData });
        console.log('color.r', color.rgb.r);
        handleAnyChange();
    };
    const wheelSize = 200;

    // useEffect to trigger sendEvent when `hsva` or `brightness` changes
    useEffect(() => {
        //const newRgbColor = hsvaToRgba(hsva);
        //setRgb(newRgbColor);
        //const newFixtureData = { r: newRgbColor.r, g: newRgbColor.g, b: newRgbColor.b, a: 1, brightness: displayFixtureData.brightness };
        //sendEvent('buttonPress', { controlType, id:control.id, color: newFixtureData });
    }, [hsva]); // Dependency array ensures it updates when hsva changes

    useEffect(() => {
        if (controlIsActive) {
            //sendEvent('buttonPress', { controlType, id:control.id, color: displayFixtureData });
        }
    }, [controlIsActive]); // Dependency array ensures it updates when hsva changes

    const handleAnyChange = () => {
        clearInterval(intervalId);
        setControlIsActive(true);
        intervalId = setInterval(() => {
            setControlIsActive(false);
            clearInterval(intervalId);
            console.log('slider is no longer active, using backend value');
        }, 500);
    }

    const updateSliderBrightness = (value: number[]) => {
        //setSliderValue(value);
        setDisplayFixtureData({ ...displayFixtureData, brightness: Math.round(value[0]) });
        displayFixtureData.brightness = value[0];
        sendEvent('buttonPress', { controlType:control.type, id:control.id, color: displayFixtureData });
        handleAnyChange();
    }

    useEffect(() => {
        clearInterval(intervalId);
        return () => {
            clearInterval(intervalId);
        }
    }, []);

    // dynamically set the opacity of the card background based on the brightness
    const cardBgOpacity = displayFixtureData.brightness / 100.0;

    const hideRgbDisplay = true;
    const rgbDisplayDiv = () => {
        if (hideRgbDisplay) {
            return null;
        }
        return (
            <div >
                <div >
                    r:{displayFixtureData.r}
                </div>
                <div>
                    g:{displayFixtureData.g}
                </div>
                <div>
                    b:{displayFixtureData.b}
                </div>
            </div>
        )
    }

    return (
        <Card
            key={control.id}
            className={cn("flex flex-col justify-between backdrop-blur-md min-w-80 max-w-90", className)}
            style={{
                background: `linear-gradient(
                    to top left, 
                    rgba(${displayFixtureData.r}, ${displayFixtureData.g}, ${displayFixtureData.b}, ${cardBgOpacity}), 
                    rgba(0, 0, 0, 0.3)
                )`
            }}
        >
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
                <div className='flex justify-center'>
                    <Wheel
                        width={wheelSize} 
                        height={wheelSize}
                        color={hsvaDisplay} 
                        onChange={handleWheelChange}
                    />
                </div>

                <div className='flex flex-row justify-between mb-2 mt-4'>
                    <div>Brightness</div>
                    <div>{backendBrightness}</div>
                </div>
                
                <Slider className='mb-4 z-100' defaultValue={[displayFixtureData.brightness]} value={[displayFixtureData.brightness]} max={100} step={1} onValueChange={updateSliderBrightness} width="10px" />
                {rgbDisplayDiv()}

            </CardContent>
            <CardFooter className="flex justify-between">
                {control.type === 'group' && <ControlCardDrawer control={control} />}
                {!fixtureData.controlIsActive && <Badge variant="secondary">Stale!</Badge>}
            </CardFooter>
        </Card>
    )
  }