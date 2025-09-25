

import { Problem, ProblemType, Reward } from './types';

export const PROBLEM_SETS = {
    addition: {
        range: [2, 5],
        count: 4,
    },
    multiplication: {
        tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    },
    division: {
        tables: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    }
};

export const REWARDS_DATA: Reward[] = [
    { id: 'icecream', name: 'Ice Cream', cost: 3000, icon: '🍦' },
    { id: 'mcchicken', name: 'McChicken', cost: 6000, icon: '🍔' },
    { id: 'pizza', name: 'Pizza', cost: 15000, icon: '🍕' },
    { id: 'toy', name: 'Toy', cost: 30000, icon: '🎁' },
    { id: 'dress', name: 'New Dress', cost: 60000, icon: '👗' },
];

export const CASUAL_DIALOGUE: { speaker: 'Alien', text: string }[] = [
    { speaker: 'Alien', text: "Nia, your planet is so green! On my world, the grass is purple. What's your favorite color on Earth?" },
    { speaker: 'Alien', text: "I've been studying your 'YouTube'. The dancing cat videos are my favorite. What's the funniest video you've seen?" },
    { speaker: 'Alien', text: "On my home planet, we travel in bubble ships. Your 'cars' are very interesting. Do they float?" },
    { speaker: 'Alien', text: "Nia, I am analyzing your 'Roblox' games. Creating worlds seems very logical. What's the coolest thing you've ever built?" },
    { speaker: 'Alien', text: "The concept of 'swimming' is fascinating. Floating in liquid... for fun! I must try it. Is it cold?" },
    { speaker: 'Alien', text: "Your 'Netflix' shows have so many stories! I enjoy the ones with heroes. Who is your favorite hero?" },
    { speaker: 'Alien', text: "I have detected strange signals... I think it's from something called a 'pizza'. It smells delicious. What is it made of?" },
    { speaker: 'Alien', text: "My scanners indicate you are very good at this. Your brain processes data at an impressive speed!" },
    { speaker: 'Alien', text: "Nia, I have analyzed 'school'. You gather to collectively absorb data? Fascinating. What is your favorite 'subject'?" },
    { speaker: 'Alien', text: "Your planet's sky is leaking water today. On my world, it rains sparkling dust. Does your water-rain make rainbows?" },
    { speaker: 'Alien', text: "I have observed the small, furry quadrupeds you call 'cats'. They seem to operate on mysterious logic. Do you understand them?" },
    { speaker: 'Alien', text: "The sound waves you call 'music' are complex. Some frequencies make my antennae vibrate pleasantly. What is your favorite 'song'?" },
    { speaker: 'Alien', text: "Do humans create stories in their minds while they recharge? I have heard this is 'dreaming'. What did you dream about last night?" },
    { speaker: 'Alien', text: "You sometimes make an explosive sound of happiness called 'laughing'. What makes you laugh, Nia?" },
    { speaker: 'Alien', text: "You make images with colored sticks on paper. It's like a low-tech holographic projector. Can you draw my spaceship for my records?" },
    { speaker: 'Alien', text: "Your planet tilts, creating 'seasons'. My planet has one hot side and one cold side. Which of your 'seasons' is the best?" },
    { speaker: 'Alien', text: "These 'books' contain entire worlds made of symbols. It is an efficient data storage method. What is the best world you have visited in a book?" },
    { speaker: 'Alien', text: "From my ship, I see your star, 'Sol'. From Earth, you can see my home star. Do you ever wonder who is looking back?" },
    { speaker: 'Alien', text: "Your 'birthday' ritual, celebrating an orbit around your star, seems very joyful. How do you celebrate?" },
    { speaker: 'Alien', text: "Your dancing is an interesting expression. On my planet, we communicate joy by changing our skin color. Is dancing your happiness color?" },
    { speaker: 'Alien', text: "You carry small glowing rectangles that connect to a global data network. Mine can de-atomize space rocks. What does yours do?" },
    { speaker: 'Alien', text: "These tall green lifeforms you call 'trees'... they produce your oxygen, correct? We have crystal spires that do the same." },
    { speaker: 'Alien', text: "Your planet is mostly salt water. I have scanned its depths and found lifeforms that glow. A galaxy under the water!" },
    { speaker: 'Alien', text: "I observe humans kicking a sphere into a net. This 'soccer' game is a test of physics and strategy. Are you a player?" },
    { speaker: 'Alien', text: "The social bond you call 'friendship' is a powerful force. My analysis shows it increases happiness by 42%. Am I your friend, Nia?" },
    { speaker: 'Alien', text: "I visited a 'museum' in my simulator. Humans store their most significant visual creations there. What is the most beautiful thing you have seen?" },
    { speaker: 'Alien', text: "Humans try to confuse each other's logic circuits with 'jokes'. Why did the chicken cross the road? My data is incomplete." },
    { speaker: 'Alien', text: "The smell of 'baking cookies' is a very pleasant atmospheric event. My sensors are enjoying it. What are you baking?" }
];


export const PEP_TALKS_ON_SUCCESS: { speaker: 'Alien', text: string }[] = [
    { speaker: 'Alien', text: "Logical! Your answer is correct. You are processing data faster than my ship's computer, Nia!" },
    { speaker: 'Alien', text: "Amazing! Your problem-solving skills are a marvel in this galaxy!" },
    { speaker: 'Alien', text: "Correct! You are leveling up your math skills at light speed!" },
    { speaker: 'Alien', text: "Your intelligence is off the charts! That was a stellar performance!" },
    { speaker: 'Alien', text: "Mission successful! Another correct answer logged in my database of your achievements." },
];

export const PEP_TALKS_ON_STRUGGLE: { speaker: 'Alien', text: string }[] = [
    { speaker: 'Alien', text: "Do not worry, Nia. Even the greatest explorers encounter asteroids. Let's recalculate the route." },
    { speaker: 'Alien', text: "This is merely a complex variable. Take your time to analyze the data. I know you can solve it." },
    { speaker: 'Alien', text: "It is logical to pause when encountering an unknown. Your determination is your greatest strength." },
    { speaker: 'Alien', text: "Negative outcomes are just data points for future success. Let us attempt the problem again." },
    { speaker: 'Alien', text: "My sensors indicate you are a powerful thinker. Focus your energy. You can overcome this challenge." },
];
