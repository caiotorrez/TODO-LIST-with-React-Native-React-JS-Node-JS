const { Task } = require('../models');
const { User } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

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
                return res.status(401).json('Task not found');
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
        const today = req.query.startDate || moment().format('YYYY-MM-DD');
        const tomorrow = req.query.endDate || moment().add(1, 'days').format('YYYY-MM-DD');
        const defaultQuerys = { limit: 10, offset: 0, group: 'start', order: 'DESC' };
        const pageable = { limit: Number(req.query.limit) || defaultQuerys.limit, offset: Number(req.query.offset) || defaultQuerys.offset };
        const queryOrder = { order: [[req.query.group || defaultQuerys.group, req.query.order || defaultQuerys.order]] };
        const basicRoles = { where: { "user_id": req.uid, release: true, start: { [Op.between]: [today, tomorrow] } } };
        const validQuerys = Object.assign(basicRoles, pageable, queryOrder);

        const tasks = await Task.findAll(validQuerys);

        return res.status(200).json(tasks);
    }

    async edit(req, res) {
        const { title, start, end, description, active, completed } = req.body;
        const { id } = req.params;

        await Task.update({ title, start, end, description, active, completed }, { where: { "user_id": req.uid, id, release: true } }).then((status) => {
            if (status != 0) {
                res.status(200).json('updated');
            } else {
                res.status(400).json('not updated');
            }
        });
    }

    async delete(req, res) {
        const { id } = req.params;

        await Task.update({ release: false }, { where: { id, "user_id": req.uid, release: true } }).then((status) => {
            if (status != 0) {
                res.status(201);
            } else {
                res.status(404).json('not found');
            }
        });
    }
}

module.exports = new TaskController();