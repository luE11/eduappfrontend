export interface CreateUser {
    roles: number[],
    programmeId: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    email: string,
    phoneNumber: string,
    address: string
}