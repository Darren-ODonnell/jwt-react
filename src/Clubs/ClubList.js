import React from 'react';
import ClubListItem from "./ClubListItem";
import NewClubForm from "./NewClubForm";
import './ClubList.css';

import {getClubs} from '../services/ClubService';

const ClubList = () =>  {
    const { data, error, isLoaded } = getClubs();

    if (error !== null) {   return <div>Error: {error.message}</div>;   }

    (!isLoaded &&  <>Loading...</> );

    return (
        <div>
              <div className="list-wrapper">
                  <NewClubForm/>
                  { data.map(  club => <ClubListItem key={ club.id } club={ club }/> ) }
              </div>
             }
        </div>
    );
};
export default ClubList;

