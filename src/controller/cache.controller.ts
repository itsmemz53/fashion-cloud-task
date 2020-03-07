// modules
import { Request, Response } from "express";

// services
import responseHandler from "../handlers/response.handler";
import cacheService from "../services/cache.service";

// constants & configs
import {
  SERVER_RESPONSE_CODES,
  SERVER_RESPONSE_MESSAGES
} from "../constants/server-response.constant";

class CacheController {
    public async get(request: Request, response: Response) {
        const key = request.params.key;
        if (key) {
            try {
                const cache = await cacheService.get(key);
                response.send(responseHandler.success(cache));
            } catch (err) {
                response.send(responseHandler.error(err));
            }
        } else {
            response.send(
                responseHandler.error(
                null,
                SERVER_RESPONSE_CODES.CODE_BAD_REQUEST,
                SERVER_RESPONSE_MESSAGES.INVALID_OPERATION
                )
            );
        }
    }

    public async getAll(request: Request, response: Response) {
        try {
            const list = await cacheService.getAll();
            response.send(responseHandler.success(list));
        } catch (err) {
            response.send(responseHandler.error(err));
        }
    }

    public async keys(request: Request, response: Response) {
        try {
            const keys = await cacheService.keys();
            response.send(responseHandler.success(keys));
        } catch (err) {
            response.send(responseHandler.error(err));
        }
    }

    public async createOrUpdate(request: Request, response: Response) {
        const body = request.body;
        if (body && body.key && body.content) {
            try {
                const cache = await cacheService.createOrUpdate(body);
                response.send(responseHandler.success(cache));
            } catch (err) {
                response.send(responseHandler.error(err));
            }
        } else {
            response.send(
                responseHandler.error(
                null,
                SERVER_RESPONSE_CODES.CODE_BAD_REQUEST,
                SERVER_RESPONSE_MESSAGES.INVALID_OPERATION
                )
            );
        }
    }

    public async delete(request: Request, response: Response) {
        const key = request.params.key;
        if (key) {
            try {
                const cache = await cacheService.remove(key);
                response.send(responseHandler.success(cache));
            } catch (err) {
                response.send(responseHandler.error(err));
            }
        } else {
            response.send(
                responseHandler.error(
                null,
                SERVER_RESPONSE_CODES.CODE_BAD_REQUEST,
                SERVER_RESPONSE_MESSAGES.INVALID_OPERATION
                )
            );
        }
    }

    public async deleteAll(request: Request, response: Response) {
        try {
            const cache = await cacheService.removeAll();
            response.send(responseHandler.success(cache));
        } catch (err) {
            response.send(responseHandler.error(err));
        }
    }
}

export default new CacheController();