import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';

module('Integration | Helper | resolve', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders components with pre-associated templates (e.g. colocated)', async function (assert) {
    class Foo extends Component {}
    setComponentTemplate(hbs`Hello!`, Foo);
    this.owner.register('component:foo', Foo);

    await render(hbs`{{#let (resolve type="component" name="foo") as |Comp|}}<Comp />{{/let}}`);

    assert.dom(this.element).hasText('Hello!');
  });
});
