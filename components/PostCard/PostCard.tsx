import * as React from 'react';
import styled from 'styled-components';
import { Ipost } from '../../interfaces/post';

const StyledPostCard = styled.article`
  background-color: #f4f4f4;
  height: 200px;
  padding: 10px;
  .post-card {
    &__title {
      width: 100%;
      text-align: center;
      font-size: 20px;
     
    }
    
    &__body {
      width: 100%;
      margin-top: 10px;
      font-size: 16px;
    }
  }
`;

export const PostCard: React.FC<Ipost> = ({ title, body }) => (
  <StyledPostCard>
    <h2 className="post-card__title">{title.slice(0, 50)}</h2>
    <p className="post-card__body">
      {body.slice(0, 300)}
      ...
    </p>
  </StyledPostCard>
);
