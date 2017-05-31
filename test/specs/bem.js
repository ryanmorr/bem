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
                </div>
                <div class="widget__footer"></div>
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

    it('should be able to get one or more blocks that are decendants of the currently selected elements', () => {
        const widget = bem('.widget');
        const tabs = widget.block('tabs');

        expect(tabs.elements).to.be.an('array');
        expect(tabs.elements).to.have.lengthOf(1);
        expect(tabs.elements[0].id).to.equal('tabs-1');
    });

    it('should be able to get one or more block-elements that are decendants of the currently selected elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        expect(header.elements).to.be.an('array');
        expect(header.elements).to.have.lengthOf(1);
        expect(header.elements[0].className).to.equal('widget__header');
    });

    it('should be able to add a modifier to the currently selected elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        widget.modify('foo');
        header.modify('bar');

        expect(widget.elements[0].className).to.equal('widget widget--foo');
        expect(header.elements[0].className).to.equal('widget__header widget__header--bar');
    });

    it('should be able to remove a modifier from the currently selected elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        widget.modify('foo');
        header.modify('bar');

        widget.unmodify('foo');
        header.unmodify('bar');

        expect(widget.elements[0].className).to.equal('widget');
        expect(header.elements[0].className).to.equal('widget__header');
    });
});
