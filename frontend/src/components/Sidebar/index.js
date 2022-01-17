import React from 'react';
import { Icon, Button, Modal, Select, Input, Form } from 'antd';
import { Dialogs } from 'containers';
import { Popover } from 'antd';

import './Sidebar.scss';

const { Option } = Select;
const { TextArea } = Input;

const Sidebar = ({
  user,
  visible,
  inputValue,
  messageText,
  selectedUserId,
  isLoading,
  users,
  onShow,
  onLogOut,
  onClose,
  onSearch,
  onChangeInput,
  onSelectUser,
  onChangeTextArea,
  onModalOk,
}) => {
  const options = users.map(user => <Option key={user._id}>{user.fullname}</Option>);

  return (
    <div className="chat__sidebar">
     
      <div className="chat__sidebar-header">
        <div>
          <Icon type="team" />
          <span>Chats</span>
        </div>
        
          <Popover
            className="chat__sidebar-header-action"
            content={
              <div className="chat__sidebar-header-action-popup">
                <Button onClick={onShow}>New chat</Button>
                <Button onClick={onLogOut}>Log out</Button>
              </div>
            }
            trigger="hover">
            <div>
              <Button type="link" shape="circle" icon="ellipsis" />
            </div>
          </Popover>
        
      </div>

      

      <div className="chat__sidebar-dialogs">
        <Dialogs userId={user && user._id} />
      </div>
      <Modal
        title="Create chat"
        visible={visible}
        onCancel={onClose}
        footer={[
          <Button key="back" onClick={onClose}>
            Close
          </Button>,
          <Button
            disabled={!messageText}
            key="submit"
            type="primary"
            loading={isLoading}
            onClick={onModalOk}>
            Create
          </Button>,
        ]}>
        <Form className="add-dialog-form">
          <Form.Item label="Enter user name or email">
            <Select
              value={inputValue}
              onSearch={onSearch}
              onChange={onChangeInput}
              onSelect={onSelectUser}
              notFoundContent={null}
              style={{ width: '100%' }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              placeholder="Enter user name or email"
              showSearch>
              {options}
            </Select>
          </Form.Item>
          {selectedUserId && (
            <Form.Item label="Enter message">
              <TextArea
                autosize={{ minRows: 3, maxRows: 10 }}
                onChange={onChangeTextArea}
                value={messageText}
              />
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

Sidebar.defaultProps = {
  users: [],
};

export default Sidebar;
