import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import UpdateStudentDialog from './UpdateStudentDialog';
import { useState } from 'react';


export default function StudentTable({ students, setStudents, handleDialogClose, handleChange}) {

    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [currentStudent, setCurrentStudent] = useState(null)
    
    // Update Student

    function handleUpdateStudent(studentId) {
        const student = students.find(s=>s.id === studentId)
        setCurrentStudent(student)
        setEditDialogOpen(true)
    }

    async function handleSaveStudent(){
       const studentDoc = doc(db, 'Students', currentStudent.id)
       await updateDoc(studentDoc,{
        name: currentStudent.name,
        age: currentStudent.age
       })

       setStudents(students.map((student)=>student.id === currentStudent.id ? currentStudent: student))
       handleDialogClose()
    }

    // Delete Student

    async function handleDeleteStudent(studentId) {
        // alert(studentId)
        const studentDoc = doc(db, 'Students', studentId)
        await deleteDoc(studentDoc)
        setStudents(students.filter((student) => student.id !== studentId))
    }

    // Close Update Dialog

    function handleDialogClose(){
        setEditDialogOpen(false)
        setCurrentStudent(null)
    }

    // Handle change dialog value

    function handleChange(event){
        const {name, value} = event.target;
        setCurrentStudent((prev)=>({
            ...prev,
            [name]: value
        }))    
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Student Roll #</TableCell>
                            <TableCell align="center">Student Name</TableCell>
                            <TableCell align="center">Student Age</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow
                                key={student.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align='center'>
                                    {student.rollNo}
                                </TableCell>
                                <TableCell align="center">{student.name}</TableCell>
                                <TableCell align="center">{student.age}</TableCell>
                                <TableCell align="center">
                                    <EditIcon onClick={() => handleUpdateStudent(student.id)} style={{ cursor: 'pointer', color: '#007bff', marginRight: 10 }}>
                                    </EditIcon>
                                    <DeleteIcon onClick={() => handleDeleteStudent(student.id)} style={{ cursor: 'pointer', color: 'crimson' }}></DeleteIcon>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <UpdateStudentDialog 
            editDialogOpen={editDialogOpen} 
            currentStudent={currentStudent} 
            handleDialogClose={handleDialogClose}
            handleChange={handleChange}
            handleSaveStudent={handleSaveStudent}>

            </UpdateStudentDialog>
        </>

    );
}
