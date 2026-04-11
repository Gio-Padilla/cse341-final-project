const { getAll, getSingle } = require("../controllers/packages");
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

describe("Packages Controller - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    req = {};
    res = mockRes();
  });

  it("getAll should return packages with status 200", async () => {
    const fakePackages = [{ packageId: "1" }];
    mockToArray.mockResolvedValue(fakePackages);

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakePackages);
  });

  it("getAll should return 500 if error occurs", async () => {
    mockToArray.mockRejectedValue(new Error("DB error"));

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving packages",
      error: "DB error",
    });
  });

  it("getSingle should return package with status 200", async () => {
    const req = { params: { packageId: "123" } };

    const fakePackage = { packageId: "123" };
    mockFindOne.mockResolvedValue(fakePackage);

    await getSingle(req, res);

    expect(mockFindOne).toHaveBeenCalledWith({ packageId: "123" });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getSingle should return 404 if package not found", async () => {
    const req = { params: { packageId: "123" } };

    mockFindOne.mockResolvedValue(null);

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("getSingle should return 500 if error occurs", async () => {
    const req = { params: { packageId: "123" } };

    mockFindOne.mockRejectedValue(new Error("DB error"));

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving package",
      error: "DB error",
    });
  });
});
