import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  currentIndex = 1;
  isTransitioning = true;


  touchStartX = 0;
touchEndX = 0;
minSwipeDistance = 50; 

  baseReviews = [
    { name: 'Nihal R. G', time: '3 weeks ago', text: 'We had a wonderful stay in Shivrati vilas Udaipur. The property was very good with spacious, well-ventilated rooms that made our stay extremely comfortable. There was ample parking space, which was very convenient. One of the highlights was the beautiful lawn where we enjoyed our dinner—it added a lovely charm to the evening. The food was absolutely delicious, and overall, we truly enjoyed our stay. Highly recommended for a relaxing and pleasant experience in Udaipur.' },
    { name: 'Arpita Guha', time: '1 month ago', text: 'Stayed here with my family for 2 days and honestly this place is a whole vibe Super peaceful, beautiful property with that royal heritage feel. Rooms were spotless, cozy and super comfortable. Hospitality = 100/10. The staff and owners are insanely sweet, polite and sooo helpful. Food was chef’s kiss literally felt like home cooked comfort food. And the cutest thing? They even gave us fresh guavas from their own tree.Overall, perfect place to chill, relax and enjoy quality time with family. Great vibes, super clean, amazing people. Totally recommend! 🙌' },
    { name: 'Manpreet Sarao', time: '1 month ago', text: 'Stayed at this awesome place on christmas eve with family… this place exceeded every expectations i had… host was so warm and welcoming …did everything that made are stayed more than comfortable.. a must book hotel when in udaipur..' },
    { name: 'Helly Vasani', time: '3 weeks ago', text: 'It was an amazing stay with my friends here in Udaipur. Love the ambience, property and environment. The family is very friendly and welcoming. Much appreciate the services around.Tagging my favourite corner of the property here 😅🙏🏻' },
    { name: 'Hp Pujara', time: '2 months ago', text: 'Beautiful place...very calm n peaceful country side... excellent service and the property owners are very humble n down to earth people... Awesome experience!' }
  ];

  // 👇 clone last + first
  reviews = [
    this.baseReviews[this.baseReviews.length - 1],
    ...this.baseReviews,
    this.baseReviews[0]
  ];

  next() {
    this.isTransitioning = true;
    this.currentIndex++;
  }

  prev() {
    this.isTransitioning = true;
    this.currentIndex--;
  }

  onTransitionEnd() {
    if (this.currentIndex === this.reviews.length - 1) {
      this.isTransitioning = false;
      this.currentIndex = 1;
    }

    if (this.currentIndex === 0) {
      this.isTransitioning = false;
      this.currentIndex = this.reviews.length - 2;
    }
  }

  onTouchStart(event: TouchEvent) {
  this.touchStartX = event.changedTouches[0].screenX;
}

onTouchMove(event: TouchEvent) {
  this.touchEndX = event.changedTouches[0].screenX;
}

onTouchEnd() {
  const distance = this.touchStartX - this.touchEndX;

  if (Math.abs(distance) > this.minSwipeDistance) {
    if (distance > 0) {
      this.next(); // swipe left
    } else {
      this.prev(); // swipe right
    }
  }

  this.touchStartX = 0;
  this.touchEndX = 0;
}
}
