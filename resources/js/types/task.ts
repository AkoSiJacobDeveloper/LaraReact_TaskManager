export type Task = {
    id: number,
    title: string,
    description: string,
    due_date: string | null,
    status: 'pending' | 'finished',
    is_overdue: boolean,
    created_at: string;
    updated_at: string;
}

export type PaginatedData<T> = {
    data: T[];
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export type PageProps = {
    tasks: PaginatedData<Task>;
    filter: 'all' | 'pending' | 'finished';
}
