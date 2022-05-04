import React from 'react';
import './ClubListItem.css';

const ClubListItem = ( {club}) => {

     function onRemovePressed() {
         return <div>onRemovePressed</div>

     }

     function onCompletedPressed() {
         return <div>onCompletedPressed</div>

     }



    return (
    <div className="club-item-container">
        <h3>{ club.name }</h3>
        <table>
            <tbody>
                <tr id="row0">
                    <td id={club.id}>{club.id}</td>
                    <td >{club.name}</td>
                    <td >{club.contactName}</td>
                    <td >{club.contactEmail}</td>
                    <td >{club.contactPhone}</td>
                    <td >{club.pitches}</td>
                    <td >{club.colours}</td>
                </tr>
            </tbody>
        </table>
        <div className="buttons-container">
            { club.isCompleted ? null :
                <button
                    onClick={ () => onCompletedPressed( club.text ) }
                    className="completed-button">Mark As Completed</button>
            }

            <button
                onClick={ () => onRemovePressed( club.text ) }
                className="remove-button">Remove
            </button>
        </div>
    </div>
)};

export default ClubListItem;