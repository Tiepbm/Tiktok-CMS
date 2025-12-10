import {useEffect, useMemo, useRef, useState} from "react";
import { Form, Input, Button, message } from "antd";
import { useParams } from "react-router-dom";
import Editor from "../../components/Editor";
import { API } from "../../api";
import JoditEditor from "jodit-react";

export default function Edit() {
  const { id } = useParams();
  const [form] = Form.useForm();

  const editor = useRef(null);


  const config = useMemo(() => ({
        readonly: false, // all options from https://xdsoft.net/jodit/docs/,
        // placeholder: 'Nhập kết luận...'
      }),
      []
  );

  useEffect(() => {
    fetch(API + `/api/articles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        form.setFieldsValue(data);
        // setContent(data.html);
      });
  }, []);

  const submit = async (values) => {
    await fetch(API + `/api/articles/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...values }),
    });
    message.success("Đã lưu thay đổi!");
  };

  return (
    <div>
      <h2>Sửa bài</h2>
      <Form form={form} layout="vertical" onFinish={submit}>
        <Form.Item label="Tiêu đề" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Slug" name="slug">
          <Input disabled/>
        </Form.Item>
        <Form.Item label="Nội dung"  name={'html'}>
          <JoditEditor
              ref={editor}
              value={form.getFieldValue('html')}
              config={config}
              onBlur={(newContent) => {
                form.setFieldsValue({html: newContent});
              }}
          />
        </Form.Item>        <Button type="primary" htmlType="submit">Lưu</Button>
      </Form>
    </div>
  );
}
