import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Page from '../app/page'
import { act } from 'react'


describe('Cadastro', () => {
	test('Deve cadastrar uma conta de passageiro válida', async function () {
		render(<Page />)
		const nextButton = screen.getByText("Próximo")
		const passengerOption = screen.getByTitle("passengerOption")
		await act(() => {
			passengerOption.click()
			nextButton.click()
		})
		const step2 = screen.getByText("Passo 2")
		expect(step2).toBeInTheDocument()

		const nameField = screen.getByTitle("Nome")
		const emailField = screen.getByTitle("Email")
		const cpfField = screen.getByTitle("Cpf")
		const nextButton2 = screen.getByText("Próximo")

		await act(() => {
			fireEvent.change(nameField, { target: { value: 'Vinicius Nedeiros' } })
			fireEvent.change(emailField, { target: { value: `vinicius${Math.random()}@nedeiros.com ` } })
			fireEvent.change(cpfField, { target: { value: '10842083936' } })
			nextButton2.click()
		})

		const step3 = screen.getByText("Passo 3")
		expect(step3).toBeInTheDocument()

		const passwordField = screen.getByTitle("Senha")
		const confirmPassword = screen.getByTitle("Confirmar")
		const nextButton3 = screen.getByText("Confirmar")

		await act(() => {
			fireEvent.change(passwordField, { target: { value: '123456' } })
			fireEvent.change(confirmPassword, { target: { value: '123456' } })
			nextButton3.click()
		})

		const successMessage = screen.getByText("Conta criada com sucesso!")
		expect(successMessage).toBeInTheDocument()

		const restartButton = screen.getByText("Recomeçar")

		await act(() => {
			restartButton.click()
		})

		const step1 = screen.getByText("Passo 1")
		expect(step1).toBeInTheDocument()


	})

	test('Deve cadastrar uma conta de motorista válida', async function () {
		render(<Page />)
		const nextButton = screen.getByText("Próximo")
		const driverOption = screen.getByTitle("driverOption")

		await act(() => {
			driverOption.click()
		})

		const carPlateField = screen.getByTitle("carPlate")

		await act(async () => {
			fireEvent.change(carPlateField, { target: { value: 'AAA9999' } })
			nextButton.click()
		})

		const step2 = screen.getByText("Passo 2")
		expect(step2).toBeInTheDocument()

		const nameField = screen.getByTitle("Nome")
		const emailField = screen.getByTitle("Email")
		const cpfField = screen.getByTitle("Cpf")
		const nextButton2 = screen.getByText("Próximo")

		await act(() => {
			fireEvent.change(nameField, { target: { value: 'Vinicius Nedeiros' } })
			fireEvent.change(emailField, { target: { value: `vinicius${Math.random()}@nedeiros.com ` } })
			fireEvent.change(cpfField, { target: { value: '10842083936' } })
			nextButton2.click()
		})

		const step3 = screen.getByText("Passo 3")
		expect(step3).toBeInTheDocument()

		const passwordField = screen.getByTitle("Senha")
		const confirmPassword = screen.getByTitle("Confirmar")
		const nextButton3 = screen.getByText("Confirmar")

		await act(() => {
			fireEvent.change(passwordField, { target: { value: '123456' } })
			fireEvent.change(confirmPassword, { target: { value: '123456' } })
			nextButton3.click()
		})

		const successMessage = screen.getByText("Conta criada com sucesso!")
		expect(successMessage).toBeInTheDocument()

		const restartButton = screen.getByText("Recomeçar")

		await act(() => {
			restartButton.click()
		})

		const step1 = screen.getByText("Passo 1")
		expect(step1).toBeInTheDocument()


	})
})

