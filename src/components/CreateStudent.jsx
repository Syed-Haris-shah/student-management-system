import React, { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import {db} from '../firebaseConfig'

const CreateStudent = () => {
    const [name, setName] = useState('')
    const [age, setAge] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
          await addDoc(collection(db,'Students'),{
            name:name,
            age: Number(age)
          })
          setName('')
          setAge('')
        } catch (error){

        }

    }
  return (
    <form onSubmit={handleSubmit} className='form'>
        <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter student name' required/>
        <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} placeholder='Enter student age' required />
        <button type='Submit' >Create Student</button>
    </form>
  )
}

export default CreateStudent
