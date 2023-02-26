import React, {useMemo} from "react";
import {COMPETITION_URLS} from "../entities/competitions";
import {PLAYER_URLS} from "../entities/players";
import {CLUB_URLS} from "../entities/clubs";
import {POSITION_URLS} from "../entities/positions";
import {PITCH_GRID_URLS} from "../entities/pitchgrids";
import {STAT_NAME_URLS} from "../entities/statnames";
import {useAxios2} from "../api/ApiService";

const DropdownData = () => {
    const competition = useAxios2(COMPETITION_URLS.list);
    const player = useAxios2(PLAYER_URLS.list);
    const club = useAxios2(CLUB_URLS.list);
    const position = useAxios2(POSITION_URLS.list);
    const pitchgrid = useAxios2(PITCH_GRID_URLS.list);
    const statname = useAxios2(STAT_NAME_URLS.list);

    const pitchgrids = pitchgrid ? pitchgrid.map(pg => {
        return pg.id
    }) : []
    const competitions = competition ? competition.map(comp => {
        return comp.name
    }) : []
    const players = player ? player.map(player => {
        return player.lastname + ", " + player.firstname
    }) : []
    const clubs = club ? club.map(club => {
        return club.name
    }) : []
    const positions = position ? position.map(posn => {
        return posn.name
    }) : []
    const positionNumbers = Array.from({length: 30}, (_, index) => index + 1);
    const statnames = statname ? statname.map(stat => {
        return stat.name
    }) : []
    const rounds = Array.from({length: 10}, (_, index) => index + 1);


    const dropDownData = useMemo(() => {
        return {
            competitions,
            players,
            clubs,
            positions,
            pitchgrids,
            statnames,
            positionNumbers,
            rounds,
        };
    }, [competitions, players, clubs, positions, pitchgrids, statnames, positionNumbers, rounds]);

    return dropDownData;
};

export default DropdownData;