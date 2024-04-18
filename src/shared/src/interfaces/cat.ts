/*
 Cat interfaces
 */
export interface Cat {
    id: string;
    images: string[];
    title: string;
    date: Date;
    rating: number;
    rating_count: number;
    rating_sum: number;
}
// INFO - make nonsense to use key cats. Just return array of cats
export interface CatsResponse {
    cats: Array<Cat>;
}
export interface RandomCatResponse extends Cat {}
// TODO naming (used in FE)
export interface ListTopCats extends CatsResponse {}

/*
 Rate interfaces
 */
export interface RateCatPayload {
    id: string;
    rating: number;
}
export interface RateCatResponse extends Cat {
    success: boolean;
}
