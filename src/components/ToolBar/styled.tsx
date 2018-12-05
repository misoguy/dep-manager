import styled from 'styled-components'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { space, SpaceProps } from 'styled-system'

export const StyledNavBar = styled.section`
  background: white;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`

export const NavBarContainer = styled.div`
  width: 1140px;
`

export interface TitleProps
  extends React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >,
    SpaceProps {}
const TitleCmp = ({
  m,
  mt,
  mr,
  mb,
  ml,
  mx,
  my,
  p,
  pt,
  pr,
  pb,
  pl,
  px,
  py,
  ...props
}: TitleProps) => <h1 {...props} />
export const Title = styled(TitleCmp)`
  font-family: 'Microsoft Sans Serif';
  font-size: 26px;
  line-height: 29px;
  margin: 40px 0 20px;
  ${space};
`

export const Subtitle = styled.div`
  margin-bottom: 40px;
`

export const StyledNavLink = styled(NavLink)`
  padding: 20px 0;
  margin-right: 40px;
  color: inherit;
  text-decoration: inherit;
  box-sizing: border-box;
  cursor: pointer;
`

export const Nav = styled.div`
  display: flex;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`
