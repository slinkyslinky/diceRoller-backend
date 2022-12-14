
export function getDiceResult(dice) {
   const randomValue = Math.floor(Math.random() * dice.weight)
   return dice.values[randomValue]
}