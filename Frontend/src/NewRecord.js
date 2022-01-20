import { useContext, useState, useRef } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logDetails, logout } from './Helper'
import DateElement from './DateElement'
import { DataBaseError, TokenError } from './CustomErrors'
const NewRecord = () => {
  const navigate = useNavigate()
  const [animal, setAnimal] = useState('cow')
  const [tag, setTag] = useState(1)
  const [seller, setSeller] = useState('bleh')
  const [vehicleNumber, setVehicleNumber] = useState('4')
  const comments = useRef(['this is a comment'])
  const [currComment, setCurrComment] = useState('')

  return userLoggedIn.current ? (
    <div>
      <form
        onSubmit={(event) =>
          logDetails(event, '/new-record', {
            comments: comments.current,
          })
            .then(console.log)
            .catch((e) => {
              alert(e.message)
              if (e instanceof TokenError) {
                logout(navigate)
              }
            })
        }
      >
        <h4> ADD RECORD </h4>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            defaultValue={null}
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option value="cow">Cow</option>
            <option value="buffalo">Buffalo</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag No.
          <input
            onChange={(e) => setTag(e.target.value)}
            value={tag}
            id="tag"
            name="tag"
            type="number"
          />
        </label>
        <hr />
        <label htmlFor="purchaseDate"></label>
        <label htmlFor="seller">
          Seller
          <input
            onChange={(e) => setSeller(e.target.value)}
            id="seller"
            name="seller"
            value={seller}
          />
        </label>
        <br />
        <br />
        <DateElement name="purchaseDate" />
        <br />
        <br />
        <label htmlFor="vehicleNumber">
          Vehicle Number{' '}
          <input
            onChange={(e) => setVehicleNumber(e.target.value)}
            id="vehicleNumber"
            name="vehicleNumber"
            type="number"
            value={vehicleNumber}
          />
        </label>
        <br />
        <br />
        <label htmlFor="comments">
          Comments{' '}
          <ul>
            {comments.current.map((val, index) => (
              <li key={index}>
                {val}
                <br />
              </li>
            ))}
          </ul>
          <textarea
            onChange={(e) => setCurrComment(e.target.value)}
            id="comments"
            name="comments"
          />
          <button
            type="button"
            onClick={() => {
              comments.current.push(currComment)
              setCurrComment('')
            }}
          >
            add
          </button>
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  ) : (
    <Navigate replace to="/login" />
  )
}

export default NewRecord
