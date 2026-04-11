const { getAll, getSingle } = require("../controllers/destinations");
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

describe("Destinations Controller - Unit Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    req = {};
    res = mockRes();
  });

  it("getAll should return destinations with status 200", async () => {
    const fakeDestinations = [{ destinationId: "1" }];
    mockToArray.mockResolvedValue(fakeDestinations);

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeDestinations);
  });

  it("getAll should return 500 if error occurs", async () => {
    mockToArray.mockRejectedValue(new Error("DB error"));

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving destinations",
      error: "DB error",
    });
  });

  it("getSingle should return destination with status 200", async () => {
    const req = { params: { destinationId: "123" } };

    const fakeDestination = { destinationId: "123" };
    mockFindOne.mockResolvedValue(fakeDestination);

    await getSingle(req, res);

    expect(mockFindOne).toHaveBeenCalledWith({ destinationId: "123" });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("getSingle should return 404 if destination not found", async () => {
    const req = { params: { destinationId: "123" } };

    mockFindOne.mockResolvedValue(null);

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });

  it("getSingle should return 500 if error occurs", async () => {
    const req = { params: { destinationId: "123" } };

    mockFindOne.mockRejectedValue(new Error("DB error"));

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving destination",
      error: "DB error",
    });
  });
});
