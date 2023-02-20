import React, {useMemo} from "react";
import {COMPETITION_URLS} from "../entities/competitions";
import {PLAYER_URLS} from "../entities/players";
import {CLUB_URLS} from "../entities/clubs";
import {POSITION_URLS} from "../entities/positions";
import {PITCH_GRID_URLS} from "../entities/pitchgrids";
import {STAT_NAME_URLS} from "../entities/statnames";
import {useAxios2} from "../api/ApiService";

const DropdownData = () => {
    const competitions = useAxios2(COMPETITION_URLS.list);
    const players = useAxios2(PLAYER_URLS.list);
    const clubs = useAxios2(CLUB_URLS.list);
    const positions = useAxios2(POSITION_URLS.list);
    const pitchgrids = useAxios2(PITCH_GRID_URLS.list);
    const statnames = useAxios2(STAT_NAME_URLS.list);

    const dropDownData = useMemo(() => {
        return {
            competitions,
            players,
            clubs,
            positions,
            pitchgrids,
            statnames
        };
    }, [competitions, players, clubs, positions, pitchgrids, statnames]);

    return dropDownData;
};

export default DropdownData;