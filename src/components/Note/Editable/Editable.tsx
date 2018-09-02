import * as React from 'react';
import { withStateHandlers } from 'recompose';
import { Input, Icon } from 'semantic-ui-react';
import { createComponent } from 'react-fela';
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
    isHovering: boolean;
    hoverOn: () => any;
    hoverOff: () => any;
}

// @ts-ignore
const HighlightableIcon = createComponent(({color}) => ({
    display: 'inline-block',
    color: 'grey !important',
    marginLeft: '10px',
    ':hover': {
        color: color+' !important'
    }
}), 'span')

const inlineBlockRule = () => ({
    display: 'inline-block',
    marginBottom: '0',
    verticalAlign: 'top',
})

const StatelessEditable: React.StatelessComponent<IProps & IState> = (
    {value, componentType, edit, isEditing, startEditing, commitEdit, rollbackEdit, setEdit, hoverOn, hoverOff, isHovering}
) => {
    const Text = createComponent(inlineBlockRule, defaultTo('span', componentType))
    return isEditing
        ? <>
            <Input as='h3' value={edit} onChange={(e) => setEdit((e.target as any).value)}/>
            <HighlightableIcon color='green'>
                <Icon size='large' name='check' onClick={commitEdit}/>
            </HighlightableIcon>
            <HighlightableIcon color='red'>
                <Icon size='large' name='times' onClick={rollbackEdit}/>
            </HighlightableIcon>
        </>
        : <span onMouseEnter={hoverOn} onMouseLeave={hoverOff}>
            <Text>{value}</Text>
            {isHovering && 
                <HighlightableIcon color='blue'>
                    <Icon size='large' name='pencil' onClick={startEditing}/>
                </HighlightableIcon>
            }
        </span>
}

export const Editable = withStateHandlers(
    (props: IProps) => ({
        edit: props.value,
        isEditing: false,
        isHovering: false,
    }),
    {
        startEditing: (state) => () => ({isEditing: true, isHovering: false}),
        commitEdit: (state, props) => () => {
            props.onChange(state.edit);
            return {isEditing: false};
        },
        rollbackEdit: (state, props) => () => ({isEditing: false, edit: props.value}),
        setEdit: (state) => (text: string) => ({edit: text}),
        hoverOn: (state) => () => ({isHovering: true}),
        hoverOff: (state) => () => ({isHovering: false}),
    }
)(StatelessEditable as any)
