const { getAll, getSingle } = require("../controllers/users");
const mongodb = require("../data/database");

jest.mock("../data/database");

const mockToArray = jest.fn();
const mockFind = jest.fn(() => ({ toArray: mockToArray }));
const mockFindOne = jest.fn();

const mockCollection = jest.fn(() => ({
  find: mockFind,
  findOne: mockFindOne,
}));

const mockDb = jest.fn(() => ({
  collection: mockCollection,
}));

mongodb.getDatabase.mockReturnValue({
  db: mockDb,
});

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn();
  return res;
};

describe("Users Controller - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    req = {};
    res = mockRes();
  });

  it("getAll should return users with status 200", async () => {
    const fakeUsers = [{ userId: "1" }, { userId: "2" }];
    mockToArray.mockResolvedValue(fakeUsers);

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeUsers);
  });

  it("getAll should return 500 if error occurs", async () => {
    mockToArray.mockRejectedValue(new Error("DB error"));

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving users",
      error: "DB error",
    });
  });

  it("getSingle should return user with status 200", async () => {
    const req = { params: { userId: "123" } };

    const fakeUser = { userId: "123" };
    mockFindOne.mockResolvedValue(fakeUser);

    await getSingle(req, res);

    expect(mockFindOne).toHaveBeenCalledWith({ userId: "123" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeUser);
  });

  it("getSingle should return 404 if user not found", async () => {
    const req = { params: { userId: "123" } };

    mockFindOne.mockResolvedValue(null);

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("getSingle should return 500 if error occurs", async () => {
    const req = { params: { userId: "123" } };

    mockFindOne.mockRejectedValue(new Error("DB error"));

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving user",
      error: "DB error",
    });
  });
});
