import React, { useEffect, useState } from "react";
import TeamsheetContainer from "./TeamsheetContainers";
import { DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {v4} from 'uuid';
import { PLAYER_URLS } from "../entities/players";
import { getData, useAxios } from "../api/ApiService";

// export const showList = ( m,v ) => { console.log(m + v.map(m => {return "("+m.key+")(" + m.id + ") "+ m.name + " "}))}

const TeamsheetDnd = ({myTeam, myPanel, mySubs, handleSave, handleCancel, methods}) => {
    const [panel, setPanel] = useState(myPanel);
    const [subs, setSubs] = useState(mySubs);
    const [team, setTeam] = useState(myTeam);
    const [data, error, loading, axiosApi] = useAxios();

    // console.log("Teamsheet-DnD-Team: " + JSON.stringify(team))

    // console.log("Teamsheet-Dnd-Panel: " + JSON.stringify(panel))

    // useEffect(() => {
    //     getData(methods.list, axiosApi, handleCancel)
    //     setPanel(data)
    // }, []);

    const findPlayer = (id) => {
        const idx1 = panel.findIndex(p => p.id === id)
        const idx2 = subs.findIndex(p => p.player.id === id)
        const idx3 = team.findIndex(p => p.player.id === id)

        if (idx1 >= 0) {
            console.log("id: " + id + " | Found in Panel at index: " + idx1)
            return [idx1, setPanel, panel[idx1], 'panel', panel];
        }
        if (idx2 >= 0) {
            console.log("id: " + id + " | Found in Subs at index: " + idx2)
            return [idx2, setSubs, subs[idx2], 'subs', subs];
        }
        if (idx3 >= 0) {
            console.log("id: "+id+" | Found in Team at index: "+idx3)
            return [idx3, setTeam, team[idx3], 'team', team];
        }
        return [undefined, undefined, undefined, undefined];
    }

    const findPlayerArray = (id) => {

        const [index, setFunction, player, parent,] = findPlayer(id);

        if (parent === 'panel') {
            return [index, setFunction, player, parent, 'panel',panel];
        } else if (parent === 'subs') {
            return [index, setFunction, player, parent, 'subs',subs];
        } else if (parent === 'team') {
            return [index, setFunction, player, parent, 'team',team];
        } else {
            return [null, null, null, null, null];
        }
    };
    // Team-Team
    const swapPositions = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source2, dest2) => {

        // showList("Panel: " , panel)
        const idxS1 = panel.findIndex(p=>p.id === sourceId)
        const idxS2 = subs.findIndex(p=>p.id === sourceId)
        const idxS3 = team.findIndex(p=>p.id === sourceId)

        const idxD1 = panel.findIndex(p=>p.id === destId)
        const idxD2 = subs.findIndex(p=>p.id === destId)
        const idxD3 = team.findIndex(p=>p.id === destId)

        const source = idxS1 >= 0 ? panel : (idxS2 >= 0 ? subs : team)
        const dest = idxD1 >= 0 ? panel : (idxD2 >= 0 ? subs : team)

        let sourcePlayer = {...source[sourceIdx]};
        const tempSource = { ...sourcePlayer };
        let destPlayer = {...dest[destIdx]};
        const tempDest = { ...destPlayer };

        // don't copy players onto same container
        if(sourcePlayer.name === destPlayer.name) return

        // showList("Source: " , source)

        console.log("SourceIdx: " +sourceIdx+ " SourceId: " + sourceId)
        console.log("DestIdx: " +destIdx+ " DestId: " + destId)

        sourcePlayer.key          = destPlayer.key;
        sourcePlayer.id           = destPlayer.id;
        sourcePlayer.position     = destPlayer.position;
        sourcePlayer.positionName = destPlayer.positionName;
        sourcePlayer.name         = destPlayer.name;

        // copy data from sourcePlayer to destPlayer
        destPlayer.key            = tempSource.key;
        destPlayer.id             = tempSource.id;
        destPlayer.position       = tempSource.position;
        destPlayer.positionName   = tempSource.positionName;
        destPlayer.name           = tempSource.name;

        // create copies of the source and dest arrays to avoid modifying them directly
        const newSource = [...source];

        // swap the players in their respective arrays
        newSource[sourceIdx] = tempDest;
        newSource[destIdx] = tempSource;

        // update the state with the new arrays
        // showList("NewSource: " , newSource)
        setSource(newSource);
    };

    const resetPlayer = (player,source) => {
        const temp = {...player}
        switch(source) {
            case "id":
                temp.id = v4()
                temp.name = ""
                break
            case "key":
                temp.key = v4();
                temp.position = 0;
                temp.positionName = "";
                break
        }

        return temp
    }

    const swapPositions2 = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
        // get players and add as temp to allow a swap of values

        if (sourceId === destId) {
            console.log('source and destination are the same player');
            return;
        }

        const sourcePlayer = source[sourceIdx] ;
        const temp = { ...sourcePlayer};
        const destPlayer = dest[destIdx];

        console.log('sourceIdx:', sourceIdx);
        console.log('destIdx:', destIdx);
        console.log('source:', source);
        console.log('dest:', dest);
        console.log('sourcePlayer:', sourcePlayer);
        console.log('temp:', temp);
        console.log('destPlayer:', destPlayer);

        const tempSource = { ...sourcePlayer };
        const tempDest = { ...destPlayer };


        // copy data from destPlayer to temp
        sourcePlayer.key = destPlayer.key;
        sourcePlayer.position = destPlayer.position;
        sourcePlayer.positionName = destPlayer.positionName;

        // copy data from sourcePlayer to destPlayer
        destPlayer.key = temp.key;
        destPlayer.position = temp.position;
        destPlayer.positionName = temp.positionName;
        // swap the players in their respective arrays
        setSource(prevState => {
            const newArray = [...prevState];
            newArray[sourceIdx] = tempDest;
            newArray.sort((a, b) => a.key - b.key);
            return newArray;
        });

        setDest(prevState => {
            const newArray = [...prevState];
            newArray[destIdx] = tempSource;
            newArray.sort((a, b) => a.key - b.key);
            return newArray;
        });
    }
    // Panel-Team or Subs-Team
    const swapPlayers = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
        let playerNameEmpty = false;

        const sourcePlayer = { ...source[sourceIdx] };
        const destPlayer = { ...dest[destIdx] };


        // grab the positional data from the destination player position
        sourcePlayer.key = destPlayer.key;
        sourcePlayer.position = destPlayer.position;
        sourcePlayer.positionName = destPlayer.positionName;

        // if team player name is not empty then switch Source and Dest
        if (destPlayer.name.length > 0) {
            destPlayer.key = v4();
            destPlayer.position = 0;
            destPlayer.positionName = "";
        } else {
            playerNameEmpty = true;
        }

        setDest((prevState) => {
            const array = [...prevState];
            array[destIdx] = sourcePlayer;
            return array;
        });

        setSource((prevState) => {
            const array = [...prevState];
            if (playerNameEmpty) {
                array.splice(sourceIdx, 1);
            } else {
                array[sourceIdx] = { ...destPlayer };
            }
            return array;
        });
    };
    // Panel-Subs or Subs-Panel
    const movePlayer = (     sourceIdx,destIdx, setSource,setDest, sourceId,destId, source,dest) => {

        const temp = source[sourceIdx];

        // Move sourcePlayer to dest at destIdx
        // Delete sourcePlayer from source
        setDest(prevState => {
            const array = [...prevState];
            array.splice(destIdx, 0, temp);
            return array;
        });

        setSource(prevState => {
            const array = [...prevState];
            array.splice(sourceIdx, 1);
            // array = removeDuplicates(array)
            return array;
        });
    };
    // Team-Panel or Team-Subs
    const moveTeamPlayer = ( sourceIdx,destIdx, setSource,setDest, sourceId,destId, source,dest) => {

        // don't copy if already exists in this list
        const exists = dest.find(p=>p.name === source[sourceIdx].name)
        if(exists) return

        const tempSource = {...source[sourceIdx]}

        setSource(prevSource => {
            const array = [...prevSource]
            const player = resetPlayer(array[sourceIdx],"id")
            array[sourceIdx] = player

            return array
        });

        if(destIdx >= 0 ) { // dropped onto another player in panel or Subs
            setDest( prevDest => {
                const array = [...prevDest]
                const player = resetPlayer({...tempSource},"key")
                return [
                    ...array.slice( 0, destIdx ),
                    player,
                    ...array.slice( destIdx + 1 )
                ];
            } );
        } else { // dropped onto panel or subs
            setDest( prevDest => {
                const array = [...prevDest]
                const player = {...source[sourceIdx]}
                array.push(player)
                return array
            } );
        }
    }
    // process drop onto the panel or subs container rather than onto a player
    const onDropContainer = (droppedBoxId, droppedBoxIndex, droppedBoxType, container) => {

        const [sourceIdx, setSource, sourcePlayer, arrayStr] = findPlayer(droppedBoxId)
        const dest    = container === "panel" ? panel    : container === "subs" ? subs    : team
        const setDest = dest === panel        ? setPanel : dest ===  subs       ? setSubs : setTeam
        const source  = arrayStr === "panel"  ? panel    : arrayStr === "subs"  ? subs    : team

        // skip over any attempt to move onto same container
        if (source === dest) return

        // don't move around empty objects
        if (source[sourceIdx].name === undefined || source[sourceIdx].name === "") return

        if(container==="panel") {
            moveTeamPlayer( sourceIdx,-1, setSource,setPanel, droppedBoxId,-1, source,panel)

        } else { // must be "subs"
            moveTeamPlayer( sourceIdx,-1, setSource,setSubs, droppedBoxId,-1, source, subs)
        }

    }
    // process drop onto player rather than into a container
    const onDrop = (box , destId, item , sourceIndex)  => {
        const sourceId = item.player.id
        const [sourceIdx, setSource, sourcePlayer, sourceType, source2] = findPlayer(sourceId)
        const [destIdx  , setDest  , destPlayer2 , destType, dest2]   = findPlayer(destId)

        const source = sourceType === 'panel' ? panel: (sourceType === 'subs' ? subs: team);
        let dest     = destType   === 'panel' ? panel: (destType   === 'subs' ? subs: team);

        // don't move around empty objects
        if (sourcePlayer.name === undefined || sourcePlayer.name === "") return

        console.log('dest:', dest);
        console.log('dest2:', dest2);

        if (dest === subs) {
            if (source === panel) movePlayer(    sourceIdx,destIdx,   setPanel,setSubs,  sourcePlayer.id,destId, panel,subs )
            if (source === subs)  swapPositions( sourceIndex,destIdx, setSubs,setSubs,   sourcePlayer.id,destId, subs, subs  )
            if (source === team)  moveTeamPlayer(sourceIdx,destIdx,   setTeam,setSubs,   sourcePlayer.id,destId, team, subs  )

        } else if (dest === panel) {
            if (source === panel) swapPositions( sourceIndex,destIdx, setPanel,setPanel, sourcePlayer.id,destId, panel,panel )
            if (source === subs)  movePlayer(    sourceIdx,destIdx,   setSubs,setPanel,  sourcePlayer.id,destId, subs, panel )
            if (source === team)  moveTeamPlayer(sourceIdx,destIdx,   setTeam,setPanel,  sourcePlayer.id,destId, team, panel )

        } else if (dest === team) {
            if (source === panel) swapPlayers(   sourceIdx,destIdx,   setPanel,setTeam,  sourcePlayer.id,destId, panel,team  )
            if (source === subs)  swapPlayers(   sourceIdx,destIdx,   setSubs,setTeam,   sourcePlayer.id,destId, subs, team  )
            if (source === team)  swapPositions( sourceIdx,destIdx,   setTeam,setTeam,   sourcePlayer.id,destId, team, team  )
        }
    }
    console.log("Just before TeamsheetContainer")
    return (
    <div className="App">
        <DndProvider backend={HTML5Backend}>
            <TeamsheetContainer panel={panel} team={team} subs={subs} onDrop={onDrop} onDropContainer={onDropContainer}
                                handleSave={handleSave} handleCancel={handleCancel} />
        </DndProvider>
    </div>
  );
}

export default TeamsheetDnd;
