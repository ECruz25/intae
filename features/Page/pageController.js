const Page = require('./Page.js');
const PageCategory = require('../PageCategory/PageCategory');

exports.create = async (req, res) => {
  try {
    const page = new Page({ ...req.body });
    await page.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  try {
    const page = await Page.findByIdAndUpdate(req.body._id, {
      content: req.body.content,
      title: req.body.title
    });
    await page.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.get = async (req, res) => {
  try {
    const response = await Page.findById(req.params.id);
    res.send(response);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getByCategory = async (req, res) => {
  const response = await Page.find({ category: req.params.id });
  res.send(response);
};

exports.getAll = async (req, res) => {
  const response = await Page.find().populate('category');
  res.send(response);
};

exports.getMainPage = async (req, res) => {
  try {
    const response = await Page.find({ title: process.env.MAIN_PAGE_KEY });
    res.send(response);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.updateMainPage = async (req, res) => {
  try {
    const page = await Page.findOneAndUpdate(
      { title: process.env.MAIN_PAGE_KEY },
      {
        content: req.body.content
      }
    );
    await page.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deletePage = async (req, res) => {
  try {
    const page = await Page.findByIdAndDelete(req.body._id);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
