export interface Person {
    id: number,
    firstName: string,
    lastName: string,
    birthDate?: Date | null,
    email?: string | null,
    phoneNumber?: string | null,
    address?: string | null,
    _links: {}
}