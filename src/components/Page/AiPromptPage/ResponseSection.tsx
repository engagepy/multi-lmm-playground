import * as React from 'react'
import Image from '@/commonElements/Image'
import { AiModel } from '@/interface/models'
import TypeWriterAnimation from '@/components/TypeWriterAnimation'
import * as HfHelper from '@/helper/HfHelper';
import type { ChatCompletionOutput } from "@huggingface/tasks";
import Button from '@/commonElements/Button';
import ChatMoreModal from './ChatMoreModal';

export type Props = {
    aiModal: AiModel;
    prompt: string;
}

const ResponseSection: React.FC<Props> = (props: Props) => {
    const { aiModal, prompt } = props;

    const modelName = `my_model-${aiModal.id}`;


    // State to handle the response, loading state, and error state
    const [response, setResponse] = React.useState<ChatCompletionOutput | null>(null);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [error, setError] = React.useState<string | null>(null);

    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    // Fetching model response when the prompt or aiModal changes
    React.useEffect(() => {
        fetchResponse();
    }, [prompt, aiModal.name]); // Re-run when prompt or aiModal changes

    const fetchResponse = async () => {
        try {
            setLoading(true);
            setError(null);
            setResponse(null);
            const message = [
                {
                    role: "user",
                    content: prompt
                }
            ];
            const res = await HfHelper.hfAIModel(message, aiModal.model);
            setResponse(res);
        } catch (err) {
            setError('Error fetching response');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const openModel = (): void => {
        (document.getElementById(modelName)! as any).showModal();
        setIsOpen(true);
    }


    return (
        <>
            <div className='flex flex-col justify-between p-4 border-2 border-gray-200 dark:border-gray-600 rounded-3xl h-44 w-full overflow-y-scroll no-scrollbar' key={aiModal.id}>
                {/* model icon */}
                <div>
                    <div className='flex justify-between items-center'>
                        <div className='flex gap-3 text-[12px]/[18px] dark:text-[#C7C6C6]'>
                            <Image
                                src={aiModal.image}
                                alt='chatgpt'
                                attrBtn={{
                                    height: 30,
                                    width: 30
                                }}
                            />
                            <div className='p-2 border-[1.8px] border-gray-200 dark:border-gray-500 rounded-full  '>
                                <span className='font-bold '>Model:</span> {aiModal.name}
                            </div>
                            {response && <div className='p-2 border-[1.8px] border-gray-200 dark:border-gray-500 rounded-full  '>
                                <span className='font-bold '>Token:</span> {response.usage.total_tokens}
                            </div>}
                        </div>
                    </div>
                    <div className='mt-3 text-sm dark:text-[#E7E6E6]'>
                        {loading && <span className="loading loading-dots loading-md"></span>}
                        {error && <p className='text-red-500'>{error}</p>}
                        {response && <TypeWriterAnimation text={response.choices[0].message.content} />}
                    </div>
                </div>
                {response && (
                    <div className='flex justify-end align-bottom mt-2'>
                        <Button
                            attrBtn={{
                                className: 'btn btn-primary dark:btn-neutral h-8 px-2 min-h-8',
                                onClick: openModel,
                            }}
                        >
                            What to ask More?
                        </Button>
                    </div>
                )}
            </div >

            {response && (
                <dialog id={modelName} className="modal ">
                    {isOpen && <div className="modal-box w-11/12 max-w-5xl overflow-y-scroll no-scrollbar">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <div className='flex items-center gap-4'>
                                <Image
                                    src={aiModal.image}
                                    alt='chatgpt'
                                    attrBtn={{
                                        height: 33,
                                        width: 33
                                    }}
                                />
                                <h3 >
                                    {aiModal.name}
                                </h3>
                            </div>
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <Button
                                    attrBtn={{
                                        className: "btn btn-sm btn-circle btn-ghost",
                                        onClick: () => setIsOpen(true)
                                    }}
                                >✕</Button>
                            </form>
                        </div>

                        <div className='mt-3'>
                            <ChatMoreModal
                                model={aiModal.model}
                                messages={response!.choices}
                                firstMessage={{
                                    role: "user",
                                    content: prompt
                                }}
                            />
                        </div>
                    </div>}
                </dialog>
            )}


        </>
    )
}

export default ResponseSection
