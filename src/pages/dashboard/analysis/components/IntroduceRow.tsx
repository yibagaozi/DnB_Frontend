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
  averageTemperature: string; // Ensure the correct type here
};

const IntroduceRow = ({ loading, averageTemperature }: IntroduceRowProps) => {
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
          <Field label="室外温度 35°C" value={` `} />
        </ChartCard>

      </Col>
      {/*       <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="访问量"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(8846).format('0,0')}
          footer={<Field label="日访问量" value={numeral(1234).format('0,0')} />}
          contentHeight={46}
        >
          <Area
            xField="x"
            yField="y"
            shapeField="smooth"
            height={46}
            axis={false}
            style={{
              fill: 'linear-gradient(-90deg, white 0%, #975FE4 100%)',
              fillOpacity: 0.6,
              width: '100%',
            }}
            padding={-20}
            data={visitData}
          />
        </ChartCard>
      </Col> */}
      {/*<Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="支付笔数"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={numeral(6560).format('0,0')}
          footer={<Field label="转化率" value="60%" />}
          contentHeight={46}
        >
          <Column
            xField="x"
            yField="y"
            padding={-20}
            axis={false}
            height={46}
            data={visitData}
            scale={{ x: { paddingInner: 0.4 } }}
          />
        </ChartCard>
      </Col> */}
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
          total="38 %"
          footer={<Field label=" " value={` `} />}
          /* footer={
            <div
              style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <Trend
                flag="up"
                style={{
                  marginRight: 16,
                }}
              >
                周同比
                <span className={styles.trendText}>12%</span>
              </Trend>
              <Trend flag="down">
                日同比
                <span className={styles.trendText}>11%</span>
              </Trend>
            </div>
          } */
          contentHeight={100}
        >
          <Progress percent={38} strokeColor={{ from: '#108ee9', to: '#87d068' }} status="active" />
        </ChartCard>
      </Col>
    </Row>
  );
};
export default IntroduceRow;
