import React from 'react';
// enzyme enabless unit testing indipendent of the whole app
import { configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()})

describe('<NavigationItem />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />)
    })

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({auth: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should render logout <NavigationItem /> if authenticated', () => {
        wrapper.setProps({auth: true});
        expect(wrapper.contains(<NavigationItem link="/logout">logout</NavigationItem>)).toEqual(true);
    });
})