/* =============================================
   VERSÁTIL SERVICES — Banco de Dados Local
   IndexedDB para persistência offline
   ============================================= */

const DB_NAME = 'VersatilServicesDB';
const DB_VERSION = 4;

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

            // Store de portfólio (fotos de serviços realizados)
            if (!db.objectStoreNames.contains('portfolio')) {
                const store = db.createObjectStore('portfolio', { keyPath: 'id', autoIncrement: true });
                store.createIndex('categoria', 'categoria', { unique: false });
                store.createIndex('criadoEm', 'criadoEm', { unique: false });
            }

            // Store de clientes
            if (!db.objectStoreNames.contains('clientes')) {
                const store = db.createObjectStore('clientes', { keyPath: 'id', autoIncrement: true });
                store.createIndex('cnpj', 'cnpj', { unique: true });
                store.createIndex('criadoEm', 'criadoEm', { unique: false });
            }

            // Adicionar índice clienteId nas ordens (se não existir)
            if (db.objectStoreNames.contains('ordensServico')) {
                const tx = e.target.transaction;
                const store = tx.objectStore('ordensServico');
                if (!store.indexNames.contains('clienteId')) {
                    store.createIndex('clienteId', 'clienteId', { unique: false });
                }
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

// =============================================
// PORTFÓLIO (Fotos de Serviços Realizados)
// =============================================
async function salvarFotoPortfolio(dados) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('portfolio', 'readwrite');
        const store = tx.objectStore('portfolio');
        if (dados.id) {
            store.put(dados);
        } else {
            dados.criadoEm = new Date().toISOString();
            store.add(dados);
        }
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

async function listarFotosPortfolio(categoria) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('portfolio', 'readonly');
        const store = tx.objectStore('portfolio');
        let request;
        if (categoria) {
            const index = store.index('categoria');
            request = index.getAll(categoria);
        } else {
            request = store.getAll();
        }
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function excluirFotoPortfolio(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('portfolio', 'readwrite');
        const store = tx.objectStore('portfolio');
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

// =============================================
// CLIENTES
// =============================================
async function salvarCliente(dados) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('clientes', 'readwrite');
        const store = tx.objectStore('clientes');
        if (dados.id) {
            store.put(dados);
            tx.oncomplete = () => resolve(dados.id);
        } else {
            dados.criadoEm = new Date().toISOString();
            const req = store.add(dados);
            req.onsuccess = () => resolve(req.result);
        }
        tx.onerror = () => reject(tx.error);
    });
}

async function listarClientes() {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('clientes', 'readonly');
        const store = tx.objectStore('clientes');
        const request = store.getAll();
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function buscarClientePorCnpj(cnpj) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('clientes', 'readonly');
        const store = tx.objectStore('clientes');
        const index = store.index('cnpj');
        const request = index.get(cnpj);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
    });
}

async function buscarCliente(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('clientes', 'readonly');
        const store = tx.objectStore('clientes');
        const request = store.get(id);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}

async function excluirCliente(id) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('clientes', 'readwrite');
        const store = tx.objectStore('clientes');
        store.delete(id);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

// Buscar O.S. vinculadas a um cliente
async function listarOrdensPorCliente(clienteId) {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction('ordensServico', 'readonly');
        const store = tx.objectStore('ordensServico');
        const index = store.index('clienteId');
        const request = index.getAll(clienteId);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
    });
}
