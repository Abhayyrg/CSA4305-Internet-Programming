// ==========================================================================
// SSDMS - Diagnostic Assessment & Real-Time Gap Analysis Engine (CO1)
// ==========================================================================

const benchmarkProfiles = {
    fullstack: {
        "Java Servlets & JSP": 4,
        "XML & XSLT Transformation": 4,
        "CSS Grid / UI Layouts": 5,
        "JavaScript & DOM Engine": 4,
        "Database Design & SQL": 4
    },
    cloud: {
        "Java Servlets & JSP": 3,
        "XML & XSLT Transformation": 3,
        "CSS Grid / UI Layouts": 3,
        "JavaScript & DOM Engine": 3,
        "Database Design & SQL": 4
    },
    data: {
        "Java Servlets & JSP": 2,
        "XML & XSLT Transformation": 4,
        "CSS Grid / UI Layouts": 2,
        "JavaScript & DOM Engine": 3,
        "Database Design & SQL": 5
    }
};

let currentStudentScores = {
    "Java Servlets & JSP": 3,
    "XML & XSLT Transformation": 2,
    "CSS Grid / UI Layouts": 5,
    "JavaScript & DOM Engine": 3,
    "Database Design & SQL": 3
};

document.addEventListener('DOMContentLoaded', () => {
    recalculateMetrics();
    setupQuizForm();
    setupCareerSelector();
});

function setupCareerSelector() {
    const selector = document.getElementById('targetCareerSelect');
    if (selector) {
        selector.addEventListener('change', () => {
            recalculateMetrics();
        });
    }
}

function recalculateMetrics() {
    const selectedTrack = document.getElementById('targetCareerSelect')?.value || 'fullstack';
    const activeBenchmark = benchmarkProfiles[selectedTrack];

    let totalBenchmark = 0;
    let totalGap = 0;
    const recommendations = [];

    for (const [skill, target] of Object.entries(activeBenchmark)) {
        const studentLvl = currentStudentScores[skill] || 1;
        const gap = Math.max(0, target - studentLvl);
        totalBenchmark += target;
        totalGap += gap;

        if (gap > 0) {
            recommendations.push({
                skill: skill,
                gap: gap,
                course: `Advanced Track: ${skill}`,
                provider: gap >= 2 ? "NPTEL / Coursera Core Specialization" : "Skill Remedial Workshop",
                estHours: gap * 8
            });
        }
    }

    const overallGapIndex = ((totalGap / totalBenchmark) * 100).toFixed(1);
    const readinessScore = (100 - parseFloat(overallGapIndex)).toFixed(1);

    const gapDisplay = document.getElementById('gapScorePercent');
    const readinessDisplay = document.getElementById('readinessScore');

    if (gapDisplay) {
        gapDisplay.textContent = `${overallGapIndex}%`;
        gapDisplay.className = overallGapIndex > 25 ? 'val text-warning' : 'val text-success';
    }
    if (readinessDisplay) {
        readinessDisplay.textContent = `${readinessScore}%`;
    }

    renderRecommendations(recommendations);
    drawAssessmentRadar(activeBenchmark);
}

function renderRecommendations(recs) {
    const container = document.getElementById('recsContainer');
    if (!container) return;
    container.innerHTML = '';

    if (recs.length === 0) {
        container.innerHTML = '<div class="rec-card"><div class="rec-details"><strong style="color: #34d399;">All Career Benchmarks Met!</strong><span>Student is 100% placement ready for this track.</span></div></div>';
        return;
    }

    recs.forEach(r => {
        const card = document.createElement('div');
        card.className = 'rec-card';
        card.innerHTML = `
            <div class="rec-icon">📘</div>
            <div class="rec-details" style="flex: 1;">
                <strong>${r.course} <span class="badge badge-accent">-Level ${r.gap} Gap</span></strong>
                <span>${r.provider} • Estimated: ${r.estHours} Learning Hours</span>
            </div>
            <button class="btn btn-sm btn-primary" onclick="alert('Enrolled into ${r.course}!')">Enroll</button>
        `;
        container.appendChild(card);
    });
}

function drawAssessmentRadar(benchmark) {
    const canvas = document.getElementById('assessmentRadar');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 100;

    ctx.clearRect(0, 0, width, height);

    const skills = Object.keys(benchmark);
    const numSides = skills.length;
    const angleStep = (Math.PI * 2) / numSides;

    // Grid circles/polygons
    for (let level = 1; level <= 5; level++) {
        const r = (radius / 5) * level;
        ctx.beginPath();
        for (let i = 0; i < numSides; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + r * Math.cos(angle);
            const y = centerY + r * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.stroke();
    }

    // Spokes & Labels
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();

        const labelX = centerX + (radius + 24) * Math.cos(angle);
        const labelY = centerY + (radius + 16) * Math.sin(angle);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Shorten label for canvas
        const shortName = skills[i].split(' ')[0] + ' ' + (skills[i].split(' ')[1] || '');
        ctx.fillText(shortName, labelX, labelY);
    }

    // Benchmark Polygon (Dashed Pink)
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const target = benchmark[skills[i]];
        const r = (radius / 5) * target;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = '#ec4899';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Current Student Polygon (Solid Purple)
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const current = currentStudentScores[skills[i]] || 1;
        const r = (radius / 5) * current;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.fill();
    ctx.strokeStyle = '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Vertices
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const current = currentStudentScores[skills[i]] || 1;
        const r = (radius / 5) * current;
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#6ee7b7';
        ctx.fill();
    }
}

function setupQuizForm() {
    const form = document.getElementById('assessmentQuizForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        const q3 = document.querySelector('input[name="q3"]:checked');

        if (!q1 || !q2 || !q3) {
            alert('Please answer all 3 diagnostic questions before submitting.');
            return;
        }

        let elevatedSkills = [];
        if (q1.value === 'B') {
            currentStudentScores["Java Servlets & JSP"] = Math.min(5, currentStudentScores["Java Servlets & JSP"] + 1);
            elevatedSkills.push("Java Servlets & JSP");
        }
        if (q2.value === 'A') {
            currentStudentScores["XML & XSLT Transformation"] = Math.min(5, currentStudentScores["XML & XSLT Transformation"] + 1);
            elevatedSkills.push("XML & XSLT Transformation");
        }
        if (q3.value === 'B') {
            currentStudentScores["JavaScript & DOM Engine"] = Math.min(5, currentStudentScores["JavaScript & DOM Engine"] + 1);
            elevatedSkills.push("JavaScript & DOM Engine");
        }

        alert(`Diagnostic test submitted successfully!\nCompetencies elevated: ${elevatedSkills.join(', ')}\nRecalculating live Skill Gap Index.`);
        recalculateMetrics();
    });
}
