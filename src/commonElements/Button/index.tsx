import React from 'react';

type Props = {
    attrBtn: {
        [key: string]: any;
    };
    children: React.ReactNode;
}
const index: React.FC<Props> = (props: Props) => {
    return <button {...props.attrBtn}>{props.children}</button>;
};

export default index;