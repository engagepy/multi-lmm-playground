import React from 'react';
import type { ChatCompletionOutputComplete, ChatCompletionInputMessage } from "@huggingface/tasks";
// common component
import Input from '@commonElements/Input';
import Button from '@commonElements/Button';
import Image from '@commonElements/Image';
// hugging fce helper
import * as HfHelper from '@helper/HfHelper';
// component for typewriter 
import TypeWriterAnimation from '@components/TypeWriterAnimation'
// interface for ai currentAiModel data structure
import { AiModel } from '@interface/models';

type Props = {
    currentAiModel: AiModel;
    messages: ChatCompletionOutputComplete[];
    firstMessage: ChatCompletionInputMessage;
}

const ChatMoreModal: React.FC<Props> = (props: Props) => {
    const { messages, firstMessage, currentAiModel } = props;

    // State to all messages form chat modal, error state, new messages
    const [allMessages, setAllMessages] = React.useState<ChatCompletionInputMessage[]>([]);
    const [error, setError] = React.useState<string | null>(null);
    const [newPrompt, setNewPrompt] = React.useState<string>('');
    const [isFirstLoad, setIsFirstLoad] = React.useState<boolean>(false);

    React.useEffect(() => {
        const allMessages = [
            firstMessage,
        ]
        // add all messages from the response to the chat modal state
        for (const chunk of messages) {
            console.log(chunk.message)
            allMessages.push(chunk.message as ChatCompletionInputMessage)
        }
        setAllMessages([...allMessages,]);

        return () => {
            setNewPrompt(''); //reset prompt
        }
    }, []);


    // handle input change
    const onHandleChangeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setNewPrompt(e.target.value);
    }

    // handle send button click and get the response form hugging face
    const fetchResponse = async (): Promise<void> => {
        try {
            setError(null);

            const res = await HfHelper.hfAIModel(allMessages, currentAiModel.model);
            const message: ChatCompletionInputMessage = {
                role: res.choices[0].message.role,
                content: res.choices[0].message.content as string,
            }

            // add the response message to the chat modal state
            setAllMessages((prev) => [
                ...prev,
                message,
            ]);

            setIsFirstLoad(true)

        } catch (err) {
            setError(JSON.parse((err as any).message));
        }
    };

    // handle send button click
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
            <div className="modal-box w-11/12 max-w-5xl overflow-y-scroll no-scrollbar pt-0">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <div className='flex items-center gap-4'>
                        <Image
                            src={currentAiModel.image}
                            alt='chatgpt'
                            attrBtn={{
                                height: 33,
                                width: 33
                            }}
                        />
                        <h3 >
                            {currentAiModel.name}
                        </h3>
                    </div>
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <Button
                            attrBtn={{
                                className: "btn btn-sm btn-circle btn-ghost",
                            }}
                        >
                            ✕
                        </Button>
                    </form>
                </div>
                <div className='mt-3'>
                    <div>
                        {allMessages.map((e, i) => {
                            // check item is last item or not
                            const isLastItem = i === allMessages.length - 1;
                            // show loading when item is last item and role is "assistant"
                            const showLoading = isLastItem && e.role === "user";
                            // chat response text
                            const text = (e.content as string);
                            return (
                                <div key={i}>
                                    <div className={`chat ${e.role === "user" ? "chat-end" : "chat-start"}`}>
                                        <div className="chat-bubble">
                                            {(isFirstLoad && isLastItem)
                                                ? <TypeWriterAnimation text={text} />
                                                : text
                                            }
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

                    {/* new prompt  */}
                    <div className='mt-4'>
                        <div className="relative">
                            <Input
                                attrBtn={{
                                    type: "text",
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
                </div>
            </div>
        </>
    );
};

export default ChatMoreModal;
