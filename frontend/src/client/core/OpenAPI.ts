/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
interface Config {
    BASE: string;
    VERSION: string;
    WITH_CREDENTIALS: boolean;
    TOKEN: string | (() => Promise<string>);
}

export const OpenAPI: Config = {
    BASE: '/',
    VERSION: '0.1.0',
    WITH_CREDENTIALS: false,
    TOKEN: '',
};