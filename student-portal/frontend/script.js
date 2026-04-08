// script.js - Common functions

document.addEventListener('DOMContentLoaded', () => {
    console.log('Student Portal Loaded');

    // Load students in admin page if present
    if (window.location.pathname.includes('admin.html')) {
        loadStudents();
    }
});

async function loadStudents() {
    try {
        const res = await fetch('/api/students');
        const students = await res.json();

        const tbody = document.getElementById('studentsTable');
        if (!tbody) return;

        tbody.innerHTML = students.map(student => `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>${student.year}</td>
        <td>${student.gpa}</td>
      </tr>
    `).join('');
    } catch (err) {
        console.error('Error loading students:', err);
    }
}

async function loginUser(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if (data.success) {
            alert('Login Successful! Redirecting to Admin Panel...');
            window.location.href = '/admin';
        } else {
            alert(data.message || 'Login Failed');
        }
    } catch (err) {
        alert('Server error. Please try again.');
    }
}