import service from '../api/service';

export const fetchCharacters = () => {
    return async (dispatch) => {
        const response = await service.get('/');
        dispatch({
            type : 'FETCH_CHARACTERS',
            payload : response.data.results
        });
    }
}

export const fetchSpecies = (filteredSpecies) => {
    return {
        type : 'FETCH_SPECIES',
        payload : filteredSpecies
    };
}

export const fetchGender = (filteredGender) => {
    return {
        type : 'FETCH_GENDER',
        payload : filteredGender
    };
}

