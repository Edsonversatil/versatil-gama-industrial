/* =============================================
   VERSÁTIL SERVICES — Banco de Dados Local
   IndexedDB para persistência offline
   ============================================= */

const DB_NAME = 'VersatilServicesDB';
const DB_VERSION = 1;

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
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

// Salvar solicitação (rascunho ou enviada)
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

// Listar todas as solicitações
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

// Buscar solicitação por ID
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

// Excluir solicitação
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

// Contar solicitações por status
async function contarSolicitacoes(status) {
    const lista = await listarSolicitacoes(status);
    return lista.length;
}
