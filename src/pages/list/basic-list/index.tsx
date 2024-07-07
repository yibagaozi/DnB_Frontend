import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import {
  Avatar,
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  List,
  Modal,
  Progress,
  Radio,
  Row,
} from 'antd';
import dayjs from 'dayjs';
import type { FC } from 'react';
import React, { useState, useEffect } from 'react';
import OperationModal from './components/OperationModal';
import type { BasicListItemDataType } from './data.d';
import { addFakeList, queryFakeList, removeFakeList, updateFakeList, queryHomeDeviceInfo } from './service';
import useStyles from './style.style';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Search } = Input;
const Info: FC<{
  title: React.ReactNode;
  value: React.ReactNode;
  bordered?: boolean;
}> = ({ title, value, bordered }) => {
  const { styles } = useStyles();
  return (
    <div className={styles.headerInfo}>
      <span>{title}</span>
      <p>{value}</p>
      {bordered && <em />}
    </div>
  );
};
const ListContent = ({
  data: { owner, createdAt, percent, status },
}: {
  data: BasicListItemDataType;
}) => {
  const { styles } = useStyles();
  return (
    <div>
      <div className={styles.listContentItem}>
        <span>设备房间</span>
        <p>{owner}</p>
      </div>
      {/*       <div className={styles.listContentItem}>
        <span>开始时间</span>
        <p>{dayjs(createdAt).format('YYYY-MM-DD HH:mm')}</p>
      </div> */}
      <div className={styles.listContentItem}>
        <span>设备状态</span>
        <p></p><Progress
          percent={percent}
          //status={status}
          strokeWidth={6}
          style={{
            width: 180,
          }}
        />
      </div>
    </div>
  );
};
export const BasicList: FC = () => {
  const { styles } = useStyles();
  const [done, setDone] = useState<boolean>(false);
  const [open, setVisible] = useState<boolean>(false);

  const [current, setCurrent] = useState<Partial<BasicListItemDataType> | undefined>(undefined);
  const [homeNumber, setHomeNumber] = useState<number>(0);
  const [deviceNumber, setDeviceNumber] = useState<number>(0);

  const {
    data: listData,
    loading,
    mutate,
  } = useRequest(() => {
    return queryFakeList({
      count: 32,
    });
  });

  const fetchHomeDeviceInfo = async () => {
    const response = await queryHomeDeviceInfo();
    setHomeNumber(response.homeNumber);
    setDeviceNumber(response.deviceNumber);
  };

  useEffect(() => {
    fetchHomeDeviceInfo();
  }, []);

  const { run: postRun } = useRequest(
    (method, params) => {
      if (method === 'remove') {
        return removeFakeList(params);
      }
      if (method === 'update') {
        return updateFakeList(params);
      }
      return addFakeList(params);
    },
    {
      manual: true,
      onSuccess: (result) => {
        mutate(result);
      },
    },
  );
  const list = listData?.list || [];

  const paginationProps = {
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize: 5,
    total: list.length,
  };
  const showEditModal = (item: BasicListItemDataType) => {
    setVisible(true);
    setCurrent(item);
  };
  const deleteItem = (id: string) => {
    postRun('remove', {
      id,
    });
  };
  const editAndDelete = (key: string | number, currentItem: BasicListItemDataType) => {
    if (key === 'edit') showEditModal(currentItem);
    else if (key === 'delete') {
      Modal.confirm({
        title: '删除设备',
        content: '确定删除该设备吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => deleteItem(currentItem.id),
      });
    }
  };
  const extraContent = (
    <div>
      <RadioGroup defaultValue="all">
        <RadioButton value="all">全部</RadioButton>
        <RadioButton value="progress">运行中</RadioButton>
        <RadioButton value="waiting">已关机</RadioButton>
      </RadioGroup>
      <Search className={styles.extraContentSearch} placeholder="请输入" onSearch={() => ({})} />
    </div>
  );
  const MoreBtn: React.FC<{
    item: BasicListItemDataType;
  }> = ({ item }) => (
    <Dropdown
      menu={{
        onClick: ({ key }) => editAndDelete(key, item),
        items: [
          {
            key: 'edit',
            label: '编辑',
          },
          {
            key: 'delete',
            label: '删除',
          },
        ],
      }}
    >
      <a>
        更多 <DownOutlined />
      </a>
    </Dropdown>
  );
  const handleDone = () => {
    setDone(false);
    setVisible(false);
    setCurrent({});
  };
  const handleSubmit = (values: BasicListItemDataType) => {
    setDone(true);
    const method = values?.id ? 'update' : 'add';
    postRun(method, values);
  };
  return (
    <div>
      <PageContainer>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={12} xs={24}>
                <Info title="我的家" value={`${homeNumber}个房间`} bordered />
              </Col>
              <Col sm={12} xs={24}>
                <Info title="总设备数" value={`${deviceNumber}个`} bordered />
              </Col>
              {/*               <Col sm={8} xs={24}>
                <Info title="本周完成任务数" value="24个任务" />
              </Col> */}
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="设备列表"
            style={{
              marginTop: 24,
            }}
            bodyStyle={{
              padding: '0 32px 40px 32px',
            }}
            extra={extraContent}
          >
            <List
              size="large"
              rowKey="id"
              loading={loading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <a
                      key="edit"
                      onClick={(e) => {
                        e.preventDefault();
                        showEditModal(item);
                      }}
                    >
                      编辑
                    </a>,
                    <MoreBtn key="more" item={item} />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.logo} shape="square" size="large" />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.subDescription}
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageContainer>
      {/*       <Button
        type="dashed"
        onClick={() => {
          setVisible(true);
        }}
        style={{
          width: '100%',
          marginBottom: 8,
        }}
      >
        <PlusOutlined />
        添加
      </Button> */}
      <OperationModal
        done={done}
        open={open}
        current={current}
        onDone={handleDone}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
export default BasicList;
