import { HfInference } from "@huggingface/inference";
import type { ChatCompletionOutput, ChatCompletionInputMessage } from "@huggingface/tasks";

const HF_TOKEN = "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";

const hfInterface = new HfInference(HF_TOKEN);

const commonHFProps = {
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 0.7
}


export const hfAIModel = async (messages: ChatCompletionInputMessage[], model: string): Promise<ChatCompletionOutput> => {

    const response = await hfInterface.chatCompletion({
        model,
        messages,
        ...commonHFProps
    });

    return response;
}
