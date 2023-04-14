export type TContributorList = TContributor[]

export type TContributor = {
    avatar_url: string,
    login: string,
    type: string,
    name: string,
    followers: number,
    location: string,
    created_at: string,
    updated_at: string,
    bio: string
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