
// === VISITAS ===
async function updateVisits() {
    try {
        const res = await fetch('php/visit.php');
        const data = await res.json();
        const visitCounter = document.getElementById('visitCounter');
        if (visitCounter) {
            visitCounter.textContent = data.total;
        }
    } catch (err) {
        console.error('Error al actualizar visitas:', err);
    }
}

// === COMENTARIOS ===
async function loadComments() {
    try {
        const res = await fetch('php/get_comments.php');
        const comments = await res.json();
        const container = document.getElementById('commentsContainer');
        if (container) {
            container.innerHTML = '';
            comments.forEach(c => {
                const div = document.createElement('div');
                div.className = "bg-white p-4 rounded-xl shadow mb-4";
                div.innerHTML = `
                    <p class="font-semibold text-gray-800">${c.name}</p>
                    <p class="text-gray-700">${c.comment}</p>
                `;
                container.appendChild(div);
            });
        }
    } catch (err) {
        console.error('Error al cargar comentarios:', err);
    }
}

// === AGREGAR COMENTARIO ===
async function addComment(e) {
    e.preventDefault();
    const name = document.getElementById('commentName').value.trim();
    const comment = document.getElementById('commentText').value.trim();
    if(!name || !comment) {
        alert('Por favor completa todos los campos.');
        return;
    }
    try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('comment', comment);
        const res = await fetch('php/save_comment.php', { method: 'POST', body: formData });
        const text = await res.text();
        if(text === 'ok') {
            document.getElementById('commentForm').reset();
            loadComments();
        } else {
            alert('Error al guardar comentario');
        }
    } catch(err) {
        console.error('Error al guardar comentario:', err);
    }
}

// === EVENT LISTENER FORMULARIO ===
const commentForm = document.getElementById('commentForm');
if(commentForm){
    commentForm.addEventListener('submit', addComment);
}

// === INICIALIZAR ===
updateVisits();
loadComments();

