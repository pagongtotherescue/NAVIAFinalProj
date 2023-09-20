export class Post {
    constructor(
        public title: string,
        public imagePath: string,
        public description: string,
        public author: string,
        public dateCreated: Date) {
        
    }
}