import Helper from '@ember/component/helper';
import templateOnly from '@ember/component/template-only';
import { setComponentTemplate, getComponentTemplate } from '@ember/component';

export default class Resolve extends Helper {
  constructor(owner) {
    super(...arguments);

    this.owner = owner;
  }

  compute(_, { type, name }) {
    let result = this.owner.factoryFor(`${type}:${name}`)?.class

    if (type === 'component') {
      let componentHasTemplate = getComponentTemplate(result);
      let resolvedTemplate = this.owner.factoryFor(`template:components/${name}`)?.class;

      if (!componentHasTemplate && resolvedTemplate) {
        result = setComponentTemplate(resolvedTemplate, templateOnly());
      }
    }

    return result;
  }
}
