import React from 'react';
import styled, { css } from 'styled-components';
import { BaseTable, BaseTableProps } from 'ali-react-table';
import { ThemeName, deepPurple, getThemeName } from '@apitable/components';
import { applyDefaultTheme } from '../utils';

const ThemeBaseTable: any = styled(BaseTable).attrs(applyDefaultTheme)`
  &.scriptTable {
    ${props => {
      const { isDark } = props.colorConfig;
      const { lowestBg, lineColor, firstLevelText, defaultBg } = props.theme.color;
      const hoverBgColor = isDark ? '#393649' : deepPurple[50];
      
      return css`
        --border-color: ${lineColor};
        --header-bgcolor: ${lowestBg};
        --header-color: ${firstLevelText};
        --color: ${firstLevelText};
        --bgcolor: ${defaultBg};
        --header-hover-bgcolor: ${hoverBgColor};
        --hover-bgcolor: ${hoverBgColor};
      `;
    }}
    --font-size: 13px;
    cursor: auto;
  }
  .art-table-header-cell {
    font-weight: bold;
  }
`;

export const CustomBaseTable = React.forwardRef<BaseTable, BaseTableProps>((props, ref) => {
  return (
    <ThemeBaseTable 
      ref={ref} 
      className={'scriptTable'} 
      colorConfig={{ 
        isDark: getThemeName() === ThemeName.Dark 
      }}
      {...props} 
    />
  );
});