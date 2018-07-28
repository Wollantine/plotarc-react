// export type Note = {
//     title: string;
//     isA: string[];
//     belongsTo: string[];
//     has: string[];
// }

export type Note = {
    title: string;
    isA: string[];
    relatedTo: string[];
}

export type Category = {
    title: string;
    notes: string[];
}
