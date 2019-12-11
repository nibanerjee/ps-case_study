import React from 'react';
import  {connect} from 'react-redux';
import {fetchGender,fetchSpecies} from '../actions';
import './Filter.scss';

const Filter = (props) => {
    
    const {gender,species,fetchSpecies,fetchGender} = props;
    
    const updateSpeciesSelection = (e) => {
        let filterdSpecies = Object.assign([],species);
        let foundspecies = filterdSpecies.find((data) => data.value === e.target.id);
        foundspecies.checked = !foundspecies.checked;
        fetchSpecies(filterdSpecies);
    }

    const updateGenderSelection = (e) => {
        let filterdGender = Object.assign([],gender);
        let foundgender = filterdGender.find((data) => data.value === e.target.id);
        foundgender.checked = !foundgender.checked;
        fetchGender(filterdGender);
    }

    return (
        <div className="filter-component">
            <h2>Filter</h2>
            <div className="species block">
                <h3>Species</h3>
                <ul>
                {species.map(element => 
                    <li key={element.value}>
                        <label className="list-element" htmlFor={element.value}>
                            <input id={element.value} type="checkbox" checked={element.checked} onChange={updateSpeciesSelection}/>
                            {element.value}
                        </label>
                    </li>
                )}
                </ul>
            </div>
            <div className="gender block">
                <h3>Gender</h3>
                <ul>
                {gender.map(element => 
                    <li key={element.value}>
                        <label className="list-element" htmlFor={element.value}>
                            <input type="checkbox" id={element.value} checked={element.checked} onChange={updateGenderSelection}/>
                            {element.value}
                        </label>
                    </li>
                )}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        characters : state.characters,
        gender : state.gender,
        species : state.species
    }
}

export default connect(mapStateToProps,{fetchGender,fetchSpecies})(Filter);
