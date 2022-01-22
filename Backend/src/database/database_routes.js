import Cows from './cows.js'
import express from 'express'
import { verifyToken } from '../auth/jwt_auth.js'
import Buffalos from './buffalo.js'

export const router = express.Router()
router.use(verifyToken)

const removeProperties = (obj) => {
  if (obj) ['_id', '__v'].forEach((prop) => delete obj[prop])
  return obj
}

router.post('/new-record', async (req, res) => {
  const details = req.body
  try {
    const cow = await Cows.create({ ...details })
    res.status(201).json(cow)
  } catch (e) {
    if (e.code === 11000) {
      res.status(409).json({ message: 'Tag already present' })
    } else {
      throw e
    }
  }
})

const getAnimal = async (req, res, next) => {
  const tag = req.params.tag
  let animal
  if (req.params.animal === 'cow') {
    animal = await Cows.findOne({ tag: tag })
  } else if (req.params.animal === 'buffalo') {
    animal = await Buffalos.findOne({ tag: tag })
  }
  if (animal) {
    req.animal = animal
    next()
  } else {
    res.status(404).send('Tag number not found')
  }
}

router.get('/:animal/:tag', getAnimal, (req, res) => {
  const animal = req.animal._doc
  res.status(200).json(removeProperties(animal))
})
router.post('/update/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    Object.assign(animal._doc, details)
    await animal.save()
    res.status(201).json(animal)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/add-pregnancy/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    animal.pregnancy.push({ ...details })
    console.log(animal)
    await animal.save()
    res.sendStatus(201)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/update-pregnancy/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    if (!animal.pregnancy.length) {
      animal.pregnancy.push({ ...details })
    } else {
      Object.assign(animal.pregnancy[animal.pregnancy.length - 1], details)
    }
    await animal.save()
    res.sendStatus(201)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/add-disease/:animal/:tag', getAnimal, async (req, res) => {
  const details = req.body
  const animal = req.animal
  try {
    animal.disease.push({ ...details })
    await animal.save()
    res.sendStatus(201)
  } catch (e) {
    res.status(500).json(e)
  }
})

router.post('/update-disease/:animal/:tag', getAnimal, async (req, res) => {
  const animal = req.animal
  const details = req.body

  try {
    const len = animal.disease.length
    if (!len) {
      animal.disease.push({ ...details })
    } else {
      Object.assign(animal.disease[len - 1], { ...details })
    }
    animal.save()
  } catch (e) {
    res.status(500).json(e)
  }
})

router.get('/all', async (req, res) => {
  res.json(await Cows.find())
})

router.delete('/all', async (req, res) => {
  await Cows.deleteMany()
  res.sendStatus(200)
})