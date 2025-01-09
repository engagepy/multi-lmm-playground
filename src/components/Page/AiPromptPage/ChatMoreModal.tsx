import React from 'react';
import Input from '@/commonElements/Input';
import Button from '@/commonElements/Button';
import Image from '@/commonElements/Image';
import type { ChatCompletionOutputComplete, ChatCompletionInputMessage } from "@huggingface/tasks";
import * as HfHelper from '@/helper/HfHelper';

type Props = {
    model: string;
    messages: ChatCompletionOutputComplete[];
    firstMessage: ChatCompletionInputMessage;
}

const ChatMoreModal: React.FC<Props> = (props: Props) => {
    const { messages, firstMessage, model } = props;

    const [allMessages, setAllMessages] = React.useState<ChatCompletionInputMessage[]>([]);


    // State to handle the response, loading state, and error state
    const [error, setError] = React.useState<string | null>(null);

    const [newPrompt, setNewPrompt] = React.useState<string>('');

    React.useEffect(() => {
        const allMessages = [
            firstMessage,
        ]
        for (const chunk of messages) {
            console.log(chunk.message)
            allMessages.push(chunk.message as ChatCompletionInputMessage)
        }
        setAllMessages([...allMessages,]);

        return () => {
            setNewPrompt('');
        }
    }, []);


    const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPrompt(e.target.value);
    }

    const fetchResponse = async () => {
        try {
            setError(null);

            const res = await HfHelper.hfAIModel(allMessages, model);
            console.log(res)
            const message: ChatCompletionInputMessage = {
                role: res.choices[0].message.role,
                content: res.choices[0].message.content as string,
            }
            setAllMessages((prev) => [
                ...prev,
                message,
            ])
        } catch (err) {
            setError('Error fetching response');
            console.error(err);
        }
    };

    const updateAllMessages = (): void => {
        const message: ChatCompletionInputMessage = {
            role: "user",
            content: newPrompt
        };
        allMessages.push(message);
        fetchResponse();
        setNewPrompt('');
    }

    return (
        <>
            <div>
                {allMessages.map((e, i) => {
                    const isLastItem = i === allMessages.length - 1;
                    const showLoading = isLastItem && e.role === "user";
                    return (
                        <div key={i}>
                            <div className={`chat ${e.role === "user" ? "chat-end" : "chat-start"}`}>
                                <div className="chat-bubble">
                                    {e.content as string}
                                </div>
                            </div>
                            {(showLoading || error) && (
                                <div className={`chat chat-start`} >
                                    <div className="chat-bubble">
                                        {showLoading && <span className="loading loading-dots loading-md"></span>}
                                        {error && <p className='text-red-500'>{error}</p>}
                                    </div>
                                </div>
                            )}

                        </div>
                    )
                })}
            </div>

            <div className='mt-4'>
                <div className="relative">
                    <Input
                        attrBtn={{
                            placeholder: "Type Here...",
                            className: "w-full px-5 py-4 border border-gray-300 dark:border-gray-600 rounded-full bg-gray-50 dark:bg-[#141313] focus:outline-none focus:ring-2 focus:ring-blue-500",
                            value: newPrompt,
                            onChange: onHandleChangeText,
                        }}
                    />
                    <Button
                        attrBtn={{
                            className: "absolute right-0 top-0 bottom-0 px-2.5 py-2 btn btn-neutral rounded-full m-2 border-0 h-auto min-h-[50%] focus:ring-0",
                            onClick: updateAllMessages,
                        }}
                    >
                        <Image
                            src={'/sparkling-dark.svg'}
                            alt='sparkling'
                            attrBtn={{
                                width: 22,
                                height: 22,
                                className: 'sparkling-color',
                            }}
                        />
                    </Button>

                </div>
            </div>
        </>
    );
};

export default ChatMoreModal;
