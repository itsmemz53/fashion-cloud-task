// utilities
import appUtils from "../utils/app.utils";

// models
import CacheModel from "../models/cache.model";

// constants & config
import { SERVER_RESPONSE_MESSAGES } from "../constants/server-response.constant";

class CacheService {

    public async createOrUpdate({ key, content }: any) {
        let cache: any = await CacheModel.findOne({ key }).exec();
        if (cache) {
            cache.content = content;
            cache.modifiedAt = new Date();
            cache.save();
        } else {
            cache = await CacheModel.create({ key, content });
        }
        return cache;
    }

    // if key do not exist, create a new key with TTL
    public async get(key: string) {
        const response = {
            message: "",
            content: "",
        };
        const newContent = appUtils.generateRandomString();
        let cache: any = await CacheModel.findOne({ key }).exec();
        if (cache) {
            if (Date.parse(cache.modifiedAt) + (cache.ttl * 1000) < Date.now()) {
                cache.content = newContent;
                cache.save();
                response.message = SERVER_RESPONSE_MESSAGES.CACHE_MISS;
            } else {
                response.message = SERVER_RESPONSE_MESSAGES.CACHE_HIT;
            }
        } else {
            cache = await CacheModel.create({ key, content: newContent });
            response.message = SERVER_RESPONSE_MESSAGES.CACHE_MISS;
        }
        response.content = cache.content;
        return response;
    }

    public async getAll() {
        const list = await CacheModel.find().exec();
        return list;
    }

    public async keys() {
        const list = await CacheModel.find({}).exec();
        return list;
    }

    public async remove(key: string) {
        const remove = await CacheModel.remove({ key }).exec();
        return remove;
    }

    public async removeAll() {
        const removeAll = await CacheModel.remove({}).exec();
        return removeAll;
    }

}

export default new CacheService();
