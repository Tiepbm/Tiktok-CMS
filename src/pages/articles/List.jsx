import { useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { API } from "../../api";

export default function List() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(API + "/api/articles")
      .then((res) => res.json())
      .then(setArticles);
  }, []);

  const deleteArticle = async (id) => {
    await fetch(API + `/api/articles/${id}`, { method: "DELETE" });
    setArticles(articles.filter((x) => x.id !== id));
  };

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Tiêu đề", dataIndex: "title" },
    { title: "Slug", dataIndex: "slug" },
    {
      title: "Hành động",
      render: (_, row) => (
        <>
          <Link to={`/admin/articles/${row.slug}/edit`}>
            <Button type="primary" size="small">Sửa</Button>
          </Link>
          <Popconfirm title="Xóa bài viết?" onConfirm={() => deleteArticle(row.id)}>
            <Button danger size="small" style={{ marginLeft: 10 }}>Xóa</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Danh sách bài viết</h2>
      <Table columns={columns} dataSource={articles} rowKey="id" pagination={{ pageSize: 10 }} />
    </div>
  );
}
