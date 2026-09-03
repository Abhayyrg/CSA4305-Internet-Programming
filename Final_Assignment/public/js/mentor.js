// ==========================================================================
// SSDMS - Faculty Mentor Portal Logic (CO1 & Role Management)
// ==========================================================================

let pendingSubmissions = [
    {
        id: 101,
        student: "Harsha (21BCE1001)",
        skill: "Cloud DevOps / Docker",
        title: "Docker Certified Associate & Kubernetes Foundations",
        claimedLevel: "Level 4 (Proficient)",
        evidenceFile: "Docker_Credentials_Harsha.pdf"
    },
    {
        id: 102,
        student: "Aravind K. (21BCE1045)",
        skill: "XML & XSLT Transformation",
        title: "Enterprise Data Transformation Pipeline Project",
        claimedLevel: "Level 4 (Proficient)",
        evidenceFile: "XML_Project_Report.pdf"
    }
];

let selectedSubmissionId = null;

document.addEventListener('DOMContentLoaded', () => {
    renderMentorTable();
    setupReviewForm();
});

function renderMentorTable() {
    const tbody = document.getElementById('mentorSubmissionsTable');
    if (!tbody) return;
    tbody.innerHTML = '';

    const pendingBadge = document.getElementById('pendingReviewCount');
    if (pendingBadge) {
        pendingBadge.textContent = `${pendingSubmissions.length} Actions Required`;
    }

    if (pendingSubmissions.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: #34d399; padding: 20px;">All mentee submissions audited and verified!</td></tr>`;
        return;
    }

    pendingSubmissions.forEach(sub => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${sub.student}</strong></td>
            <td><span class="badge badge-accent">${sub.skill}</span></td>
            <td>${sub.title}</td>
            <td><a href="#" style="color: #38bdf8; text-decoration: underline;" onclick="alert('Viewing artifact: ${sub.evidenceFile}')">${sub.evidenceFile}</a></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="selectSubmissionForReview(${sub.id})">Audit</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

window.selectSubmissionForReview = function(id) {
    selectedSubmissionId = id;
    const sub = pendingSubmissions.find(s => s.id === id);
    if (!sub) return;

    const input = document.getElementById('reviewTargetTitle');
    if (input) {
        input.value = `${sub.student} - ${sub.title} (${sub.skill})`;
    }
};

function setupReviewForm() {
    const form = document.getElementById('mentorReviewForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!selectedSubmissionId) {
            alert('Please select a student submission from the table first.');
            return;
        }

        const decision = document.getElementById('mentorDecision').value;
        const level = document.getElementById('mentorEndorsedLevel').value;
        const remarks = document.getElementById('mentorRemarks').value || 'Evidence audited and verified with distinction.';

        alert(`Verification committed successfully!\nDecision: ${decision}\nEndorsed Level: ${level}\nRemarks: "${remarks}"\nStudent portfolio updated.`);

        pendingSubmissions = pendingSubmissions.filter(s => s.id !== selectedSubmissionId);
        selectedSubmissionId = null;
        document.getElementById('reviewTargetTitle').value = "Select a student submission from the table";
        document.getElementById('mentorRemarks').value = "";

        const approvedCountElem = document.getElementById('approvedReviewCount');
        if (approvedCountElem) {
            approvedCountElem.textContent = "43 Credentials";
        }

        renderMentorTable();
    });
}
