import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import Box from "./Box";
import { Container } from 'react-bootstrap';
import { useDrop } from "react-dnd";
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
import './teamsheetContainers.scss'
// import {showList} from "./TeamsheetDnd";

const boxWidth         = 150

const boxHeight        = 55
const teamWidth        = 640
const boxWidthPercent  = boxWidth / teamWidth

const gapWidth4        = (teamWidth - boxWidth * 3) / 4
const gapWidth3        = (teamWidth - boxWidth * 2) / 3

const gapWidthPercent4 = gapWidth4 / teamWidth
const gapWidthPercent3 = gapWidth3 / teamWidth

export const findId = (id, array) => {
    return array.findIndex(p => p.id === id)
}



const TeamsheetContainer = ({panel, team, subs, onDrop,onDropContainer, handleSave, handleCancel}) => {

    // console.log("Team-Container-Team: "+JSON.stringify(team))


    return (
        <Container className="teamsheet-container container-common mx-auto" style={{height: '800px'}}>
            <PanelContainer panel={panel} onDrop={onDrop} onDropContainer={onDropContainer}/>
            <TeamContainer team={team} onDrop={onDrop}/>
            <SubsContainer    subs ={subs}  onDrop={onDrop} onDropContainer={onDropContainer}/>
            <ActionContainer handleCancel={handleCancel} handleSave={handleSave}/>
        </Container>
    )
}
export default TeamsheetContainer;

const PanelContainer = ({ panel, onDrop,onDropContainer }) => {
    const container = "panel"
    let nextRow = 0
    let index = 0;
    let id

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.setData("boxId", id);
        event.dataTransfer.setData("boxIndex", index);
        event.dataTransfer.setData("boxType", "box");
    };
    const [, drop] = useDrop(() => ({
        accept: "ITEM",
        drop: (item, monitor) => {
            const droppedBoxId = item.id;
            console.log(`Dropped box id: ${droppedBoxId}`);

            // Call the onDropContainer function with the dropped box information
            onDropContainer(droppedBoxId, item.index, "box", container);
        },
    }));

    return (
        <>
            <Container className="panel-heading">Panel</Container>
            <Container className="panel-container" onDragOver={handleDragOver} ref={drop}>
                {panel.map((member, index) => {
                    const top = nextRow;
                    nextRow += 60; // Increment nextRow by 60 for the next iteration
                    return (
                        <Box
                            key    = {index}
                            index  = {index}
                            id     = {member.id}
                            player = {member}
                            width  = {150}
                            height = {50}
                            x      = {0}
                            y      = {top}
                            onDrop = {onDrop}
                            style  = {{marginLeft: "5px"}}
                        />
                    )
                })}
            </Container>
        </>
    );
};

const TeamContainer   = ({ team, onDrop}) => {
    console.log("Team-Container: ", JSON.stringify(team))
    let index = 0
    const keeper = {
        boxY: 0,
        middle: {
            key: index,
            position: index + 1,
            positionName: "Keeper",
            id: team[index].player.id,
            player: team[index++].player,
        }
    }

    const fullBacks = {
        boxY : boxHeight*2,
        left: {
            key: index,
            position: index+1,
            positionName: "Left Back",
            id: team[index].player.id,
            player: team[index++].player,
        },
        middle: {
            key: index,
            position: index + 1,
            positionName: "Full Back",
            id: team[index].player.id,
            player: team[index++].player,
        },
        right: {
            key: index,
            position: index + 1,
            positionName: "Right Back",
            id: team[index].player.id,
            player: team[index++].player,
        },
    }

    const halfBacks = {
        boxY : boxHeight*4,
        left              : {
            key: index,
            id: team[index].player.id,
            position: index + 1,
            positionName: "Left Half Back",
            player: team[index++].player,
        },
        middle            : {
            key: index,
            id: team[index].player.id,
            position: index + 1,
            positionName: "Centre Back",
            player: team[index++].player,
        },
        right             : {
            key: index,
            id: team[index ].player.id,
            position: index + 1,
            positionName: "Right Half Back",
            player: team[index++].player,
        },
    }

    const midfielders = {
        boxY : boxHeight*6,
        left: {
            key: index,
            id: team[index].player.id,
            position: index + 1,
            positionName: "Left Midfield",
            player: team[index++].player,
        },
        right: {
            key: index,
            id: team[index ].player.id,
            position: index + 1,
            positionName: "Right Midfield",
            player: team[index++].player,

        },
    }

    const halfForwards = {
        boxY : boxHeight*8,
        left              : {
            key: index,
            id: team[index].player.id,
            position: index + 1,
            positionName: "Left Half Forward",
            player: team[index++].player,
        },
        middle            : {
            key: index,
            id: team[index ].player.id,
            position: index + 1,
            positionName: "Centre Forward",
            player: team[index++].player,
        },
        right             : {
            key: index,
            id: team[index ].player.id,
            position: index + 1,
            positionName: "Right Half Forward",
            player: team[index++].player,
        },
    }

    const fullForwards = {
        boxY : boxHeight*10,
        left              : {
            key: index,
            id: team[index].player.id,
            position: index + 1,
            positionName: "Left Full Forward",
            player: team[index++].player,
        },
        middle            : {
            key: index,
            id: team[index ].player.id,
            position: index + 1,
            positionName: "Full Forward",
            player: team[index++].player,
        },
        right             : {
            key: index,
            id: team[index ].player.id,
            position: index + 1,
            positionName: "Right Full Forward",
            player: team[index++].player,
        },
    }

    const ThreeAcross   = ({boxY, left, middle, right}) => {
        const Left = () => {
            const boxX = teamWidth * gapWidthPercent4
            return  (
                <Box
                    key    = {left.index}
                    index  = {left.index}
                    id     = {left.player.id}
                    player = {left.player}
                    width  = {boxWidth}
                    height = {boxHeight}
                    x      = {boxX}
                    y      = {boxY}
                    onDrop = {onDrop}
                    style  = {{margin   : "0px", fontWeight: "bold"}}
                />
            )
        }
        const Middle = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 2 + boxWidthPercent)
            return  (
                <Box
                    key    = {middle.index}
                    index  = {middle.index}
                    id     = {middle.player.id}
                    player = {middle.player}
                    width  = {boxWidth}
                    height = {boxHeight}
                    x      = {boxX}
                    y      = {boxY}
                    onDrop = {onDrop}
                    style  = {{margin   : "0px", fontWeight: "bold"}}
                />
            )
        }
        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 3 + boxWidthPercent * 2)
            return  (
                <Box
                    key    = {right.index}
                    index  = {right.index}
                    id     = {right.player.id}
                    player = {right.player}
                    width  = {boxWidth}
                    height = {boxHeight}
                    x      = {boxX}
                    y      = {boxY}
                    onDrop = {onDrop}
                    style  = {{margin   : "0px", fontWeight: "bold"}}
                />
            )
        }
        console.log("TEAM-Container: ", JSON.stringify(team))
        return  (
            <>
                <Left />
                <Middle />
                <Right />
            </>
        )
    }
    const TwoAcross   = ({boxY, left, middle, right}) => {
        const Left = () => {
            const boxX = teamWidth * gapWidthPercent3
            return  (
                <Box
                    key    = {index}
                    index  = {index}
                    id     = {left.player.id}
                    player = {left.player}
                    width  = {boxWidth}
                    height = {boxHeight}
                    x      = {boxX}
                    y      = {boxY}
                    onDrop = {onDrop}
                    style  = {{margin: "0px", fontWeight: "bold"}}
                />
            )
        }

        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent3 * 2 + boxWidthPercent )
            return  (
                <Box
                    key    = {index}
                    index  = {index}
                    id     = {right.player.id}
                    player = {right.player}
                    width  = {boxWidth}
                    height = {boxHeight}
                    x      = {boxX}
                    y      = {boxY}
                    onDrop = {onDrop}
                    style  = {{margin : "0px", fontWeight : "bold"}}
                />
            )
        }

        return  (
            <>
                <Left />
                <Right />
            </>
        )
    }
    const OneAcross   = ({boxY, left, middle, right}) => {
        const Middle = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 2 + boxWidthPercent )
            return  (
                <Box
                    key    = {index}
                    index  = {index}
                    id     = {middle.player.id}
                    player = {middle.player}
                    width  = {boxWidth}
                    height = {boxHeight}
                    x      = {boxX}
                    y      = {boxY}
                    onDrop = {onDrop}
                    style  = {{margin     : "0px", fontWeight: "bold"}}
                />
            )
        }
        return  <Middle />
    }
    return (
        <Container className="team-container" >
            <OneAcross   {...keeper       }/>
            <ThreeAcross {...fullBacks    }/>
            <ThreeAcross {...halfBacks    }/>
            <TwoAcross   {...midfielders  }/>
            <ThreeAcross {...halfForwards }/>
            <ThreeAcross {...fullForwards }/>
        </Container>
    )
}
const SubsContainer  = ({ subs, onDrop, onDropContainer }) => {
    const container = "subs"
    let nextRow = 0
    let index = 0;
    let id
    console.log("Subs-Container: ", JSON.stringify(subs))


    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.setData("boxId", id);
        event.dataTransfer.setData("boxIndex", index);
        event.dataTransfer.setData("boxType", "box");
    };
    const [, drop] = useDrop(() => ({
        accept: "ITEM",
        drop: (item, monitor) => {
            const droppedBoxId = item.id;
            console.log(`Dropped box id: ${droppedBoxId}`);

            // Call the onDropContainer function with the dropped box information
            onDropContainer(droppedBoxId, item.index, "box", container);
        },
    }));

        return (
            <>
                <Container className="subs-heading"> <div style={{color:'white'}}>Substitutes</div> </Container>
                <Container className="subs-container" onDragOver={handleDragOver} ref={drop}>
                    {subs.map((member, index) => {
                        const top = nextRow;
                        nextRow += 60; // Increment nextRow by 60 for the next iteration
                        return (
                            <Box
                                key      = {index}
                                index    = {index}
                                id       = {member.player.id}
                                player   = {member.player}
                                width    = {150}
                                height   = {50}
                                x        = {0}
                                y        = {top}
                                onDrop   = {onDrop}
                                style    = {{marginLeft     : "13px"}}
                            />
                        );
                    })}
                </Container>
            </>
        );
    };
const ActionContainer = ({handleSave, handleCancel}) => {

    const cancel = () => {
        handleCancel()
    }

    return (
        <>
        <Container className="action-container">
            <div className="btn-group d-flex" role="group">
                <Button className="btn but-secondary " onClick={cancel}>Cancel</Button>
                <Button type="submit" className="btn but-primary " onClick={handleSave}>Save</Button>
            </div>
        </Container>
        </>
    );
};

