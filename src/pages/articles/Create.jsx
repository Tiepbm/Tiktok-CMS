import {useMemo, useRef, useState} from "react";
import { Form, Input, Button, message } from "antd";
import { API } from "../../api";
import JoditEditor from "jodit-react";

export default function Create() {
  const [form] = Form.useForm();
  const editor = useRef(null);


  const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        // placeholder: 'Nhập kết luận...'
      }),
      []
  );

  const submit = async (values) => {
    await fetch(API + "/api/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values }),
    });
    message.success("Đã tạo bài viết!");
  };

  return (
    <div>
      <h2>Đăng bài mới</h2>
      <Form form={form} layout="vertical" onFinish={submit}>
        <Form.Item label="Tiêu đề" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        {/*<Form.Item label="Slug" name="slug">*/}
        {/*  <Input placeholder="(bỏ trống = tự tạo)" />*/}
        {/*</Form.Item>*/}
        <Form.Item label="Nội dung" name={'html'}>
          <JoditEditor
              ref={editor}
              value={form.getFieldValue('html')}
              config={config}
              onBlur={(newContent) => {
                form.setFieldsValue({html: newContent});
              }}
          />        </Form.Item>
        <Button type="primary" htmlType="submit">Lưu bài viết</Button>
      </Form>
    </div>
  );
}
