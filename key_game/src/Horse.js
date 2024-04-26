import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function Horse({dist, setDist, number, letter, generateLetter}) {
  // const keyDown = (event) => {
  //   setkey(event.key)
  // }

  const mySocket = useRef();

  useEffect(() => {
    generateLetter();
  }, [])

  const distArr = {};

  const doit = (e) => {

  }
  

  return (
    <div>
      <h2>{letter}</h2>
           {/* <input type="button" id="one" onClick={doit}/>       background-position: right top;
    height: 100px;*/}
           {/* <img  src='./grass.png' /> */}
           <div style={{position: "relative", transition: 'left 4s 1s', backgroundImage:'url(./grass-th.png)',  height: '100px',     width: '400px', backgroundrRepeat: 'repeat',
  backgroundPosition: 'right top',backgroundRepeat: 'repeat-x' }}>   <img src='./horse.png' style={{ position: "absolute",     top: '-9px', left: `${  dist}px`, width: '50px', height: '50px', transition: '1s'}} /> <img src="./finish.png"  style={{ position: "absolute",     top: '-9px',  left: '300px', width: '50px', height: "50px"}}/> </div>
        
        </div>
  );
}

export default Horse;
