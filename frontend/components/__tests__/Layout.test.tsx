import * as React from 'react'
import { shallow, ShallowWrapper } from 'enzyme'
import { Layout } from '../Layout'
import Footer from '../Footer'
import { setSession } from '../../utils/Session'
jest.mock('../../utils/Session')

describe('Layout component', () => {
  let layout: ShallowWrapper<any>

  beforeEach(() => {
    layout = shallow(<Layout />)
  })

  it('should wrap everything in a div', () => {
    expect(layout.type()).toBe('div')
  })

  it('contains a header element', () => {
    const headers = layout.find('header')
    expect(headers.length).toBe(1)
  })

  it('contains navigation component', () => {
    const nav = layout.find('Navigation')
    expect(nav.length).toBe(1)
  })

  it('contains footer component', () => {
    expect(layout.contains(<Footer />)).toBe(true)
  })

  it('has default title if none is set', () => {
    const titleText = layout
      .find('title')
      .first()
      .text()

    expect(titleText).toBe('Volkano')
  })

  it('changes title when title prop is set', () => {
    const fakeProps = { title: 'Testpage' }
    layout = shallow(<Layout {...fakeProps} />)
    const titleText = layout
      .find('title')
      .first()
      .text()

    expect(titleText).toBe('Testpage')
  })

  it('knows about the session', () => {
    expect(layout.state().session).toBeTruthy()
  })

  it('knows when there is no session', () => {
    setSession(undefined)
    layout = shallow(<Layout />)
    expect(layout.state().session).toBeNull()
  })
})
