// ==========================================================================
// SSDMS - XML & XSLT Dynamic Transformation Engine (CO2)
// ==========================================================================

let rawXmlText = "";
let rawXslText = "";

document.addEventListener('DOMContentLoaded', async () => {
    setupTabSwitching();
    await loadAndTransformData();

    const triggerBtn = document.getElementById('triggerTransformBtn');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', async () => {
            const statusBadge = document.getElementById('transformStatus');
            if (statusBadge) statusBadge.textContent = "Transforming XML...";
            const t0 = performance.now();
            await performXsltTransformation();
            const t1 = performance.now();
            if (statusBadge) statusBadge.textContent = `Transformation Success (${Math.round(t1 - t0)}ms)`;
        });
    }
});

function setupTabSwitching() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.code-tab-content').forEach(c => c.classList.remove('active'));

            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            document.getElementById(targetTab)?.classList.add('active');
        });
    });
}

async function loadAndTransformData() {
    try {
        const [xmlRes, xslRes] = await Promise.all([
            fetch('data/student_profile.xml'),
            fetch('xsl/profile_transform.xsl')
        ]);

        rawXmlText = await xmlRes.text();
        rawXslText = await xslRes.text();

        document.getElementById('rawXmlDisplay').textContent = rawXmlText;
        document.getElementById('rawXslDisplay').textContent = rawXslText;

        await performXsltTransformation();
    } catch (err) {
        console.error("Error loading XML/XSL resources:", err);
        document.getElementById('xsltTargetOutput').innerHTML = `<p style="color: #ef4444;">Error loading XML/XSLT assets: ${err.message}</p>`;
    }
}

async function performXsltTransformation() {
    const target = document.getElementById('xsltTargetOutput');
    if (!target) return;

    try {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rawXmlText, "text/xml");
        const xslDoc = parser.parseFromString(rawXslText, "text/xml");

        if (window.XSLTProcessor) {
            const xsltProcessor = new XSLTProcessor();
            xsltProcessor.importStylesheet(xslDoc);
            const resultDocument = xsltProcessor.transformToFragment(xmlDoc, document);
            target.innerHTML = '';
            target.appendChild(resultDocument);
        } else {
            target.innerHTML = '<p>XSLTProcessor not supported in browser; fallback to standard renderer.</p>';
        }
    } catch (e) {
        console.error("XSLT Processing Exception:", e);
        target.innerHTML = `<p style="color: #ef4444;">XSLT Error: ${e.message}</p>`;
    }
}
