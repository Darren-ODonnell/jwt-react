import React, {useRef, useEffect, useContext} from 'react';
import {useDrag, useDrop} from "react-dnd";
import styled from "styled-components";

import {TeamsheetContext} from '../context/TeamsheetContext';


const BoxWrapper = styled.div`
  position        : absolute;
  width           : ${(props) => props.width}px;
  height          : ${(props) => props.height}px;
  top             : ${(props) => props.y}px;
  left            : ${(props) => props.x}px;
  border-radius   : 10px;
  border          : 5px solid lightblue;
  display         : flex;
  font-size       : 20px;
  cursor          : move;
  draggable       : true;
  background-color: ${(props) => (props.isOver ? "lightblue": "lightgray")};
  margin          : 0 auto;
  justify-content : center;
  align-items     : center;
  opacity         : ${(props) => (props.isDragging ? 0.5 : 1)};
`;

const Box = ({ index, id, player, width, height, x, y, onDrop, style }) => {
    const {team, setTeam, panel, setPanel, subs, setSubs} = useContext(TeamsheetContext);
    const ref = useRef(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "ITEM",
        item: () => {
            // console.log("HandleDragBegin: " + id);
            return { id, player, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));


    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: "ITEM",
        drop: (item, monitor) => {
            const delta = monitor.getDifferenceFromInitialOffset();
            const left = Math.round(x + delta.x);
            const top = Math.round(y + delta.y);
            const newBox = {left, top, id};

            // const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
            // const draggedItemIndex = Math.floor(initialSourceClientOffset.y / 60);

            onDrop(newBox, id, item);
            console.log("Box-Team/Panel: ", team[0].player.id, panel[0].id)

        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));

    useEffect(() => {
        const node = ref.current;
        drag(drop(node));
    }, [drag, drop]);

    const styles = {
        position       : "absolute",
        width          : `${width}px`,
        height         : `${height}px`,
        top            : `${y}px`,
        left           : `${x}px`,
        backgroundColor: "lightblue",
        borderRadius   : "10px",
        border: "5px solid blue",
        // display: "flex",
        fontSize: "16px",
        // textAlign: 'center',
        cursor: "move",
        justifyContent: "center",
        opacity: isDragging ? 0.5 : 1,
        marginLeft: '5px',
        ...style,
    };

    function handleClick(id) {

    }

    // console.log("BOX: " + player.firstname + " " + player.lastname)
    return (
        <div className="box">
            <BoxWrapper
                ref={ref}
                style={styles}
                isDragging={isDragging}
                isOver={isOver}
                onClick={() => handleClick(id)}
            >
                {player.firstname + " " + player.lastname}
            </BoxWrapper>
        </div>
    );
};

export default Box;

