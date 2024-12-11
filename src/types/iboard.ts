export interface IBoard {
    bno: number,
    title: string,
    writer: string,
    regDate: string
}

export interface IBoardRead{
    title: string,
    writer: string,
    regDate: string,
    content: string
    attachFileNames: string[]
}

export interface IBoardReadWithReview extends IBoardRead{
    reviewList: IReview[]
}

export interface IBoardModify extends IBoardRead{
    oldFileNames: string[]
}

export interface IReview {
    rno: number,
    reviewer: string,
    regDate: string,
    content: string,
}