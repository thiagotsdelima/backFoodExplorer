const UserCreateService = require("./UserCreateService");
const UserRpositoryInMemory = require("../repositories/UserRpositoryInMemory");
const AppError = require('../utils/AppError')

describe("userCreateService", () => {
let userRpositoryInMemory = null;
let userCreateService = null;

beforeEach(() => {
userRpositoryInMemory = new UserRpositoryInMemory();
userCreateService = new UserCreateService(userRpositoryInMemory);
});

it("user should be create", async () => {
const user = {
name: "User Test",
email: "[user@test.com](mailto:user@test.com)",
password: "123"
};

const userCreate = await userCreateService.execute(user);

expect(userCreate).toHaveProperty("id");

});

it("user not should be create with exists email", async () => {

const user1 = {
name: "User Test 1",
email: "[user@test.com](mailto:user@test.com)",
password: "123"
};

const user2 = {
name: "User Test 2",
email: "[user@test.com](mailto:user@test.com)",
password: "456"
};

await userCreateService.execute(user1);
await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Este email já está em uso."))
});

})