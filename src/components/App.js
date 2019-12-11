import React,{useEffect} from 'react';
import './App.scss';
import SelectedFilter from './SelectedFilter';
import Filter from './Filter';
import  {connect} from 'react-redux';
import {fetchCharacters,fetchGender,fetchSpecies} from '../actions';

const App = (props) => {
    const {characters,fetchCharacters,fetchGender,fetchSpecies} = props;
    useEffect(() => {
        fetchCharacters();
    }, [fetchCharacters]);
    if(!characters.length){
        return <div>Loading characters ...</div>
    }
    const species = characters.map((character) => character.species);
    const uniqueSpecies = [...new Set(species)];
    const gender = characters.map((character) => character.gender);
    const uniqueGender = [...new Set(gender)];
    let updatedSpecies = [];
    let updatedGender = [];
    for(let i=0; i< uniqueSpecies.length; i++){
        updatedSpecies.push({
            'checked' : true,
            'value' : uniqueSpecies[i]
        })
    }
    for(let i=0; i< uniqueGender.length; i++){
        updatedGender.push({
            'checked' : true,
            'value' : uniqueGender[i]
        })
    }
    fetchSpecies(updatedSpecies);
    fetchGender(updatedGender);
    return (
        <div className="app-component">
            <Filter />
            <SelectedFilter />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        characters : state.characters,
    }
}

export default connect(mapStateToProps,{fetchCharacters,fetchGender,fetchSpecies})(App);