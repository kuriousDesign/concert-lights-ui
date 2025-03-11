import { signal } from '@preact/signals-react'


export const groups = signal(getGroups());

export function getGroups() {
    const random = Math.floor(Math.random() * 10);
    return [0, random, 2, 3, 4];
}



setInterval(() => {
        groups.value = getGroups();
        //console.log('groups updated');
      } 
      , 100);


