import React, { useEffect, useState } from "react";
import TeamsheetContainer from "./TeamsheetContainers";
import { DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {v4} from 'uuid';
import { PLAYER_URLS } from "../entities/players";
import { getData, useAxios } from "../api/ApiService";

// export const showList = ( m,v ) => { console.log(m + v.map(m => {return "("+m.key+")(" + m.id + ") "+ m.name + " "}))}

const TeamsheetDnd = ({myTeam, myPanel, mySubs, saveTeam, savePanel, saveSubs, handleSave, handleCancel, methods}) => {
    const [panel, setPanel] = useState(myPanel);
    const [subs, setSubs] = useState(mySubs);
    const [team, setTeam] = useState(myTeam);
    const [data, error, loading, axiosApi] = useAxios();

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
            });
        } else { // dropped onto panel or subs
            setDest(prevDest => {
                const array = [...prevDest]
                const player = {...source[sourceIdx]}
                array.push(player)
                return array
            });
        }
    }
    const resetPlayer = (player, source) => {
        const temp = {...player}
        switch (source) {
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
    // process drop onto the panel or subs container rather than onto a player
    const onDropContainer = (droppedBoxId, droppedBoxIndex, droppedBoxType, container) => {

        const [sourceIdx, setSource, sourcePlayer, arrayStr] = findPlayer(droppedBoxId)
        const dest = container === "panel" ? panel : container === "subs" ? subs : team
        const setDest = dest === panel ? setPanel : dest === subs ? setSubs : setTeam
        const source = arrayStr === "panel" ? panel : arrayStr === "subs" ? subs : team

        // skip over any attempt to move onto same container
        if (source === dest) return

        // don't move around empty objects
        if (checkPlayer(source[sourceIdx]) === undefined) return

        if(container==="panel") {
            moveTeamPlayer( sourceIdx,-1, setSource,setPanel, droppedBoxId,-1, source,panel)

        } else { // must be "subs"
            moveTeamPlayer( sourceIdx,-1, setSource,setSubs, droppedBoxId,-1, source, subs)
        }

    }

    const checkPlayer = (source) => {
        let name = undefined
        name = source.player

        if (source.player) {
            name = source.player.firstname
        } else if (source.firstname) {
            name = source.firstname
        }

        return name
    }

    // process drop onto player rather than into a container

    const moveTeamToTeam = (sourceId, destId) => {
        const sourceIdx = team.findIndex(t => t.player.id === sourceId)
        const destIdx = team.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...team[sourceIdx].player}
        const destPlayer = {...team[destIdx].player}

        saveTeam(prevTeam => {
            let array = [...prevTeam]
            array[sourceIdx].player = destPlayer
            array[destIdx].player = sourcePlayer
            return array
        })
    }
    const swapTeamWithPanel = (sourceId, destId) => {
        const sourceIdx = team.findIndex(t => t.player.id === sourceId)
        const destIdx = panel.findIndex(t => t.id === destId)

        const sourcePlayer = {...team[sourceIdx].player}
        const destPlayer = {...panel[destIdx]}

        setPanel(prevPanel => {
            let array = [...prevPanel]
            array[destIdx] = sourcePlayer
            return array
        })

        setTeam(prevTeam => {
            let array = [...prevTeam]
            array[sourceIdx].player = destPlayer
            return array
        })
    }


    const removeTeamToSubs = (sourceId, destId) => {

    }

    const swapTeamWithSubs = (sourceId, destId) => {

    }

    const removeTeamToPanel = (sourceId, destId) => {

    }

    const removePanelToTeam = (sourceId, destId) => {

    }

    const swapPanelWithTeam = (sourceId, destId) => {

    }

    const removePanelToSubs = (sourceId, destId) => {

    }

    const swapPanelWithSubs = (sourceId, destId) => {

    }

    const movePanelToPanel = (sourceId, destId) => {
        const sourceIdx = panel.findIndex(t => t.id === sourceId)
        const destIdx = panel.findIndex(t => t.id === destId)

        const sourcePlayer = {...panel[sourceIdx]}
        const destPlayer = {...panel[destIdx]}


        savePanel(prevPanel => {
            let array = [...prevPanel]
            array[sourceIdx] = destPlayer
            array[destIdx] = sourcePlayer
            return array
        })
    }

    const removeSubsToPanel = (sourceId, destId) => {

    }

    const swapSubsWithPanel = (sourceId, destId) => {

    }

    const removeSubsToTeam = (sourceId, destId) => {

    }

    const swapSubsWithTeam = (sourceId, destId) => {

    }

    const moveSubsToSubs = (sourceId, destId) => {
        const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
        const destIdx = subs.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...subs[sourceIdx].player}
        const destPlayer = {...subs[destIdx].player}

        saveSubs(prevSubs => {
            let array = [...prevSubs]
            array[sourceIdx].player = destPlayer
            array[destIdx].player = sourcePlayer
            return array
        })
    }

    const onDrop = (box, destId, item, sourceIndex) => {
        const sourceId = item.player.id
        const source = findArray(sourceId)
        const dest = findArray(destId)

        if (source === team) {
            if (dest === panel && destId === -1) removeTeamToPanel(sourceId, destId)
            if (dest === panel && destId >= 0) swapTeamWithPanel(sourceId, destId)
            if (dest === subs && destId === -1) removeTeamToSubs(sourceId, destId)
            if (dest === subs && destId >= 0) swapTeamWithSubs(sourceId, destId)
            if (dest === team) moveTeamToTeam(sourceId, destId)

        } else if (source === panel) {
            if (dest === team && destId === -1) removePanelToTeam(sourceId, destId)
            if (dest === team && destId >= 0) swapPanelWithTeam(sourceId, destId)
            if (dest === subs && destId === -1) removePanelToSubs(sourceId, destId)
            if (dest === subs && destId >= 0) swapPanelWithSubs(sourceId, destId)
            if (dest === panel) movePanelToPanel(sourceId, destId)

        } else if (source === subs) {
            if (dest === panel && destId === -1) removeSubsToPanel(sourceId, destId)
            if (dest === panel && destId >= 0) swapSubsWithPanel(sourceId, destId)
            if (dest === team && destId === -1) removeSubsToTeam(sourceId, destId)
            if (dest === team && destId >= 0) swapSubsWithTeam(sourceId, destId)
            if (dest === subs) moveSubsToSubs(sourceId, destId)
        }
    }

    const findArray = (id) => {
        const idx1 = panel.findIndex(p => p.id === id)
        const idx2 = subs.findIndex(p => p.player.id === id)
        const idx3 = team.findIndex(p => p.player.id === id)
        return idx1 >= 0 ? panel : idx2 >= 0 ? subs : team
    }

    console.log("Just before TeamsheetContainer")
    return (
        <div className="App">
            <DndProvider backend={HTML5Backend}>
                <TeamsheetContainer panel={panel} team={team} subs={subs} onDrop={onDrop}
                                    onDropContainer={onDropContainer}
                                    handleSave={handleSave} handleCancel={handleCancel}/>
            </DndProvider>
        </div>
  );
}

export default TeamsheetDnd;
