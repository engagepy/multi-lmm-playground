import * as React from 'react';
import Image from 'next/image';

export type Props = {
    src: string;
    alt: string;
    attrBtn: {
        [key: string]: any;
    };
}

const index: React.FC<Props> = (props: Props) => {
    return (
        <Image
            src={props.src}
            alt={props.alt}
            {...props.attrBtn}
        />
    )
}

export default index