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


    console.log("Panel-Container: ", JSON.stringify(panel))
    return (
        <>
        <Container className="panel-heading">Panel</Container>

            <Container className="panel-container" onDragOver={handleDragOver} ref={drop}>

                {panel.map((member, index) => {
                    const top = nextRow;
                    nextRow += 60; // Increment nextRow by 60 for the next iteration
                    console.log("Index: " + index + ", id: " + member.id + ", name: " + member.name)
                    return (
                        <Box
                            index={index}
                            key={index}
                            id={member.id}
                        player  = {member}
                        width   = {150}
                        height  = {50}
                        x       = {0}
                        y       = {top}
                        onDrop  = {onDrop}
                        style   = {{marginLeft : "5px"}}
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
            key: 1,
            name: team[index].name,
            position: index + 1,
            positionName: "Keeper",
            id: team[index].id,
        }
    }
    index+=1
    const fullBacks = {
        boxY : boxHeight*2,
        left: {
            key: 2,
            name: team[ index ].name,
            position: index+1,
            positionName: "Left Back",
            id: team[ index ].id,
        },
        middle: {
            key: 3,
            name: team[ index+1 ].name,
            position: index+2,
            positionName: "Full Back",
            id: team[ index+1 ].id,
        },
        right: {
            key: 4,
            name: team[ index+2 ].name,
            position: index+3,
            positionName: "Right Back",
            id: team[ index+2 ].id,
        },
    }
    index +=3
    const halfBacks = {
        boxY : boxHeight*4,
        left              : {
            key: 5,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position: index+1,
            positionName  : "Left Half Back",
        },
        middle            : {
            key: 6,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position: index+2,
            positionName  : "Centre Back",
        },
        right             : {
            key: 7,
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            position: index+3,
            positionName  : "Right Half Back",
        },
    }
    index+=3
    const midfielders = {
        boxY : boxHeight*6,
        left: {
            key: 8,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position      : index+1,
            positionName  : "Left Midfield",
        },
        right: {
            key: 9,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position      : index+2,
            positionName  : "Right Midfield",

        },
    }
    index+=2
    const halfForwards = {
        boxY : boxHeight*8,
        left              : {
            key: 10,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position: index+1,
            positionName  : "Left Half Forward",
        },
        middle            : {
            key: 11,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position: index+2,
            positionName  : "Centre Forward",
        },
        right             : {
            key: 12,
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            position: index+3,
            positionName  : "Right Half Forward",
        },
    }
    index+=3
    const fullForwards = {
        boxY : boxHeight*10,
        left              : {
            key: 13,
            id            : team[ index ].id,
            name          : team[ index ].name,
            position: index+1,
            positionName  : "Left Full Forward",
        },
        middle            : {
            key: 14,
            id            : team[ index+1 ].id,
            name          : team[ index+1 ].name,
            position: index+2,
            positionName  : "Full Forward",
        },
        right             : {
            key: 15,
            id            : team[ index+2 ].id,
            name          : team[ index+2 ].name,
            position: index+3,
            positionName  : "Right Full Forward",
        },
    }

    const ThreeAcross   = ({boxY, left, middle, right}) => {
        const Left = () => {
            const boxX = teamWidth * gapWidthPercent4
            return  (
                <Box
                    x               = {boxX}
                    y               = {boxY}
                    width           = {boxWidth}
                    height          = {boxHeight}
                    id              = {left.id}
                    player          = {left}
                    onDrop          = {onDrop}
                    style           = {{margin : "0px", fontWeight: "bold"}}
                />
            )
        }
        const Middle = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 2 + boxWidthPercent)
            return  (
                <Box
                    x={boxX}
                    y={boxY}
                    width={boxWidth}
                    height={boxHeight}
                    id={middle.id}
                    player={middle}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                />
            )
        }
        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent4 * 3 + boxWidthPercent * 2)
            return  (
                <Box
                    x={boxX}
                    y={boxY}
                    width={boxWidth}
                    height={boxHeight}
                    id={right.id}
                    player={right}
                    onDrop={onDrop}
                    style = {{margin: "0px", fontWeight: "bold"}}
                />
            )
        }
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
                    x      = {boxX}
                    y      = {boxY}
                    width  = {boxWidth}
                    height = {boxHeight}
                    id     = {left.id}
                    player = {left}
                    onDrop = {onDrop}
                    style  = {{margin: "0px", fontWeight: "bold"}}
                />
            )
        }

        const Right = () => {
            const boxX = teamWidth * (gapWidthPercent3 * 2 + boxWidthPercent )
            return  (
                <Box
                    x      = {boxX}
                    y      = {boxY}
                    width  = {boxWidth}
                    height = {boxHeight}
                    id     = {right.id}
                    player = {right}
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
                    x      = {boxX}
                    y      = {boxY}
                    width  = {boxWidth}
                    height = {boxHeight}
                    id     = {middle.id}
                    player = {middle}
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
                    {subs.map((member) => {
                        const top = nextRow;
                        nextRow += 60; // Increment nextRow by 60 for the next iteration
                        return (
                            <Box
                                index    = {index}
                                key      = {member.id}
                                id       = {member.id}
                                x        = {0}
                                y        = {top}
                                width    = {150}
                                height   = {50}
                                player   = {member}
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

