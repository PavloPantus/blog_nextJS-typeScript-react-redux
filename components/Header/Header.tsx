import React from 'react';
import styled from 'styled-components';
import Link from '../Link';

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
      border: 5px solid transparent;
      
      &:hover {
        background-color: #444b4b;
      }
    };
    
    &__link.selected {
      border: 5px solid white;
    
    }
  }
`;

const Header: React.FC = () => (
  <StyledHeader>
    <nav className="header__nav nav">
      <ul className="nav__list">
        <li className="nav__item">
          <Link href="/">
            <a className="nav__link">See all Posts</a>
          </Link>
        </li>
        <li className="nav__item">
          <Link href="/posts/new">
            <a className="nav__link">Create new Post</a>
          </Link>
        </li>
      </ul>
    </nav>
  </StyledHeader>
);

export default Header;
