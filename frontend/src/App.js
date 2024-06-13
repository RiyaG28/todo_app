import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

function App() {

  // useEffect(() => {

  //   fetch('http://localhost:8080/api/get-todos').then((response) => response.json());
  // });

  // return <div> Hi there</div>;

  return (

    <Router>
      <Routes>

        <Route exact path="/" element={<TodoList />} />
        <Route path="/add-todos" element={<TodoInput />} />

      </Routes>
    </Router>
  );
}

export default App;
