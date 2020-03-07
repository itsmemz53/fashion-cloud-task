// modules
import mongoose from "mongoose";

// services & utils
import appUtils from "../utils/app.utils";

const Schema = mongoose.Schema;
const CacheSchema = new Schema({
	createdAt: {
		type: Date,
		default: Date.now,
		index: true
	},
	modifiedAt: {
		type: Date,
		default: Date.now,
		index: true
	},
	key: {
		type: String,
		trim: true,
		index: true
	},
	ttl: {
		type: Number,
		default: appUtils.getTTLFromConfig()
	},
	content: {
		type: String,
		default: appUtils.generateRandomString()
	}
}, {
	collection: "cache"
});

CacheSchema.pre("save", appUtils.validateCache);

export default mongoose.model("Cache", CacheSchema);
