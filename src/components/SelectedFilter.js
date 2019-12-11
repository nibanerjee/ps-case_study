import React,{useState,useEffect} from 'react';
import  {connect} from 'react-redux';
import {fetchGender,fetchSpecies} from '../actions';
import './SelectedFilter.scss';

const SelectedFilter = (props) => {
    
    const {characters,gender,species,fetchGender,fetchSpecies} = props; 
    const [search, setSearch] = useState('');
    const [sort,setSortType] = useState('asc');
    const [filterdByNameCharacters,setFilteredByNameCharacters] = useState(characters);
    const descSortedCharacters = Object.assign([],characters);
    descSortedCharacters.sort((a,b) => b.id - a.id);

    useEffect(() => {
       filterByGenderAndSpecies(gender,species);
    }, [gender,species,search]);


    const filterByGenderAndSpecies = (gender,species) => {
       let filteredCharacters = (sort === 'asc') ? characters : descSortedCharacters;
       let filterBySearchCriteria = filteredCharacters.filter((character)=>character.name.indexOf(search) > -1);
       let filteredGender = gender.filter((data) => data.checked);
       let genderArray = filteredGender.map((data)=> data.value);
       let filteredSpecies = species.filter((data) => data.checked);
       let speciesArray = filteredSpecies.map((data)=> data.value);
       let filteredByGenderCharacters = filterBySearchCriteria.filter((data)=> genderArray.indexOf(data.gender) > -1 );
       let filteredBySpeciesCharacters = filteredByGenderCharacters.filter((data)=> speciesArray.indexOf(data.species) > -1 );
       setFilteredByNameCharacters(filteredBySpeciesCharacters);
    }

    const setSearchCriteria = (e) => {
        if(e.target.value !== '') setSearch(e.target.value);
        else setSearch('');
    }

    const sortCharactersByID = (e) => {
        let unsortedData = Object.assign([],filterdByNameCharacters);
        if(e.target.value === 'asc'){
            unsortedData = unsortedData.sort((a,b) => a.id - b.id);
        } else {
            unsortedData = unsortedData.sort((a,b) => b.id - a.id);
        }
        setSortType(e.target.value);
        setFilteredByNameCharacters(unsortedData);
    }

    const removeGenderFilter = (val) => {
        let filterdGender = Object.assign([],gender);
        let foundgender = filterdGender.find((data) => data.value === val);
        foundgender.checked = !foundgender.checked;
        fetchGender(filterdGender);
    }

    const removeSpeciesFilter = (val) => {
        let filterdSpecies = Object.assign([],species);
        let foundspecies = filterdSpecies.find((data) => data.value === val);
        foundspecies.checked = !foundspecies.checked;
        fetchSpecies(filterdSpecies);
    }

    return (
        <div className="selected-filter-component">
            <h2>Selected Filters</h2>
            <div className="selected-filters-container">
            {gender.map(gender => {
                return (gender.checked ? (
                    <button key={gender.value} onClick={() => removeGenderFilter(gender.value)}>
                        <span>{gender.value}</span>
                        <span>X</span>
                    </button>
                ) : null)
            })}
            {species.map(species => {
                return (species.checked ? (
                    <button key={species.value} onClick={() =>removeSpeciesFilter(species.value)}>
                        <span>{species.value}</span>
                        <span>X</span>
                    </button>
                ) : null)
            })}
            </div>
            <div className="search-and-sort">
                <div className="search-box">
                    <div className="search-header">Search by Name</div>
                    <div>
                        <input type="search" placeholder="search by name" onChange={setSearchCriteria}/>
                    </div>
                </div>
                <div className="sort-functionality">
                    <select>
                        <option value="sortByID">Sort by ID</option>
                    </select>
                    <select onChange={sortCharactersByID}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            <div className="characters-container">
            {filterdByNameCharacters.map(character =>
                <div key={character.id} className="character-card">
                    <img src={character.image} alt={character.name}/>
                    <div className="overlay">
                        <div>{character.name}</div>
                        <div><span>id : {character.id} - created {new Date().getFullYear() - Number(character.created.split('-')[0])} years ago</span></div>
                    </div>
                    <div className="character-details">
                        <div className="row">
                            <div className="heading">STATUS</div>
                            <div className="description">{character.status}</div>
                        </div>
                        <div className="row">
                            <div className="heading">SPECIES</div>
                            <div className="description">{character.species}</div>
                        </div>
                        <div className="row">
                            <div className="heading">GENDER</div>
                            <div className="description">{character.gender}</div>
                        </div>
                        <div className="row">
                            <div className="heading">ORIGIN</div>
                            <div className="description">{character.origin.name}</div>
                        </div>
                        <div className="row">
                            <div className="heading">LAST LOCATION</div>
                            <div className="description">{character.location.name}</div>
                        </div>
                    </div>
                </div>
            )}
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

export default connect(mapStateToProps,{fetchGender,fetchSpecies})(SelectedFilter);