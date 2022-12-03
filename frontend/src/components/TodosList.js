import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './TodoLists.css'

const TodosList = () => {

    const [todos, setTodos] = useState([])

    useEffect(() => {
        getNotes()
    }, [])


    const truncate = (str) => {
        return str.length > 60 ? str.substring(0, 56) + ' ...' : str
    }

    let getNotes = async () => {
        let response = await fetch('/api/notes/')
        let data = await response.json()
        setTodos(data)
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

    let deleteTodo = async (id) => {
        let url = `/api/notes/delete/${id}/`
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            }
        })
        getNotes()
    }


    return (
        <div>
            <div className="body-container">
                <div className="body-info flex justify-between items-center px-4 py-3">
                    <p>Total tasks to do</p>
                    <h4 className='text-lg pr-3'>{todos.length}</h4>
                </div>
                <div className="body-tasks h-[361px] overflow-y-scroll rounded-b-lg">
                    {
                        todos.map((todo, index) => {
                            return (
                                <div key={index} className="task bg-slate-800 hover:bg-slate-700 border-t border-slate-700 p-4 cursor-pointer duration-100 flex items-center justify-between">
                                    <Link to={`/note/${todo.id}`}>
                                        <h5 className='text-xl font-semibold'>{truncate(todo.note)}</h5>
                                    </Link>
                                    <button onClick={() => deleteTodo(todo.id)}><span className="iconify text-xl text-slate-400 hover:text-slate-100 duration-100" data-icon="ic:round-delete"></span></button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TodosList