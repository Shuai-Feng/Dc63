import React from 'react';
import { Redirect } from 'umi';

export default () => {
  return (
    <div>
      <Redirect to='/home' />
    </div>
  );
}
