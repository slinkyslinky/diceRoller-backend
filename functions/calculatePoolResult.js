import { gurpsRollRule, mysystemRollRule, pbtaRollRule } from "./rules.js"
import { commonRollRule } from "./rules.js"


export function calculatePoolResult(diceSystem, resultOfPool, settings) {

   switch (diceSystem) {
      case "mysystem": return mysystemRollRule(resultOfPool)
      case "common": return commonRollRule(resultOfPool)
      case "gurps": return commonRollRule(resultOfPool)
      case "pbta": return pbtaRollRule(resultOfPool, settings)
      default: return;
   }
}