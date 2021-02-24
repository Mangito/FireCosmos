export const randomNumber = (min = 0, max = 10) => Math.floor(Math.random() * (max - min) + min);
export const radiansToDegrees = r => r * (180 / Math.PI);
export const degreesToRadians = d => d * (Math.PI / 180);
