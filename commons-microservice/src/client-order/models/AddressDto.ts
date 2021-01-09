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
/**
 * 
 * @export
 * @interface AddressDto
 */
export interface AddressDto {
    /**
     * 
     * @type {string}
     * @memberof AddressDto
     */
    paymentMethod: string;
    /**
     * 
     * @type {string}
     * @memberof AddressDto
     */
    postalCode: string;
    /**
     * 
     * @type {string}
     * @memberof AddressDto
     */
    country: string;
    /**
     * 
     * @type {string}
     * @memberof AddressDto
     */
    street: string;
}

export function AddressDtoFromJSON(json: any): AddressDto {
    return AddressDtoFromJSONTyped(json, false);
}

export function AddressDtoFromJSONTyped(json: any, ignoreDiscriminator: boolean): AddressDto {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'paymentMethod': json['paymentMethod'],
        'postalCode': json['postalCode'],
        'country': json['country'],
        'street': json['street'],
    };
}

export function AddressDtoToJSON(value?: AddressDto | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'paymentMethod': value.paymentMethod,
        'postalCode': value.postalCode,
        'country': value.country,
        'street': value.street,
    };
}

