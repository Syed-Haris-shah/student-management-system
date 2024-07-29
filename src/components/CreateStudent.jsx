import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const CreateStudent = ({getStudents}) => {
  const [rollNo, setRollNO] = useState('')
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [isCreatingStudent, setIsCreatingStdent] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsCreatingStdent(true)
      await addDoc(collection(db, 'Students'), {
        rollNo: Number(rollNo),
        name: name,
        age: Number(age)

      })
      setRollNO('')
      setName('')
      setAge('')
      setIsCreatingStdent(false)
      await getStudents()
    } catch (error) {

      console.log('Error Creating user:', error)

    }

  }
  return (
    <form onSubmit={handleSubmit} className='form'>
      <input type="number" value={rollNo} onChange={(e) => setRollNO(e.target.value)} placeholder='Enter student Roll NO' required />
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter student name' required />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder='Enter student age' required />
      <button type='Submit' >{isCreatingStudent ? 'Creating...' : 'Create Student'}</button>
    </form>
  )
}

export default CreateStudent
