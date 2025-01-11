// default library
import * as React from 'react';
import { TypeAnimation } from 'react-type-animation';

export type Props = {
    text?: string;
}

const TypeWriterAnimation: React.FC<Props> = (props: Props) => {
    const { text } = props;

    return (
        <>
            <TypeAnimation
                sequence={[
                    text ?? '',
                    1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={0}
                cursor={false}
            />
        </>
    )
}

export default TypeWriterAnimation