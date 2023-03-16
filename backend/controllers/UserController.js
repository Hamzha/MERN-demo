const mongoose = require("mongoose");
const bycrypt = require("bcrypt");
const User = require('../models/user')
const JWT = require("jsonwebtoken");
// const NumberAddictionJob = require("../agenda/numberAddition")
// const NumberAdditionJobMultiple = require("../agenda/multipleAdditions")


exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(422)
      .json({ message: "Please provide email or password." });
  } else {
    try {
      const responseUser = await User.findOne({ email })
      if (responseUser) {
        const resposnePass = await bycrypt.compare(password, responseUser.password)
        NumberAddictionJob()
        // NumberAdditionJobMultiple();
        if (resposnePass) {
          const token = await JWT.sign({ _id: responseUser._id }, process.env.JWT_SECRET);
          const { _id, name, email, admin } = responseUser;
          return res.status(200).json({ token, user: { _id, name, email, admin } });
        }
        else {
          return res
            .status(422)
            .json({ message: "Invalid email or password." });
        }
      } else {
        return res
          .status(422)
          .json({ message: "Invalid email or password." });
      }
    }
    catch (err) {
      console.log(err)
      return res
        .status(422)
        .json({ message: "Please Try again!." });
    }
  }
}

exports.register = async (req, res) => {

  const { name, email, password, admin } = req.body;

  if (!email || !name || !password) {
    return res.status(422).json({ message: "Please add all parameters" });
  }
  try {
    const responseUser = await User.findOne({ email })
    if (!responseUser) {
      const user = new User({
        email,
        password,
        name,
        admin
      });
      const responseUserSaved = await user.save();
      if (responseUserSaved) {
        return res.status(200).json({ message: "user is saved!" });
      }
    } else {
      return res
        .status(422)
        .json({ message: "User already exists with that email." });
    }
  } catch (err) {
    console.log(err)
    return res
      .status(422)
      .json({ message: "Please try again." });
  }

}

exports.get_all_users = async (req, res) => {
  const responseUser = await User.find({}).select('-password');
  if (responseUser) {
    return res.status(200).json({ users: responseUser })
  }
}

exports.get_user_by_id = async (req, res) => {
  const responseUser = await User.findOne({ _id: req.params.userId }).select('-password');
  if (responseUser) {
    return res.status(200).json(responseUser)
  } else {
    return res.status(404).json({ error: "User not found!" });
  }
}

exports.edit_user = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: "Please add all parameters" });
  }
  try {
    const responseUpdateUser = await User.updateOne(
      { _id: req.body._id },
      {
        $set: {
          email: email, password: password, name: name
        }
      }
    )
    if (responseUpdateUser)
      return res.status(200).json(responseUpdateUser);

  } catch (err) {
    console.log(err)
    return res.status(400).json({ message: 'Please try Again!' })

  }
}
