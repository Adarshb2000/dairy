import ReactDOM from 'react-dom'
import Home from './Home'
import LogIn from './LogIn'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NewRecord from './NewRecord'
import SearchRecord from './SearchRecord'
import AddPregnancyRecord from './AddPregnancyRecord'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/new-record" element={<NewRecord />} />
        <Route path="/:animal/:tag" element={<SearchRecord />} />
        <Route
          path="/add-pregnancy/:animal/:tag"
          element={<AddPregnancyRecord />}
        />
      </Routes>
    </Router>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))