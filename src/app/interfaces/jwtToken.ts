export interface JwtToken {
    jwttoken: string,
    id?: number,
    username?: string,
    roles?: [ string ],
    tokenExpirationDate: Date,
    _links: {}
}