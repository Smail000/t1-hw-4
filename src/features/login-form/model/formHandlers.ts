

export function onSubmit(data: any) {
    console.dir(`submit ${JSON.stringify(data)}`);
}

export function onInvalid(error: any) {
    console.warn(error);
}