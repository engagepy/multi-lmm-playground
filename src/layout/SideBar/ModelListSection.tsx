import { allAiModel } from '@/data/aiModelData';
import { AiModelList } from '@/interface/models';
import * as React from 'react';
import Checkbox from '@/commonElements/Checkbox';

export type Props = {
    aiModal: AiModelList;
    onHandleClick: (id: number) => void;
}

const ModelListSection: React.FC<Props> = (props: Props) => {
    const { aiModal, onHandleClick } = props;

    const handleCheckboxChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const target = e.target;

        const id = Number(target.value);

        onHandleClick(id);
    }

    return (
        <>
            {allAiModel.map((ele, index) => {
                const isSelected = aiModal.some((e) => e.id === ele.id);
                return (
                    <li
                        className={`w-full 
                                ${index === allAiModel.length - 1
                                ? ""
                                : "border-b border-gray-200"
                            } 
                                rounded-t-lg dark:border-gray-600`
                        }
                        key={ele.id}
                    >
                        <div className="flex items-center ps-3">
                            <Checkbox
                                attrBtn={{
                                    id: `${ele.id}-select`,
                                    checked: isSelected && "checked",
                                    className: "w-4 h-4 checkbox checkbox-primary mr-3 ",
                                    // className: "w-4 h-4 mr-3 text-blue-600 bg-gray-100 border-gray-300 rounded dark:bg-gray-600 dark:border-gray-500",
                                    onChange: handleCheckboxChange,
                                    value: ele.id,
                                }}
                            />
                            <label
                                htmlFor={`${ele.id}-select`}
                                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {ele.name}
                            </label>
                        </div>
                    </li>
                );
            })}
        </>
    )
}

export default ModelListSection