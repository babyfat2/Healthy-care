import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsTimeFormat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isTimeFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, _args: ValidationArguments) {
                    const regex = /^(0[1-9]|1[0-2])-\d{4}$/;
                    return typeof value === 'string' && regex.test(value);
                },
                defaultMessage(_args: ValidationArguments) {
                    return 'Thời gian phải có định dạng MM-YYYY và tháng phải từ 01 đến 12';
                },
            },
        });
    };
}