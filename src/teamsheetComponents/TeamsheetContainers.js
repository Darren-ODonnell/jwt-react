import { Button } from "@mui/material";
import { Container } from 'react-bootstrap';
import { useDrop } from "react-dnd";
import { useContext } from "react";

import { TeamsheetContext } from '../context/TeamsheetContext';
import Box from "./Box";
import 'bootstrap/dist/css/bootstrap.min.css';
import './teamsheetContainers.scss'


const boxWidth = 150
const boxHeight = 55
const teamWidth = 640
const boxWidthPercent = boxWidth / teamWidth
const gapWidth4 = ( teamWidth - boxWidth * 3 ) / 4
const gapWidth3 = ( teamWidth - boxWidth * 2 ) / 3
const gapWidthPercent4 = gapWidth4 / teamWidth
const gapWidthPercent3 = gapWidth3 / teamWidth

export const findId = ( id, array ) => {
   return array.findIndex( p => p.id === id )
}

const TeamsheetContainer = ( { onDrop, onDropContainer, save, handleCancel } ) => {
   const { team, panel, subs } = useContext( TeamsheetContext );

   return (
      <Container className="teamsheet-container container-common mx-auto" style={{height: '800px'}}>
         <PanelContainer onDrop={onDrop} onDropContainer={onDropContainer}/>
         <TeamContainer onDrop={onDrop}/>
         <SubsContainer onDrop={onDrop} onDropContainer={onDropContainer}/>
         <ActionContainer team={team} subs={subs} handleCancel={handleCancel} save={save}/>
      </Container>
   )
}
export default TeamsheetContainer;

const PanelContainer = ( { onDrop, onDropContainer } ) => {
   const { team, panel, subs } = useContext( TeamsheetContext );
   const container = "panel"
   let nextRow = 0
   let index = 0;
   let id

   const handleDragOver = ( event ) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.setData( "boxId", id );
      event.dataTransfer.setData( "boxIndex", index );
      event.dataTransfer.setData( "boxType", "box" );
   };
   const [ , drop ] = useDrop( () => ( {
      accept: "ITEM",
      drop: ( item, monitor ) => {
         const droppedBoxId = item.id;
         if (!monitor.didDrop()) {
            // Call the onDropContainer function with the dropped box information
            onDropContainer(droppedBoxId, item.index, "box", container);
         }
      },
   } ) );

   return (
      <>
         <Container className="panel-heading">Panel</Container>
         <Container className="panel-container" onDragOver={ handleDragOver } ref={ drop }>
            { panel.map( ( member, index ) => {
               const top = nextRow;
               nextRow += 60; // Increment nextRow by 60 for the next iteration
               return (
                  <div key={member.id}>
                     <Box
                        // key    = { index }
                        index={index}
                        id={member.id}
                        player={member}
                        position={index}
                        width={150}
                        height={50}
                        x={0}
                        y={top}
                        onDrop={onDrop}
                        style={{marginLeft: "5px"}}
                        container="panel"
                     />
                  </div>
               )
            } ) }
         </Container>
      </>

   );
};

const TeamContainer = ( { onDrop } ) => {
   const { team, panel, subs } = useContext( TeamsheetContext );
   let index = 0

   const keeper = {
      boxY: 0,
      middle: {
         key: index,
         position: index + 1,
         positionName: "Keeper",
         id: team[ index ].player.id,
         player: team[ index++ ].player,

      }
   }

   const fullBacks = {
      boxY: boxHeight * 2,
      left: {
         key: index,
         position: index + 1,
         positionName: "Left Back",
         id: team[ index ].player.id,
         player: team[ index++ ].player,
      },
      middle: {
         key: index,
         position: index + 1,
         positionName: "Full Back",
         id: team[ index ].player.id,
         player: team[ index++ ].player,
      },
      right: {
         key: index,
         position: index + 1,
         positionName: "Right Back",
         id: team[ index ].player.id,
         player: team[ index++ ].player,
      },
   }

   const halfBacks = {
      boxY: boxHeight * 4,
      left: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Left Half Back",
         player: team[ index++ ].player,
      },
      middle: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Centre Back",
         player: team[ index++ ].player,
      },
      right: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Right Half Back",
         player: team[ index++ ].player,
      },
   }

   const midfielders = {
      boxY: boxHeight * 6,
      left: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Left Midfield",
         player: team[ index++ ].player,
      },
      right: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Right Midfield",
         player: team[ index++ ].player,
      },
   }

   const halfForwards = {
      boxY: boxHeight * 8,
      left: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Left Half Forward",
         player: team[ index++ ].player,
      },
      middle: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Centre Forward",
         player: team[ index++ ].player,
      },
      right: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Right Half Forward",
         player: team[ index++ ].player,
      },
   }

   const fullForwards = {
      boxY: boxHeight * 10,
      left: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Left Full Forward",
         player: team[ index++ ].player,
      },
      middle: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Full Forward",
         player: team[ index++ ].player,
      },
      right: {
         key: index,
         id: team[ index ].player.id,
         position: index + 1,
         positionName: "Right Full Forward",
         player: team[ index++ ].player,
      },
   }

   const ThreeAcross = ( { boxY, left, middle, right } ) => {
      const Left = () => {
         const boxX = teamWidth * gapWidthPercent4
         return (
            <div key={left.player.id}>
               <Box
                  key={left.index}
                  index={left.index}
                  id={left.player.id}
                  player={left.player}
                  position={left.position}
                  width={boxWidth}
                  height={boxHeight}
                  source={team}
                  dest1={panel}
                  dest2={subs}
                  x={boxX}
                  y={boxY}
                  onDrop={onDrop}
                  style={{margin: "0px", fontWeight: "bold"}}
                  container="team"
               />
            </div>
         )
      }
      const Middle = () => {
         const boxX = teamWidth * ( gapWidthPercent4 * 2 + boxWidthPercent )
         return (
            <div key={middle.player.id}>
               <Box
                  key={middle.index}
                  index={middle.index}
                  id={middle.player.id}
                  player={middle.player}
                  position={middle.position}
                  width={boxWidth}
                  height={boxHeight}
                  source={team}
                  dest1={panel}
                  dest2={subs}
                  x={boxX}
                  y={boxY}
                  onDrop={onDrop}
                  style={{margin: "0px", fontWeight: "bold"}}
                  container="team"
               />
            </div>
         )
      }
      const Right = () => {
         const boxX = teamWidth * ( gapWidthPercent4 * 3 + boxWidthPercent * 2 )
         return (
            <div key={right.player.id}>
               <Box
                  key={right.index}
                  index={right.index}
                  id={right.player.id}
                  player={right.player}
                  position={right.position}
                  width={boxWidth}
                  height={boxHeight}
                  source={team}
                  dest1={panel}
                  dest2={subs}
                  x={boxX}
                  y={boxY}
                  onDrop={onDrop}
                  style={{margin: "0px", fontWeight: "bold"}}
                  container="team"
               />
            </div>
         )
      }

      return (
         <>
            <Left/>
            <Middle/>
            <Right/>
         </>
      )
   }
   const TwoAcross = ( { boxY, left, middle, right } ) => {
      const Left = () => {
         const boxX = teamWidth * gapWidthPercent3
         return (
            <div key={left.player.id}>
               <Box
                  key={index}
                  index={index}
                  id={left.player.id}
                  player={left.player}
                  position={left.position}
                  width={boxWidth}
                  height={boxHeight}
                  x={boxX}
                  y={boxY}
                  onDrop={onDrop}
                  style={{margin: "0px", fontWeight: "bold"}}
                  container="team"
               />
            </div>
         )
      }

      const Right = () => {
         const boxX = teamWidth * ( gapWidthPercent3 * 2 + boxWidthPercent )
         return (
            <div key={right.player.id}>
               <Box
                  key={index}
                  index={index}
                  id={right.player.id}
                  player={right.player}
                  position={right.position}
                  width={boxWidth}
                  height={boxHeight}
                  x={boxX}
                  y={boxY}
                  onDrop={onDrop}
                  style={{margin: "0px", fontWeight: "bold"}}
                  container="team"
               />
            </div>
         )
      }

      return (
         <>
            <Left/>
            <Right/>
         </>
      )
   }
   const OneAcross = ( { boxY, left, middle, right } ) => {
      const Middle = () => {
         const boxX = teamWidth * ( gapWidthPercent4 * 2 + boxWidthPercent )
         return (
            <div key={middle.player.id}>
               <Box
                  key={index}
                  index={index}
                  id={middle.player.id}
                  player={middle.player}
                  position={middle.position}
                  width={boxWidth}
                  height={boxHeight}
                  x={boxX}
                  y={boxY}
                  onDrop={onDrop}
                  style={{margin: "0px", fontWeight: "bold"}}
                  container="team"
               />
            </div>
         )
      }
      return <Middle/>
   }
   return (

      <Container className="team-container">
         <OneAcross   {...keeper}/>
         <ThreeAcross {...fullBacks}/>
         <ThreeAcross {...halfBacks}/>
         <TwoAcross   {...midfielders}/>
         <ThreeAcross {...halfForwards}/>
         <ThreeAcross {...fullForwards}/>
      </Container>

   )
}
const SubsContainer = ( { onDrop, onDropContainer } ) => {
   const { team, panel, subs } = useContext( TeamsheetContext );
   const container = "subs"
   let nextRow = 0
   let index = 0;
   let id

   const handleDragOver = ( event ) => {
      event.preventDefault();
      event.stopPropagation();
      event.dataTransfer.setData( "boxId", id );
      event.dataTransfer.setData( "boxIndex", index );
      event.dataTransfer.setData( "boxType", "box" );
   };
   const [ , drop ] = useDrop( () => ( {
      accept: "ITEM",
      drop: ( item, monitor ) => {
         const droppedBoxId = item.id;
         const {canDrop, isOver} = monitor.getItem();
         // Only call the onDropContainer function if the player is not dropped on any Box component
         if (!monitor.didDrop()) {
            onDropContainer(droppedBoxId, item.index, "box", container);
         }

      },
   } ) );

   return (
      <>
         <Container className="subs-heading">
            <div style={ { color: 'white' } }>Substitutes</div>
         </Container>
         <Container className="subs-container" onDragOver={ handleDragOver } ref={ drop }>
            { subs.map( ( sub, index ) => {
               const top = nextRow;
               nextRow += 60; // Increment nextRow by 60 for the next iteration
               return (
                  <div key={sub.player.id}>
                     <Box
                        key={index}
                        index={index}
                        id={sub.player.id}
                        player={sub.player}
                        position={index}
                        width={150}
                        height={50}
                        x={0}
                        y={top}
                        onDrop={onDrop}
                        style={{marginLeft: "13px"}}
                        container="subs"
                     />
                  </div>
               );
            } ) }
         </Container>
      </>
   );
};
const ActionContainer = ( { team, subs, save, handleCancel } ) => {

   return (
      <>
         <Container className="action-container">
            <div className="btn-group d-flex" role="group">
               <Button className="btn but-secondary " onClick={ handleCancel }>Cancel</Button>
               <Button type="submit" className="btn but-primary " onClick={ save }>Save</Button>
            </div>
         </Container>
      </>
   );
};





