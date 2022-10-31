import React from 'react';
import BlogListPage from '@theme-original/BlogListPage';
import { RequireAuth } from "@site/src/theme/RequireAuth";

export default function BlogListPageWrapper(props) {
  return (
    <RequireAuth>
      <BlogListPage {...props} />
    </RequireAuth>
  );
}
