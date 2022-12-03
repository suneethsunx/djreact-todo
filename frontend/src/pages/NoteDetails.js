import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'


const NoteDetails = () => {

    const [note, setNote] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        getNote()
    }, [])

    let getNote = async () => {
        let response = await fetch(`/api/notes/${id}/`)
        let data = await response.json()
        setNote(data)
    }

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

    let updateNote = async () => {
        let response = await fetch(`/api/notes/update/${id}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
            },
            body: JSON.stringify(note)
        })
        let data = await response.json()
        navigate('/')
    }


    return (
        <div>
            <div className="todo-container py-3">
                <div className="go-back px-3">
                    <Link to={'/'}>
                        <span class="iconify text-2xl text-slate-400 hover:text-slate-200 duration-100" data-icon="material-symbols:arrow-back-ios-new-rounded"></span>
                    </Link>
                </div>
                <div className="todo-content mt-4 overflow-y-scroll h-[361px]">
                    <div className="body px-4 pb-4">
                        <textarea value={note.note} onChange={(e) => {
                            setNote({ ...note, 'note': e.target.value })
                        }} autoFocus className='text-xl bg-transparent outline-none whitespace-pre-line font-medium w-full' name="" id="" cols="30" rows="10">
                        </textarea>
                        <button onClick={updateNote} className='mt-3 bg-slate-500 px-5 py-2 rounded font-semibold hover:bg-slate-500/75 duration-100 flex items-center gap-1'>
                            <span class="iconify cursor-pointer" data-icon="radix-icons:update"></span>
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetails