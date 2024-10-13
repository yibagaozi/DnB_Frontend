import { InfoCircleOutlined } from '@ant-design/icons';
import { Area, Column } from '@ant-design/plots';
import { Col, Progress, Row, Tooltip } from 'antd';
import numeral from 'numeral';
import type { DataItem } from '../data.d';
import useStyles from '../style.style';
import { ChartCard, Field } from './Charts';
import Trend from './Trend';
const topColResponsiveProps = {
  xs: 24,
  sm: 24,
  md: 24,
  lg: 12,
  xl: 12,
  style: {
    marginBottom: 24,
  },
};
type IntroduceRowProps = {
  loading: boolean;
  averageTemperature: string;
  averageHumidity: string;
};

const IntroduceRow = ({ loading, averageTemperature, averageHumidity }: IntroduceRowProps) => {
  const { styles } = useStyles();

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="室内温度"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          loading={loading}
          total={() => averageTemperature}
          footer={<Field label=" " value={` `} />}
          contentHeight={100}
        >
          <Field label="室外温度 18°C" value={` `} />
        </ChartCard>

      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="室内湿度"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={() => averageHumidity}
          footer={<Field label=" " value={` `} />}

          contentHeight={100}
        >
          <Progress percent={parseFloat(averageHumidity)} strokeColor={{ from: '#108ee9', to: '#87d068' }} status="active" />
        </ChartCard>
      </Col>
    </Row>
  );
};
export default IntroduceRow;
