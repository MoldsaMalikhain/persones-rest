/* eslint-disable prettier/prettier */

import { Repository } from "typeorm/repository/Repository"



/**
 * @param {Array} ids 
 * @param {Repository} rep 
 * @returns {Promise<Array>}
 */
async function pushIn(ids: Array<any>, rep: Repository<any>) {
    const arr: any[] = []
    for (let item = 0; item < ids.length; item++) {
        const element = await rep.findOne(ids[item])
        arr.push(element)
    }
    return arr
}

export default pushIn;