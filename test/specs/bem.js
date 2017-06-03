/* eslint-disable max-len */

import { expect } from 'chai';
import bem from '../../src/bem';

describe('bem', () => {
    const container = document.createElement('div');
    container.id = 'container';

    before(() => {
        document.body.appendChild(container);
    });

    after(() => {
        document.body.removeChild(container);
    });

    beforeEach(() => {
        container.innerHTML = `
            <div id="widget-1" class="widget">
                <div class="widget__header"></div>
                <div class="widget__body">
                    <div id="component-1" class="component component--foo">
                        <div id="element-1" class="component__element component__element--foo component__element--bar"></div>
                        <div id="element-2" class="component__element component__element--foo"></div>
                        <div id="element-3" class="component__element component__element--foo component__element--bar"></div>
                    </div>

                    <div id="component-2" class="component component--foo component--bar"></div>
                    <div id="component-3" class="component component--foo component--bar"></div>
                </div>
                <div class="widget__footer"></div>
            </div>
        `;
    });

    it('should be able to get a BEM block by CSS selector', () => {
        const widget = bem('.widget');

        expect(widget).to.have.lengthOf(1);
        expect(widget[0].id).to.equal('widget-1');
    });

    it('should be able to get a BEM block by passing an element', () => {
        const widget = bem(document.querySelector('.widget'));

        expect(widget).to.have.lengthOf(1);
        expect(widget[0].id).to.equal('widget-1');
    });

    it('should be able to get a BEM block by passing an array/nodelist', () => {
        const widget = bem(document.querySelectorAll('.widget'));

        expect(widget).to.have.lengthOf(1);
        expect(widget[0].id).to.equal('widget-1');
    });

    it('should be able to pass an element as an optional second argument to use as the context of the query', () => {
        const cmp = bem('.component', document.querySelector('.widget'));

        expect(cmp).to.have.lengthOf(3);
        expect(cmp[0].id).to.equal('component-1');
        expect(cmp[1].id).to.equal('component-2');
        expect(cmp[2].id).to.equal('component-3');
    });

    it('should be able to pass a CSS selector string as an optional second argument to use as the context of thequery', () => {
        const cmp = bem('.component', '.widget');

        expect(cmp).to.have.lengthOf(3);
        expect(cmp[0].id).to.equal('component-1');
        expect(cmp[1].id).to.equal('component-2');
        expect(cmp[2].id).to.equal('component-3');
    });

    it('should extract the BEM block name from the first block element in the collection', () => {
        const widget = bem('.widget');

        expect(widget.name).to.equal('widget');
    });

    it('should be able to get one or more block-elements that are decendants of the collection of block elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        expect(header).to.have.lengthOf(1);
        expect(header[0].className).to.equal('widget__header');
    });

    it('should be able filter the query for blocks-elements based on modifiers', () => {
        const cmp = bem('.component');
        const el1 = cmp.element('element', 'foo');

        expect(el1).to.have.lengthOf(3);
        expect(el1[0].id).to.equal('element-1');
        expect(el1[1].id).to.equal('element-2');
        expect(el1[2].id).to.equal('element-3');

        const el2 = cmp.element('element', 'foo', 'bar');

        expect(el2).to.have.lengthOf(2);
        expect(el2[0].id).to.equal('element-1');
        expect(el2[1].id).to.equal('element-3');
    });

    it('should be able to iterate the collection of block-elemnts', () => {
        const widget = bem('.widget');
        const items = widget.element('item');
        const expected = document.querySelectorAll('.widget__item');

        items.each((el, i) => {
            expect(el).to.equal(expected[i]);
        });
    });

    it('should be able to add one or more modifiers to the collection of elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        widget.modify('foo');
        header.modify('bar', 'baz');

        expect(widget[0].className).to.equal('widget widget--foo');
        expect(header[0].className).to.equal('widget__header widget__header--bar widget__header--baz');
    });

    it('should be able to remove one or more modifiers from the collection of elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        widget.modify('foo');
        header.modify('bar', 'baz');

        widget.unmodify('foo');
        header.unmodify('bar', 'baz');

        expect(widget[0].className).to.equal('widget');
        expect(header[0].className).to.equal('widget__header');
    });

    it('should be able to toggle adding/removing one or more modifiers from the collection of elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        widget.toggle('foo');
        header.toggle('bar', 'baz');

        expect(widget[0].className).to.equal('widget widget--foo');
        expect(header[0].className).to.equal('widget__header widget__header--bar widget__header--baz');

        widget.toggle('foo');
        header.toggle('bar');

        expect(widget[0].className).to.equal('widget');
        expect(header[0].className).to.equal('widget__header widget__header--baz');
    });

    it('should be able to determine if the first element in the collection has one or more modifiers', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        expect(widget.is('foo')).to.equal(false);
        expect(header.is('bar', 'baz')).to.equal(false);

        widget.modify('foo');
        header.modify('bar', 'baz');

        expect(widget.is('foo')).to.equal(true);
        expect(header.is('bar', 'baz')).to.equal(true);

        header.unmodify('baz');

        expect(header.is('bar', 'baz')).to.equal(false);
        expect(header.is('baz')).to.equal(false);
        expect(header.is('bar')).to.equal(true);
    });

    it('should support method chaining', () => {
        const widget = bem('.widget');
        expect(widget.modify('foo')).to.equal(widget);
        expect(widget.unmodify('foo')).to.equal(widget);
        expect(widget.toggle('foo')).to.equal(widget);
    });
});
