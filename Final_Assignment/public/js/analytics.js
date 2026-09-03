// ==========================================================================
// SSDMS - Institutional Analytics & Recruiter Filter Logic (CO1)
// ==========================================================================

const studentCohortPool = [
    { name: "Harsha", reg: "21BCE1001", role: "Full-Stack Dev", java: 4, xml: 3, sql: 3, cloud: 3, readiness: "76%" },
    { name: "Pooja R.", reg: "21BCE1012", role: "Cloud DevOps", java: 4, xml: 4, sql: 4, cloud: 4, readiness: "92%" },
    { name: "Aravind K.", reg: "21BCE1045", role: "Data Engineer", java: 3, xml: 4, sql: 5, cloud: 3, readiness: "84%" },
    { name: "Meera S.", reg: "21BCE1089", role: "Full-Stack Dev", java: 5, xml: 4, sql: 4, cloud: 4, readiness: "95%" },
    { name: "Vikram N.", reg: "21BCE1120", role: "Backend Architect", java: 4, xml: 4, sql: 4, cloud: 3, readiness: "88%" }
];

document.addEventListener('DOMContentLoaded', () => {
    drawCohortHeatmap();
    setupRecruiterFilter();
    setupExport();
});

function drawCohortHeatmap() {
    const canvas = document.getElementById('batchHeatmapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    const competencies = ["Java/JSP", "XML/XSLT", "CSS/UI", "JS/DOM", "SQL/DB", "Cloud"];
    const levels = ["L1 (Novice)", "L2 (Adv Beg)", "L3 (Competent)", "L4 (Proficient)", "L5 (Expert)"];

    // Distribution percentages matrix [level][competency]
    const matrix = [
        [5,  12, 2,  4,  6,  10],
        [15, 28, 8,  12, 18, 25],
        [40, 35, 30, 38, 42, 35],
        [32, 20, 42, 36, 28, 22],
        [8,  5,  18, 10, 6,  8]
    ];

    const startX = 90;
    const startY = 30;
    const cellW = (width - startX - 20) / competencies.length;
    const cellH = (height - startY - 30) / levels.length;

    // Draw Column Headers
    ctx.font = '10px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    competencies.forEach((comp, idx) => {
        ctx.fillText(comp, startX + idx * cellW + cellW / 2, startY - 10);
    });

    // Draw Row Headers
    ctx.textAlign = 'right';
    levels.forEach((lvl, idx) => {
        ctx.fillText(lvl, startX - 10, startY + idx * cellH + cellH / 2 + 3);
    });

    // Draw Heatmap Cells
    for (let r = 0; r < levels.length; r++) {
        for (let c = 0; c < competencies.length; c++) {
            const val = matrix[r][c];
            const intensity = val / 45; // Normalize for color intensity
            
            ctx.fillStyle = `rgba(99, 102, 241, ${Math.min(0.9, intensity + 0.1)})`;
            ctx.fillRect(startX + c * cellW + 2, startY + r * cellH + 2, cellW - 4, cellH - 4);

            // Text inside cell
            ctx.fillStyle = val > 20 ? '#ffffff' : '#cbd5e1';
            ctx.textAlign = 'center';
            ctx.fillText(`${val}%`, startX + c * cellW + cellW / 2, startY + r * cellH + cellH / 2 + 3);
        }
    }
}

function setupRecruiterFilter() {
    const btn = document.getElementById('findCandidatesBtn');
    if (!btn) return;

    btn.addEventListener('click', () => {
        renderCandidateResults();
    });

    renderCandidateResults();
}

function renderCandidateResults() {
    const container = document.getElementById('candidateResultsList');
    if (!container) return;
    container.innerHTML = '';

    studentCohortPool.forEach(student => {
        const item = document.createElement('div');
        item.className = 'rec-card';
        item.innerHTML = `
            <div class="avatar" style="width: 32px; height: 32px; font-size: 0.8rem;">${student.name.charAt(0)}</div>
            <div class="rec-details" style="flex: 1;">
                <strong>${student.name} (${student.reg})</strong>
                <span>Track: ${student.role} • Java: L${student.java} | SQL: L${student.sql}</span>
            </div>
            <span class="badge badge-success">${student.readiness} Fit</span>
        `;
        container.appendChild(item);
    });
}

function setupExport() {
    const btn = document.getElementById('exportReportBtn');
    if (btn) {
        btn.addEventListener('click', () => {
            alert('Exporting Institutional Placement Readiness Matrix (CSV) for CSE 2026-27 cohort.');
        });
    }
}
