import * as React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { SelectorView } from './SelectorView';
import { Maybe } from 'tsmonad';
import { Dropdown } from 'semantic-ui-react';

describe('SelectorView', () => {
    it('should render the placeholder if no value selected and a placeholder is provided', () => {
        const wrapper = shallow(<SelectorView 
            items={[]}
            selectedItemText={Maybe.nothing()}
            selectedItemValue={Maybe.nothing()}
            placeholder={Maybe.just('test')}
            onSelect={() => {}}
        />);
        expect(wrapper).to.have.prop('text', 'test');
    });

    it('should render --- if no value is selected nor placeholder provided', () => {
        const wrapper = shallow(<SelectorView 
            items={[]}
            selectedItemText={Maybe.nothing()}
            selectedItemValue={Maybe.nothing()}
            placeholder={Maybe.nothing()}
            onSelect={() => {}}
        />);
        expect(wrapper).to.have.prop('text', '---');
    });

    it('should render the selected value', () => {
        const wrapper = shallow(<SelectorView 
            items={[]}
            selectedItemText={Maybe.just('one')}
            selectedItemValue={Maybe.nothing()}
            placeholder={Maybe.just('test')}
            onSelect={() => {}}
        />);
        expect(wrapper).to.have.prop('text', 'one');
    });
});
