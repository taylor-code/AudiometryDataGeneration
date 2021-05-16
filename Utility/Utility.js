/********************************************/
/*                Utility.js                */
/*                                          */
/* Holds utility/general functions.         */
/*                                          */
/* @author: Kyra Taylor                     */
/* @date:   05/16/2021                      */
/********************************************/


/*
 * Freezes nested objects.
 */
function deepFreeze(obj) {
  if (!obj) return obj;

  Object.freeze(obj);

  for (let prop of Object.getOwnPropertyNames(obj)) {
    if (Object.isFrozen(obj[prop])) continue
    if (typeof obj[prop] === "object")   deepFreeze(obj[prop]);
    if (typeof obj[prop] === "function") deepFreeze(obj[prop]);
  }

  return obj;
}



/********************************************/

module.exports = { deepFreeze };