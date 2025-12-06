export type DBComment = {
    commentid: number;
    username?: string;
    website?: string;
    message?: string;
    category?: string;
    createdtime?: Date;
}
export type DBArticle = {
    id: number;
    slug: string;
    title: string;
    articlecontent: string;
    tags?: string;
    created?: string;
    edited?: string;
    epistemicstatus?: string;
    completionstatus?: string;
    hidden?: boolean;
}
export type UIArticle = {
    id: number;
    slug: string;
    title: string;
    articlecontent: string;
    tags?: string[];
    created?: Date;
    edited?: Date;
    epistemicstatus?: string;
    completionstatus?: string;
    hidden?: boolean;
}
export type DBMusicAlbum = {
  id: number;
  title: string;
  image?: string;
  description?: string;
  genre?: string;
  artist?: string;
  year?: string;
  tags?: string;
  lettergrade?: string;
  rankOrder?: number;
  hidden?: boolean;
}