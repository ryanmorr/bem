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
                    <div id="tabs-1" class="tabs"></div>
                    <div class="widget__item"></div>
                    <div class="widget__item"></div>
                    <div class="widget__item"></div>
                </div>
                <div class="widget__footer"></div>
            </div>

            <div class="wrapper">
                <div id="component-1" class="component component--foo">
                    <div id="element-1" class="component__element component__element--foo component__element--bar"></div>
                    <div id="element-2" class="component__element component__element--foo"></div>
                    <div id="element-3" class="component__element component__element--foo component__element--bar"></div>
                </div>

                <div id="component-2" class="component component--foo component--bar"></div>
                <div id="component-3" class="component component--foo component--bar"></div>
            </div>
        `;
    });

    it('should be able to get a BEM block by CSS selector', () => {
        const widget = bem('.widget');

        expect(widget.elements).to.be.an('array');
        expect(widget.elements).to.have.lengthOf(1);
        expect(widget.elements[0].id).to.equal('widget-1');
    });

    it('should be able to get a BEM block by passing an element', () => {
        const widget = bem(document.querySelector('.widget'));

        expect(widget.elements).to.be.an('array');
        expect(widget.elements).to.have.lengthOf(1);
        expect(widget.elements[0].id).to.equal('widget-1');
    });

    it('should be able to get a BEM block by passing an array/nodelist', () => {
        const widget = bem(document.querySelectorAll('.widget'));

        expect(widget.elements).to.be.an('array');
        expect(widget.elements).to.have.lengthOf(1);
        expect(widget.elements[0].id).to.equal('widget-1');
    });

    it('should extract the BEM block/element name from selected element(s)', () => {
        const widget = bem('.widget');

        expect(widget.name).to.equal('widget');
    });

    it('should be able to get one or more block-elements that are decendants of the currently selected elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        expect(header.elements).to.be.an('array');
        expect(header.elements).to.have.lengthOf(1);
        expect(header.elements[0].className).to.equal('widget__header');
    });

    it('should be able filter the query for blocks-elements based on modifiers', () => {
        const cmp = bem('.component');
        const el1 = cmp.element('element', 'foo');

        expect(el1.elements).to.have.lengthOf(3);
        expect(el1.elements[0].id).to.equal('element-1');
        expect(el1.elements[1].id).to.equal('element-2');
        expect(el1.elements[2].id).to.equal('element-3');

        const el2 = cmp.element('element', 'foo', 'bar');

        expect(el2.elements).to.have.lengthOf(2);
        expect(el2.elements[0].id).to.equal('element-1');
        expect(el2.elements[1].id).to.equal('element-3');
    });

    it('should be able to iterate through the currently selected elements', () => {
        const widget = bem('.widget');
        const items = widget.element('item');
        const expected = document.querySelectorAll('.widget__item');

        items.each((el, i) => {
            expect(el).to.equal(expected[i]);
        });
    });

    it('should be able to add one or more modifiers to the currently selected elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        expect(widget.modify('foo')).to.equal(widget);
        expect(header.modify('bar', 'baz')).to.equal(header);

        expect(widget.elements[0].className).to.equal('widget widget--foo');
        expect(header.elements[0].className).to.equal('widget__header widget__header--bar widget__header--baz');
    });

    it('should be able to remove one or more modifiers from the currently selected elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        widget.modify('foo');
        header.modify('bar', 'baz');

        expect(widget.unmodify('foo')).to.equal(widget);
        expect(header.unmodify('bar', 'baz')).to.equal(header);

        expect(widget.elements[0].className).to.equal('widget');
        expect(header.elements[0].className).to.equal('widget__header');
    });

    it('should be able to toggle adding/removing one or more modifiers from the currently selected elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        expect(widget.toggle('foo')).to.equal(widget);
        expect(header.toggle('bar', 'baz')).to.equal(header);

        expect(widget.elements[0].className).to.equal('widget widget--foo');
        expect(header.elements[0].className).to.equal('widget__header widget__header--bar widget__header--baz');

        widget.toggle('foo');
        header.toggle('bar');

        expect(widget.elements[0].className).to.equal('widget');
        expect(header.elements[0].className).to.equal('widget__header widget__header--baz');
    });

    it('should be able to determine if an element has one or more modifiers', () => {
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
});
