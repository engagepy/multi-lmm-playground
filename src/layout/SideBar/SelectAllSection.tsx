// default library
import * as React from 'react';
import Checkbox from '@commonElements/Checkbox';

export type Props = {
    isSelectedAll: boolean;
    onHandleChange: () => void;
}

const SelectAllSection: React.FC<Props> = (props: Props) => {
    const { isSelectedAll, onHandleChange } = props;

    return (
        <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center justify-between">
                <label htmlFor="select-all-checkbox" className="py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Select All</label>
                <Checkbox
                    attrBtn={{
                        id: "select-all-checkbox",
                        checked: isSelectedAll,
                        className: "w-4 h-4 checkbox checkbox-primary mr-3 ",
                        onChange: onHandleChange,
                    }}
                />
            </div>
        </li>
    )
}

export default SelectAllSection