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

import { exists, mapValues } from '../runtime';
import {
    OrderProduct,
    OrderProductFromJSON,
    OrderProductFromJSONTyped,
    OrderProductToJSON,
} from './';

/**
 * 
 * @export
 * @interface OrdersViewModel
 */
export interface OrdersViewModel {
    /**
     * 
     * @type {string}
     * @memberof OrdersViewModel
     */
    user: string;
    /**
     * 
     * @type {Array<OrderProduct>}
     * @memberof OrdersViewModel
     */
    products: Array<OrderProduct>;
    /**
     * 
     * @type {number}
     * @memberof OrdersViewModel
     */
    quantity: number;
    /**
     * 
     * @type {string}
     * @memberof OrdersViewModel
     */
    name: string;
}

export function OrdersViewModelFromJSON(json: any): OrdersViewModel {
    return OrdersViewModelFromJSONTyped(json, false);
}

export function OrdersViewModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): OrdersViewModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'user': json['user'],
        'products': ((json['products'] as Array<any>).map(OrderProductFromJSON)),
        'quantity': json['quantity'],
        'name': json['name'],
    };
}

export function OrdersViewModelToJSON(value?: OrdersViewModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'user': value.user,
        'products': ((value.products as Array<any>).map(OrderProductToJSON)),
        'quantity': value.quantity,
        'name': value.name,
    };
}

