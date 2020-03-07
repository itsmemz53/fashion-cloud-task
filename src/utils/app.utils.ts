// modules
import fs from "fs";

// initializations
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

class AppUtils {

    public getTTLFromConfig(): number {
        return config.cache.ttl;
    }

    public generateRandomString(): string {
        return (Math.random() + 1).toString(16).substring(7) + (+new Date).toString();
    }

    public validateCache(next: any) {
        const self: any = this;
        self.modifiedAt = new Date();
        if (!self.isNew) {
            return next();
        }
        self.model("Cache").count({}, (error: any, count: any) => {
            if (count + 1 > config.cache.maxLimit) {
                self.model("Cache")
                    .findOne({}, {
                        _id: 1
                    })
                    .sort({
                        modifiedAt: 1
                    }).exec((err: any, cache: any) => {
                        self.isNew = false;
                        self._id = cache._id;
                        self.createdAt = new Date();
                        self.modifiedAt = new Date();
                        next();
                    });
            } else {
                next();
            }
        });
    }
}

export default new AppUtils();
