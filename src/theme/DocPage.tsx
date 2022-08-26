import React from 'react';
import DocPage from '@theme-original/DocPage';
import { RequireAuth } from "@site/src/theme/RequireAuth";

export default function DocPageWrapper(props) {
  return (
    <RequireAuth>
      <DocPage {...props} />
    </RequireAuth>
  );
}
