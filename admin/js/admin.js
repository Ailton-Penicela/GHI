// --- Authentication ---
function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    const btn = document.querySelector('button[type="submit"]');

    btn.innerText = 'Autenticando...';
    btn.disabled = true;

    auth.signInWithEmailAndPassword(user, pass)
        .then((userCredential) => {
            // Signed in
            window.location.href = 'dashboard.html';
        })
        .catch((error) => {
            console.error(error);
            alert('Erro no login: ' + error.message);
            btn.innerText = 'Entrar';
            btn.disabled = false;
        });
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
}

// --- Dashboard Logic ---
document.addEventListener('DOMContentLoaded', () => {
    // Check Auth State globally
    auth.onAuthStateChanged((user) => {
        const isLoginPage = window.location.pathname.includes('login.html');

        if (user) {
            if (isLoginPage) window.location.href = 'dashboard.html';

            // If on Dashboard, load User Info & Messages
            if (window.location.pathname.includes('dashboard.html')) {
                document.querySelector('.user-profile span').innerText = user.email;
                renderMessagesReal();
            }
        } else {
            if (!isLoginPage) window.location.href = 'login.html';
        }
    });
});

// --- Firestore: Messages ---
function renderMessagesReal() {
    const tbody = document.querySelector('tbody');
    if (!tbody) return;

    db.collection("messages").orderBy("date", "desc").get().then((querySnapshot) => {
        let html = '';
        let newCount = 0;

        querySnapshot.forEach((doc) => {
            const msg = doc.data();
            const date = new Date(msg.date).toLocaleDateString();
            if (msg.status === 'new') newCount++;

            html += `
                <tr>
                    <td>${msg.name}</td>
                    <td>${msg.subject || 'Sem assunto'}</td>
                    <td>${date}</td>
                    <td><span class="status-badge ${msg.status}">${msg.status}</span></td>
                    <td>
                        <button class="btn-icon" onclick="viewMessageReal('${doc.id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;

        // Update counters
        const badges = document.querySelectorAll('.badge');
        if (badges.length > 0) badges[0].innerText = newCount;
    });
}

function viewMessageReal(id) {
    db.collection("messages").doc(id).get().then((doc) => {
        if (doc.exists) {
            const msg = doc.data();
            alert(`De: ${msg.name}\nEmail: ${msg.email}\n\n${msg.message}`);

            // Mark as read
            if (msg.status === 'new') {
                db.collection("messages").doc(id).update({
                    status: 'read'
                }).then(() => renderMessagesReal());
            }
        }
    });
}

// --- CMS: Stories ---
let currentStoryId = null;

function loadStories() {
    const grid = document.getElementById('storiesGrid');
    if (!grid) return;

    db.collection("stories").get().then((querySnapshot) => {
        let html = '';
        querySnapshot.forEach((doc) => {
            const s = doc.data();
            html += `
                <div class="story-preview-card">
                    <img src="${s.imageUrl}" alt="Story">
                    <div class="p-3">
                        <h4>${s.title}</h4>
                        <p class="text-sm">${s.desc.substring(0, 50)}...</p>
                        <div class="actions">
                            <button onclick="editStory('${doc.id}')" class="btn-icon"><i class="fas fa-edit"></i></button>
                            <button onclick="deleteStory('${doc.id}')" class="btn-icon delete"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            `;
        });

        if (html === '') html = '<p>Nenhuma história encontrada.</p>';
        grid.innerHTML = html;
    });
}

function openStoryModal() {
    document.getElementById('storyForm').reset();
    currentStoryId = null;
    document.getElementById('modalTitle').innerText = 'Nova História';
    document.getElementById('storyModal').style.display = 'flex';
}

function closeStoryModal() {
    document.getElementById('storyModal').style.display = 'none';
}

function editStory(id) {
    db.collection("stories").doc(id).get().then((doc) => {
        if (doc.exists) {
            const s = doc.data();
            currentStoryId = id;
            document.getElementById('storyTitle').value = s.title;
            document.getElementById('storyDesc').value = s.desc;
            document.getElementById('storyResult').value = s.result;
            document.getElementById('storyCategory').value = s.category;
            // Note: Image handling for edit is complex, simplifying for MVP
            document.getElementById('storyImageUrl').value = s.imageUrl;

            document.getElementById('modalTitle').innerText = 'Editar História';
            document.getElementById('storyModal').style.display = 'flex';
        }
    });
}

function deleteStory(id) {
    if (confirm('Tem certeza que deseja apagar esta história?')) {
        db.collection("stories").doc(id).delete().then(() => {
            loadStories();
        });
    }
}

// Handle Story Form Submit
document.getElementById('storyForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.innerText = 'Salvando...';
    btn.disabled = true;

    const file = document.getElementById('storyImage').files[0];
    const title = document.getElementById('storyTitle').value;
    const desc = document.getElementById('storyDesc').value;
    const result = document.getElementById('storyResult').value;
    const category = document.getElementById('storyCategory').value;
    const existingUrl = document.getElementById('storyImageUrl').value;

    const saveData = (url) => {
        const data = {
            title, desc, result, category, imageUrl: url,
            updatedAt: new Date().toISOString()
        };

        let promise;
        if (currentStoryId) {
            promise = db.collection("stories").doc(currentStoryId).update(data);
        } else {
            data.createdAt = new Date().toISOString();
            promise = db.collection("stories").add(data);
        }

        promise.then(() => {
            closeStoryModal();
            loadStories();
            btn.innerText = 'Salvar História';
            btn.disabled = false;
        });
    };

    if (file) {
        const ref = storage.ref('stories/' + Date.now() + '_' + file.name);
        ref.put(file).then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
                saveData(url);
            });
        });
    } else {
        if (existingUrl) saveData(existingUrl);
        else {
            alert('Por favor, envie uma imagem.');
            btn.innerText = 'Salvar História';
            btn.disabled = false;
        }
    }
});
