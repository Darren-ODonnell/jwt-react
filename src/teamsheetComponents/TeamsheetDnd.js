import React, {useContext} from "react";
import {v4} from "uuid";
import TeamsheetContainer from "./TeamsheetContainers";
import {UpdateData, AddData, useAxios, UpdateDataAll, AddDataAll} from "../api/ApiService";
import {TeamsheetContext} from '../context/TeamsheetContext';

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
      const player = deepCopy(source[sourceIdx]);

      setTeam(prevTeam => {
         const array = [...prevTeam]
         array[sourceIdx].id.playerId = -1
         array[sourceIdx].player = clearPlayer()
         array[sourceIdx].player.firstname = ""
         array[sourceIdx].player.lastname = ""
         return array
      })

      const newSubsObject = deepCopy(createSubsMember(player))

      setSubs(prevSubs => [...prevSubs, newSubsObject]);
      //
      // setSubs(prevSubs=> {
      //    const array = [...prevSubs]
      //    array.push(newSubsObject)
      //    return array
      // })

   }
   const moveTeamToPanelContainer = (sourceIdx, setSource, setDest, source, dest) => {
      // don't copy from Team if already exists in Panel
      const sourcePlayerId = source[sourceIdx].player.id;
      const exists = dest.some(p => p.id === sourcePlayerId)
      if (exists) return

      // make a deep copy so attribs in player do not get changed by the setTeam(...) block
      const player = deepCopy(source[sourceIdx])

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
   const moveSubsToPanelContainer = (sourceIdx, setSource, setDest, source, dest) => {
      // don't copy if already exists in this list
      const sourcePlayerId = source[sourceIdx].player.id;
      const exists = dest.find(p => p.id === sourcePlayerId)
      if (exists) return

      // make a deep copy so attribs in player do not get changed
      const player = deepCopy(source[sourceIdx])

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
      const player = deepCopy(source[sourceIdx])

      const newSubsObject = deepCopy(team[0])
      newSubsObject.player = deepCopy(player)

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
   const createSubsMember = (player) => {
      const posn = 15 + subs.length + 1
      const position = positions[posn]
      const newSubsMember = {...player, position: position, jerseyNumber: posn}
      return newSubsMember
   }
   const createPanelMember = (player) => {
      const size = panel.length
      const position = {}
      const newPanelMember = deepCopy(player)
      return newPanelMember
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

   }

   // process drop onto player rather than into a container

   const removeTeamToSubs = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(team, sourceId, subs, destId)
      const [sourcePlayer, destPlayer] = getPlayers(team[sourceIdx].player, subs[sourceIdx].player)


      // don't move an empty position
      if (sourceId === -1) return

      // copy onto empty area of container
      if (destId === -1) {
         // if subs and is empty - setup
      }

      saveTeam(sourceIdx, destPlayer)
      saveSubs(destIdx, sourcePlayer)

   }
   const removeTeamToPanel = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(team, sourceId, panel, destId)
      const [sourcePlayer, destPlayer] = getPlayers(team[sourceIdx].player, panel[sourceIdx])

      // don't move an empty position
      if (sourceId === -1) return

      saveTeam(sourceIdx, destPlayer)
      savePanel(destIdx, sourcePlayer)
   }
   const removePanelToTeam = (sourceId, destId, position) => {
      const [sourceIdx, destIdx] = getIndexes(panel, sourceId, team, destId)
      const [sourcePlayer, destPlayer] = getPlayers(panel[sourceIdx], {})

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
   const removePanelToSubs = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(panel, sourceId, subs, destId)
      const [sourcePlayer, destPlayer] = getPlayers(panel[sourceIdx], subs[destIdx].player)

      savePanel(sourceIdx, destPlayer)
      saveSubs(destIdx, sourcePlayer)
   }
   const removeSubsToPanel = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(subs, sourceId, panel, destId)
      const [sourcePlayer, destPlayer] = getPlayers(subs[sourceIdx].player, panel[destIdx])

      saveSubs(sourceIdx, destPlayer)
      savePanel(destIdx, sourcePlayer)
   }
   const removeSubsToTeam = (sourceId, destId, position) => {
      const [sourceIdx, destIdx] = getIndexes(subs, sourceId, team, destId)
      const [sourcePlayer, destPlayer] = getPlayers(subs[sourceIdx].player, {})


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

   const swapTeamWithPanel = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(team, sourceId, panel, destId)
      const [sourcePlayer, destPlayer] = getPlayers(createSubsMember(team[sourceIdx].player)
         , createPanelMember(panel[destIdx]))
      saveTeam(sourceIdx, destPlayer)
      savePanel(destIdx, sourcePlayer)
   };
   const swapTeamWithSubs = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(team, sourceId, subs, destId)
      const [sourcePlayer, destPlayer] = getPlayers(team[sourceIdx].player, subs[destIdx].player)

      saveTeam(sourceIdx, destPlayer)
      saveSubs(destIdx, sourcePlayer)
   };
   const swapPanelWithTeam = (sourceId, destId) => {
      // both panel and team have existing players
      const [sourceIdx, destIdx] = getIndexes(panel, sourceId, team, destId)
      const [sourcePlayer, destPlayer] = getPlayers(panel[sourceIdx], team[destIdx].player)

      savePanel(sourceIdx, destPlayer)
      saveTeam(destIdx, sourcePlayer)
   }
   const swapPanelWithSubs = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(panel, sourceId, subs, destId)
      const [sourcePlayer, destPlayer] = getPlayers(panel[sourceIdx], subs[destIdx].player)

      savePanel(sourceIdx, destPlayer)
      saveSubs(destIdx, sourcePlayer)
   }
   const swapSubsWithPanel = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(subs, sourceId, panel, destId)
      const [sourcePlayer, destPlayer] = getPlayers(subs[sourceIdx].player, panel[destIdx])

      saveSubs(sourceIdx, destPlayer)
      savePanel(destIdx, sourcePlayer)
   }
   const swapSubsWithTeam = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(subs, sourceId, team, destId)
      const [sourcePlayer, destPlayer] = getPlayers(subs[sourceIdx].player, team[destIdx].player)

      saveSubs(sourceIdx, destPlayer)
      saveTeam(destIdx, sourcePlayer)
   }

   const moveSubsToSubs = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(subs, sourceId, subs, destId)

      setSubs(prevSubs => {
         // Create a new array without directly modifying the previous state
         const newSubs = deepCopy(prevSubs);
         // Swap players
         const updatedSubs = swapPlayers(newSubs, sourceIdx, destIdx)
         return updatedSubs;
      });
   }
   const movePanelToPanel = (sourceId, destId, position) => {
      const [sourceIdx, destIdx] = getIndexes(panel, sourceId, panel, destId)

      setPanel(prevPanel => {
         // Create a new array without directly modifying the previous state
         const newPanel = deepCopy(prevPanel);
         // Swap players
         const updatedPanel = swapPlayers(newPanel, sourceIdx, destIdx)
         return updatedPanel;
      });
   };
   const moveTeamToTeam = (sourceId, destId) => {
      const [sourceIdx, destIdx] = getIndexes(team, sourceId, team, destId)
      const [sourcePlayer, destPlayer] = getPlayers(team[sourceIdx].player, team[destIdx].player)

      // don't move an empty position
      if (sourceId === -1) return

      saveTeam(sourceIdx, destPlayer)
      saveTeam(destIdx, sourcePlayer)
   }

   const swapPlayers = (array, sourceIdx, destIdx) => {
      const newArray = deepCopy(array)
      const temp = newArray[sourceIdx]
      newArray[sourceIdx] = newArray[destIdx]
      newArray[destIdx] = temp;
      return newArray
   }
   const getPlayers = (sourceP, destP) => {
      const sourcePlayer = deepCopy(sourceP)
      const destPlayer = deepCopy(destP)
      return [sourcePlayer, destPlayer]
   }
   const getIndexes = (source, sId, dest, dId) => {
      let destIdx
      let sourceIdx

      if (source === panel)
         sourceIdx = source.findIndex(t => t.id === sId)
      else
         sourceIdx = source.findIndex(t => t.player.id === sId)

      if (dest === panel)
         destIdx = dest.findIndex(t => t.id === dId)
      else
         destIdx = dest.findIndex(t => t.player.id === dId)

      return [sourceIdx, destIdx]
   }

   const saveSubs = (idx, player) => {
      // setSubs(prevSubs => {
      //    const array = [...prevSubs]
      //    array[idx].player = {...player, id: -1}
      //    return array
      // })
      setSubs(prevSubs => {
         const array = [...prevSubs]
         array[idx].player = {...player, id: player.id}
         return array
      })
   }
   const savePanel = (idx, player) => {
      // setPanel(prevPanel => {
      //    const array = [...prevPanel]
      //    array[idx] = {...player, id: -1}
      //    return array
      // })
      setPanel(prevPanel => {
         const array = deepCopy([...prevPanel])
         array[idx] = deepCopy({...player, id: player.id})
         return array
      })
   }
   const saveTeam = (idx, player) => {
      // setTeam(prevTeam => {
      //    const array = [...prevTeam]
      //    array[idx].player = {...player, id: -1}
      //    return array
      // })
      setTeam(prevTeam => {
         const array = [...prevTeam]
         array[idx].player = {...player, id: player.id}
         return array
      })

   }

   const onDrop = (box, destId, item, event, position, container) => {
      if (event) { // if drop on box is active - disable drop on container
         event.preventDefault();
         event.stopPropagation(); // stop the event from propagating up the component tree
      }
      const sourceId = item.player.id;
      const source = findArrayByName(item.container);
      const dest = findArrayByName(container);

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
         if (destIsPanel && destId === -1) removeTeamToPanel(sourceId, destId, position);
         if (destIsPanel && destId >= 0) swapTeamWithPanel(sourceId, destId, position);
         if (destIsSubs && destId === -1) removeTeamToSubs(sourceId, destId, position);
         if (destIsSubs && destId >= 0) swapTeamWithSubs(sourceId, destId, position);
         if (destIsTeam) moveTeamToTeam(sourceId, destId, position);
      } else if (sourceIsPanel) {
         if (destIsTeam && destId === -1) removePanelToTeam(sourceId, destId, position);
         if (destIsTeam && destId >= 0) swapPanelWithTeam(sourceId, destId, position);
         if (destIsSubs && destId === -1) removePanelToSubs(sourceId, destId, position);
         if (destIsSubs && destId >= 0) swapPanelWithSubs(sourceId, destId, position);
         if (destIsPanel) movePanelToPanel(sourceId, destId, position);
      } else if (sourceIsSubs) {
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

   const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

   return (
      <div key={v4()} className="App">
         <TeamsheetContainer onDrop={onDrop} onDropContainer={onDropContainer}
                             save={save} handleCancel={cancel}/>
      </div>
   );
}
export default TeamsheetDnd;
