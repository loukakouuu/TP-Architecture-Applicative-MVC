class TaskController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // État interne pour garder le filtre actif même après un ajout/suppression
        this.currentFilter = 'all';

        // Liaison des événements
        this.view.bindAddTask(this.handleAddTask);
        this.view.bindDeleteTask(this.handleDeleteTask);
        this.view.bindFilterTasks(this.handleFilterChange);

        // Affichage initial
        this.refreshList();
    }
    refreshList = () => {
        const allTasks = this.model.getTasks();
        
        if (this.currentFilter === 'all') {
            this.view.displayTasks(allTasks);
        } else {
            const filteredTasks = allTasks.filter(task => task.category === this.currentFilter);
            this.view.displayTasks(filteredTasks);
        }
    }

    handleAddTask = (text, category) => {
        this.model.addTask(text, category);
        this.refreshList();
    }

    handleDeleteTask = (id) => {
        this.model.removeTask(id);
        this.refreshList();
    }

    handleFilterChange = (category) => {
        this.currentFilter = category;
        this.refreshList();
    }
}