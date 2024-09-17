const schemas = require('../models/models.js');

//Good Luck//
const controller = {
	async login(req, res, next) {
		console.log('in login middleware');

		let result = await schemas.people.find({ ...req.body });
		// console.log(result);
		if (result.length === 0) {
			res.status(400).send('Username or password is incorrect');
		} else {
			res.locals.people = result;
			next();
		}
	},

	async signup(req, res, next) {
		console.log('in signup middleware');
		const data = await schemas.people.create({ ...req.body });
		console.log(data);
		next();
	},

	async isUnique(req, res, next) {
		console.log('in isUnique middleware');

		const result = await schemas.people.findOne({
			username: req.body.username,
		});
		if (result === null) {
			next();
		} else {
			res.status(400).send('Username already exists');
		}
	},

	async createList(req, res, next) {
		console.log('in createList middleware');
		const data = await schemas.list.create({ title: ' ', taskArr: [] });
		console.log(data);
		res.locals._id = data._id;
		// console.log(data);
		next();
	},
	async saveUserList(req, res, next) {
		const { title, task, _id, username } = await req.body;
		try {
		  const updatedUser = await schemas.people.findOneAndUpdate(
			{ username },
			{ $push: { lists: { title, task, _id, submit: true } } },
			{ new: true }
		  );
		  res.locals.updatedList = updatedUser;
		  next();
		} catch (err) {
		  console.log(err)
		}
	  },
	async saveList(req, res, next) {
		console.log('in saveList middleware');
		const { title, tasks, _id } = req.body;
		const updated = await schemas.list.updateOne(
			{ _id },
			{ title, taskArr: tasks },
			{ new: true }
		);
		res.locals.updated = updated;
		next();
	},

	async deleteList(req, res, next) {
		const { updatedList ,username} = req.body;

		const deleted = await schemas.people.findOneAndUpdate({username}, {lists: updatedList});
		console.log(deleted);
		next();
	},
	async deleteAllLists(req, res, next) {
		console.log('inside async deleteall')
		const {username} = req.body;
		const deleted = await schemas.people.findOneAndUpdate({username}, {lists: []});
		console.log(deleted);
		next();
	},

	async addTask(req, res, next) {
		const { _id, task, username } = req.body;
		await schemas.User.findOne({ username: username }).then((doc) => {
			if (doc) {
				console.log('user document found in db matching username');
				// //then find list by _id
				// //then push task into found list
				// doc.foundList.taskArr.push(task);
				// console.log('try to push newTask');
				// doc.save();
				// console.log('try to save doc');
				// res.status(200).json(doc);
			}
			return next();
		});
	},

	async editTask(req, res, next) {
		const { _id, task, newTask } = req.body;
		const list = schemas.list.findOne({ _id });
		list.taskArr.forEach((el) => {
			if (el.task === task) {
				el.task = newTask;
			}
		});
	},

	async deleteTask(req, res, next) {
		const { _id, task } = req.body;

		const currentData = await schemas.list.findOne({ _id });
		const updated = await schemas.list.updateOne(
			{ _id },
			{ taskArr: currentData.taskArr.filter((obj) => obj.task !== task) }
		);
		console.log(currentData);
		next();
	},

	async moveTask(req, res, next) {
		const { idOriginal, idNew, task } = req.body;
		const originalList = await schemas.list.findOne({ _id: idOriginal });
		let taskObject = originalList.taskArr.filter((obj) => obj.task === task);
		// console.log(originalList)
		// console.log(taskObject[0])
		const newList = await schemas.list.findOne({ _id: idNew });
		// // console.log(newList)
		const removedFromOriginal = await schemas.list.updateOne(
			{ _id: idOriginal },
			{ taskArr: originalList.taskArr.filter((obj) => obj.task !== task) }
		);
		// console.log(removedFromOriginal)
		const addedToNew = await schemas.list.updateOne(
			{ _id: idNew },
			{ taskArr: [...newList.taskArr, taskObject[0]] }
		);
		// // console.log(addedToNew)
		next();
	},

	//add functionality to check if username exists
	async assignUser(req, res, next) {
		const { username, _id, task } = req.body;
		const list = await schemas.list.findOne({ _id });
		list.taskArr.forEach((obj) => {
			if (obj.task === task) {
				obj.assignedUser = username;
			}
		});
		const updated = await schemas.list.updateOne(
			{ _id },
			{ taskArr: list.taskArr }
		);
		next();
	},

	async unassignUser(req, res, next) {
		const { _id, task } = req.body;

		const list = await schemas.list.findOne({ _id });
		list.taskArr.forEach((obj) => {
			if (obj.task === task) {
				delete obj.assignedUser;
			}
		});
		const updated = await schemas.list.updateOne(
			{ _id },
			{ taskArr: list.taskArr }
		);
		next();
	},

	async home(req, res, next) {
		const data = await schemas.list.find({});
		res.locals.lists = data;
		next();
	},

	async changeTitle(req, res, next) {
		const { _id, newTitle } = req.body;
		await schemas.list.updateOne(
			{ _id: _id },
			{ title: newTitle },
			function (err, docs) {
				if (err) {
					console.log(err);
				} else {
					console.log('Updated Docs : ', docs);
				}
			}
		);
	},
};
module.exports = controller;
