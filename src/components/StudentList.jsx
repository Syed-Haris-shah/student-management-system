import { useEffect } from "react"
import StudentTable from "./StudentTable"

function StudentList({students, setStudents, getStudents }) {    
    return (
        <>
            <h1>Students List</h1>
            <StudentTable students={students} setStudents={setStudents} getStudents={getStudents}></StudentTable>
        </>
    )
}

export default StudentList
