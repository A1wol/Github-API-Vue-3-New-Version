export function validateFormFields(formErrorsArray: Array<(string | number)>, formOptions: Array<{ title: string, value: (number | string) }>): boolean {
    formOptions.forEach(option => {
        if (!option.value) {
            formErrorsArray.push(`${option.title} required`)
        }
    })
    return formErrorsArray.length === 0
}