export default class Task {
    constructor(title, start, end, completed = false, description = '') {
        this.title = title;
        this.completed = completed;
        this.start = start;
        this.end = end;
        this.description = description;
    }
}