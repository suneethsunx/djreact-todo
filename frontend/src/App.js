import './App.css';
import Navbar from './components/Navbar';
import NoteDetails from './pages/NoteDetails';
import TodosList from './components/TodosList';
import NewNote from './pages/NewNote';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
   return (
      <div className="App">
         <Router>
            <div className="todo-container w-full h-screen flex justify-center items-center">
               <div className="todo-box h-3/4 w-2/4 bg-slate-800 rounded-lg">
                  <Navbar />
                  <div className="todo-body">

                     <Routes>
                        <Route exact path='/' element={<TodosList />} />
                        <Route path='/note/:id' element={<NoteDetails />} />
                        <Route path='/new' element={<NewNote />} />
                     </Routes>

                  </div>
               </div>
            </div>
         </Router>
      </div>
   );
}

export default App;
