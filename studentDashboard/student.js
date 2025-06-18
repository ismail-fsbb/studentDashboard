let students = [];

export function addStudent({ name, age, grades }) {
    // ✅ Clean and parse grades
    const gradesArray = grades
      .split(',')
      .map(item => parseFloat(item.trim()))
      .filter(num => !isNaN(num)); // Filter out empty or invalid values
  
    const average = gradesArray.length
      ? (gradesArray.reduce((a, b) => a + b, 0) / gradesArray.length).toFixed(2)
      : '0.00';
  
    const newStudent = {
      id: Date.now().toString(),
      name,
      age,
      grades: gradesArray.join(','), // Save cleaned string
      average,
    };
  
    students.push(newStudent);
    persist();
  }
  
  

  export function updateStudent(id, { name, age, grades }) {
    const gradesArray = grades
      .split(',')
      .map(item => parseFloat(item.trim()))
      .filter(num => !isNaN(num));
  
    const average = gradesArray.length
      ? (gradesArray.reduce((a, b) => a + b, 0) / gradesArray.length).toFixed(2)
      : '0.00';
  
    students = students.map(s =>
      s.id === id
        ? { ...s, name, age, grades: gradesArray.join(','), average }
        : s
    );
  
    persist();
  }
  
  

export function deleteStudent(id) {
  students = students.filter(s => s.id !== id);
  persist();
}

export function getStudents({ passedOnly = false } = {}) {
  return passedOnly ? students.filter(s => parseFloat(s.average) > 60) : students;
}

export function getStudentById(id) {
  return students.find(s => s.id === id);
}

export function loadStudents() {
  const stored = localStorage.getItem("students");
  students = stored ? JSON.parse(stored) : [];
}

function persist() {
  localStorage.setItem("students", JSON.stringify(students));
}

export function setStudents(newStudents) {
    students = newStudents;
    persist();
  }
  