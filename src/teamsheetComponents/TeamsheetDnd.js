import React, { useContext, useEffect, useReducer, useRef } from "react";
import { v4 } from "uuid";
import TeamsheetContainer from "./TeamsheetContainers";
import {getData, UpdateData, AddData, useAxios, UpdateDataAll, AddDataAll} from "../api/ApiService";
import {TeamsheetContext} from '../context/TeamsheetContext';
import { TEAMSHEET_URLS } from "../entities/teamsheets";

const TeamsheetDnd = ({
                         handleCancel,
                         setRowData,
                         methods,
                         teamsheetDnd,
                         setFixtureSelected,
                         setTeamsheetPrepared,
                         setTeamsheetDnd,
                         positions

                      }) => {
   const {panel, setPanel, subs, setSubs, team, setTeam} = useContext(TeamsheetContext);

   const [data, error, loading, axiosApi] = useAxios();
   // const renderCount = useRef(0);
   // useEffect(() => {
   //    renderCount.current++;
   //    console.log('Render count - TeamsheetDnd:', renderCount.current);
   // });

   // useEffect(() => {
   //    console.log('subs updated:', subs);
   // }, [subs]);
   //
   // useEffect(() => {
   //    console.log('team updated:', team);
   // }, [team]);


   const findPlayer = (id) => {
      const idx1 = panel.findIndex(p => p.id === id)
      const idx2 = subs.findIndex(p => p.player.id === id)
      const idx3 = team.findIndex(p => p.player.id === id)

      if (idx1 >= 0) return [idx1, setPanel, panel[idx1], 'panel', panel];
      if (idx2 >= 0) return [idx2, setSubs, subs[idx2], 'subs', subs];
      if (idx3 >= 0) return [idx3, setTeam, team[idx3], 'team', team];

      return [undefined, undefined, undefined, undefined];
   }

   const moveTeamToSubsContainer = (sourceIdx, setSource, setDest, source, dest) => {
      // don't copy from Team if already exists in Subs list
      const sourcePlayerId = source[sourceIdx].player.id;
      const exists = dest.find(p => p.player.id === sourcePlayerId)
      if (exists) return

      // make a deep copy so attribs in player do not get changed by the setTeam(...) block
      const player = JSON.parse(JSON.stringify(source[sourceIdx]));

      setTeam(prevTeam => {
         const array = [...prevTeam]
         array[sourceIdx].id.playerId = -1
         array[sourceIdx].player = clearPlayer()
         array[sourceIdx].player.firstname = ""
         array[sourceIdx].player.lastname = ""
         return array
      })

      const newSubsObject = JSON.parse(JSON.stringify(createSubsMember(player)))

      setSubs(prevSubs => [...prevSubs, newSubsObject]);
      //
      // setSubs(prevSubs=> {
      //    const array = [...prevSubs]
      //    array.push(newSubsObject)
      //    return array
      // })

   }
   const clearPlayer = () => {
      return {
         address: "",
         availability: "Yes",
         email: "",
         fellowType: "Player",
         firstname: "",
         firstnameI: "",
         grade: "J1",
         id: -1,
         lastname: "",
         lastnameI: "",
         panelMember: "",
         phone: "",
         phoneIce: "",
         registered: true,
         yob: 0,
      }
   }

   const moveTeamToPanelContainer = (sourceIdx, setSource, setDest, source, dest) => {
      // don't copy from Team if already exists in Panel
      const sourcePlayerId = source[sourceIdx].player.id;
      const exists = dest.some(p => p.id === sourcePlayerId)
      if (exists) return

      // make a deep copy so attribs in player do not get changed by the setTeam(...) block
      const player = JSON.parse(JSON.stringify(source[sourceIdx]));

      setTeam(prevTeam => {
         const array = [...prevTeam]
         array[sourceIdx].id.playerId = -1
         array[sourceIdx].player.id = -1
         array[sourceIdx].player.firstname = ""
         array[sourceIdx].player.lastname = ""
         return array
      })

      const newPanelObject = createPanelMember(player.player)
      setPanel(prevPanel => {
         const array = [...prevPanel]
         array.push(newPanelObject)
         return array
      })

   }
   const createSubsMember = (player) => {
      const posn = 15 + subs.length + 1
      const position = positions[posn]

      const newSubsMember = {...player, position: position, jerseyNumber: posn}

      return newSubsMember
   }
   const createPanelMember = (player) => {
      const size = panel.length
      const position = {}

      const newPanelMember = JSON.parse(JSON.stringify(player))

      return newPanelMember
   }
   const moveSubsToPanelContainer = (sourceIdx, setSource, setDest, source, dest) => {
      // don't copy if already exists in this list
      const sourcePlayerId = source[sourceIdx].player.id;
      const exists = dest.find(p => p.id === sourcePlayerId)
      if (exists) return

      // make a deep copy so attribs in player do not get changed
      const player = JSON.parse(JSON.stringify(source[sourceIdx]));

      const newPanelObject = createPanelMember(player)
      setPanel(prevPanel => {
         const array = [...prevPanel]
         array.push(newPanelObject.player)
         return array
      })

      setSubs(prevSubs => {
         const array = [...prevSubs]
         const filteredArray = array.filter(a => a.player.id !== player.player.id)
         return filteredArray
      })
   }
   const movePanelToSubsContainer = (sourceIdx, setSource, setDest, source, dest) => {
      // don't copy if already exists in this list
      const sourcePlayerId = source[sourceIdx].id;
      const exists = dest.find(p => p.player.id === sourcePlayerId)
      if (exists) return

      // make a deep copy so attribs in player do not get changed
      const player = JSON.parse(JSON.stringify(source[sourceIdx]));

      const newSubsObject = JSON.parse(JSON.stringify(team[0]));
      newSubsObject.player = JSON.parse(JSON.stringify(player));

      setPanel(prevPanel => {
         const array = [...prevPanel]
         const filteredArray = array.filter(a => a.id !== player.id)
         return filteredArray
      })

      setSubs(prevSubs => {
         const array = [...prevSubs]
         array.push(newSubsObject)
         return array
      })
   }

   const moveTeamPlayer = (sourceIdx, destIdx, setSource, setDest, sourceId, destId, source, dest) => {
      // don't copy if already exists in this list
      const exists = dest.find(p => p.name === source[sourceIdx].name)
      if (exists) return

      const tempSource = {...source[sourceIdx]}

      setSource(prevSource => {
         const array = [...prevSource]
         const player = resetPlayer(array[sourceIdx], "id")
         array[sourceIdx] = player
         return array
      });

      if (destIdx >= 0) { // dropped onto another player in panel or Subs
         setDest(prevDest => {
            const array = [...prevDest]
            const player = resetPlayer({...tempSource}, "key")
            return [
               ...array.slice(0, destIdx),
               player,
               ...array.slice(destIdx + 1)
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

      // move team to panel
      // move team to subs
      // move subs to panel
      // move panel to subs

      if (source === panel) {
         if (source[sourceIdx].id === -1) return
         if (dest === subs) {
            movePanelToSubsContainer(sourceIdx, setSource, setDest, source, dest)
         }

      } else if (source === subs) {
         if (source[sourceIdx].player.id === -1) return
         if (dest === panel) {
            moveSubsToPanelContainer(sourceIdx, setSource, setDest, source, dest)
         }

      } else if (source === team) {
         if (source[sourceIdx].player.id === -1) return
         if (dest === subs) {
            moveTeamToSubsContainer(sourceIdx, setSource, setDest, source, dest)
         }
         if (dest === panel) {
            moveTeamToPanelContainer(sourceIdx, setSource, setDest, source, dest)
         }
      }

      //
      // if (container === "panel") {
      //    moveTeamPlayer(sourceIdx, -1, setSource, setPanel, droppedBoxId, -1, source, panel)
      // } else { // must be "subs"
      //    moveTeamPlayer(sourceIdx, -1, setSource, setSubs, droppedBoxId, -1, source, subs)
      // }
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

      const sourcePlayer = JSON.parse(JSON.stringify(team[sourceIdx].player))
      const destPlayer = JSON.parse(JSON.stringify(team[destIdx].player))

      // don't move an empty position
      if (sourceId === -1) return

      saveTeam(sourceIdx, destPlayer)
      saveTeam(destIdx, sourcePlayer)

   }
   const swapTeamWithPanel = (sourceId, destId) => {
      const sourceIdx = team.findIndex(t => t.player.id === sourceId);
      const destIdx = panel.findIndex(t => t.id === destId);

      const sourcePlayer = JSON.parse(JSON.stringify(createSubsMember(team[sourceIdx].player)));
      const destPlayer = JSON.parse(JSON.stringify(createSubsMember(panel[destIdx])));

      setTeam(prevTeam => {
         let array = [...prevTeam];
         array[sourceIdx].player = destPlayer;
         console.log("team updated:", array);
         return array;
      });

      setPanel(prevPanel => {
         let array = [...prevPanel];
         array[destIdx] = sourcePlayer;
         console.log("subs updated:", array);
         return array;
      });


   };

   // cant test yet
   const removeTeamToSubs = (sourceId, destId, position) => {
      const sourceIdx = team.findIndex(t => t.player.id === sourceId)
      const destIdx = subs.findIndex(t => t.player.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(team[sourceIdx].player))
      const destPlayer = JSON.parse(JSON.stringify(subs[destIdx].player))

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
   const swapTeamWithSubs = (sourceId, destId, position) => {
      const sourceIdx = team.findIndex(t => t.player.id === sourceId);
      const destIdx = subs.findIndex(t => t.player.id === destId);

      const sourcePlayer = JSON.parse(JSON.stringify(createSubsMember(team[sourceIdx].player)));
      const destPlayer = JSON.parse(JSON.stringify(createSubsMember(subs[destIdx].player)));

      setTeam(prevTeam => {
         let array = [...prevTeam];
         array[sourceIdx].player = destPlayer;
         console.log("team updated:", array);
         return array;
      });

      setSubs(prevSubs => {
         let array = [...prevSubs];
         array[destIdx].player = sourcePlayer;
         console.log("subs updated:", array);
         return array;
      });

   };

   // cant test yet
   const removeTeamToPanel = (sourceId, destId, position) => {
      const sourceIdx = team.findIndex(t => t.player.id === sourceId)
      const destIdx = panel.findIndex(t => t.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(team[sourceIdx].player))
      const destPlayer = JSON.parse(JSON.stringify(panel[destIdx]))

      // don't move an empty position
      if (sourceId === -1) return

      saveTeam(sourceIdx, destPlayer)
      savePanel(destIdx, sourcePlayer)


   }
   const removePanelToTeam = (sourceId, destId, position) => {
      // destination is empty
      const sourceIdx = panel.findIndex(t => t.id === sourceId)
      const destIdx = team.findIndex(t => t.player.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(panel[sourceIdx]))
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
   const swapPanelWithTeam = (sourceId, destId, position) => {
      // both panel and team have existing players
      const sourceIdx = panel.findIndex(t => t.id === sourceId)
      const destIdx = team.findIndex(t => t.player.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(panel[sourceIdx]))
      const destPlayer = JSON.parse(JSON.stringify(team[destIdx].player))

      savePanel(sourceIdx, destPlayer)
      saveTeam(destIdx, sourcePlayer)
   }
   const removePanelToSubs = (sourceId, destId, position) => {
      const sourceIdx = panel.findIndex(t => t.id === sourceId)
      const destIdx = subs.findIndex(t => t.player.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(panel[sourceIdx]))
      const destPlayer = JSON.parse(JSON.stringify(subs[destIdx].player))

      savePanel(sourceIdx, destPlayer)
      saveSubs(destIdx, sourcePlayer)
   }
   const swapPanelWithSubs = (sourceId, destId, position) => {
      const sourceIdx = panel.findIndex(t => t.id === sourceId)
      const destIdx = subs.findIndex(t => t.player.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(panel[sourceIdx]))
      const destPlayer = JSON.parse(JSON.stringify(subs[destIdx].player))

      savePanel(sourceIdx, destPlayer)
      saveSubs(destIdx, sourcePlayer)
   }
   const movePanelToPanel = (sourceId, destId) => {
      // Find the source and destination indices using the current panel state
      const sourceIdx = panel.findIndex(player => player.id === sourceId);
      const destIdx = panel.findIndex(player => player.id === destId);

      if (sourceIdx === -1 || destIdx === -1) {
         console.error('Source or destination player not found');
         return;
      }

      // Create a new array without directly modifying the previous state
      const newPanel = JSON.parse(JSON.stringify(panel));

      // Swap the elements in the new array
      const temp = newPanel[sourceIdx];
      newPanel[sourceIdx] = newPanel[destIdx]
      newPanel[destIdx] = temp

      // Save the updated array to panel
      setPanel(newPanel);

      console.log('sourceIdx:', sourceIdx, 'destIdx:', destIdx);
      console.log('Before swap panel:', panel);
      console.log('After swap panel:', newPanel);

   };

   const removeSubsToPanel = (sourceId, destId, position) => {
      const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
      const destIdx = panel.findIndex(t => t.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(subs[sourceIdx].player))
      const destPlayer = JSON.parse(JSON.stringify(panel[destIdx]))

      saveSubs(sourceIdx, destPlayer)
      savePanel(destIdx, sourcePlayer)

   }
   const swapSubsWithPanel = (sourceId, destId, position) => {
      const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
      const destIdx = panel.findIndex(t => t.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(subs[sourceIdx].player))
      const destPlayer = JSON.parse(JSON.stringify(panel[destIdx]))

      saveSubs(sourceIdx, destPlayer)
      savePanel(destIdx, sourcePlayer)
   }
   const removeSubsToTeam = (sourceId, destId, position) => {
      const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
      const destIdx = team.findIndex(t => t.player.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(createSubsMember(subs[sourceIdx].player)))
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
         array[position - 1].player = {...sourcePlayer, id: sourcePlayer.id}
         return array
      })

   }
   const swapSubsWithTeam = (sourceId, destId) => {
      const sourceIdx = subs.findIndex(t => t.player.id === sourceId)
      const destIdx = team.findIndex(t => t.player.id === destId)

      const sourcePlayer = JSON.parse(JSON.stringify(subs[sourceIdx].player))
      const destPlayer = JSON.parse(JSON.stringify(team[destIdx].player))

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

   const onDrop = (box, destId, item, event, position, container) => {
      if (event) {
         event.preventDefault();
         event.stopPropagation(); // stop the event from propagating up the component tree
      }

      const sourceId = item.player.id;
      const source = findArrayByName(container);
      const dest = findArrayById(destId);

      console.log('source:', source, 'dest:', dest, 'sourceId:', sourceId, 'destId:', destId);
      console.log('source array:', source);
      console.log('dest array:', dest);
      console.log('panel array:', panel);
      console.log('team array:', team);
      console.log('subs array:', subs);

      const sourceIsTeam = team.some((player, index) => player === source[index]);
      const sourceIsPanel = panel.some((player, index) => player === source[index]);
      const sourceIsSubs = subs.some((player, index) => player === source[index]);

      const destIsPanel = panel.some((player, index) => {
         if (dest[index] !== null && dest[index] !== undefined) {
            return player === dest[index];
         } else {
            return false;
         }
      });
      const destIsSubs = subs.some((teamsheet, index) => teamsheet === dest[index]);
      const destIsTeam = team.some((teamsheet, index) => teamsheet === dest[index]);

      if (sourceIsTeam) {
         console.log('source is team');
         if (destIsPanel && destId === -1) removeTeamToPanel(sourceId, destId, position);
         if (destIsPanel && destId >= 0) swapTeamWithPanel(sourceId, destId, position);
         if (destIsSubs && destId === -1) removeTeamToSubs(sourceId, destId, position);
         if (destIsSubs && destId >= 0) swapTeamWithSubs(sourceId, destId, position);
         if (destIsTeam) moveTeamToTeam(sourceId, destId, position);
      } else if (sourceIsPanel) {
         console.log('source is panel');
         if (destIsTeam && destId === -1) removePanelToTeam(sourceId, destId, position);
         if (destIsTeam && destId >= 0) swapPanelWithTeam(sourceId, destId, position);
         if (destIsSubs && destId === -1) removePanelToSubs(sourceId, destId, position);
         if (destIsSubs && destId >= 0) swapPanelWithSubs(sourceId, destId, position);
         if (destIsPanel) movePanelToPanel(sourceId, destId, position);
      } else if (sourceIsSubs) {
         console.log('source is subs');
         if (destIsPanel && destId === -1) removeSubsToPanel(sourceId, destId, position);
         if (destIsPanel && destId >= 0) swapSubsWithPanel(sourceId, destId, position);
         if (destIsTeam && destId === -1) removeSubsToTeam(sourceId, destId, position);
         if (destIsTeam && destId >= 0) swapSubsWithTeam(sourceId, destId, position);
         if (destIsSubs) moveSubsToSubs(sourceId, destId, position);
      }
   };

   const findArrayByName = (container) => {
      return container === "panel" ? [...panel] : container == "subs" ? [...subs] : [...team]
   };
   const findArrayById = (id) => {
      const idx1 = subs.findIndex(p => p.player.id === id)
      const idx2 = team.findIndex(p => p.player.id === id)
      const idx3 = panel.findIndex(p => p.id === id)

      return idx1 >= 0 ? subs : idx2 >= 0 ? team : panel
   };


   const save = () => {
      const processingTeamsheets = [...team, ...subs]

      let teamsheetsToAdd = []
      let teamsheetsToUpdate = []

      // Only update if a player has moved
      // separate updates from additions
      processingTeamsheets.forEach(t => {

         if (t.id.playerId === -1 && t.player.id > 0) { // new entry
            teamsheetsToAdd.push(t)
         } else if (t.id.playerId !== t.player.id) { // implies player changed position
            t.id.playerId = t.player.id // update the id first
            teamsheetsToUpdate.push(t) // change existing entries
         }
      })

      // teamsheetId.playerId === -1 (add new teamsheet)
      // teamsheetId.playerId >= 0 (update if player is moved, add if player is new to teamsheet)

      if (teamsheetsToUpdate.length > 0) {
         if (Array.isArray(teamsheetsToUpdate))
            UpdateDataAll({methods, axiosApi, error, formValues: [...teamsheetsToUpdate]})
         else
            UpdateData({methods, axiosApi, formValues: {...teamsheetsToUpdate}})
      }
      if (teamsheetsToAdd.length > 0) {
         if (Array.isArray(teamsheetsToAdd)) {

            const updatedTeamsheets = teamsheetsToAdd.map(tadd => (
               {...tadd, id: {fixtureId: tadd.fixture.id, playerId: tadd.player.id}}
            ))
            AddDataAll({methods, axiosApi, error, formValues: [...updatedTeamsheets]})
         } else {
            AddData({methods, axiosApi, formValues: {...teamsheetsToAdd}})
         }
      }
      setTeamsheetDnd(false)
      setTeamsheetPrepared(false)
      setFixtureSelected(false)
   }
   const cancel = () => {
      setTeamsheetPrepared(false)
      setFixtureSelected(false)
      handleCancel()
   }

   return (
      <div className="App">
         <TeamsheetContainer onDrop={onDrop} onDropContainer={onDropContainer}
                             save={save} handleCancel={cancel}/>
      </div>
   );
}
export default TeamsheetDnd;
