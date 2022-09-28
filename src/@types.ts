export interface ExeptionContract {
    status: number;
    title: string;
    message: string;
}

export interface PaginationMetaContract {
    totalItems: number,
    itemCount: number,
    itemsPerPage: number,
    totalPages: number,
    currentPage: number,
}

export type RoleType = 'ADMIN' | 'USER' | 'GUEST';