import * as React from 'react';
import {render,screen} from '@testing-library/react';
import ToDoListItem from './ToDoListItem';


describe('ToDoListItem', () => {
    test('renders the checkbox', () => {
        render(<ToDoListItem {...props.item.label, props.item.completed} />);

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    })
})
