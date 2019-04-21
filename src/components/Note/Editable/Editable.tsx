import * as React from 'react';
import { createComponent } from 'react-fela'
import { withStateHandlers } from 'recompose';
import { Input, Icon } from 'semantic-ui-react';
import { defaultTo } from 'ramda';

export interface IProps {
    value: string;
    componentType?: string;
    onChange: (value: string) => any;
}

interface IState {
    edit: string;
    startEditing: () => any;
    commitEdit: () => any;
    isEditing: boolean;
    rollbackEdit: () => any;
    setEdit: (text: string) => any;
}

const EditIcon = createComponent(({isVisible, color, children, className = ''}) => ({
    display: isVisible ? 'inline-block' : 'none',
    cursor: 'pointer',
    color: 'grey',
    marginLeft: '10px',
    ':hover': {
        color,
    }
}), 'span', ['className'])

const inlineBlockRule = () => ({
    display: 'inline-block',
    marginBottom: '0',
    verticalAlign: 'top',
})

const ClickableText = createComponent(() => ({
    cursor: 'pointer',
    ':hover > .editIcon': {
        display: 'inline-block',
    },
}), 'span', ['onClick'])

const StatelessEditable: React.StatelessComponent<IProps & IState> = ({
    value, componentType, edit, isEditing, startEditing, commitEdit, rollbackEdit, setEdit
}) => {
    const Text = createComponent(inlineBlockRule, defaultTo('span', componentType))
    return isEditing
        ? <>
            <Input as='h3' value={edit} onChange={(e) => setEdit((e.target as any).value)}/>
            <EditIcon isVisible={true} color='green'>
                <Icon size='large' name='check' onClick={commitEdit}/>
            </EditIcon>
            <EditIcon isVisible={true} color='red'>
                <Icon size='large' name='times' onClick={rollbackEdit}/>
            </EditIcon>
        </>
        : <ClickableText onClick={startEditing}>
            <Text>{value}</Text>
            <EditIcon color='blue' isVisible={false} className='editIcon'>
                <Icon size='large' name='pencil'/>
            </EditIcon>
        </ClickableText>
}

export const Editable = withStateHandlers(
    (props: IProps) => ({
        edit: props.value,
        isEditing: false,
    }),
    {
        startEditing: (state) => () => ({isEditing: true}),
        commitEdit: (state, props) => () => {
            props.onChange(state.edit);
            return {isEditing: false};
        },
        rollbackEdit: (state, props) => () => ({isEditing: false, edit: props.value}),
        setEdit: (state) => (text: string) => ({edit: text}),
    }
)(StatelessEditable as any)
