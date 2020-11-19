/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Order } from './Order';

export interface OrderDto extends Order {
    status: OrderDto.status;
    id?: string;
}

export namespace OrderDto {

    export enum status {
        STARTED = 'Started',
        SENT = 'Sent',
        DERIVED = 'Derived',
        RETURNED = 'Returned',
    }


}