/* tslint:disable */
/* eslint-disable */
/**
 * order-microservice
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import {
    ErrorResponseEmpty,
    ErrorResponseEmptyFromJSON,
    ErrorResponseEmptyToJSON,
    ErrorResponseOrderDtoArray,
    ErrorResponseOrderDtoArrayFromJSON,
    ErrorResponseOrderDtoArrayToJSON,
    ErrorResponseOrderEventUnionArray,
    ErrorResponseOrderEventUnionArrayFromJSON,
    ErrorResponseOrderEventUnionArrayToJSON,
    ErrorResponseString,
    ErrorResponseStringFromJSON,
    ErrorResponseStringToJSON,
    InlineObject,
    InlineObjectFromJSON,
    InlineObjectToJSON,
    OrdersAddresPaymentWriteModel,
    OrdersAddresPaymentWriteModelFromJSON,
    OrdersAddresPaymentWriteModelToJSON,
    OrdersViewModel,
    OrdersViewModelFromJSON,
    OrdersViewModelToJSON,
} from '../models';

export interface AcceptRefundRequest {
    cause: string;
    id: string;
}

export interface AddRequest {
    ordersViewModel: OrdersViewModel;
}

export interface AddressRequest {
    id: string;
    ordersAddresPaymentWriteModel: OrdersAddresPaymentWriteModel;
}

export interface ListRequest {
    id: string;
    type: ListTypeEnum;
}

export interface PayRequest {
    amount: number;
    method: string;
    id: string;
}

export interface RefundRequest {
    cause: string;
    id: string;
}

export interface SendRequest {
    inlineObject: InlineObject;
}

/**
 * 
 */
export class DefaultApi extends runtime.BaseAPI {

    /**
     */
    async acceptRefundRaw(requestParameters: AcceptRefundRequest): Promise<runtime.ApiResponse<ErrorResponseEmpty>> {
        if (requestParameters.cause === null || requestParameters.cause === undefined) {
            throw new runtime.RequiredError('cause','Required parameter requestParameters.cause was null or undefined when calling acceptRefund.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling acceptRefund.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.cause !== undefined) {
            queryParameters['cause'] = requestParameters.cause;
        }

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/order/acceptRefund`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseEmptyFromJSON(jsonValue));
    }

    /**
     */
    async acceptRefund(requestParameters: AcceptRefundRequest): Promise<ErrorResponseEmpty> {
        const response = await this.acceptRefundRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async addRaw(requestParameters: AddRequest): Promise<runtime.ApiResponse<ErrorResponseString>> {
        if (requestParameters.ordersViewModel === null || requestParameters.ordersViewModel === undefined) {
            throw new runtime.RequiredError('ordersViewModel','Required parameter requestParameters.ordersViewModel was null or undefined when calling add.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/order/add`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrdersViewModelToJSON(requestParameters.ordersViewModel),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseStringFromJSON(jsonValue));
    }

    /**
     */
    async add(requestParameters: AddRequest): Promise<ErrorResponseString> {
        const response = await this.addRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async addressRaw(requestParameters: AddressRequest): Promise<runtime.ApiResponse<ErrorResponseEmpty>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling address.');
        }

        if (requestParameters.ordersAddresPaymentWriteModel === null || requestParameters.ordersAddresPaymentWriteModel === undefined) {
            throw new runtime.RequiredError('ordersAddresPaymentWriteModel','Required parameter requestParameters.ordersAddresPaymentWriteModel was null or undefined when calling address.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/order/address`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: OrdersAddresPaymentWriteModelToJSON(requestParameters.ordersAddresPaymentWriteModel),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseEmptyFromJSON(jsonValue));
    }

    /**
     */
    async address(requestParameters: AddressRequest): Promise<ErrorResponseEmpty> {
        const response = await this.addressRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async allRaw(): Promise<runtime.ApiResponse<ErrorResponseOrderDtoArray>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/order/all`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseOrderDtoArrayFromJSON(jsonValue));
    }

    /**
     */
    async all(): Promise<ErrorResponseOrderDtoArray> {
        const response = await this.allRaw();
        return await response.value();
    }

    /**
     */
    async allAdminRaw(): Promise<runtime.ApiResponse<ErrorResponseOrderDtoArray>> {
        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/order/admin/all`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseOrderDtoArrayFromJSON(jsonValue));
    }

    /**
     */
    async allAdmin(): Promise<ErrorResponseOrderDtoArray> {
        const response = await this.allAdminRaw();
        return await response.value();
    }

    /**
     */
    async listRaw(requestParameters: ListRequest): Promise<runtime.ApiResponse<ErrorResponseOrderEventUnionArray>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling list.');
        }

        if (requestParameters.type === null || requestParameters.type === undefined) {
            throw new runtime.RequiredError('type','Required parameter requestParameters.type was null or undefined when calling list.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/events/list/{type}/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"type"}}`, encodeURIComponent(String(requestParameters.type))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseOrderEventUnionArrayFromJSON(jsonValue));
    }

    /**
     */
    async list(requestParameters: ListRequest): Promise<ErrorResponseOrderEventUnionArray> {
        const response = await this.listRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async payRaw(requestParameters: PayRequest): Promise<runtime.ApiResponse<ErrorResponseEmpty>> {
        if (requestParameters.amount === null || requestParameters.amount === undefined) {
            throw new runtime.RequiredError('amount','Required parameter requestParameters.amount was null or undefined when calling pay.');
        }

        if (requestParameters.method === null || requestParameters.method === undefined) {
            throw new runtime.RequiredError('method','Required parameter requestParameters.method was null or undefined when calling pay.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling pay.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.amount !== undefined) {
            queryParameters['amount'] = requestParameters.amount;
        }

        if (requestParameters.method !== undefined) {
            queryParameters['method'] = requestParameters.method;
        }

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/order/pay`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseEmptyFromJSON(jsonValue));
    }

    /**
     */
    async pay(requestParameters: PayRequest): Promise<ErrorResponseEmpty> {
        const response = await this.payRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async refundRaw(requestParameters: RefundRequest): Promise<runtime.ApiResponse<ErrorResponseEmpty>> {
        if (requestParameters.cause === null || requestParameters.cause === undefined) {
            throw new runtime.RequiredError('cause','Required parameter requestParameters.cause was null or undefined when calling refund.');
        }

        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling refund.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        if (requestParameters.cause !== undefined) {
            queryParameters['cause'] = requestParameters.cause;
        }

        if (requestParameters.id !== undefined) {
            queryParameters['id'] = requestParameters.id;
        }

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/order/refund`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseEmptyFromJSON(jsonValue));
    }

    /**
     */
    async refund(requestParameters: RefundRequest): Promise<ErrorResponseEmpty> {
        const response = await this.refundRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async sendRaw(requestParameters: SendRequest): Promise<runtime.ApiResponse<ErrorResponseEmpty>> {
        if (requestParameters.inlineObject === null || requestParameters.inlineObject === undefined) {
            throw new runtime.RequiredError('inlineObject','Required parameter requestParameters.inlineObject was null or undefined when calling send.');
        }

        const queryParameters: runtime.HTTPQuery = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/order/send`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: InlineObjectToJSON(requestParameters.inlineObject),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => ErrorResponseEmptyFromJSON(jsonValue));
    }

    /**
     */
    async send(requestParameters: SendRequest): Promise<ErrorResponseEmpty> {
        const response = await this.sendRaw(requestParameters);
        return await response.value();
    }

}

/**
    * @export
    * @enum {string}
    */
export enum ListTypeEnum {
    Order = 'Order'
}
