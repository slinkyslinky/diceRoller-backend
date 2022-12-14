import { getDiceResult } from "./getDiceResult.js";

export function getPoolResult(dicePool) {
   const rollPool = [];
   dicePool.forEach(dice => {
      rollPool.push(getDiceResult(dice));
   });
   // console.log(rollPool);
   return rollPool
}