const { getAll, getByUserId, getSingle } = require("../controllers/bookings"); 
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

describe("Bookings Controller - Unit Tests", () => {
  let req, res;

  beforeEach(() => {
    jest.clearAllMocks();
    req = {};
    res = mockRes();
  });

  it("should return all bookings with status 200", async () => {
    const fakeBookings = [{ id: 1 }, { id: 2 }];
    mockToArray.mockResolvedValue(fakeBookings);

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeBookings);
  });

  it("should return 500 if error occurs in getAll", async () => {
    mockToArray.mockRejectedValue(new Error("DB error"));

    await getAll(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving bookings",
      error: "DB error",
    });
  });

  it("should return one booking by bookingId with status 200", async () => {
    const req = { params: { bookingId: "123" } };

    const fakeBooking = { bookingId: "123" };
    mockFindOne.mockResolvedValue(fakeBooking);

    await getSingle(req, res);

    expect(mockFindOne).toHaveBeenCalledWith({ bookingId: "123" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeBooking);
  });

  it("should return 404 if booking not found", async () => {
    const req = { params: { bookingId: "123" } };

    mockFindOne.mockResolvedValue(null);

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking not found",
    });
  });

  it("should return 500 if error occurs in getSingle", async () => {
    req.params = { bookingId: "123" };

    mockFindOne.mockRejectedValue(new Error("DB error"));

    await getSingle(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving booking",
      error: "DB error",
    });
  });

  it("should return bookings by userId with status 200", async () => {
    const req = { params: { userId: "123" } };

    const fakeBookings = [{ userId: "123" }];
    mockToArray.mockResolvedValue(fakeBookings);

    await getByUserId(req, res);

    expect(mockFind).toHaveBeenCalledWith({ userId: "123" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeBookings);
  });

  it("should return 404 if no bookings found for user", async () => {
    const req = { params: { userId: "123" } };

    mockToArray.mockResolvedValue([]);

    await getByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "No bookings found for this user",
    });
  });

  it("should return 500 if error occurs in getByUserId", async () => {
    const req = { params: { userId: "123" } };

    mockToArray.mockRejectedValue(new Error("DB error"));

    await getByUserId(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Error retrieving user bookings",
      error: "DB error",
    });
  });
});
