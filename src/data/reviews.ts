export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    author: "Kieran Osborne",
    rating: 5,
    date: "7 years ago",
    text: "Excellent service from Mark. He completed some building work and repairs at my property and I was very impressed with the quality of work and professionalism. Would highly recommend!",
    avatar: "KO",
  },
];

export const averageRating = 5.0;
export const totalReviews = 1;
