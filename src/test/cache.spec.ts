// modules
import app from "../index";
import chai from "chai";
import chaiHttp from "chai-http";
import fs from "fs";

// constants & configs
import { RouteConstants } from "../constants/route.constant";
import { SERVER_RESPONSE_CODES } from "../constants/server-response.constant";

// initialization
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));
const api = RouteConstants.ROUTE_API;
const data = {
  api: `${api}${RouteConstants.ROUTE_CACHE}`,
};

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Cache Controller", () => {
    const mockPatchData = {
        key: "2",
        content: "Dummy test data"
    };

    it("should remove all the cache", (done) => {
        chai
          .request(app)
          .delete(data.api)
          .end((err, res) => {
              chai
              .request(app)
              .get(data.api)
              .end((getError, getResponse) => {
                chai.expect(getResponse.body.result.length).to.equal(0);
                done();
              });
          });
    });

    it("should return status 400 if no body is provided", (done) => {
        chai
          .request(app)
          .patch(data.api)
          .end((err, res) => {
            chai.expect(res.body.responseCode).to.equal(SERVER_RESPONSE_CODES.CODE_BAD_REQUEST);
            done();
          });
    });

    it("should return max cache limit reached", (done) => {
        chai
          .request(app)
          .get(data.api)
          .end((err, res) => {
            chai.expect(res.body.result.length).to.lessThan(config.cache.maxLimit);
            done();
          });
    });

    it("should create key", (done) => {
        chai
          .request(app)
          .post(data.api)
          .send(mockPatchData)
          .end((err, res) => {
            chai.expect(res.body.result.key).to.equal(mockPatchData.key);
            done();
          });
    });

    it("should update key", (done) => {
        chai
          .request(app)
          .patch(data.api)
          .send(mockPatchData)
          .end((err, res) => {
            chai.expect(res.body.result.key).to.equal(mockPatchData.key);
            done();
          });
    });
    
    it("should create content", (done) => {
        chai
          .request(app)
          .post(data.api)
          .send(mockPatchData)
          .end((err, res) => {
            chai.expect(res.body.result.content).to.equal(mockPatchData.content);
            done();
          });
    });

    it("should update content", (done) => {
        chai
          .request(app)
          .patch(data.api)
          .send(mockPatchData)
          .end((err, res) => {
            chai.expect(res.body.result.content).to.equal(mockPatchData.content);
            done();
          });
    });
});
