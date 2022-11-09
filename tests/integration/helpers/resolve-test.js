import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { helper } from '@ember/component/helper';
import Component from '@glimmer/component';
import { setComponentTemplate } from '@ember/component';

module('Integration | Helper | resolve', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders components with pre-associated templates (e.g. colocated) using {{let}}', async function (assert) {
    class Foo extends Component {}
    setComponentTemplate(hbs`Hello!`, Foo);
    this.owner.register('component:foo', Foo);

    await render(hbs`{{#let (resolve type="component" name="foo") as |Comp|}}<Comp />{{/let}}`);

    assert.dom(this.element).hasText('Hello!');
  });

  test('it renders components with resolved templates (e.g. non-colocated) using {{let}}', async function (assert) {
    class Foo extends Component {}
    this.owner.register('component:foo', Foo);
    this.owner.register('template:components/foo', hbs`Hello!`);

    await render(hbs`{{#let (resolve type="component" name="foo") as |Comp|}}<Comp />{{/let}}`);

    assert.dom(this.element).hasText('Hello!');
  });

  test('it invokes helpers', async function (assert) {
    this.owner.register('helper:foo', helper(() => {
      return false;
    }));

    await render(hbs`{{#if (resolve type="helper" name="foo")}}returned false!{{/if}}`);

    assert.dom(this.element).hasText('returned false!');
  });
});
