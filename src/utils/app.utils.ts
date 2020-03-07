// modules
import fs from "fs";

// initializations
const config = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

class AppUtils {

    public generateRandomCacheValue(additionalString?: string): string {
        // toString parameter 16 as base
        return (Math.random() + 1).toString(16).substring(7) + additionalString;
    }

    public validateCacheRecord(next: any) {
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

    public getCacheTtl(): number {
        return config.cache.ttl;
    }

}

export default new AppUtils();
