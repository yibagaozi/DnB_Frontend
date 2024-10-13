import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Button, Card, List, Typography } from 'antd';
import type { CardListItemDataType } from './data.d';
import {
  queryFakeList,
  enableDevice,
  disableDevice,
  enableAllDevices,
  disableAllDevices,
} from './service';
import useStyles from './style.style';
const { Paragraph } = Typography;
const CardList = () => {
  const { styles } = useStyles();
  const { data, loading } = useRequest(() => {
    return queryFakeList({
      count: 7,
    });
  });
  const list = data?.list || [];

  const handleEnable = async (title) => {
    try {
      enableDevice(title);

    } catch (error) {
      console.error('开启设备失败:', error);
    }
  };

  // 禁用单个设备
  const handleDisable = async (title) => {
    try {
      disableDevice(title);
    } catch (error) {
      console.error('关闭设备失败:', error);
    }
  };

  // 启用所有设备
  const handleEnableAll = async () => {
    try {
      enableAllDevices();
    } catch (error) {
      console.error('开启所有设备失败:', error);
    }
  };

  // 禁用所有设备
  const handleDisableAll = async () => {
    try {
      disableAllDevices();
    } catch (error) {
      console.error('关闭所有设备失败:', error);
    }
  };

  const content = (
    <div className={styles.pageHeaderContent}>
      <p>
        {list.length}个设备
      </p>
      <div className={styles.contentLink}>
        <a onClick={handleEnableAll} style={{ marginRight: 16, cursor: 'pointer' }}>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg" />{' '}
          开启智能调节模式
        </a>
        <a onClick={handleDisableAll} style={{ marginRight: 16, cursor: 'pointer' }}>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg" />{' '}
          关闭智能调节模式
        </a>
        <a>
          <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg" />{' '}
          产品文档
        </a>
      </div>
    </div>
  );
  const extraContent = (
    <div className={styles.extraImg}>
      <img
        alt="这是一个标题"
        src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"
      />
    </div>
  );
  const nullData: Partial<CardListItemDataType> = {};
  return (
    <PageContainer content={content} extraContent={extraContent}>
      <div className={styles.cardList}>
        <List<Partial<CardListItemDataType>>
          rowKey="id"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={[nullData, ...list]}
          renderItem={(item) => {
            if (item && item.id) {
              return (
                <List.Item key={item.id}>
                  <Card
                    hoverable
                    className={styles.card}
                    actions={[
                      <a
                        key="enable"
                        onClick={(e) => {
                          e.preventDefault(); // 防止默认跳转行为
                          handleEnable(item.title);
                        }}
                        style={{ color: '#1890ff' }} // 可选：自定义颜色
                      >
                        开启
                      </a>,
                      <a
                        key="disable"
                        onClick={(e) => {
                          e.preventDefault(); // 防止默认跳转行为
                          handleDisable(item.title);
                        }}
                      //style={{ color: 'red' }} // 可选：自定义颜色
                      >
                        关闭
                      </a>,
                    ]}
                  >
                    <Card.Meta
                      avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                      title={<a>{item.title}</a>}
                      description={
                        <Paragraph
                          className={styles.item}
                          ellipsis={{
                            rows: 3,
                          }}
                        >
                          {item.description}
                        </Paragraph>
                      }
                    />
                  </Card>
                </List.Item>
              );
            }
            return (
              <List.Item>
                <Button type="dashed" className={styles.newButton}>
                  <PlusOutlined /> 新增设备
                </Button>
              </List.Item>
            );
          }}
        />
      </div>
    </PageContainer>
  );
};
export default CardList;
