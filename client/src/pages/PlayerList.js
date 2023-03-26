import { useEffect, useState } from 'react';
import {NavLink} from 'react-router-dom';
import {ip} from '../config/ip';

function PlayerList({setPlayer}) {
    const [players, setPlayers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {
        fetch(ip + '/api/get/players')
        .then(res => res.json())
        .then(data => {
            data.forEach(player => {
                setPlayers(prevPlayers => 
                    [
                        ...prevPlayers,
                        player.full_name
                    ]
                );
            });
        })
    }, [])
    return (
        <>
            {players.map(name => {
                return(
                    <NavLink exact to="/player" style={{display: "block"}}>
                        <button onClick={(e) => setPlayer(e.target.outerText)}>{name}</button>
                    </NavLink>
                );
            })}
            <NavLink exact to="/createplayer" style={{display: "block"}}>
                <button>Create Player</button>
            </NavLink>
        </>
    );
  }
  
  export default PlayerList;