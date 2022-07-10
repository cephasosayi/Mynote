import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
// import notes from '../assets/data';
import { ReactComponent as Arrow} from '../assets/arrow-left.svg';

const NotePage = ({match, history}) => {
  let [note, setNotes ] = useState(null)
    let noteId = match.params.id;


  useEffect(() => {

    // we are setting the dependency [] to noteId so it refreshes when a note Id changes i.e it's a DidmountUpdate lifecycle 
getNotes()
  }, [noteId])

  let getNotes = async () =>{
    // setting a condition to stop other getNote request if we want to add a new note 
    if (noteId === 'new') return;
    let response = await fetch(`https://secure-garden-81676.herokuapp.com/notes/${noteId}`)
    let data = await response.json()
    setNotes(data)
  }

  // update method to enable saving 

  let updateNote = async () =>{
      await fetch(`https://secure-garden-81676.herokuapp.com/notes/${noteId}`, {
        method: 'PUT',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...note, 'updated': new Date()})
      })
  }
  

  let createNote = async () =>{
    await fetch(`https://secure-garden-81676.herokuapp.com/notes`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    })
}

  let handleSubmit = () =>{
    // some loigic to delele note if empty 
    if(noteId !== 'new' && !note.body){
      handleDelete()
    }else if( noteId !== 'new'){
      updateNote()

    } else if( noteId === 'new' && note !== null){
      createNote()
      
    }
    updateNote()
    history.push('/ ')
  }

 let handleDelete = async () =>{
    await fetch(`https://secure-garden-81676.herokuapp.com/notes/${noteId}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
    history.push('/')
  }
  return (
    <div className='note'>
        <div className='note-header'>
            <h3>
                 <Link to='/'>
                      <Arrow  onClick={handleSubmit}/> 
                </Link>
            </h3>
            { noteId !== 'new' ? (
                 <button onClick={handleDelete}>Delete</button>
            ): (
             <Link to='/'> <button onClick={handleSubmit}>Done</button> </Link>

            ) }
           

        </div>
        

        <textarea placeholder='Start typing' onChange={(e) => {setNotes({...note, 'body': e.target.value})}} value={note?.body}>

        </textarea>
    </div>
  )
} 

export default NotePage
