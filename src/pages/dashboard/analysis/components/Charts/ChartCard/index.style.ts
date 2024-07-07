import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    chartCard: {
      position: 'relative',
    },
    chartTop: {
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
    },
    chartTopMargin: {
      marginBottom: '12px',
    },
    chartTopHasMargin: {
      marginBottom: '20px',
    },
    metaWrap: {
      float: 'left',
    },
    avatar: {
      position: 'relative',
      top: '4px',
      float: 'left',
      marginRight: '20px',
      img: { borderRadius: '100%' },
    },
    meta: {
      height: '22px',
      color: token.colorTextSecondary,
      fontSize: '18px',
      lineHeight: '22px',
    },
    action: {
      position: 'absolute',
      top: '4px',
      right: '0',
      lineHeight: '1',
      cursor: 'pointer',
    },
    total: {
      height: '68px',
      marginTop: '4px',
      marginBottom: '0',
      overflow: 'hidden',
      color: token.colorTextHeading,
      fontSize: '60px',
      lineHeight: '68px',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      wordBreak: 'break-all',
    },
    content: {
      position: 'relative',
      width: '100%',
      marginBottom: '12px',
    },
    contentFixed: {
      position: 'absolute',
      bottom: '0',
      left: '0',
      width: '100%',
    },
    footer: {
      marginTop: '8px',
      paddingTop: '9px',
      borderTop: `1px solid ${token.colorSplit}`,
      '& > *': { position: 'relative' },
    },
    footerMargin: {
      marginTop: '20px',
    },
  };
});

export default useStyles;
