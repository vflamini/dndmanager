import {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {ip} from '../config/ip';
import '../css/createplayer.scss';

export default function CreatePlayer() {

    const [playerInfo, setPlayerInfo] = useState({
        name: "",
        class: "",
        race: ""
    })

    const navigate = useNavigate();

    const handleChange = (event) => {
        setPlayerInfo({
            ...playerInfo,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async event => {
        event.preventDefault();
        console.log("adding player");
        await fetch(ip + "/api/createplayer", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({full_name: playerInfo.name, race: playerInfo.race, p_class: playerInfo.class})
        }).then(res => {
            navigate('/playerlist');
            
        }).catch( error => {
            console.log(error);
            return;
        })
        
    }
    return (
        <>
            <div className="createplayer">
                <h3 className="chrome">Create Your Player</h3>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" style={{marginTop: "15px"}} value={playerInfo.name} onChange={handleChange} />
                    </label>
                    <label>
                        Race:
                        <input type="text" name="race" value={playerInfo.race} onChange={handleChange} />
                    </label>
                    <label>
                        Class:
                        <input type="text" name="class" value={playerInfo.class} onChange={handleChange} />
                    </label>
                    
                    <button>Create Player</button>
                    
                    
                </form>
            </div>
        </>
    )
}