export default class Task {
    constructor(title, completed = false, active = true, start, end, description = '') {
        this.title = title;
        this.completed = completed;
        this.active = active;
        this.start = start;
        this.end = end;
        this.description = description;
    }
}