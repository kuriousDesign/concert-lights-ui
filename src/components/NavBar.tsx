"use client";

import React, { useContext } from 'react'
import { SocketContext } from '@/contexts/SocketProvider';

export default function NavBar() {

    const sc = useContext(SocketContext); // Get fixture data from context
    const rawFixtureDataRgb = sc ? sc.rawFixtureDataRgb : null;

    const fixtureInidicators = () => {
        if (!rawFixtureDataRgb) {
            //console.log('No raw fixture data available');
            return null;
        }
        return rawFixtureDataRgb.map((fixture, index) => {
            let { r, g, b } = fixture;
            if (r!== 0 || g !== 0 || b !== 0) {
                console.log('Fixture RGB:', r, g, b);
            }

            const maxValue = Math.max(r, g, b);
            let scaleFactor = 255 / maxValue;
            if (scaleFactor > 1.0) {
                scaleFactor = 1.0;
            }

            r = Math.round((r * scaleFactor));
            g = Math.round((g * scaleFactor));
            b = Math.round((b * scaleFactor));
      

            //console.log('Fixture RGB:', r, g, b);
            // want to show a color indicator for each fixture, need to dynamically set the bg color
            let brightness = (r + g + b) / 255.0; // Calculate brightness
            if (brightness > 1.0) {
                brightness = 1.0;
            }
            const style = {
                backgroundColor: `rgb(${r},${g},${b})`,
                transform: `translateY(${Math.round(-4 + (1.0 - brightness) * -4.0)}px)`, // max shift = 20px
            };

            return (
                <div key={index} className="h-4 w-4 rounded-b-full" style={style} />
            )
        })
    };

    const fixtureBlurs = () => {
        if (!rawFixtureDataRgb) {
            //console.log('No raw fixture data available');
            return null;
        }
        return rawFixtureDataRgb.map((fixture, index) => {
            const { r, g, b } = fixture;
            if (r!== 0 || g !== 0 || b !== 0) {
                console.log('Fixture RGB:', r, g, b);
            }
            //console.log('Fixture RGB:', r, g, b);
            // want to show a color indicator for each fixture, need to dynamically set the bg color
            const bgColor = { backgroundColor: `rgb(${r},${g},${b})` };

            return (
                <div key={index} className="h-4 w-10 rounded-full" style={bgColor} />
            )
        })
    };

    return (
        <div className="sticky top-0 left-0 z-80 p-2 h-20">
            <div className="absolute top-0 left-0 w-full h-full z-80 backdrop-blur-sm bg-white/5 text-white p-2 ">
                <h1 className="text-center">Kurious</h1>
                <div className="text-center text-md font-light">LIGHTS</div>
            </div>
            <div className="absolute top-0 left-0 h-6 w-full flex gap-2 justify-around z-100">
                {fixtureInidicators()}
            </div>
            <div className="absolute top-12 left-0 h-6 w-full flex gap-2 justify-around z-0">
                {fixtureBlurs()}
            </div>
        </div>
    )
}
