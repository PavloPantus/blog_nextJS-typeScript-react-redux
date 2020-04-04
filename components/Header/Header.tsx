import React from 'react';
import Link from "../Link";
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #313b3f;
  padding: 20px;
  .nav {
    &__list {
      display: flex;
      justify-content: space-between;
    };
    
    &__link {
      display: flex;
      padding: 5px;
      color: azure;
      
      &:hover {
        background-color: #444b4b;
      }
    };
    
    &__link.selected {
      border: 1px solid blue;
      background-color: #b087a2;
      color: white;
    }
  }
`

const Header: React.FC  = () => {
  return (
    <StyledHeader>
      <nav className={'header__nav nav'}>
        <ul className={'nav__list'}>
          <li className={'nav__item'}>
            <Link href="/">
              <a className={'nav__link'}>See all Posts</a>
            </Link>
          </li>
          <li className={'nav__item'}>
            <Link href="/about">
              <a className={'nav__link'}>Create new Post</a>
            </Link>
          </li>
        </ul>
      </nav>
    </StyledHeader>
  );
}

export default Header;
