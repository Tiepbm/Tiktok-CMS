import {Layout, Menu} from "antd";
import {DashboardOutlined, FileTextOutlined, PlusOutlined,} from "@ant-design/icons";
import {Link} from "react-router-dom";

const { Header, Sider, Content } = Layout;

export default function AdminLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={220}>
        <div
          style={{
            height: 60,
            margin: 16,
            color: "white",
            fontSize: 20,
            textAlign: "center"
          }}
        >
          Admin
        </div>

        <Menu theme="dark" mode="inline">
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            <Link to="/admin">Dashboard</Link>
          </Menu.Item>

          <Menu.Item key="list" icon={<FileTextOutlined />}>
            <Link to="/admin/articles">Danh sách bài viết</Link>
          </Menu.Item>

          <Menu.Item key="create" icon={<PlusOutlined />}>
            <Link to="/admin/articles/create">Đăng bài mới</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: "#fff", paddingLeft: 20 }}>
          <b>Quản trị tin tức</b>
        </Header>

        <Content style={{ padding: 20 }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
