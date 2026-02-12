// ABSTRACTION : Classe abstraite de rendu
class TaskRenderer {
    render(task) {
        throw new Error("La méthode 'render' doit être implémentée");
    }
}

// RENDU SPÉCIFIQUE : Travail (Rouge)
class WorkRenderer extends TaskRenderer {
    render(task) {
        return `
            <li class="task-item" style="border-color: red;">
                <span style="color: red;"><strong>[TRAVAIL]</strong> ${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">X</button>
            </li>`;
    }
}

// RENDU SPÉCIFIQUE : Maison (Bleu)
class HomeRenderer extends TaskRenderer {
    render(task) {
        return `
            <li class="task-item" style="border-color: blue;">
                <span style="color: blue;"><strong>[MAISON]</strong> ${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">X</button>
            </li>`;
    }
}


// RENDU SPÉCIFIQUE : Divers (Vert)
class OtherRenderer extends TaskRenderer {
    render(task) {
        return `
            <li class="task-item" style="border-color: green;">
                <span style="color: green;"><strong>[DIVERS]</strong> ${task.text}</span>
                <button class="delete-btn" data-id="${task.id}">X</button>
            </li>`;
    }
}

// VUE PRINCIPALE
class TaskView {
    constructor() {
        this.form = document.getElementById('task-form');
        this.input = document.getElementById('task-input');
        this.categorySelect = document.getElementById('task-category');
        this.taskList = document.getElementById('task-list');
        
        this.filterSelect = document.getElementById('filter-category');

        this.renderers = {
            'travail': new WorkRenderer(),
            'maison': new HomeRenderer(),
            'divers': new OtherRenderer()
        };
    }

    displayTasks(tasks) {
        this.taskList.innerHTML = '';
        if (tasks.length === 0) {
            this.taskList.innerHTML = '<p style="color: #888;">Aucune tâche pour le moment (ou aucune dans cette catégorie).</p>';
            return;
        }

        tasks.forEach(task => {
            const renderer = this.renderers[task.category];
            if(renderer) {
                this.taskList.innerHTML += renderer.render(task);
            }
        });
    }

    bindAddTask(handler) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            if (this.input.value.trim() !== "") {
                handler(this.input.value, this.categorySelect.value);
                this.input.value = '';
            }
        });
    }

    bindDeleteTask(handler) {
        this.taskList.addEventListener('click', event => {
            if (event.target.classList.contains('delete-btn')) {
                const id = parseInt(event.target.getAttribute('data-id'));
                handler(id);
            }
        });
    }

    bindFilterTasks(handler) {
        this.filterSelect.addEventListener('change', event => {
            const category = event.target.value;
            handler(category);
        });
    }
}