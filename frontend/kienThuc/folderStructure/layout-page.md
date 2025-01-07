# Layout
Ta dùng Layout để tái sử dụng lại các giao diện chung giữa các trang

Ví dụ: trang nào cũng có navigation bar, header, footer

# Page
Khác với layout Page là trang giao diện riêng

Ví dụ: page trang chủ, page chi tiết nước

# Layout và page hoạt động chung với nhau như thế này

```
<!-- App.js -->
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import PostsPage from './pages/dashboard/PostsPage';
import PostDetailsPage from './pages/dashboard/PostDetailsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="posts" element={<PostsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

```

```
<!-- PostsPage -->
import React from 'react';
import PostList from '../../components/features/Posts/PostList';

const PostsPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Posts</h2>
      <PostList />
    </div>
  );
};

export default PostsPage;

```

```
<!-- DashBoardLayout -->
import React from 'react';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li>
              <a href="/dashboard/posts" className="block py-2">
                Posts
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;

```

