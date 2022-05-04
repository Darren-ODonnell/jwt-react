import React, { useEffect } from 'react';
import PlayerListItem from "./PlayerListItem";
import './PlayerList.css';
import { getPlayers } from "../../services/PlayerService";



const PlayerList = () =>  {
    const { data, error, isLoaded } = getPlayers();

    if (error !== null) {   return <div>Error: {error.message}</div>;   }

    (!isLoaded &&  <>Loading...</> );

    return (
        <div>
            <div className="list-wrapper">
                {/*<NewPlayerForm/>*/}
                { data.map(  player => <PlayerListItem key={ player.id } player={ player }/> ) }
            </div>
            }
        </div>
    );
};
export default PlayerList;