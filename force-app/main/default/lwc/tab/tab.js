import { LightningElement, api } from 'lwc';

export default class Tab extends LightningElement {
    @api name;
    @api label;
    @api iconName;

    connectedCallback() {
        this.classList.add('slds-tabs_default__content', 'slds-hide');
        this.role = 'tabpanel';
    }

    _index;
    @api get index() {
        return this._index;
    }
    set index(value) {
        this._index = value;
        const id = `tab-default-${value + 1}`;
        this.id = id;
        this.ariaLabelledBy = `${id}__item`;
        this.setAttribute('index', value);
    }

    _selected = false;
    @api get selected() {
        return this._selected;
    }
    set selected(value) {
        this._selected = value;
        if (value) {
            this.classList.add('slds-show');
            this.classList.remove('slds-hide');
        } else {
            this.classList.remove('slds-show');
            this.classList.add('slds-hide');
        }
    }
}
