import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
`;

export const Header = styled.header`
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--bgCommonDefault);
  border-bottom: 1px solid var(--borderCommon);
`;

export const Title = styled.div`
  margin-left: 8px;
  color: var(--textCommonTertiary);
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const IconWrapper = styled.span`
  margin-right: 8px;
  cursor: pointer;
`;

export const Content = styled.div`
  height: calc(100% - 36px);
  position: relative;
  flex-grow: 1;
`;

export const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
`;