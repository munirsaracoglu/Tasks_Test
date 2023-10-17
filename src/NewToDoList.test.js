import * as React from 'react';
import {render,screen} from '@testing-library/react';
import NewToDoList from './NewToDoList';

describe('NewToDoList', () => {
    test('renders the input field', () => {
        render(<NewToDoList />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    test('renders the button', () => {
        render(<NewToDoList />);

        expect(screen.getByRole('button', {name: 'Add'})).toBeInTheDocument();
    })
})