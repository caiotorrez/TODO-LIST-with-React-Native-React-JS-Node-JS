const { Task } = require('../models');
const { User } = require('../models');

class TaskController {
    async create(req, res) {
        const { title, start, end, description, active, completed } = req.body;
        await User.findByPk(req.uid).then((user) => {
            user.createTask({ title, start, end, description, active, completed }).then(() => {
                res.status(201).json(user);
            },
                (err) => {
                    console.error(err)
                    return res.status(500).json('Unexpected error');
                });
        },
            (err) => {
                console.log(err);
                return res.status(401).json('User not find');
            });
    }

    async findOne(req, res) {
        const { id } = req.params;
        const task = await Task.findByPk(id);

        if (!task) {
            return res.status(401).json({ message: 'Task not found' });
        }

        return res.status(200).json(task);
    }

    async findAll(req, res) {
        const defaultQuerys = { limit: 10, offset: 0, group: 'start', order: 'DESC' };
        const pageable = { limit: Number(req.query.limit) || defaultQuerys.limit, offset: Number(req.query.offset) || defaultQuerys.offset };
        const queryOrder = { order: [[req.query.group || defaultQuerys.group, req.query.order || defaultQuerys.order]] };
        const basicRoles = { where: { "user_id": req.uid, release: true } };
        const validQuerys = Object.assign(basicRoles, pageable, queryOrder);

        const tasks = await Task.findAll(validQuerys);

        return res.status(200).json(tasks);
    }

    async edit(req, res) {
        
    }

    async delete(req, res) {

    }
}

module.exports = new TaskController();