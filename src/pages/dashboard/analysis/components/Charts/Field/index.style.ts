import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => {
  return {
    field: {
      margin: '0',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    label: {
      fontSize: '18px',
      lineHeight: '22px',
    },
    number: {
      marginLeft: '8px',
      color: token.colorTextHeading,
    },
  };
});

export default useStyles;
