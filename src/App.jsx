import { useEffect, useState } from 'react'
import './App.css'
import CreateStudent from './components/CreateStudent'
import StudentList from './components/StudentList'
import { collection, getDocs } from 'firebase/firestore'
import { db } from './firebaseConfig'

function App() {

  const [students, setStudents] = useState([])

  const getStudents = async () => {

    const studentsCollection = collection(db, 'Students')
    // console.log(studentsCollection)

    const studentSnaps = await getDocs(studentsCollection)
    // console.log(studentSnaps)
    const studentList = studentSnaps.docs.map(doc => (
      {
        id: doc.id,
        ...doc.data()
      }
    ))
    // console.log(studentList)
    setStudents(studentList)
  }
  useEffect(() => {
    getStudents()
  }, [])

  return (
    <div className='app-container'>
      <h1 className='app-tittle'>Student Management System</h1>
      <CreateStudent getStudents={getStudents}></CreateStudent>
      <StudentList students={students} setStudents={setStudents} getStudents={getStudents}></StudentList>
    </div>
  )
}

export default App
