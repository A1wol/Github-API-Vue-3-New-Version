export type TContributor = {
    id: number,
    avatar_url: string,
    login: string,
    type: string,
    name: string,
    followers: number,
    location: string,
    created_at: Date,
    updated_at: Date,
    bio: string;
    [key: string]: any;
}

export type TSearchingPanelItems = {
    name: string,
    page: number,
    perPage: number,
    order: string,
    sort: string
}

export type TPerPageOption = {
    text: string,
    value: string
}

export type TRepositoryCommitList = TRepositoryCommit[]

export type TRepositoryCommit = {
    sha: number,
    author: {
        full_name: string,
        login: string,
        avatar_url: string
    },
    commit: {
        message: string,
        committer: {
            date: Date,
        }
    },
}
