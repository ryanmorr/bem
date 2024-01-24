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

    it('should extract the BEM block name from the first block element in the collection', () => {
        const el = document.createElement('div');
        el.className = 'top-level';
        document.body.appendChild(el);

        el.innerHTML = `
            <section class="foo">
                <span class="foo__bar"></span>
            </section>
        `;
        expect(bem('.top-level .foo').name).to.equal('foo');

        el.innerHTML = `
            <section class="foo-bar">
                <span class="foo-bar__qux"></span>
            </section>
        `;
        expect(bem('.top-level .foo-bar').name).to.equal('foo-bar');

        el.innerHTML = `
            <section class="foo_bar">
                <span class="foo_bar__qux"></span>
            </section>
        `;
        expect(bem('.top-level .foo_bar').name).to.equal('foo_bar');

        el.innerHTML = `
            <section class="a--b foo">
                <span class="foo__qux"></span>
            </section>
        `;
        expect(bem('.top-level .foo').name).to.equal('foo');

        el.innerHTML = `
            <section class="a__b foo">
                <span class="foo__qux"></span>
            </section>
        `;
        expect(bem('.top-level .foo').name).to.equal('foo');
    });

    it('should be able filter the query for blocks based on modifiers', () => {
        const cmp1 = bem('.component', 'foo');

        expect(cmp1).to.have.lengthOf(3);
        expect(cmp1[0].id).to.equal('component-1');
        expect(cmp1[1].id).to.equal('component-2');
        expect(cmp1[2].id).to.equal('component-3');

        const cmp2 = bem('.component', 'foo', 'bar');

        expect(cmp2).to.have.lengthOf(2);
        expect(cmp2[0].id).to.equal('component-2');
        expect(cmp2[1].id).to.equal('component-3');
    });

    it('should be able to get one or more block-elements that are decendants of the collection of block elements', () => {
        const widget = bem('.widget');
        const header = widget.element('header');

        expect(header).to.have.lengthOf(1);
        expect(header[0].className).to.equal('widget__header');
    });

    it('should be able filter the query for block-elements based on modifiers', () => {
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

    it('should support observing for changes of modifiers', () => {
        const widget = bem('.widget');

        const spy = sinon.spy(function onChange(el) {
            expect(this).to.equal(widget[0]);
            expect(el).to.equal(widget[0]);
            expect(widget[0].className).to.equal('widget widget--foo');
        });

        widget.on('foo', spy);

        widget.modify('foo');
        expect(spy.called).to.equal(true);
    });

    it('should support observing for changes of multiple modifiers', () => {
        const header = bem('.widget').element('header');

        const spy = sinon.spy(function onChange(el) {
            expect(this).to.equal(header[0]);
            expect(el).to.equal(header[0]);
            expect(header[0].className).to.equal('widget__header widget__header--foo widget__header--bar widget__header--baz');
        });

        header.on('foo', 'bar', 'baz', spy);

        header.modify('foo');
        expect(spy.called).to.equal(false);

        header.modify('bar');
        expect(spy.called).to.equal(false);

        header.modify('baz');
        expect(spy.called).to.equal(true);
    });

    it('should not dispatch listener if element already has modifiers', () => {
        const widget = bem('.widget');

        widget.modify('foo');

        const spy = sinon.spy();
        widget.on('foo', spy);

        widget.modify('foo');
        expect(spy.called).to.equal(false);
    });

    it('should support observing for changes of modifiers via the toggle method', () => {
        const widget = bem('.widget');

        const spy = sinon.spy();
        widget.on('foo', spy);

        widget.toggle('foo');
        expect(spy.callCount).to.equal(1);

        widget.toggle('foo');
        expect(spy.callCount).to.equal(1);

        widget.toggle('foo');
        expect(spy.callCount).to.equal(2);
    });

    it('should support observing for changes of multiple modifiers via the toggle method', () => {
        const widget = bem('.widget');

        const spy = sinon.spy();
        widget.on('foo', 'bar', 'baz', spy);

        widget.toggle('foo');
        expect(spy.callCount).to.equal(0);

        widget.toggle('bar');
        expect(spy.callCount).to.equal(0);

        widget.toggle('baz');
        expect(spy.callCount).to.equal(1);

        widget.toggle('foo', 'baz');
        expect(spy.callCount).to.equal(1);

        widget.toggle('foo');
        expect(spy.callCount).to.equal(1);

        widget.toggle('baz');
        expect(spy.callCount).to.equal(2);
    });

    it('should support method chaining', () => {
        const widget = bem('.widget');

        expect(widget.modify('foo')).to.equal(widget);
        expect(widget.unmodify('foo')).to.equal(widget);
        expect(widget.toggle('foo')).to.equal(widget);
        expect(widget.on('foo', () => {})).to.equal(widget);
    });
});
