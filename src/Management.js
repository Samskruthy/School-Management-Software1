
import React, { useState, useEffect } from 'react';

const Manager = () => {
  // State to manage list of students, teachers, and marks
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [marks, setMarks] = useState({}); // New state to manage marks

  // State for student form inputs
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [editStudentIndex, setEditStudentIndex] = useState(null);

  // State for teacher form inputs
  const [teacherName, setTeacherName] = useState('');
  const [teacherAge, setTeacherAge] = useState('');
  const [teacherSubject, setTeacherSubject] = useState('');
  const [editTeacherIndex, setEditTeacherIndex] = useState(null);

  // State for marks form inputs
  const [marksStudent, setMarksStudent] = useState('');
  const [marksSubject, setMarksSubject] = useState('');
  const [marksValue, setMarksValue] = useState('');
  const [editMarksIndex, setEditMarksIndex] = useState(null);

  // Load students, teachers, and marks from local storage on component mount
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students'));
    if (storedStudents) {
      setStudents(storedStudents);
    }
    const storedTeachers = JSON.parse(localStorage.getItem('teachers'));
    if (storedTeachers) {
      setTeachers(storedTeachers);
    }
    const storedMarks = JSON.parse(localStorage.getItem('marks'));
    if (storedMarks) {
      setMarks(storedMarks);
    }
  }, []);

  // Save students, teachers, and marks to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('teachers', JSON.stringify(teachers));
    localStorage.setItem('marks', JSON.stringify(marks));
  }, [students, teachers, marks]);

  // Functions to handle CRUD operations for students
  const addStudent = () => {
    if (!studentName || !studentAge || !studentClass) return;
    const newStudents = [...students, { name: studentName, age: studentAge, class: studentClass }];
    setStudents(newStudents);
    resetStudentForm();
  };

  const deleteStudent = (index) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const updateStudent = () => {
    if (!studentName || !studentAge || !studentClass) return;
    const newStudents = students.map((student, index) =>
      index === editStudentIndex ? { name: studentName, age: studentAge, class: studentClass } : student
    );
    setStudents(newStudents);
    resetStudentForm();
  };

  const editStudent = (index) => {
    setStudentName(students[index].name);
    setStudentAge(students[index].age);
    setStudentClass(students[index].class);
    setEditStudentIndex(index);
  };

  const resetStudentForm = () => {
    setStudentName('');
    setStudentAge('');
    setStudentClass('');
    setEditStudentIndex(null);
  };

  // Functions to handle CRUD operations for teachers
  const addTeacher = () => {
    if (!teacherName || !teacherAge || !teacherSubject) return;
    const newTeachers = [...teachers, { name: teacherName, age: teacherAge, subject: teacherSubject }];
    setTeachers(newTeachers);
    resetTeacherForm();
  };

  const deleteTeacher = (index) => {
    const newTeachers = teachers.filter((_, i) => i !== index);
    setTeachers(newTeachers);
  };

  const updateTeacher = () => {
    if (!teacherName || !teacherAge || !teacherSubject) return;
    const newTeachers = teachers.map((teacher, index) =>
      index === editTeacherIndex ? { name: teacherName, age: teacherAge, subject: teacherSubject } : teacher
    );
    setTeachers(newTeachers);
    resetTeacherForm();
  };

  const editTeacher = (index) => {
    setTeacherName(teachers[index].name);
    setTeacherAge(teachers[index].age);
    setTeacherSubject(teachers[index].subject);
    setEditTeacherIndex(index);
  };

  const resetTeacherForm = () => {
    setTeacherName('');
    setTeacherAge('');
    setTeacherSubject('');
    setEditTeacherIndex(null);
  };

  // Functions to handle CRUD operations for marks
  const addMarks = () => {
    if (!marksStudent || !marksSubject || !marksValue) return;
    const newMarks = { ...marks, [marksStudent]: { ...marks[marksStudent], [marksSubject]: marksValue } };
    setMarks(newMarks);
    resetMarksForm();
  };

  const deleteMarks = (student, subject) => {
    const { [subject]: _, ...remainingMarks } = marks[student];
    if (Object.keys(remainingMarks).length === 0) {
      const newMarks = { ...marks };
      delete newMarks[student];
      setMarks(newMarks);
    } else {
      setMarks({ ...marks, [student]: remainingMarks });
    }
  };

  const updateMarks = () => {
    if (!marksStudent || !marksSubject || !marksValue) return;
    const newMarks = { ...marks, [marksStudent]: { ...marks[marksStudent], [marksSubject]: marksValue } };
    setMarks(newMarks);
    resetMarksForm();
  };

  const editMarks = (student, subject) => {
    setMarksStudent(student);
    setMarksSubject(subject);
    setMarksValue(marks[student][subject]);
    setEditMarksIndex({ student, subject });
  };

  const resetMarksForm = () => {
    setMarksStudent('');
    setMarksSubject('');
    setMarksValue('');
    setEditMarksIndex(null);
  };

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '200px',
    marginBottom: '20px',
  };

  const inputStyle = {
    marginBottom: '10px',
    padding: '8px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '10px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const tdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Manager</h1>
      
      {/* Student Form */}
      <div>
        <h2>Manage Students</h2>
        <div style={formStyle}>
          <input
            type="text"
            placeholder="Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={studentAge}
            onChange={(e) => setStudentAge(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Class"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            style={inputStyle}
            required
          />
          {editStudentIndex !== null ? (
            <button onClick={updateStudent} style={buttonStyle}>Update Student</button>
          ) : (
            <button onClick={addStudent} style={buttonStyle}>Add Student</button>
          )}
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Class</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="4" style={tdStyle}>No Student Information Found</td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{student.name}</td>
                  <td style={tdStyle}>{student.age}</td>
                  <td style={tdStyle}>{student.class}</td>
                  <td style={tdStyle}>
                    <button onClick={() => editStudent(index)} style={buttonStyle}>Edit</button>
                    <button onClick={() => deleteStudent(index)} style={buttonStyle}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Teacher Form */}
      <div>
        <h2>Manage Teachers</h2>
        <div style={formStyle}>
          <input
            type="text"
            placeholder="Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={teacherAge}
            onChange={(e) => setTeacherAge(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="text"
            placeholder="Subject"
            value={teacherSubject}
            onChange={(e) => setTeacherSubject(e.target.value)}
            style={inputStyle}
            required
          />
          {editTeacherIndex !== null ? (
            <button onClick={updateTeacher} style={buttonStyle}>Update Teacher</button>
          ) : (
            <button onClick={addTeacher} style={buttonStyle}>Add Teacher</button>
          )}
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Age</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="4" style={tdStyle}>No Teacher Information Found</td>
              </tr>
            ) : (
              teachers.map((teacher, index) => (
                <tr key={index}>
                  <td style={tdStyle}>{teacher.name}</td>
                  <td style={tdStyle}>{teacher.age}</td>
                  <td style={tdStyle}>{teacher.subject}</td>
                  <td style={tdStyle}>
                    <button onClick={() => editTeacher(index)} style={buttonStyle}>Edit</button>
                    <button onClick={() => deleteTeacher(index)} style={buttonStyle}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Marks Form */}
      <div>
        <h2>Manage Marks</h2>
        <div style={formStyle}>
          <select
            value={marksStudent}
            onChange={(e) => setMarksStudent(e.target.value)}
            style={inputStyle}
            required
          >
            <option value="">Select Student</option>
            {students.map((student, index) => (
              <option key={index} value={student.name}>{student.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Subject"
            value={marksSubject}
            onChange={(e) => setMarksSubject(e.target.value)}
            style={inputStyle}
            required
          />
          <input
            type="number"
            placeholder="Marks"
            value={marksValue}
            onChange={(e) => setMarksValue(e.target.value)}
            style={inputStyle}
            required
          />
          {editMarksIndex !== null ? (
            <button onClick={updateMarks} style={buttonStyle}>Update Marks</button>
          ) : (
            <button onClick={addMarks} style={buttonStyle}>Add Marks</button>
          )}
        </div>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Student</th>
              <th style={thStyle}>Subject</th>
              <th style={thStyle}>Marks</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(marks).length === 0 ? (
              <tr>
                <td colSpan="4" style={tdStyle}>No Marks Information Found</td>
              </tr>
            ) : (
              Object.keys(marks).map((student) =>
                Object.keys(marks[student]).map((subject, index) => (
                  <tr key={index}>
                    <td style={tdStyle}>{student}</td>
                    <td style={tdStyle}>{subject}</td>
                    <td style={tdStyle}>{marks[student][subject]}</td>
                    <td style={tdStyle}>
                      <button onClick={() => editMarks(student, subject)} style={buttonStyle}>Edit</button>
                      <button onClick={() => deleteMarks(student, subject)} style={buttonStyle}>Delete</button>
                    </td>
                  </tr>
                ))
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;

