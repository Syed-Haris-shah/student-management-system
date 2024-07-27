import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebaseConfig'

function StudentList() {
    const [students, setStudents] = useState([])
    const studentsCollection = collection(db, 'Students')
    console.log(studentsCollection)

    const getStudents = async () => {

        try {
            const studentSnaps = await getDocs(studentsCollection)
            console.log(studentSnaps)
            const studentList = studentSnaps.docs.map(doc => (
                {
                    id: doc.id,
                    ...doc.data()
                }
            ))
            console.log(studentList)
            setStudents(studentList)

        } catch (error) {

            console.log('Error from getting student:',error)

        }
    }

    useEffect(() => {
        getStudents()
    }, [students])
    // console.log(students)
    return (
        <>
            <h1>Students List</h1>
            <div className='students-list'>
                {students && students.map((student) => {
                    return <div key={student.id} className='student'>
                        <h2>{student.name}</h2>
                        <p>Age: {student.age}</p>
                    </div>
                }
                )}
            </div>
        </>
    )
}

export default StudentList
