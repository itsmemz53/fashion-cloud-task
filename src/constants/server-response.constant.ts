export const SERVER_RESPONSE_CODES = {
    CODE_SUCCESS: 200,
    CODE_UNAUTHORIZED: 401,
    CODE_INTERNAL_SERVER_ERROR: 500,
    CODE_BAD_REQUEST: 400,
    CODE_OBJECT_NOT_FOUND: 404
};

export const SERVER_RESPONSE_MESSAGES = {
    // success messages
    SUCCESS: "Request Completed Successfully",

    // default messages
    CACHE_MISS : "Cache Miss!",
    CACHE_HIT : "Cache Hit!",

    // failure messages
    DEFAULT_ERROR: "An error has occurred",
    INVALID_OPERATION: "Operation is not valid on the requested object",
    VALIDATION_ERROR: "Failed to validate the object",
    SERVER_ERROR: "Some internal error has occurred",
    UNAUTHORIZED_ACCESS: "You are not authorized to access this resource",
};
