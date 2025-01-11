import * as React from 'react';

export type Props = {
    attrBtn: {
        [key: string]: any;
    };
}

const index: React.FC<Props> = (props: Props) => {
    return (
        <input
            {...props.attrBtn}
        />
    )
}

export default index