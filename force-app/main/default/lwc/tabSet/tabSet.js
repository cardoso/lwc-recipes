import { LightningElement, api } from 'lwc';

export default class TabSet extends LightningElement {
    @api size;
    tabs = [];

    connectedCallback() {
        this.classList.add('slds-tabs_default');
        if (this.size) {
            this.classList.add(`slds-tabs_${this.size}`);
        }
    }

    updateTabs() {
        this.tabs = Array.from(this.querySelectorAll('c-tab')).map(
            (tab, index) => {
                const selected = tab.selected;
                const label = tab.label ?? tab.name;
                const ariaControls = `tab-default-${index + 1}`;

                tab.index = index;

                return {
                    id: `${ariaControls}__item`,
                    ariaControls,
                    key: tab.name,
                    name: tab.name,
                    ariaSelected: selected,
                    label,
                    tabIndex: selected ? 0 : -1,
                    className: [
                        'slds-tabs_default__item',
                        tab.selected ? 'slds-is-active' : ''
                    ]
                        .join(' ')
                        .trim()
                };
            }
        );
    }

    handleSlotChange() {
        this.querySelector('c-tab').selected = true;
        this.updateTabs();
    }

    /**
     * @param {CustomEvent} event
     */
    handleTabClick(event) {
        const name = event.target.name;
        this.querySelectorAll('c-tab').forEach((tab) => {
            if (tab.name === name) {
                if (tab.selected) {
                    // eslint-disable-next-line no-useless-return
                    return;
                    // eslint-disable-next-line no-else-return
                } else {
                    tab.selected = true;
                }
            } else if (tab.selected) {
                tab.selected = false;
            }
        });
        this.updateTabs();
    }
}
