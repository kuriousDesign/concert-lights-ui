"use client";
import React, { useEffect, useContext } from 'react';
import { SocketContext } from '@/contexts/SocketProvider';
import { FixtureControlProps } from '@/interfaces/fixture';
import { Button } from "@/components/ui/button";


const EventBtn = ({ id, controlType, cfg }: FixtureControlProps) => {
    // const [hsva, setHsva] = useState({ h: 214, s: 43, v: 100, a: 1 });
    const { sendEvent } = useContext(SocketContext);
    const { label } = cfg;
    const dummyRGBW = { r: 255, g: 0, b: 0, w: 0 }; // Dummy RGBW values

    const handleClick = () => {
        sendEvent('buttonPress', { controlType, id, color: dummyRGBW });
    };

    // useEffect to trigger sendEvent when `hsva` or `brightness` changes
    useEffect(() => {
        ///const newRgbColor = hsvaToRgba(hsva);
        
    }, []); // Dependency array ensures it updates when hsva changes

    return (
        <Button
            variant="secondary"
            onClick={handleClick}
        >
            {label}
        </Button>
    );
};

export default EventBtn;
