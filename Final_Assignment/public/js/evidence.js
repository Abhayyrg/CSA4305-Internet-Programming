// ==========================================================================
// SSDMS - Evidence Upload & Ledger Tracker (CO1)
// ==========================================================================

let evidenceList = [
    {
        id: 1,
        skill: "Java Servlets & JSP",
        title: "Oracle Certified Professional Java SE 11 Developer",
        org: "Oracle University",
        level: "Level 4 (Proficient)",
        file: "OCP_Java_11_Certificate.pdf",
        status: "Approved",
        auditor: "Dr. D. Sudhagar",
        date: "2026-08-15"
    },
    {
        id: 2,
        skill: "CSS Grid / UI Design",
        title: "Full-Stack Enterprise Web Development Capstone Project",
        org: "VIT CSE Department",
        level: "Level 5 (Expert)",
        file: "Project_Report_Harsha.pdf",
        status: "Approved",
        auditor: "Dr. D. Sudhagar",
        date: "2026-08-28"
    },
    {
        id: 3,
        skill: "Cloud DevOps / Docker",
        title: "Docker Certified Associate & Kubernetes Foundations",
        org: "Docker Inc / Coursera",
        level: "Level 4 (Proficient)",
        file: "Docker_Credentials_Harsha.pdf",
        status: "Pending",
        auditor: "Pending Assignment",
        date: "2026-09-01"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    renderEvidenceLedger();
    setupDropzone();
    setupForm();
});

function renderEvidenceLedger() {
    const container = document.getElementById('evidenceLedger');
    if (!container) return;
    container.innerHTML = '';

    let approvedCount = 0;

    evidenceList.forEach(item => {
        if (item.status === 'Approved') approvedCount++;
        const div = document.createElement('div');
        div.className = 'evidence-ledger-item';
        div.innerHTML = `
            <div class="ledger-info">
                <h4>${item.title}</h4>
                <p><strong>Skill:</strong> ${item.skill} • <strong>Claimed:</strong> ${item.level}</p>
                <p>Issuing Body: ${item.org} | Submitted: ${item.date} | File: <span style="color: #38bdf8;">${item.file}</span></p>
            </div>
            <div>
                <span class="status-pill ${item.status === 'Approved' ? 'status-approved' : 'status-pending'}">
                    ${item.status === 'Approved' ? '✓ ' + item.status : '⏳ ' + item.status}
                </span>
            </div>
        `;
        container.appendChild(div);
    });

    const approvedBadge = document.getElementById('approvedBadgeCount');
    if (approvedBadge) {
        approvedBadge.textContent = `${approvedCount} Approved`;
    }
}

function setupDropzone() {
    const dropzone = document.getElementById('dropzone');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('filePreview');
    const nameDisplay = document.getElementById('fileNameDisplay');

    if (!dropzone || !fileInput) return;

    dropzone.addEventListener('click', () => fileInput.click());

    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            nameDisplay.textContent = file.name;
            preview.style.display = 'inline-block';
        }
    });

    dropzone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = '#6366f1';
    });

    dropzone.addEventListener('dragleave', () => {
        dropzone.style.borderColor = 'rgba(255, 255, 255, 0.15)';
    });

    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.style.borderColor = 'rgba(255, 255, 255, 0.15)';
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            nameDisplay.textContent = file.name;
            preview.style.display = 'inline-block';
        }
    });
}

function setupForm() {
    const form = document.getElementById('evidenceForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const skill = document.getElementById('evidenceSkill').value;
        const title = document.getElementById('evidenceTitle').value;
        const org = document.getElementById('evidenceOrg').value;
        const level = document.getElementById('claimedLevel').value;
        const fileName = document.getElementById('fileNameDisplay').textContent || 'evidence_doc.pdf';

        const newItem = {
            id: evidenceList.length + 1,
            skill: skill,
            title: title,
            org: org,
            level: level,
            file: fileName,
            status: "Pending",
            auditor: "Pending Assignment",
            date: "2026-09-03"
        };

        evidenceList.unshift(newItem);
        alert(`Evidence "${title}" submitted successfully for faculty mentor audit!`);
        form.reset();
        document.getElementById('filePreview').style.display = 'none';
        renderEvidenceLedger();
    });
}
