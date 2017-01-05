import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import Shop from '../src/components/Shop'
import {render} from 'enzyme'

const wrapper = shallow(<Shop groceryList = {['one','two']} />);
describe('(Component) Shop', () => {
  it('renders...', () => {

    expect(wrapper).to.have.length(1);
  });
  it('should have an array in props', ()=>{
    expect(wrapper.unrendered.props.groceryList.length).to.equal(2);
    expect(wrapper.unrendered.props.groceryList[0]).to.equal('one');
  });
  it('should have a list with the array values', ()=>{
    const rend = render(<Shop groceryList = {['one','two']} />);
    expect(rend.find('div').length).to.equal(1);
    expect(rend.find('li').length).to.equal(2);
    expect(rend.find('input').length).to.equal(2);
    expect(rend.find('input')[0].attribs.value).to.equal('one');
  })
});