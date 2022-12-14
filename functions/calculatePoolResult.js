import { mysystemRollRule } from "./rules.js"
import { commonRollRule } from "./rules.js"


export function calculatePoolResult(diceSystem, resultOfPool) {

   switch (diceSystem) {
      case "mysystem": return mysystemRollRule(resultOfPool)
      case "common": return commonRollRule(resultOfPool)
      default: return;
   }


}