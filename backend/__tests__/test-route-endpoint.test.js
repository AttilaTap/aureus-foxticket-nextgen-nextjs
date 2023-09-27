let request = require("supertest");
import server from "../server.js";

describe("Get isAvailable", () => {
  it("should provide 200 status", (done) => {
    request(server).get("/isAvailable").expect(200, done);
  });

  afterAll(function () {
    server.close();
  });
});
