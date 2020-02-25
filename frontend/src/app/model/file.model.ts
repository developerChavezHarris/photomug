export class File {
    id:  any;
    likes: number;
    album: string;


    constructor(file?) {
        file = file || {};
        this.id = file.id || 0;
        this.likes = file.likes || 0;
        this.album = file.album || '';
    }

}