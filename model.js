
// CLASSE DE BASE
class BaseTask {
    constructor(text) {
        this.text = text;
    }
}


 // HÉRITAGE : Classe avancée avec catégorie
class AdvancedTask extends BaseTask {
    constructor(text, category) {
        super(text); // Appelle le constructeur parent
        this.category = category;
        this.id = Date.now(); // ID unique pour la suppression
    }
}


// SINGLETON : Gestionnaire de données unique
class TaskModel {
    constructor() {
        if (TaskModel.instance) {
            return TaskModel.instance;
        }
        this.tasks = [];
        TaskModel.instance = this;
    }

    // Ajoute une tâche (Logique métier)
    addTask(text, category) {
        const newTask = new AdvancedTask(text, category);
        this.tasks.push(newTask);
    }

    // Supprime une tâche par son ID
    removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
    }

    getTasks() {
        return this.tasks;
    }
}