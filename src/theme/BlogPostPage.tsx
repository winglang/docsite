import React from 'react';
import BlogPostPage from '@theme-original/BlogPostPage';
import { RequireAuth } from "@site/src/theme/RequireAuth";

export default function BlogPostPageWrapper(props) {
  return (
    <RequireAuth>
      <BlogPostPage {...props} />
    </RequireAuth>
  );
}
