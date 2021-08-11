import React, { FC } from 'react';

import { PageBody } from './PageBody.styled';

interface Props {}

const BodyComponent: FC<Props> = ({ children }) => {
  return (
    <PageBody>
      {children}
    </PageBody>
  )
};

export default BodyComponent;
