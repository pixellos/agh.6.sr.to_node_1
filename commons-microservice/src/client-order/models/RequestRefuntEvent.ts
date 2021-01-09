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
    RequestRefuntEventAllOf,
    RequestRefuntEventAllOfFromJSON,
    RequestRefuntEventAllOfFromJSONTyped,
    RequestRefuntEventAllOfToJSON,
    RequestRefuntEventAllOfWith,
    RequestRefuntEventAllOfWithFromJSON,
    RequestRefuntEventAllOfWithFromJSONTyped,
    RequestRefuntEventAllOfWithToJSON,
    UserBaseEvent,
    UserBaseEventFromJSON,
    UserBaseEventFromJSONTyped,
    UserBaseEventToJSON,
} from './';

/**
 * 
 * @export
 * @interface RequestRefuntEvent
 */
export interface RequestRefuntEvent {
    /**
     * 
     * @type {string}
     * @memberof RequestRefuntEvent
     */
    who: string;
    /**
     * 
     * @type {RequestRefuntEventAllOfWith}
     * @memberof RequestRefuntEvent
     */
    _with: RequestRefuntEventAllOfWith;
    /**
     * 
     * @type {string}
     * @memberof RequestRefuntEvent
     */
    what: RequestRefuntEventWhatEnum;
}

export function RequestRefuntEventFromJSON(json: any): RequestRefuntEvent {
    return RequestRefuntEventFromJSONTyped(json, false);
}

export function RequestRefuntEventFromJSONTyped(json: any, ignoreDiscriminator: boolean): RequestRefuntEvent {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'who': json['who'],
        '_with': RequestRefuntEventAllOfWithFromJSON(json['with']),
        'what': json['what'],
    };
}

export function RequestRefuntEventToJSON(value?: RequestRefuntEvent | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'who': value.who,
        'with': RequestRefuntEventAllOfWithToJSON(value._with),
        'what': value.what,
    };
}

/**
* @export
* @enum {string}
*/
export enum RequestRefuntEventWhatEnum {
    RefundRequested = 'RefundRequested'
}

