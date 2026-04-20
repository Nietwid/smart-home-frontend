export type CreateApiResponse<T> = {
    status: number;
    data: T;
};
export type UpdateApiResponse<T> = {
    status: number;
    data: T;
};
export type ReadApiResponse<T> = {
    status: number;
    data: T;
};
export type DeleteApiResponse = {
    status: number;
};