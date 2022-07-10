import React from 'react'
// import notes from '../assets/data';
import { Link } from 'react-router-dom';

let getDate = (note) => {
  return new Date(note.updated_at).toLocaleDateString()
}
let getTitle = (note) =>{
  const title =  note.body.split('\n')[0]
  // for longer title 

  if (title.length > 45 ){
    return title.slice(0, 45)
  }

  return title
}

// we dont want the body to contain the title 
let getContent =(note)=>{
  let title = getTitle(note)
  // it gets the title which is \n new line and replace it with empty string 
  let content = note.body.replaceAll('\n', ' ')
  // throwing in the title and removing it 
  content.replaceAll(title, "")

  // return it 
  if(content.length > 45){
    return content.slice(0, 45)
  } else {
    return content
  }
}
// props was asssigned an argurment so it can be access by the function 
// if destructured, note can be used directly 
const ListItem = ({ note }) => {
  return (
    //   adding a dynamic list to all list using template literals and we specify the path /note and id ${note.id}
    <Link to={`/note/${note.id}`}>
        {/* declare dynamicly  */}
        <div className='notes-list-item'>
        <h3> { getTitle(note)}</h3>
        {/* gets content(body only) and display with getcontent  */}
        <p><span>{getDate(note)}</span> {getContent(note)} </p>
        </div>
    </Link>
  )
}

export default ListItem
