// Stato iniziale
const INITIAL_STATE = {
    cardBalance: 0,
    budgetBalance: 0,
    members: [
        { id: 0, name: 'Cassa', expiry: null },
        { id: 1, name: 'Pape', expiry: null },
        { id: 2, name: 'Ucio', expiry: null },
        { id: 3, name: 'Ucio Jr', expiry: null },
        { id: 4, name: 'Emma', expiry: null },
        { id: 5, name: 'Landi', expiry: null }
    ],
    history: []
};

let S = JSON.parse(localStorage.getItem('family_plan_v1')) || INITIAL_STATE;
let selectedMemberId = null;

// Utility: salvataggio e formattazione
const save = () => localStorage.setItem('family_plan_v1', JSON.stringify(S));
const fmt = (v) => "€" + (v / 100).toFixed(2).replace('.', ',');

// Aggiornamento Interfaccia
function updateUI() {
    // Aggiorna numeri principali
    document.getElementById('card-num').textContent = fmt(S.cardBalance);
    document.getElementById('budget-num').textContent = fmt(S.budgetBalance);
    document.getElementById('card-num').style.color = S.cardBalance < 0 ? 'var(--red)' : 'white';

    // Lista membri
    const grid = document.getElementById('mem-grid');
    grid.innerHTML = S.members.map(m => {
        const isExp = !m.expiry || new Date(m.expiry) < new Date();
        const dateStr = m.expiry ? new Date(m.expiry).toLocaleDateString() : 'Mai pagato';
        return `
            <div class="mem-card">
                <h4>${m.name}</h4>
                <span class="status" style="color: ${isExp ? 'var(--red)' : 'var(--accent)'}">
                    ${isExp ? 'Scaduto' : 'Fino al ' + dateStr}
                </span>
                <button class="btn-sm" style="width:100%; font-size:0.8rem" onclick="openPayModal(${m.id})">Paga</button>
            </div>
        `;
    }).join('');

    // Storico
    const hist = document.getElementById('tx-list');
    hist.innerHTML = S.history.map(t => `
        <div style="background:#121212; padding:12px; margin-bottom:5px; border-radius:8px; display:flex; justify-content:space-between">
            <div><small>${t.date}</small><br>${t.desc}</div>
            <div style="font-weight:bold">${t.amt > 0 ? '+' : ''}${fmt(t.amt)}</div>
        </div>
    `).reverse().slice(0, 15).join('');
}

// Logica di Navigazione
function navTo(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('pg-' + id).classList.add('active');
}

// Gestione Carta (Modifica e Aggiungi/Trasferimento)
function handleCard(mode) {
    switch (mode) {
        case 'set':
            const val = prompt("Imposta il saldo attuale della carta:");
            if (val === null) return;
            S.cardBalance = Math.round(parseFloat(val.replace(',', '.')) * 100);
            addHistory("Reset Saldo Carta", S.cardBalance);
            break;
        case 'transfer':
            const val2 = prompt(`Quanto vuoi spostare dal Budget (€${(S.budgetBalance/100).toFixed(2)}) alla Carta?`);
            if (!val2) return;
            const amt = Math.round(parseFloat(val2.replace(',', '.')) * 100);
            if (amt > S.budgetBalance) { alert("Budget insufficiente!"); return; }
            S.budgetBalance -= amt;
            S.cardBalance += amt;
            addHistory("Trasferimento su Carta", amt);
            break;
        case 'renew':
            const costoRinnovo = 2099;
            if (S.cardBalance < costoRinnovo) {
                if (!confirm("Saldo carta insufficiente. Registrare comunque il rinnovo?")) return;
            }
            S.cardBalance -= costoRinnovo;
            addHistory("Rinnovo Spotify Family", -costoRinnovo);
            break;
    }
    save(); updateUI();
}

// Gestione Pagamento Membri
function openPayModal(id) {
    selectedMemberId = id;
    document.getElementById('modal-name').textContent = S.members[id].name;
    document.getElementById('pay-modal').style.display = 'flex';
}

function confirmPay(months) {
    const amt = months === 1 ? 350 : months === 2 ? 700 : 1400;
    const mem = S.members[selectedMemberId];

    // Aggiorna data scadenza
    let baseDate = (mem.expiry && new Date(mem.expiry) > new Date()) ? new Date(mem.expiry) : new Date();
    baseDate.setMonth(baseDate.getMonth() + months);
    mem.expiry = baseDate.toISOString();

    // I soldi vanno nel BUDGET
    S.budgetBalance += amt;

    addHistory(`Quota ${mem.name} (${months}m)`, amt);
    save(); updateUI(); closeModals();
}

function addHistory(desc, amt) {
    const now = new Date().toLocaleDateString('it-IT', {day:'2-digit', month:'short'});
    S.history.push({ desc, amt, date: now });
}

function closeModals() { document.getElementById('pay-modal').style.display = 'none'; }

function exportData() {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(S));
    const link = document.createElement('a');
    link.href = data; link.download = "backup_family.json"; link.click();
}

function resetAll() { if(confirm("Eliminare tutti i dati?")) { S = INITIAL_STATE; save(); updateUI(); } }

// Inizializzazione
document.getElementById('hdr-date').textContent = new Date().toLocaleDateString('it-IT', {day:'2-digit', month:'short'});
updateUI();