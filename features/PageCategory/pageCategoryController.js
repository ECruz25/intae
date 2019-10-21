const PageCategory = require('./PageCategory');
const Page = require('../Page/Page');

exports.create = async (req, res) => {
  try {
    const category = new PageCategory({ ...req.body });
    console.log(req.body);
    await category.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getAll = async (req, res) => {
  try {
    const response = await PageCategory.find()
      .populate({
        path: 'pages',
        select: 'name'
      })
      .exec();
    res.send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.get = async (req, res) => {
  try {
    const response = await PageCategory.findById(req.params.id);
    res.send(response);
  } catch (error) {}
  console.log(error);
  res.sendStatus(500);
};

exports.delete = async (req, res) => {
  try {
    const page = await PageCategory.findByIdAndDelete(req.body._id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
