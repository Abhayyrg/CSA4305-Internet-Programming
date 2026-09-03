// ==========================================================================
// SSDMS - Student Dashboard Logic (CO1 - JavaScript & Dynamic DOM)
// ==========================================================================

const studentSkillsData = [
    { name: "Java Servlets & JSP (MVC)", category: "web", current: 4, target: 4 },
    { name: "XML Schema & XSLT Transformation", category: "data", current: 3, target: 4 },
    { name: "CSS Grid & Responsive Glassmorphism", category: "web", current: 5, target: 5 },
    { name: "JavaScript ES6+ & DOM Engine", category: "web", current: 4, target: 4 },
    { name: "Database Design, Normalization & SQL", category: "data", current: 3, target: 4 },
    { name: "Cloud Containerization & Docker", category: "core", current: 3, target: 4 },
    { name: "Data Structures & Algorithmic Design", category: "core", current: 4, target: 4 }
];

document.addEventListener('DOMContentLoaded', () => {
    renderSkillBars('all');
    setupFilterPills();
    drawOverviewRadar();
});

function renderSkillBars(categoryFilter) {
    const container = document.getElementById('skill-bars-container');
    if (!container) return;
    container.innerHTML = '';

    const filtered = categoryFilter === 'all' 
        ? studentSkillsData 
        : studentSkillsData.filter(s => s.category === categoryFilter);

    filtered.forEach(skill => {
        const row = document.createElement('div');
        row.className = 'skill-bar-row';
        
        const currentPct = (skill.current / 5) * 100;
        const targetPct = (skill.target / 5) * 100;

        row.innerHTML = `
            <div class="skill-bar-header">
                <div>
                    <span>${skill.name}</span>
                    <span class="skill-category-tag">${skill.category.toUpperCase()}</span>
                </div>
                <div class="skill-level-indicator">
                    <strong>Level ${skill.current}</strong> / ${skill.target}
                </div>
            </div>
            <div class="progress-track">
                <div class="progress-fill" style="width: ${currentPct}%;"></div>
                <div class="progress-benchmark-marker" style="left: ${targetPct}%;" title="Target Benchmark Level"></div>
            </div>
        `;
        container.appendChild(row);
    });
}

function setupFilterPills() {
    const pills = document.querySelectorAll('.filter-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            const cat = pill.getAttribute('data-cat');
            renderSkillBars(cat);
        });
    });
}

function drawOverviewRadar() {
    const canvas = document.getElementById('overviewRadar');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 95;

    ctx.clearRect(0, 0, width, height);

    const labels = ["Java/JSP", "XML/XSLT", "CSS3", "JS/DOM", "SQL/DB", "Cloud"];
    const currentValues = [4, 3, 5, 4, 3, 3];
    const targetValues = [4, 4, 5, 4, 4, 4];
    const numSides = labels.length;
    const angleStep = (Math.PI * 2) / numSides;

    // Draw background concentric grid polygons
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

    // Draw Spokes & Labels
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();

        // Label
        const labelX = centerX + (radius + 20) * Math.cos(angle);
        const labelY = centerY + (radius + 15) * Math.sin(angle);
        ctx.fillStyle = '#94a3b8';
        ctx.font = '10.5px Plus Jakarta Sans, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(labels[i], labelX, labelY);
    }

    // Draw Target Polygon (Benchmark)
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const r = (radius / 5) * targetValues[i];
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(236, 72, 153, 0.8)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Student Current Polygon
    ctx.beginPath();
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const r = (radius / 5) * currentValues[i];
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(99, 102, 241, 0.35)';
    ctx.fill();
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Draw Points
    for (let i = 0; i < numSides; i++) {
        const angle = i * angleStep - Math.PI / 2;
        const r = (radius / 5) * currentValues[i];
        const x = centerX + r * Math.cos(angle);
        const y = centerY + r * Math.sin(angle);
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ec4899';
        ctx.fill();
    }
}
