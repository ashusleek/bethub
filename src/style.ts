import styled, { css } from 'styled-components';

export enum COLORS {
  BLUE = '#082B4E',
  GRAY_DRAK = '#4F4F4F',
  GRAY = '#666',
  ADMIN_GRAY_BG = '#fafafa',
  LIGHTGRAY1 = '#626262',
  LIGHTGRAY2 = '#808080',
  LightGRAY3 = '#9696a0',
  LightGRAY4 = '#7d7d7d',
  LightGRAY5 = '#4A4B57',
  LightGRAY6 = '#C4C4C4',
  LightGRAY7 = '#F0F0F2',
  GREEN_DARK = '#219653',
  BUTTON_BG = '#EDEDF0',
  GREEN_LIGHT = '#6FCF97',
  BLACK = '#232323',
  WHITE = '#ffffff',
  DARK_BLACK = '#000',
  BLACK_SECONDARY = '#19191D',
  WHITE_GRAY = '#F7F7FA',
  BLUE_LIGHT = '#3772FF',
  WHITE_GRAY_01 = '#F3F3F3',
  RED = '#FB3640'
}
export enum TEXTALIGN {
  text_left = 'left',
  text_right = 'right',
  text_center = 'center'
}

export enum FONTFAMILY {
  FONT_ROBOTO = 'Roboto',
  FONT_RED_HAT = 'Red Hat Display'
}
export const general01 = css`
  font-family: ${FONTFAMILY.FONT_ROBOTO};
  font-size: 18px;
  line-height: 20px;
`;

export const fontStyleRedHat = css`
  font-family: ${FONTFAMILY.FONT_RED_HAT};
  font-weight: 500 !important;
  letter-spacing: 0.15px;
`;

export const fontStyleRoboto = css`
  font-family: ${FONTFAMILY.FONT_ROBOTO};
  font-weight: 500;
  letter-spacing: 0.15px;
`;

export const roundBoxCss = css`
  background: ${COLORS.WHITE};
  border: 1px solid rgba(221, 221, 221, 1);
  box-sizing: border-box;
  border-radius: ${({ borderradius }) => (borderradius ? `${borderradius} ! important` : '7x 7px 0px 0px')};
  box-shadow: none;
  padding: ${({ padding }) => padding && `${padding}px`};
`;

export const TabsWrapper = styled.div`
  .tab-header {
    box-shadow: none;
    background-color: transparent;

    .MuiTabs-indicator {
      background-color: inherit;
    }
    .tabs {
      .MuiTabs-flexContainer {
        align-items: center;
        .MuiTab-textColorInherit.Mui-selected {
          border-radius: 5px;
          background-color: #fff;
        }
      }
      .activity_timeline {
        position: absolute;
        right: 0;

        .MuiIconButton-root {
          color: #082b4e;
          background: transparent;
        }
        @media only screen and (max-width: 768px) {
          p {
            font-size: 14px;
            line-height: 27px !important;
          }
        }
      }
      .MuiTab-wrapper {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        color: ${COLORS.BLUE};
        text-transform: capitalize;
        @media only screen and (max-width: 768px) {
          font-size: 14px;
          line-height: 20px;
        }
      }
      .MuiTab-root {
        border-radius: 5px 5px 0px 0px !important;
        min-width: 200px;
        padding: 6px 17px;
        @media only screen and (max-width: 768px) {
          min-width: 139px;
          padding: 6px 9px;
        }
      }
    }
  }
  .MuiBadge-anchorOriginTopRightRectangle {
    top: 10px;
    right: -23px;
    @media only screen and (max-width: 768px) {
      top: 10px;
      right: -12px;
    }
  }
  .MuiBadge-colorSecondary {
    background-color: ${COLORS.RED};
  }
  div#simple-tabpanel-0,
  div#simple-tabpanel-1 {
    border-radius: 0px 10px 10px 10px;
    background-color: #fff;
  }

  .opportunity-detail {
    background: #ffffff;
    border-radius: 10px;
    .MuiIconButton-root {
      text-align: inherit;
    }

    .tab-header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      .MuiTabs-indicator {
        background-color: red;
      }
    }

    .tab-panel {
      padding: 51px;
      @media only screen and (max-width: 600px) {
        padding: 10px 0 0 0;
      }
    }

    .MuiTab-root {
      min-width: 70px !important;
      padding: 0px 11px !important;
      font-size: 16px;
    }

    .MuiChip-sizeSmall {
      bottom: 4px;
      right: 12px;
      position: relative;
    }
  }
`;
