import { SERVER_RESPONSE_CODES, SERVER_RESPONSE_MESSAGES } from "../constants/server-response.constant";
import { ServerResponse } from "../models/server-response.model";

class ResponseHandler {
    public success(data: any) {
        return new ServerResponse(
            data,
            SERVER_RESPONSE_CODES.CODE_SUCCESS,
            SERVER_RESPONSE_MESSAGES.SUCCESS
        );
    }

    public error(error: any, errorCode?: number, errorMessage?: string) {
        return new ServerResponse(
            error,
            errorCode || SERVER_RESPONSE_CODES.CODE_BAD_REQUEST,
            errorMessage || SERVER_RESPONSE_MESSAGES.DEFAULT_ERROR
        );
    }
}

export default new ResponseHandler();
