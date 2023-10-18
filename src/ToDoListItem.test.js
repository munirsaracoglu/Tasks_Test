import * as React from 'react';
import {render,screen} from '@testing-library/react';
import ToDoListItem from './ToDoListItem';


describe('ToDoListItem', () => {
    test('renders the checkbox', () => {
        const completed = true;
        const item = { completed, label: 'Completed item' };
        render(<ToDoListItem item = {item} />);

        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    })
})
