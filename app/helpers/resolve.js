import Helper from '@ember/component/helper';
import { getOwner } from '@ember/application';

export default class Resolve extends Helper {
  compute(_, { type, name }) {
    return getOwner(this).factoryFor(`${type}:${name}`)?.class
  }
}
