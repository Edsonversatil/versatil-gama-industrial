/* =============================================
   VERSÁTIL SERVICES — Banco de Dados Local
   IndexedDB para persistência offline
   ============================================= */

const DB_NAME = 'VersatilServicesDB';
const DB_VERSION = 2;

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (e) => {
            const db = e.target.result;

            // Store de solicitações do cliente
            if (!db.objectStoreNames.contains('solicitacoes')) {
                const store = db.createObjectStore('solicitacoes', { keyPath: 'id', autoIncrement: true });
                store.createIndex('status', 'status', { unique: false });
                store.createIndex('criadoEm', 'criadoEm', { unique: false });
            }

            // Store de ordens de serviço (técnico)
            if (!db.objectStoreNames.contains('ordensServico')) {
                const store = db.createObjectStore('ordensServico', { keyPath: 'id', autoIncrement: true });
                store.createIndex('status', 'status', { unique: false });
                store.createIndex('criadoEm', 'criadoEm', { unique: false });
            }

            // Store de registros técnicos (fotos, notas)
            if (!db.objectStoreNames.contains('registrosTecnicos')) {
                const store = db.createObjectStore('registrosTecnicos', { keyPath: 'id', autoIncrement: true });
                store.createIndex('ordemId', 'ordemId', { unique: false });
                store.createIndex('tipo', 'tipo', { unique: false });
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// =============================================
// SOLICITAÇÕES (Cliente)
// =============================================
async function salvarSolicitacao(dados) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('solicitacoes', 'readwrite');
        const store = tx.objectStore('solicitacoes');
        if (dados.id) {
            store.put(dados);
        } else {
            dados.criadoEm = new Date().toISOString();
            dados.status = dados.status || 'rascunho';
            store.add(dados);
        }
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

async function listarSolicitacoes(status) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('solicitacoes', 'readonly');
        const store = tx.objectStore('solicitacoes');
        let request;
        if (status) {
            const index = store.index('status');
            request = index.getAll(status);
        } else {
            request = store.getAll();
        }
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function buscarSolicitacao(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('solicitacoes', 'readonly');
        const store = tx.objectStore('solicitacoes');
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function excluirSolicitacao(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('solicitacoes', 'readwrite');
        const store = tx.objectStore('solicitacoes');
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

// =============================================
// ORDENS DE SERVIÇO (Técnico)
// =============================================
async function salvarOrdem(dados) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('ordensServico', 'readwrite');
        const store = tx.objectStore('ordensServico');
        if (dados.id) {
            store.put(dados);
            tx.oncomplete = () => resolve(dados.id);
        } else {
            dados.criadoEm = new Date().toISOString();
            dados.status = dados.status || 'pendente';
            const req = store.add(dados);
            req.onsuccess = () => resolve(req.result);
        }
        tx.onerror = () => reject(tx.error);
    });
}

async function listarOrdens(status) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('ordensServico', 'readonly');
        const store = tx.objectStore('ordensServico');
        let request;
        if (status) {
            const index = store.index('status');
            request = index.getAll(status);
        } else {
            request = store.getAll();
        }
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function buscarOrdem(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('ordensServico', 'readonly');
        const store = tx.objectStore('ordensServico');
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function excluirOrdem(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('ordensServico', 'readwrite');
        const store = tx.objectStore('ordensServico');
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

// =============================================
// REGISTROS TÉCNICOS (Fotos, Notas)
// =============================================
async function salvarRegistro(dados) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosTecnicos', 'readwrite');
        const store = tx.objectStore('registrosTecnicos');
        if (dados.id) {
            store.put(dados);
        } else {
            dados.timestamp = new Date().toISOString();
            store.add(dados);
        }
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

async function listarRegistros(ordemId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosTecnicos', 'readonly');
        const store = tx.objectStore('registrosTecnicos');
        const index = store.index('ordemId');
        const request = index.getAll(ordemId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function excluirRegistro(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('registrosTecnicos', 'readwrite');
        const store = tx.objectStore('registrosTecnicos');
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}
