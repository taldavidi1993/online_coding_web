const { User } = require('../DB/User');

exports.login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    const usersArr = await User.find({ userName: userName });

    if (usersArr.length === 0) {
      throw { status: 404, message: 'user not exist' };
    }

    for (let user of usersArr) {
      if (user.password === password) {
        return res
          .send({ userName: user.userName, admin: user.isAdmin })
          .status(200);
      }
    }

    throw { status: 401, message: 'password incorrect' };
  } catch (error) {
    next(error);
  }
};
