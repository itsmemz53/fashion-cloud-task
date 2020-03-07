// modules
import { Application } from "express";

// controllers
import cacheController from "./controller/cache.controller";

// constants & config
import { RouteConstants } from "./constants/route.constant";
export default class Routes {

    private api = RouteConstants.ROUTE_API;

    constructor(app: Application) {
        // ROUTE Create
        app.route(this.api + RouteConstants.ROUTE_CACHE).patch(cacheController.create);

        // Route GET :KEY
        app.route(this.api + RouteConstants.ROUTE_CACHE + "/:key").get(cacheController.get);

        // Route GET
        app.route(this.api + RouteConstants.ROUTE_CACHE + "/list").get(cacheController.getAll);

        // ROUTE Patch
        app.route(this.api + RouteConstants.ROUTE_CACHE + "/:key").patch(cacheController.update);

        // Route DELETE :KEY
        app.route(this.api + RouteConstants.ROUTE_CACHE + "/:key").delete(cacheController.delete);

        // Route DELETE
        app.route(this.api + RouteConstants.ROUTE_CACHE + "/all").delete(cacheController.deleteAll);
    }
}