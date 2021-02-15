export default function msToTime(s) {
    let sec = s;
    const ms = sec % 1000;
    sec = (s - ms) / 1000;
    let secs = sec % 60;
    sec = (sec - secs) / 60;
    let mins = sec % 60;
    let hrs = (sec - mins) / 60;
    if (hrs.toString().length === 1) hrs = `0${hrs}`;
    if (mins.toString().length === 1) mins = `0${mins}`;
    if (secs.toString().length === 1) secs = `0${secs}`;
  
    return `${hrs}:${mins}:${secs}`;
  }