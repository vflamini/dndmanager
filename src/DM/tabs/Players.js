import '../../css/players_dm.css';

export default function Player({players}) {  

    const producePlayerInfo = (player) => {
        return (
            <div className="info-box">
                <span>
                    {player.name}
                    <br></br>
                    {player.race}, {player.class}
                </span>
                <span>
                    Level: {player.level}
                </span>
                <span>
                    <button>+</button>
                    <button>-</button>
                    {player.exp}/{player.maxexp}
                    <br></br>
                    <button>+</button>
                    <button>-</button>
                    Gold: {player.gold}
                </span>
                <div className="break"></div>
                <div className="inventory">
                    {Object.keys(player.items).map(key => {
                        return (
                            <div className="item">
                                {key}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <>
            <div id="players" className="boxes-layout">
                {Object.keys(players).map(key => producePlayerInfo(players[key]))}
            </div>
        </>
    );
}