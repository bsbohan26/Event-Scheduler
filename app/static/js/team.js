// Team Management Module
const TeamManager = {
    teamMembers: JSON.parse(localStorage.getItem('teamMembers')) || [],

    init() {
        this.setupEventListeners();
        this.updateTable();
    },

    setupEventListeners() {
        document.getElementById('addTeamMemberForm').addEventListener('submit', (e) => this.addTeamMember(e));
    },

    updateTable() {
        const tbody = document.querySelector('table tbody');
        tbody.innerHTML = '';

        if (this.teamMembers.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="text-center">No team members added yet</td></tr>';
            return;
        }

        this.teamMembers.forEach((member, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${member.name}</td>
                <td>${member.email}</td>
                <td>${member.role}</td>
                <td>
                    <button class="btn btn-sm btn-warning" onclick="TeamManager.editMember(${index})">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="TeamManager.deleteMember(${index})">Delete</button>
                </td>
            `;
            tbody.appendChild(row);
        });
    },

    addTeamMember(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        const newMember = { name, email, role };
        this.teamMembers.push(newMember);
        localStorage.setItem('teamMembers', JSON.stringify(this.teamMembers));
        
        document.getElementById('addTeamMemberForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('addTeamMemberModal')).hide();
        
        this.updateTable();
    },

    deleteMember(index) {
        if (confirm('Are you sure you want to delete this team member?')) {
            this.teamMembers.splice(index, 1);
            localStorage.setItem('teamMembers', JSON.stringify(this.teamMembers));
            this.updateTable();
        }
    },

    editMember(index) {
        alert('Edit functionality will be implemented later');
    }
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => TeamManager.init()); 