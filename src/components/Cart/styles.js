import styled from 'styled-components';
import { StyledLink } from '../StyledLink';

export const CartWrapper = styled(StyledLink).attrs(() => ({
  to: '/cart',
}))`
  padding-left: 16px;
  display: flex;
  color: black;
  text-decoration: none;

  > svg {
    margin: auto 0;
  }

  &:hover {
    text-decoration: underline;
  }

  > div:last-child {
    margin: auto;
    padding-left: 8px;
  }
`;
