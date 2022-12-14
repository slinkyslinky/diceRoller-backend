import fs, { appendFile } from 'node:fs';

const CRIT = "crit"
const SUCCESS = "success"
const ADVANT = "advant"
const TROUBLE = "trouble"
const FAILURE = "failure"
const MISCRIT = "miscrit"
const EMPTY = "empty"


export function mysystemRollRule(pool) {
   const resultPool = []
   let resultStatus = EMPTY;
   let critCount = 0;
   let successCount = 0;
   let advantCount = 0;
   if (pool.length > 0) {
      getRawCounts()
      countCrit()
      getResultPool()
      checkWin()
   }


   return { pool: resultPool, status: resultStatus }

   function getRawCounts() {
      pool.forEach(diceResult => {
         switch (diceResult) {
            case CRIT:
               critCount++
               break;
            case SUCCESS:
               successCount++
               break;
            case ADVANT:
               advantCount++
               break;
            case MISCRIT:
               critCount--
               break;
            case TROUBLE:
               advantCount--
               break;
            case FAILURE:
               successCount--
               break;

            default:
               break;
         }
      });
   }
   function countCrit() {
      let count = Math.abs(critCount)
      for (let i = 0; i < count; i++) {
         if (critCount > 0) {

            if (successCount < 0) {
               critCount--;
               successCount += 2
            } else if (advantCount < 0) {
               critCount--;
               successCount++
               advantCount++
            }

         } else if (critCount < 0) {
            if (successCount > 0) {
               critCount++;
               successCount--
               advantCount--
            } else if (advantCount > 0) {
               critCount++;

               advantCount -= 2
            }

         }

      }
   }
   function getResultPool() {

      critCount > 0 ? putResultsInPool(critCount, CRIT) : putResultsInPool(critCount, MISCRIT)
      successCount > 0 ? putResultsInPool(successCount, SUCCESS) : putResultsInPool(successCount, FAILURE)
      advantCount > 0 ? putResultsInPool(advantCount, ADVANT) : putResultsInPool(advantCount, TROUBLE)


      function putResultsInPool(counter, result) {

         for (let i = 0; i < Math.abs(counter); i++) {
            resultPool.push(result)

         }
      }


   }

   function checkWin() {

      if ((critCount > 0 || successCount > 0) && advantCount > 0) {
         resultStatus = 'success&advant'
      } else
         if ((critCount > 0 || successCount > 0) && advantCount === 0) {
            resultStatus = 'success'
         } else if ((critCount > 0 || successCount > 0) && advantCount < 0) {
            resultStatus = 'success&trouble'
         } else
            if ((critCount <= 0 || successCount <= 0) && advantCount > 0) {
               resultStatus = 'advant'
            } else
               if ((critCount <= 0 || successCount <= 0) && advantCount === 0) {
                  resultStatus = 'failure'
               } else
                  if ((critCount < 0 || successCount < 0) || advantCount < 0) {
                     resultStatus = 'failure&trouble'
                  }
   }
}

export function mysystemStatisticRule(arrayOfResultPool) {
   const statistic = {
      CRIT: {
         "1": 0,
         "2": 0,
         "3+": 0,
      },
      SUCCESS: {
         "1": 0,
         "2": 0,
         "3+": 0,

         "withAdvant": 0,
         "withTrouble": 0,
      },
      ADVANT: {
         "1": 0,
         "2": 0,
         "3+": 0,

      },
      MISCRIT: {
         "1": 0,
         "2": 0,
         "3+": 0,
      },
      FAILURE: {
         "1": 0,
         "2": 0,
         "3+": 0,

         "withAdvant": 0,
         "withTrouble": 0,
      },
      TROUBLE: {
         "1": 0,
         "2": 0,
         "3+": 0,

      },
      reducer(accamulator) {
         reducerHelper(CRIT)
         reducerHelper(MISCRIT)
         reducerHelper(ADVANT)
         reducerHelper(TROUBLE)
         reducerHelper(SUCCESS)
         reducerHelper(FAILURE)

         if (accamulator[SUCCESS] > 0 && accamulator[ADVANT] > 0) {
            statistic.SUCCESS.withAdvant++
         }
         if (accamulator[SUCCESS] > 0 && accamulator[TROUBLE] > 0) {
            statistic.SUCCESS.withTrouble++
         }
         if (accamulator[FAILURE] > 0 && accamulator[ADVANT] > 0) {
            statistic.FAILURE.withAdvant++
         }
         if (accamulator[FAILURE] > 0 && accamulator[TROUBLE] > 0) {
            statistic.FAILURE.withTrouble++
         }

         function reducerHelper(value) {

            switch (accamulator[value]) {
               case 1: statistic[value]["1"]++; break
               case 2: statistic[value]["2"]++; break
               case (accamulator[value] >= 3): statistic[value]["3+"]++; break
               default: break;
            }
         }
      }


   }

   const arrayOfAccamulators = arrayOfResultPool.map(resultPool => {
      const accamulator = {
         CRIT: 0,
         SUCCESS: 0,
         ADVANT: 0,
         TROUBLE: 0,
         FAILURE: 0,
         MISCRIT: 0,
         EMPTY: 0

      }
      resultPool.forEach(result => {
         arrayReducer(accamulator, result)
      })

      return accamulator
   }

   )
   arrayOfAccamulators.forEach(accamulator => {
      console.log(accamulator);
      statistic.reducer(accamulator)
   })



   function arrayReducer(accamulator, result) {
      switch (result) {
         case CRIT: accamulator.CRIT++; break
         case SUCCESS: accamulator.SUCCESS++; break
         case ADVANT: accamulator.ADVANT++; break
         case TROUBLE: accamulator.TROUBLE++; break
         case FAILURE: accamulator.FAILURE++; break
         case MISCRIT: accamulator.MISCRIT++; break
         default: break;
      }
   }


   console.log(statistic);
   return statistic

   // pool = pool.map(dice => { return dice.values })
   // pool = pool.map(dice => {

   // })

   // function calculateDiceValueChance(dice, value) {
   //    let valueWeight = 0;
   //    dice.forEach(edge => {
   //       if (edge === value) {
   //          valueWeight++
   //       }
   //    })
   //    return (valueWeight / dice.weight).toFixed(2)
   // }




   // console.log(pool);

}

export function commonRollRule(pool) {
   const resultPool = []
   let resultStatus = "no result"

   resultPool.push(pool.reduce((acc, cur) => acc + cur, 0))


   return { pool: resultPool, status: resultStatus }
}