const { hash, compare } = require("bcryptjs")
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");
const UserCreateService = require("../services/UserCreateService");

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;
    
    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);
    await userCreateService.execute({ name, email, password });
    
    return response.status(201).json();
    }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex('users').where({ id: user_id }).first();
   
    if (!user) {
      throw new AppError("User not found");
    }

    if (email && email !== user.email) {
      const userWithUpdateEmail = await knex('users').where({ email }).first();
      if (userWithUpdateEmail) {
        throw new AppError("This email is already in use.");
      }
    }

    const updatedUser = {
      name: name ?? user.name,
      email: email ?? user.email,
    };

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("Old password does not match.");
      }
      updatedUser.password = await hash(password, 8);
    } else if (password && !old_password) {
      throw new AppError("You need to enter the old password to set the new password.");
    }

    await knex('users').where({ id: user_id }).update(updatedUser);
    
    return response.status(204).send();
  }
}

module.exports = UsersController;