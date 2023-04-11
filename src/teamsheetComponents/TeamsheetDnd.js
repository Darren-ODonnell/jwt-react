import React, { useContext, useEffect, useReducer, useRef } from "react";
import {v4} from "uuid";

import TeamsheetContainer from "./TeamsheetContainers";
import {getData, useAxios} from "../api/ApiService";
import {TeamsheetContext} from '../context/TeamsheetContext';

const TeamsheetDnd = ({handleSave, handleCancel, methods}) => {
    const {panel, setPanel, subs, setSubs, team, setTeam} = useContext(TeamsheetContext);

    const [data, error, loading, axiosApi] = useAxios();
    const renderCount = useRef(0);
    useEffect(() => {
        renderCount.current++;
        console.log('Render count - TeamsheetDnd:', renderCount.current);
    });
    const findPlayer = (id) => {
        const idx1 = panel.findIndex(p => p.id === id)
        const idx2 = subs.findIndex(p => p.player.id === id)
        const idx3 = team.findIndex(p => p.player.id === id)

        if (idx1 >= 0) return [idx1, setPanel, panel[idx1], 'panel', panel];
        if (idx2 >= 0) return [idx2, setSubs, subs[idx2], 'subs', subs];
        if (idx3 >= 0) return [idx3, setTeam, team[idx3], 'team', team];

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


        // check for empty player
        if (container === "panel") if (source[sourceIdx].player.id === -1) return
        if (container === "subs") if (source[sourceIdx].player.id === -1) return
        if (container === "team") if (source[sourceIdx].id === -1) return

        // move team to panel
        // move team to subs
        // move subs to panel
        // move panel to subs

        if (source === panel) {
            if (source[sourceIdx].id === -1) return
            // handle subs move

        } else if (source === subs) {
            if (source[sourceIdx].player.id === -1) return
            // handle panel move

        } else if (source === team) {
            if (source[sourceIdx].player.id === -1) return
            if (dest === subs) {

            }
            if (dest === panel) {

            }
        }


        if (container === "panel") {
            moveTeamPlayer(sourceIdx, -1, setSource, setPanel, droppedBoxId, -1, source, panel)
        } else { // must be "subs"
            moveTeamPlayer(sourceIdx, -1, setSource, setSubs, droppedBoxId, -1, source, subs)
        }
    }
    const checkPlayer = (source) => {
        let name = undefined
        if (source.player) {
            name = source.player.firstname
        } else if (source.firstname) {
            name = source.firstname
        }
        return name
    }
    // process drop onto player rather than into a container
    const moveTeamToTeam = (sourceId, destId) => {
        // test passed
        const sourceIdx = team.findIndex(t => t.player.id === sourceId)
        const destIdx = team.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...team[sourceIdx].player}
        const destPlayer = {...team[destIdx].player}

        // don't move an empty position
        if (sourceId === -1) return

        saveTeam(sourceIdx, destPlayer)
        saveTeam(destIdx, sourcePlayer)

    }
    const swapTeamWithPanel = (sourceId, destId) => {
        const sourceIdx = team.findIndex(t => t.player.id === sourceId);
        const destIdx = panel.findIndex(t => t.id === destId);

        const sourcePlayer = {...team[sourceIdx].player};
        const destPlayer = {...panel[destIdx]};

        console.log(sourcePlayer === team[sourceIdx].player
            ? "source players in same memory"
            : "sourcep players NOT in same memory")


        console.log("5-SwapTeamWithPanel-BeforeStateChange - Team/Panel: ", team[0].player, panel[0])

        // Don't move an empty position
        if (sourceId === -1) return;

        setPanel((prevPanel) => {
            // Create a new array without directly modifying the previous state
            const newPanel = [...prevPanel];
            // Update the player in the new array
            newPanel[destIdx] = sourcePlayer //  { ...sourcePlayer, id: sourcePlayer.id };
            return newPanel;
        });

        setTeam((prevTeam) => {
            const newTeam = [...prevTeam]
            // Update the player in the new array
            newTeam[sourceIdx].player = destPlayer //{ ...destPlayer, id: destPlayer.id };
            return newTeam;
        });


        console.log("6-SwapTeamWithPanel-AfterStateChange - Team/Panel: ", team[0].player, panel[0])

    };

    // cant test yet
    const removeTeamToSubs = (sourceId, destId) => {
        const sourceIdx = team.findIndex(t => t.player.id === sourceId)
        const destIdx = subs.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...team[sourceIdx].player}
        const destPlayer = {...subs[destIdx].player}

        // don't move an empty position
        if (sourceId === -1) return

        // copy onto empty area of container
        if (destId === -1) {
            // if subs and is empty - setup
        }

        saveTeam(sourceIdx, destPlayer)
        saveSubs(destIdx, sourcePlayer)
        //
        // setPanel(prevPanel => {
        //     let array = [...prevPanel]
        //     array[destIdx] = {...sourcePlayer, id: destPlayer.id}
        //     return array
        // })
        //
        // setTeam(prevTeam => {
        //     let array = [...prevTeam]
        //     array[sourceIdx].player = {...destPlayer, id: sourcePlayer.id}
        //     return array
        // })
    }
    const swapTeamWithSubs = (sourceId, destId) => {
        // AW - MN
        // MN - AW - nothing happens
        const sourceIdx = team.findIndex(t => t.player.id === sourceId)
        const destIdx = subs.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...team[sourceIdx].player}
        const destPlayer = {...subs[destIdx].player}

        // don't move an empty position
        if (sourceId === -1) return

        // saveTeam(sourceIdx, destPlayer)
        // saveSubs(destIdx, sourcePlayer)

        setTeam(prevTeam => {
            let array = [...prevTeam]
            array[sourceIdx].player = {...destPlayer, id: destPlayer.id}
            return array
        })

        setSubs(prevSubs => {
            let array = [...prevSubs]
            array[destIdx].player = {...sourcePlayer, id: sourcePlayer.id}
            return array
        })

    }
    // cant test yet
    const removeTeamToPanel = (sourceId, destId) => {
        const sourceIdx = team.findIndex(t => t.player.id === sourceId)
        const destIdx = panel.findIndex(t => t.id === destId)

        const sourcePlayer = {...team[sourceIdx].player}
        const destPlayer = {...panel[destIdx]}

        // don't move an empty position
        if (sourceId === -1) return

        saveTeam(sourceIdx, destPlayer)
        savePanel(destIdx, sourcePlayer)


    }
    const removePanelToTeam = (sourceId, destId) => {
        // destination is empty
        const sourceIdx = panel.findIndex(t => t.id === sourceId)
        const destIdx = team.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...panel[sourceIdx]}
        const destPlayer = {}

        setPanel(prevPanel => {
            const array = [...prevPanel]
            if (destPlayer) {
                array.splice(sourceIdx, 1)
            } else {
                array[sourceIdx] = {...destPlayer, id: destPlayer.id}
            }
            return array
        })

        setTeam(prevTeam => {
            const array = [...prevTeam]
            array[destIdx].player = {...sourcePlayer, id: sourcePlayer.id}
            return array
        })


        // savePanel(sourceIdx, destPlayer)
        // saveTeam(destIdx, sourcePlayer)
    }
    const saveSubs = (idx, player) => {
        setSubs(prevSubs => {
            const array = [...prevSubs]
            array[idx].player = {...player, id: -1}
            return array
        })
        setSubs(prevSubs => {
            const array = [...prevSubs]
            array[idx].player = {...player, id: player.id}
            return array
        })
    }
    const savePanel = (idx, player) => {
        setPanel(prevPanel => {
            const array = [...prevPanel]
            array[idx] = {...player, id: -1}
            return array
        })
        setPanel(prevPanel => {
            const array = [...prevPanel]
            array[idx] = {...player, id: player.id}
            return array
        })
    }
    const saveTeam = (idx, player) => {
        setTeam(prevTeam => {
            const array = [...prevTeam]
            array[idx].player = {...player, id: -1}
            return array
        })
        setTeam(prevTeam => {
            const array = [...prevTeam]
            array[idx].player = {...player, id: player.id}
            return array
        })

    }
    const swapPanelWithTeam = (sourceId, destId) => {
        // both panel and team have existing players
        const sourceIdx = panel.findIndex(t => t.id === sourceId)
        const destIdx = team.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...panel[sourceIdx]}
        const destPlayer = {...team[destIdx].player}

        savePanel(sourceIdx, destPlayer)
        saveTeam(destIdx, sourcePlayer)
    }
    const removePanelToSubs = (sourceId, destId) => {
        const sourceIdx = panel.findIndex(t => t.id === sourceId)
        const destIdx = subs.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...panel[sourceIdx]}
        const destPlayer = {...subs[destIdx].player}

        savePanel(sourceIdx, destPlayer)
        saveSubs(destIdx, sourcePlayer)
    }
    const swapPanelWithSubs = (sourceId, destId) => {
        const sourceIdx = panel.findIndex(t => t.id === sourceId)
        const destIdx = subs.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...panel[sourceIdx]}
        const destPlayer = {...subs[destIdx].player}

        savePanel(sourceIdx, destPlayer)
        saveSubs(destIdx, sourcePlayer)
    }
    const movePanelToPanel = (sourceId, destId) => {
        const sourceIdx = panel.findIndex(t => t.id === sourceId);
        const destIdx = panel.findIndex(t => t.id === destId);

        const sourcePlayer = {...panel[sourceIdx]}
        const destPlayer = {...panel[destIdx]}

        setPanel(prevPanel => {
            // Create a new array without directly modifying the previous state
            const newPanel = prevPanel.map(player => ({...player}));

            // Swap the elements in the new array
            const temp = newPanel[sourceIdx];
            newPanel[sourceIdx] = newPanel[destIdx];
            newPanel[destIdx] = temp;

            // save the updated array to panel
            return newPanel;
        });
    }
    const removeSubsToPanel = (sourceId, destId) => {
        const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
        const destIdx = panel.findIndex(t => t.id === destId)

        const sourcePlayer = {...subs[sourceIdx].player}
        const destPlayer = {...panel[destIdx]}

        saveSubs(sourceIdx, destPlayer)
        savePanel(destIdx, sourcePlayer)

    }
    const swapSubsWithPanel = (sourceId, destId) => {
        const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
        const destIdx = panel.findIndex(t => t.id === destId)

        const sourcePlayer = {...subs[sourceIdx].player}
        const destPlayer = {...panel[destIdx]}

        saveSubs(sourceIdx, destPlayer)
        savePanel(destIdx, sourcePlayer)
    }
    const removeSubsToTeam = (sourceId, destId) => {
        const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
        const destIdx = team.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...subs[sourceIdx].player}
        const destPlayer = {}

        setSubs(prevSubs => {
            const array = [...prevSubs]
            if (destPlayer) {
                array.splice(sourceIdx, 1)
            } else {
                array[sourceIdx].player = {...destPlayer, id: destPlayer.id}
            }
            return array
        })

        setTeam(prevTeam => {
            const array = [...prevTeam]
            array[destIdx].player = {...sourcePlayer, id: sourcePlayer.id}
            return array
        })

    }
    const swapSubsWithTeam = (sourceId, destId) => {
        const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
        const destIdx = team.findIndex(t => t.player.id === destId)

        const sourcePlayer = {...subs[sourceIdx].player}
        const destPlayer = {...team[destIdx].player}

        saveSubs(sourceIdx, destPlayer)
        saveTeam(destIdx, sourcePlayer)
    }
    const moveSubsToSubs = (sourceId, destId) => {
        const sourceIdx = subs.findIndex(t => t.player.id === sourceId);
        const destIdx = subs.findIndex(t => t.player.id === destId);

        setSubs(prevSubs => {
            // Create a new array without directly modifying the previous state
            const newSubs = prevSubs.map(teamsheet => ({...teamsheet}));

            // Swap the elements in the new array
            const temp = newSubs[sourceIdx].player;
            newSubs[sourceIdx].player = newSubs[destIdx].player;
            newSubs[destIdx].player = temp;

            // save updated array to subs
            return newSubs;
        });
    }

    const onDrop = (box, destId, item) => {
        console.log("1-OnDrop-SourceP/DestP-beforeFindIndex - Team/Panel: ",
            team[0].player, panel[0])

        const sourceId = item.player.id;
        const source = findArray(sourceId);
        const dest = findArray(destId);

        (source === team)
            ? console.log("2-OnDrop-SourceP/DestP-afterFindIndex-Team: ",
                team.find(s => s.player.id === sourceId).player, dest.find(d => d.id === destId))
            : console.log("2-OnDrop-SourceP/DestP-afterFindIndex-Panel: ",
                panel.find(s => s.id === sourceId), dest.find(d => d.id === destId))

        // console.log("OnDrop-Source/Dest: ",source,dest)
        console.log("3-OnDrop-source: ", source === team ? "team" : source === panel ? "panel" : "subs")
        console.log("4-OnDrop-dest: ", dest === team ? "team" : dest === panel ? "panel" : "subs")


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
        console.log("7-OnDrop-SourceP/DestP-AtEnd - Team/Panel: ", team[0].player, panel[0])

    }

    function findArray(id) {
        console.log("FindArray-BeforeFindIndex ", team[0].player, panel[0])
        const idx1 = panel.findIndex(p => p.id === id)
        const idx2 = subs.findIndex(p => p.player.id === id)
        const idx3 = team.findIndex(p => p.player.id === id)

        const array = idx1 >= 0
            ? panel
            : idx2 >= 0
                ? subs
                : team

        return array
    }

    console.log("8-Just before TeamsheetContainer - Team/Panel: ", team[0].player, panel[0])
    return (
        <div className="App">
            <TeamsheetContainer onDrop={onDrop} onDropContainer={onDropContainer}
                                handleSave={handleSave} handleCancel={handleCancel}/>
        </div>
  );
}

export default TeamsheetDnd;
