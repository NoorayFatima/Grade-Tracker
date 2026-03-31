/* A page where you can:

Display all students with their name, grades, and average
Add a new student via a form (DOM manipulation)
Filter by performance — Passing / Failing / All
Sort by average grade — High to Low / Low to High
See live stats — class average, highest scorer, how many are passing
Remove a student from the list */


let students = [
  { id: 1, name: "Ali Hassan",    grades: [88, 92, 79, 95] },
  { id: 2, name: "Sara Ahmed",    grades: [60, 55, 70, 65] },
  { id: 3, name: "Umar Farooq",   grades: [45, 50, 40, 55] },
  { id: 4, name: "Fatima Malik",  grades: [98, 95, 100, 92] },
  { id: 5, name: "Bilal Chaudhry",grades: [72, 68, 80, 74] },
  { id: 6, name: "Zara Khan",     grades: [30, 40, 35, 45] },
];

const studentList = document.getElementById('student-list');

const getAvg = (grades) => grades.length ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;

// claculating stats for the whole class
function updateStats(data){
    if (data.length === 0) return;
    
    const allAverages = data.map(s => getAvg(s.grades));
    const classAvg = allAverages.reduce((acc, sum)=> acc + sum, 0) / allAverages.length;

    //how many students in class have paasing marks
    const passingCount = data.filter(s=> getAvg(s.grades) >= 60).length;

    // top student of the class
    const topStudent = data.reduce((prev, current)=>
    getAvg(current.grades) > getAvg(prev.grades) ? current: prev
    );

    document.getElementById('stats-container').innerHTML = `
    <div class="stat-box">Class Average: <strong>${classAvg.toFixed(1)}%</strong></div>
    <div class="stat-box">Passing: <strong>${passingCount} / ${data.length}</strong></div>
    <div class="stat-box">Top Student: <strong>${topStudent.name}</strong>
    <p>Grades: ${topStudent.grades}</p>
    </div>
    `;

}

function renderStudents(data){

    const htmlTemplates = data.map(student=>{
        //calculate average using reduce
        const sum = student.grades.reduce((acc, grade)=> acc + grade, 0);
        const avg = sum / (student.grades.length);

        const statusClass = avg >=60 ? 'Pass' : 'Fail';

        // return html string
        return`
        <div class="student-card ${statusClass}">
        <h3>${student.name}</h3>
        <p>Grades: ${student.grades.join(', ')}</p>
        <p><strong>Average: ${avg}%</strong></p>
        <button onclick="deleteStudent(${student.id})">Delete Student</button>
        </div>
        `;
    })

    studentList.innerHTML = htmlTemplates.join('');
    updateStats(data);
};

renderStudents(students);

// filtering passing and failing students
function filterStudents(criteria){

    let filteredList;
    
    if (criteria === 'passing'){
        filteredList = students.filter(s=> getAvg(s.grades) >= 60);
    }
    else if (criteria === 'failing'){
        filteredList = students.filter(s=> getAvg(s.grades) < 60);
    }
    else{
        filteredList = students; //displays all students in the list
    }

    renderStudents(filteredList);
}

//sorting students list by average grade
function handleSort(order){

    let sortedData = [...students];
    if (order === 'high-low'){
        sortedData.sort((a,b) => getAvg(b.grades) - getAvg(a.grades));
    }
    else if (order === 'low-high'){
        sortedData.sort((a,b) => getAvg(a.grades) - getAvg(b.grades));
    }
    
    renderStudents(sortedData);
}

//adding students
function addStudent() {
  const nameInput = document.getElementById('student-name');
  const gradesInput = document.getElementById('student-grades');

  // 1. Validation: Don't add if name is empty
  if (!nameInput.value || !gradesInput.value) return alert("Please fill both fields");

  // 2. The Transformation Pipeline
  const gradesArray = gradesInput.value
    .split(',')            // "80, 90" -> ["80", " 90"]
    .map(num => Number(num.trim())) // ["80", " 90"] -> [80, 90]
    .filter(num => !isNaN(num));    // Remove anything that isn't a number

  // 3. Create the New Student Object
  const newStudent = {
    id: Date.now(), // Quick way to get a unique ID
    name: nameInput.value,
    grades: gradesArray
  };

  // 4. Update the Data & UI
  students.push(newStudent);
  
  // CLEAR the inputs for the next entry
  nameInput.value = '';
  gradesInput.value = '';

  // RE-RENDER everything (List + Stats)
  renderStudents(students);
  updateStats(students);
}

function deleteStudent(id){
    students = students.filter(s => s.id !== id);
    renderStudents(students);
    updateStats(students);

}