import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NewNote = () => {

    const [newNote, setNewNote] = useState('')
    const navigate = useNavigate()

    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    const createNote = async () => {
        let url = `/api/notes/new/`

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify({
                'note': newNote
            })
        })

        let data = await response.json()
        navigate('/')
    }
    
    let isDisabled = true
    if (newNote.length > 0){
        isDisabled = false
    }

    return (
        <div>
            <div className="new-todo-container px-3 py-3">
                <div className="go-back">
                    <Link to={'/'} className='w-fit flex'>
                        <span class="iconify text-2xl text-slate-400 hover:text-slate-200 duration-100" data-icon="material-symbols:arrow-back-ios-new-rounded"></span>
                    </Link>
                </div>
                <div className="input-container mt-5">
                    <div className="form-wrapper px-2">
                        <form action="#">
                            <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} autoFocus required className='bg-transparent outline-none w-full rounded' name="note" id="" cols="30" rows="10" placeholder='What to do next ?'></textarea>
                            <button disabled={isDisabled} id='add-btn' type='button' onClick={createNote} className='mt-3 bg-slate-500 px-5 py-2 rounded font-semibold hover:bg-slate-500/75 duration-100 flex items-center gap-1'>
                                <span className="iconify text-2xl cursor-pointer" data-icon="material-symbols:add"></span>
                                Add
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewNote