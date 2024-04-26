import logo from './logo.svg';
import './App.css';
import Horse from './Horse';
import io, { Socket } from 'socket.io-client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
function App() {
  // const keyDown = (event) => {
  //   setkey(event.key)
  // }
  const [letter, setLetter] =  useState('');
  const [dist, setDist] = useState({});
  const[id, setId] = useState();
  // const generateLetter = () => {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  //   const charactersLength = characters.length;
  //   setLetter(characters.charAt(Math.floor(Math.random() * charactersLength)));
  //   console.log(letter.current);
  // }

  // useEffect(() => {
  //   generateLetter();
  // }, [])

  //     mySocket.current.emit('msg', {[id]: dist});
  const mySocket = useRef();

  const getCurMsg = (val) => {
    console.log(val);
    setDist(val);
  }

  useEffect(() => {
    const socket = io(`http://${'192.168.1.7'}:4000`)
    mySocket.current = socket;
    socket.connect();
   // setDist({[socket.id]:0})
    // function onFooEvent(value) {
    //   setFooEvents(fooEvents.concat(value));
    // }
  
   // socket.on('foo', onFooEvent);
    function onFooEvent(value) {
        console.log(value);
        setDist({...value});
    }
//    socket.emit('msg', "HEllO guys");
    socket.on('update', onFooEvent);
    socket.on('msg', getCurMsg);
//    console.log("mySocket.current = ", mySocket.current, " ", mySocket.current)
   // socket.emit('msg', {[socket.id]: 0})
    return () => {
      socket.off('update', onFooEvent);
     // socket.emit('delete', id)
      // BAD: the Socket.IO client will reconnect every time the fooEvents array
      // is updated
      socket.disconnect();
    };
  }, []);


  document.onkeydown  = (e) => {
    // console.log(e.key, letter)
     if(e.key.toLowerCase() === letter.toLowerCase())
     {
       let d = {...dist};
       d[mySocket.current.id] += 10;
       setDist(d);
       console.log("[mySocket.current.id] ", [mySocket.current.id] );
       if(d[mySocket.current.id] == 280) 
       {
        d[mySocket.current.id] = 0;
        alert("YOU WIN")
       }
       else
       mySocket.current.emit('msg', {[mySocket.current.id]: d[mySocket.current.id] + 10});
    //   mySocket.emit('msg', {[id]: (dist[id] ?? 0)});
      // if(dist + 10 === 200) alert('Win');
       generateLetter();
     //  mySocket.current.emit('msg', {[id]: (dist[id] ?? 0)});
     }
     else
     {
      let d = {...dist};
      mySocket.current.emit('msg', d[mySocket.current.id] - 10 >= 0 ? {[mySocket.current.id]: d[mySocket.current.id] - 10}: {[mySocket.current.id]: 0});
 //      if(dist > 10) setDist(dist - 10, number);
     }
     
   }
  const generateLetter = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charactersLength = characters.length;
    setLetter(characters.charAt(Math.floor(Math.random() * charactersLength)));
    console.log(letter.current);
  }

  return (
    <div>
      {console.log(Object.keys(dist).map(el => dist[el]))}
      { 
      Object.keys(dist).map(el => dist[el]).map((horseDist, idx) =>   <Horse letter={letter} dist={horseDist}  generateLetter={generateLetter} number={idx} setDist={(d,i) => {let _dist = [...dist]; _dist[i] = d; console.log(_dist); setDist(_dist); }}/>)
    
      }
      </div>
  );
}

export default App;
