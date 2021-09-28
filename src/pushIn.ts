import { stringify } from 'querystring';
import { Repository } from 'typeorm/repository/Repository';

/**
 * @param {Array} ids
 * @param {Repository} rep
 * @returns {Promise<Array>}
 */

async function pushIn(ids: Array<any>, rep: Repository<any>) {
  const arr: any[] = [];
  try {
    for (let item = 0; item < ids.length; item++) {
      if (typeof ids[item] === 'string') {
        const element = await rep.findOneOrFail({ where: { name: ids[item] } });
        arr.push(element);
      } else {
        const element = await rep.findOneOrFail(ids[item]);
        arr.push(element);
      }
    }
    return arr;
  } catch (error) {
    return arr;
  }
}

export default pushIn;
