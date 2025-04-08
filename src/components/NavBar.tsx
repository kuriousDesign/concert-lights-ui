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
            const { r, g, b } = fixture;
            if (r!== 0 || g !== 0 || b !== 0) {
                console.log('Fixture RGB:', r, g, b);
            }
            //console.log('Fixture RGB:', r, g, b);
            // want to show a color indicator for each fixture, need to dynamically set the bg color
            const bgColor = { backgroundColor: `rgb(${r},${g},${b})` };

            return (
                <div key={index} className="h-6 w-6 rounded-full border-2" style={bgColor} />
            )
        })
    };

    return (
        <div className="sticky top-0 left-0 z-80 p-2 h-20">
            <div className="absolute top-0 left-0 w-full h-full z-100 backdrop-blur-sm bg-white/5 text-white p-2 ">
                <h1 className="text-center">Conor Byrne</h1>
            </div>
            <div className="absolute top-10 left-0 h-6 w-full flex gap-2 justify-around">
                {fixtureInidicators()}
            </div>
        </div>
    )
}
