import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { DataBaseError, TokenError } from '../CustomErrors'
import { logDetails, objectForSubmission } from '../Helper'
import objectForPregnancyForm from '../objectForPregnancyForm'
import CopulationForm from './CopulationForm'
import DeliveryForm from './DeliveryForm'
import ExaminationForm from './ExaminationForm'
import LactationForm from './LactationForm'

const PregnancyForm = ({ lastPregnancy }) => {
  const { animal, tag } = useParams()
  const [loading, setLoading] = useState(false)
  const subRoute = !lastPregnancy
    ? `/add-pregnancy/${animal}/${tag}`
    : `/update-pregnancy/${animal}/${tag}`

  const phases = {
    0: <CopulationForm />,
    1: <ExaminationForm />,
    2: <LactationForm />,
    3: <DeliveryForm />,
  }

  const [phase, setPhase] = useState(
    !lastPregnancy
      ? 0
      : !lastPregnancy.examination
      ? 1
      : !lastPregnancy.lactation
      ? 2
      : 3
  )

  const formSubmission = async (e) => {
    e.preventDefault()
    var object
    try {
      object = objectForPregnancyForm(objectForSubmission(e.target), phase)
    } catch (e) {
      alert(e.message)
      return
    }
    setLoading(true)
    try {
      await logDetails(subRoute, object)
      window.location.reload()
    } catch (e) {
      if (e instanceof TokenError) {
        alert('not logged in')
        logout(navigate)
      } else if (e instanceof DataBaseError) {
        alert('No such record found')
        navigate(`/new-record/${animal}/${tag}`, { replace: true })
      } else {
        alert(e.message)
      }
    }
  }
  return loading ? (
    <>Loading...</>
  ) : (
    <form
      className="box4 min-h-fit bg-white rounded-xl mt-4 px-4 py-2"
      onSubmit={formSubmission}
    >
      {phases[phase]}
      <div className="flex justify-evenly">
        <button type="submit" className="buttons2 w-auto">
          Submit
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            setPhase((phase + 1) % 4)
          }}
          className="buttons2 w-auto"
        >
          skip
        </button>
        <button
          className="buttons2 w-fit bg-colour-red"
          onClick={(e) => {
            e.preventDefault()
          }}
        >
          End Pregnancy
        </button>
      </div>
    </form>
  )
}

export default PregnancyForm