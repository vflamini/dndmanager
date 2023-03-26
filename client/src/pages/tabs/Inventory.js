import { useEffect, useState } from 'react';
import {expToLevel} from '../../info/leveling';
import '../../css/inventory.css'

export default function Inventory({playerInfo}) {
  
  const [expToNextLevel, setExpToNextLevel] = useState(expToLevel(playerInfo.level));

  useEffect(() => {
    setExpToNextLevel(expToLevel(playerInfo.level));
  }, [expToLevel(playerInfo.level)])
    
    return (
      <>
        <div class="playerinfo">
            <h2>{playerInfo.name}</h2>
            <h3>{playerInfo.race}</h3>
            <h4>{playerInfo.class}</h4>
            Level: {playerInfo.level}
            <br></br>
            {playerInfo.exp}
            <br></br>
            Gold: {playerInfo.gold}
            <br></br>
            {expToNextLevel}
        </div>
        <div class="inventory">
            
        </div>
      </>
    );
  }