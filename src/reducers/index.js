import { combineReducers } from 'redux';

const characterReducer = (characters = [],action) => {
    if(action.type === 'FETCH_CHARACTERS'){
        return action.payload;
    }
    return characters;
}


const fetchGenderReducer = (gender = [],action) => {
    if(action.type === 'FETCH_GENDER'){
        return action.payload;
    }
    return gender;
}

const fetchSpeciesReducer = (species = [],action) => {
    if(action.type === 'FETCH_SPECIES'){
        return action.payload;
    }
    return species;
}

export default combineReducers({
    characters : characterReducer,
    gender : fetchGenderReducer,
    species : fetchSpeciesReducer
});