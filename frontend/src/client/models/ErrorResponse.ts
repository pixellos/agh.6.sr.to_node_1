/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export interface ErrorResponse {
    message: string;
    error: ErrorResponse.error;
}

export namespace ErrorResponse {

    export enum error {
        TRUE = 'true',
    }


}