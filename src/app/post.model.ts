export class Post {
    constructor(
        public title: string,
        public imagePath: string,
        public description: string,
        public author: string,
        public dateCreated: Date,
        public numberOfLikes: number,
        public numberOfDislikes: number = 0,
        public comments: string[] = [] ) {
        
        }    
    }