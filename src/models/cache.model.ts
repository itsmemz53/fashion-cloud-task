// modules
import mongoose from "mongoose";

// services & utils
import appUtils from "../utils/app.utils";

const Schema = mongoose.Schema;
const CacheSchema = new Schema({
	key: {
		type: String,
		trim: true,
		index: true
	},
	ttl: {
		type: Number,
		default: appUtils.getCacheTtl()
	},
	content: {
		type: String,
		default: appUtils.generateRandomCacheValue() // generates a random String
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
		index: true
	},
	createdAt: {
		type: Date,
		default: Date.now,
		index: true
	}
}, {
	collection: "cache"
});

CacheSchema.pre("save", appUtils.validateCacheRecord);

export default mongoose.model("Cache", CacheSchema);
