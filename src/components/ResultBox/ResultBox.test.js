import ResultBox from './ResultBox';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
    it('should render without crashing', () => {
        render(<ResultBox from='PLN' to='USD' amount={100}/>);
    });
    it('should render proper info about conversion when PLN -> USD', () => {
        const testCasesFromPLNToUSD = [
            {from: 'PLN', to: 'USD', amount: 100, result: 'PLN 100.00 = $28.57' },
            {from: 'PLN', to: 'USD', amount: 50, result: 'PLN 50.00 = $14.29' },
            {from: 'PLN', to: 'USD', amount: 340, result: 'PLN 340.00 = $97.14' },
            {from: 'PLN', to: 'USD', amount: 570, result: 'PLN 570.00 = $162.86' },
            {from: 'PLN', to: 'USD', amount: 240, result: 'PLN 240.00 = $68.57' },
        ];
        for(const testObj of testCasesFromPLNToUSD){
            render(<ResultBox from = {testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)}/>);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testObj.result);
            cleanup();
        };
    });
    it('should render proper info about conversion when USD -> PLN', () => {
        const testCasesFromUSDToPLN = [
            { from: 'USD', to: 'PLN', amount: 30, result: '$30.00 = PLN 105.00' },
            { from: 'USD', to: 'PLN', amount: 140, result: '$140.00 = PLN 490.00' },
            { from: 'USD', to: 'PLN', amount: 170.20, result: '$170.20 = PLN 595.70' },
            { from: 'USD', to: 'PLN', amount: 220.20, result: '$220.20 = PLN 770.70' },
            { from: 'USD', to: 'PLN', amount: 500, result: '$500.00 = PLN 1,750.00' },
        ];
        for(const testObj of testCasesFromUSDToPLN){
            render(<ResultBox from = {testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)}/>);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testObj.result);
            cleanup();
        };
    });
    it('should render proper info about conversion when PLN -> PLN', () => {
        const testCasesFromPLNToPLN = [
            { from: 'PLN', to: 'PLN', amount: 100, result: 'PLN 100.00 = PLN 100.00'},
            { from: 'PLN', to: 'PLN', amount: 200, result: 'PLN 200.00 = PLN 200.00'},
            { from: 'PLN', to: 'PLN', amount: 140, result: 'PLN 140.00 = PLN 140.00'},
            { from: 'PLN', to: 'PLN', amount: 600, result: 'PLN 600.00 = PLN 600.00'},
            { from: 'PLN', to: 'PLN', amount: 1000, result: 'PLN 1,000.00 = PLN 1,000.00'},
        ];
        for(const testObj of testCasesFromPLNToPLN){
            render(<ResultBox from = {testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)}/>);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testObj.result);
            cleanup();
        };
    });
    it('should render proper info about conversion when USD -> USD', () => {
        const testCasesFromPLNToPLN = [
            { from: 'USD', to: 'USD', amount: 100, result: '$100.00 = $100.00' },
            { from: 'USD', to: 'USD', amount: 330, result: '$330.00 = $330.00' },
            { from: 'USD', to: 'USD', amount: 30, result: '$30.00 = $30.00' },
            { from: 'USD', to: 'USD', amount: 80, result: '$80.00 = $80.00' },
            { from: 'USD', to: 'USD', amount: 15, result: '$15.00 = $15.00' },
        ];
        for(const testObj of testCasesFromPLNToPLN){
            render(<ResultBox from = {testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)}/>);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testObj.result);
            cleanup();
        };
    });
    it('should render text "Wrong value" when amount is less then 0', () => {
        const testCasesNegativeValue = [
            { from: 'PLN', to: 'USD', amount: -20, result: 'Wrong value' },
            { from: 'PLN', to: 'USD', amount: -2, result: 'Wrong value' },
            { from: 'USD', to: 'PLN', amount: -100, result: 'Wrong value' },
            { from: 'USD', to: 'PLN', amount: -2000, result: 'Wrong value' },
        ];
        for(const testObj of testCasesNegativeValue){
            render(<ResultBox from = {testObj.from} to={testObj.to} amount={parseFloat(testObj.amount)}/>);
            const resultField = screen.getByTestId('result');
            expect(resultField).toHaveTextContent(testObj.result);
            cleanup();
        }
    });
});