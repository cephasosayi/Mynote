import React, { useState, useEffect } from 'react' // using state to manage our notes
import AddButton from '../components/AddButton';
// import notes from '../assets/data'
import ListItem from '../components/ListItem';

const NotesListPage = () => {
    let [notes, setNotes ] = useState([]);

// getting our data using the Didmount but on functional components we use useEffect 
// we want it to fire on the first load 
    useEffect(() =>{
        // fire tge fuunction when components gets load 
        getNotes()
        // the [] is an array of dependercies that if not included the request keeps runing even after load and can crash an app 
    },  [])

    // get some data 
    let getNotes = async () => {
        // use fetch api to get some data 
        let response = await fetch('https://secure-garden-81676.herokuapp.com/notes')
        // we parse the data here 
        let data =await response.json();
        // getting the data, pushing into the empty state 
        setNotes(data)
    }
    return (
        <div className='notes'>
            <div className='notes-header'>
                <h2 className='notes-title'>&#9782; Notes</h2>
                <p className='notes-counts'>{notes.length} </p>
            </div>


            <div className='notes-list'>
                {/* render out notes on each iteration */}
           {
            //    index was introduced  to serve as a list no 
           notes.map((note, index) => (
               <ListItem key={index} note={note} />
           ))}
        </div>
        <AddButton />
        </div>
    )
}

export default NotesListPage
