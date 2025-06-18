import { getStudents, deleteStudent, getStudentById } from './student.js';

export function renderStudents(passedOnly = false) {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";

  getStudents({ passedOnly }).forEach(student => {
    const { id, name, age, grades, average } = student;
    const row = document.createElement("tr");
    row.className = "cursor-pointer transition-colors hover:bg-gray-500 dark:bg-gray-800s dark:hover:bg-gray-700";
    row.innerHTML = `
      <td class="border px-2 py-1">${name}</td>
      <td class="border px-2 py-1">${age}</td>
      <td class="border px-2 py-1">${grades}</td>
      <td class="border px-2 py-1">${average}</td>
      <td class="border px-2 py-1"></td>
    `;
    const actionTd = row.querySelector("td:last-child");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "bg-yellow-500 text-white px-3 py-1 rounded mr-2";
    editBtn.onclick = () => fillFormForEdit(id);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.className = "bg-red-500 text-white px-3 py-1 rounded";
    delBtn.onclick = () => {
      deleteStudent(id);
      renderStudents(document.getElementById("filterPassed").checked);
    };

    actionTd.append(editBtn, delBtn);
    row.addEventListener("click", () => {
      document.querySelectorAll("#studentTableBody tr").forEach(tr => tr.classList.remove("bg-blue-400"));
      row.classList.add("bg-blue-400");
    });

    tbody.appendChild(row);
  });
}

export function fillFormForEdit(id) {
  const student = getStudentById(id);
  if (!student) return;
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("grades").value = student.grades;
  document.getElementById("editingId").value = student.id;
  document.getElementById("submitBtn").textContent = "Update Student";
}