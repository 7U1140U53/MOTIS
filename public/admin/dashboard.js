document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const loginSection = document.getElementById('loginSection');
    const dashboardSection = document.getElementById('dashboardSection');
    const loginForm = document.getElementById('loginForm');
    const passwordInput = document.getElementById('passwordInput');
    const loginError = document.getElementById('loginError');
    const logoutBtn = document.getElementById('logoutBtn');
    
    const leadsTableBody = document.getElementById('leadsTableBody');
    const loadingState = document.getElementById('loadingState');
    const emptyState = document.getElementById('emptyState');
    
    const refreshBtn = document.getElementById('refreshBtn');
    const exportCsvBtn = document.getElementById('exportCsvBtn');

    // State
    let currentLeads = [];
    
    // Default dummy password for the MVP (Zero-Cost Auth)
    // IMPORTANT: In production, this would be handled securely on the server.
    const ADMIN_PASS = "MOTIS_ADMIN_123";

    // --- Authentication Logic ---
    function checkAuth() {
        const token = sessionStorage.getItem('motis_admin_token');
        if (token === 'authenticated') {
            showDashboard();
            fetchLeads();
        } else {
            showLogin();
        }
    }

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pass = passwordInput.value;
        if (pass === ADMIN_PASS) {
            sessionStorage.setItem('motis_admin_token', 'authenticated');
            loginError.classList.add('hidden-section');
            passwordInput.value = '';
            showDashboard();
            fetchLeads();
        } else {
            loginError.classList.remove('hidden-section');
        }
    });

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('motis_admin_token');
        showLogin();
    });

    function showLogin() {
        loginSection.classList.remove('hidden-section');
        dashboardSection.classList.add('hidden-section');
        logoutBtn.classList.add('hidden-section');
    }

    function showDashboard() {
        loginSection.classList.add('hidden-section');
        dashboardSection.classList.remove('hidden-section');
        logoutBtn.classList.remove('hidden-section');
    }

    // --- Data Fetching ---
    async function fetchLeads() {
        leadsTableBody.innerHTML = '';
        emptyState.classList.add('hidden-section');
        loadingState.classList.remove('hidden-section');

        try {
            // Calling the serverless function
            const response = await fetch('/.netlify/functions/getLeads', {
                headers: {
                    'Authorization': `Bearer ${ADMIN_PASS}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch leads');
            
            const data = await response.json();
            currentLeads = data.leads || [];
            
            renderLeads();
        } catch (error) {
            console.error(error);
            // Fallback for local testing if serverless functions aren't running
            console.log("Fallback to empty leads due to fetch error.");
            currentLeads = [];
            renderLeads();
        } finally {
            loadingState.classList.add('hidden-section');
        }
    }

    // --- Rendering ---
    function renderLeads() {
        leadsTableBody.innerHTML = '';
        
        if (currentLeads.length === 0) {
            emptyState.classList.remove('hidden-section');
            return;
        }

        // Sort leads newest first
        const sortedLeads = [...currentLeads].sort((a, b) => new Date(b.capturedAt) - new Date(a.capturedAt));

        sortedLeads.forEach(lead => {
            const date = new Date(lead.capturedAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50 transition-colors';
            
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-slate-500">${date}</td>
                <td class="px-6 py-4 font-medium text-slate-900">${escapeHtml(lead.name || 'N/A')}</td>
                <td class="px-6 py-4">
                    <div class="text-slate-900">${escapeHtml(lead.phone || 'N/A')}</div>
                    <div class="text-xs text-slate-500">${escapeHtml(lead.email || '')}</div>
                </td>
                <td class="px-6 py-4 text-slate-500">${escapeHtml(lead.location || 'N/A')}</td>
                <td class="px-6 py-4 text-slate-900">
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-accent-orange capitalize">
                        ${escapeHtml((lead.product_line || 'unknown').replace('-', ' '))}
                    </span>
                    ${lead.quantity ? `<div class="text-xs text-slate-500 mt-1">Qty: ${escapeHtml(lead.quantity)}</div>` : ''}
                </td>
                <td class="px-6 py-4 text-slate-600 max-w-xs truncate" title="${escapeHtml(lead.message || '')}">
                    ${escapeHtml(lead.message || 'N/A')}
                </td>
            `;
            leadsTableBody.appendChild(tr);
        });
    }

    // --- CSV Export ---
    function exportToCSV() {
        if (currentLeads.length === 0) return;

        const headers = ['Date', 'Name', 'Phone', 'Email', 'Location', 'Product Line', 'Quantity', 'Message'];
        const csvRows = [];
        
        // Add headers
        csvRows.push(headers.join(','));
        
        // Add data
        currentLeads.forEach(lead => {
            const values = [
                lead.capturedAt,
                lead.name,
                lead.phone,
                lead.email,
                lead.location,
                lead.product_line,
                lead.quantity,
                lead.message
            ].map(val => {
                // Escape quotes and wrap in quotes for CSV safety
                const stringVal = String(val || '');
                return `"${stringVal.replace(/"/g, '""')}"`;
            });
            csvRows.push(values.join(','));
        });

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', `motis-leads-${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    // --- Utils ---
    function escapeHtml(unsafe) {
        return (unsafe || '').toString()
             .replace(/&/g, "&amp;")
             .replace(/</g, "&lt;")
             .replace(/>/g, "&gt;")
             .replace(/"/g, "&quot;")
             .replace(/'/g, "&#039;");
    }

    // --- Listeners ---
    refreshBtn.addEventListener('click', fetchLeads);
    exportCsvBtn.addEventListener('click', exportToCSV);

    // Init
    checkAuth();
});
