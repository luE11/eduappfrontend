import { Person } from "../person"

export interface UserArray {
    personList: Person[],
    totalPages: number,
    totalRecords: number,
    _links: {}
}